import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Friends } from './friends/friends';
import { GoalMaker } from './goalMaker/goalMaker';
import { Home } from './home/home';
import { Media } from './media/media';
import { Settings} from './settings/settings';
import { Login } from './login/login';
import { IndividualFriend } from './friends/indivFriend';


export default function App() {
  return ( 
    <BrowserRouter>
  <div className="app bg-dark text-light">
        <header>
            <h1 id="site-title">Goals<sup>&reg;</sup></h1>
            <nav>

                <menu>
                    <ul className="nav nav-underline justify-content-center">
                        <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/media">Media</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/friends">Friends</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/settings">Settings</NavLink></li>
                    </ul>
                </menu>
            </nav>
        </header>
          <Routes>
            <Route path="/login" element={<Login />} exact />
            <Route path="/home" element={<Home />}  />
            <Route path="/media" element={<Media />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/goalMaker" element={<GoalMaker />} />
            <Route path="/friends/:id" element={<IndividualFriend />} />
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
