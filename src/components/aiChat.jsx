import React, { useState, useRef, useEffect } from 'react';

export default function AiChat({ open, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'How can I help with your goals?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const updated = [...messages, { role: 'user', content: text }];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...updated, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([...updated, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
      }
    } catch {
      setMessages([...updated, { role: 'assistant', content: 'Could not reach the server.' }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        <div style={styles.header}>
          <span style={{ fontWeight: 600 }}>Goal Coach</span>
          <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        </div>

        <div style={styles.body}>
          {messages.map((m, i) => (
            <div key={i} style={{
              ...styles.bubble,
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              background: m.role === 'user' ? '#5DC7EC' : 'rgba(255,255,255,0.1)',
              color: m.role === 'user' ? '#000' : '#fff',
            }}>
              {m.content}
            </div>
          ))}
          {loading && (
            <div style={{ ...styles.bubble, alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', color: '#aaa' }}>
              Thinking...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} style={styles.inputRow}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your goals..."
          />
          <button type="submit" style={styles.sendBtn} disabled={loading}>&#9654;</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 10000,
  },
  panel: {
    width: '340px',
    height: '450px',
    borderRadius: '12px',
    background: 'rgba(20, 25, 35, 0.97)',
    border: '1px solid rgba(93, 199, 236, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    borderBottom: '1px solid rgba(93, 199, 236, 0.3)',
    color: '#5DC7EC',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  bubble: {
    padding: '8px 12px',
    borderRadius: '10px',
    maxWidth: '80%',
    fontSize: '14px',
    lineHeight: '1.4',
    wordBreak: 'break-word',
  },
  inputRow: {
    display: 'flex',
    borderTop: '1px solid rgba(93, 199, 236, 0.3)',
    padding: '8px',
    gap: '6px',
  },
  input: {
    flex: 1,
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(93, 199, 236, 0.3)',
    borderRadius: '6px',
    padding: '8px',
    color: '#fff',
    outline: 'none',
    fontSize: '14px',
  },
  sendBtn: {
    background: '#5DC7EC',
    border: 'none',
    borderRadius: '6px',
    padding: '0 12px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};
