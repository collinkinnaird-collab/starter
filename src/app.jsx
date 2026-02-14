import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Friends } from './friends/friends';
// import { GoalMaker } from './goalMaker/goalMaker';
import { Home } from './home/home';
import { Media } from './media/media';
import { Settings} from './settings/settings';

export default function App() {
  return ( 
    <BrowserRouter>
  <div className="app bg-dark text-light">
        <header>
            <h1 id="site-title">Goals<sup>&reg;</sup></h1>
            <nav>

                <menu>
                    <ul className="nav nav-underline justify-content-center">
                        <li className="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/media">Media</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/friends">Friends</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/settings">Settings</NavLink></li>
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

          <Routes>
            <Route path="/home" element={<Home />} exact />
            <Route path="/media" element={<Media />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/settings" element={<Settings />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

        <footer>
            <hr />
            <span className="text-reset">Collin Kinnaird</span>
            <br />
            <a href="https://github.com/collinkinnaird-collab/starter">GitHub</a>
        </footer>
  </div>
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}