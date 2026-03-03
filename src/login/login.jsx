import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ onLogin }) {
  const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState("signin");
    const [error, setError] = useState("");

    useEffect(() => {
      try{
        const raw = localStorage.getItem("auth.v1");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed?.email) setEmail(parsed.email);
        if (parsed?.password) setPassword(parsed.password);
      } catch {

      }
    }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const e = email.trim();
    if (!e || !password) {
        setError("Please enter both email and password");
        return;
    }

    onLogin?.({ email: e, password });

    navigate('/home');
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
                <p>TODO: Make a database to store user info! Important info:</p>
                <ol>
                    <li>name</li>
                    <li>password</li>
                    <li>friends</li>
                    <li>goals</li>
                    <li>journals</li>
                    <li>likes (part of goals)</li>
                </ol>
            </form>
        </main>
  );
}
