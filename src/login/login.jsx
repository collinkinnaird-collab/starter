import React from 'react';

export function Login() {
  return (
     <main>

            <h1> Lets Make Some goals!</h1>
            <form method="get" action="home.html" class="auth-form">
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="123@email.com"/>
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="password"/>
                </div>
                <div className="btn-group"/>
                <button type="submit" className="btn btn-primary">Sign In</button>
                <button type="submit" className="btn btn-secondary">Sign Up</button>
                <p>
                    TODO: Make a database to store user info!
                    Important info = 
                    <ol>
                        <li>
                            name
                        </li>
                        <li>
                            password
                        </li>
                        <li>
                            friends
                        </li>
                        <li>
                            goals
                        </li>
                        <li>
                            journals
                        </li>
                        <li>
                            likes (part of goals)
                        </li>
                        
                    </ol>
                </p>
            </form>
        </main>
  );
}
