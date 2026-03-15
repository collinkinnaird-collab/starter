import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ onLogin }) {
  const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState("signin");
    const [error, setError] = useState("");

    useEffect(() => {
      try {
        const raw = localStorage.getItem("auth.v1");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed?.email) setEmail(parsed.email);
      } catch {}
    }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const e = email.trim();
    if (!e || !password) {
        setError("Please enter both email and password");
        return;
    }

    const endpoint = mode === "signup" ? "/api/auth/create" : "/api/auth/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: e, password }),
      });

      if (res.ok) {
        const data = await res.json();
        onLogin?.(data);
        navigate('/home');
      } else {
        const body = await res.json();
        setError(body.msg || "Authentication failed");
      }
    } catch (err) {
      setError("Could not connect to server");
    }
  }

  return (
     <main>

            <h1> Lets Make Some goals!</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="123@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="btn-group">
                    <button type="submit" className={`btn ${mode === "signin" ? "btn-primary" : "btn-secondary"}`} onClick={() => setMode("signin")}>Sign In</button>
                    <button type="submit" className={`btn ${mode === "signup" ? "btn-primary" : "btn-secondary"}`} onClick={() => setMode("signup")}>Sign Up</button>
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
            </form>
        </main>
  );
}
