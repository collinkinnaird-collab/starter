import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/home');
  }

  return (
     <main>

            <h1> Lets Make Some goals!</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="123@email.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="password"/>
                </div>
                <div className="btn-group">
                    <button type="submit" className="btn btn-primary">Sign In</button>
                    <button type="submit" className="btn btn-secondary">Sign Up</button>
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
