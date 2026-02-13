import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return ( 
  <div className="app bg-dark text-light">
        <header>
            <h1 id="site-title">Goals<sup>&reg;</sup></h1>
            <nav>

                <menu>
                    <ul className="nav nav-underline justify-content-center">
                        <li className="nav-item"><a className="nav-link" href="home.html">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="media.html">Media</a></li>
                        <li className="nav-item"><a className="nav-link" href="friends.html">Friends</a></li>
                        <li className="nav-item"><a className="nav-link" href="settings.html">Settings</a></li>
                    </ul>
                </menu>
            </nav>
        </header>
        <main>

            <h1> Lets Make Some goals!</h1>
            <form method="get" action="home.html" className="auth-form">
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


        <footer>
            <hr />
            <span className="text-reset">Collin Kinnaird</span>
            <br />
            <a href="https://github.com/collinkinnaird-collab/starter">GitHub</a>
        </footer>
  </div>
  );
}