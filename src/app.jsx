import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { Friends } from './friends/friends';
import { GoalMaker } from './goalMaker/goalMaker';
import { Home } from './home/home';
import { Media } from './media/media';
import { Settings} from './settings/settings';
import { Login } from './login/login';
import { IndividualFriend } from './friends/indivFriend';
import AiChat from './components/aiChat';


export default function App() {
    const [chatOpen, setChatOpen] = useState(false);
    const [friends, setFriends] = useState([]);

    const DEFAULT_GOALS = [
      { id: "g1", title: "Gain 20 pounds by the end of the year", progress: 90, isPartner: false },
      { id: "g2", title: "Read 3 books together", progress: 30, isPartner: true },
      { id: "g3", title: "Study 30 min each day", progress: 40, isPartner: false },
      { id: "g4", title: "Go on one weekly run together", progress: 25, isPartner: true },
      { id: "g5", title: "One daily act of service", progress: 99, isPartner: false },
      { id: "g6", title: "Go swimming", progress: 2, isPartner: true },
    ]

    const STORAGE_KEY = "goals.v1";
    const AUTH_KEY = "auth.v1";

    const [auth, setAuth] = useState(() => {
      try {
        const raw = localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    });

    const isLoggedIn = Boolean(auth?.email);


    useEffect(() => {
      try {
        if (auth) {
          localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
        } else {
          localStorage.removeItem(AUTH_KEY);
        }
      } catch {
        console.error("Failed to save auth to localStorage");
      }
    }, [auth]);

    function handleLogin({ email }) {
      setAuth({ email });
      // Clear stale goals and fetch fresh ones for this user
      localStorage.removeItem(STORAGE_KEY);
      setGoals([]);
      setTimeout(() => fetchGoals(), 0);
    }

    async function handleLogout() {
      try {
        await fetch('/api/auth/logout', { method: 'DELETE' });
      } catch {}
      localStorage.removeItem(STORAGE_KEY);
      setGoals([]);
      setAuth(null);
    }

    const [goals, setGoals] = useState(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    });

    useEffect(() => {
      if (isLoggedIn) {
        fetchGoals();
      }
    }, [isLoggedIn]);

    function deleteGoal(id) {
        setGoals((prev) => prev.filter((goal) => goal.id !== id && goal._id !== id));
    }

    const progressTimers = useRef({});

    function updateGoal(id, patch) {
      setGoals((prev) => prev.map((goal) => (goal.id === id || goal._id === id) ? { ...goal, ...patch } : goal));

      // Debounce saving progress to the database (progress circle fires rapidly)
      if (patch.progress !== undefined) {
        clearTimeout(progressTimers.current[id]);
        progressTimers.current[id] = setTimeout(() => {
          fetch(`/api/goal-progress/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ progress: patch.progress }),
          }).catch((err) => console.error('Failed to save progress:', err));
        }, 300);
      }
    }

    function normalizeGoal(g) {
      return {
        ...g,
        id: g.id || g._id,
        isPartner: g.isPartner === true || g.type === 'partner',
      };
    }

    async function fetchGoals() {
      try {
        const res = await fetch('/api/goals', {credentials: 'include'});
        if (!res.ok) throw new Error("Failed to fetch goals");
        const data = await res.json();
        let all = [];
        if (data.personalGoals || data.partnerGoals) {
          const personal = (data.personalGoals || []).map(normalizeGoal);
          const partner = (data.partnerGoals || []).map(normalizeGoal);
          all = [...personal, ...partner];
        } else if (Array.isArray(data.goals)) {
          all = data.goals.map(normalizeGoal);
        }
        // Deduplicate by id
        const seen = new Set();
        setGoals(all.filter((g) => {
          if (seen.has(g.id)) return false;
          seen.add(g.id);
          return true;
        }));
      } catch (err) {
        console.error("Failed to fetch goals", err);
      }
    }

    function handleAddGoal(goal) {
      if (!goal) return;
      setGoals((prev) => [normalizeGoal(goal), ...prev]);
    }

    async function deleteFriend(id) {
      try {
        const res = await fetch(`/api/friends/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error("Failed to delete friend");
        setFriends((prev) => prev.filter((friend) => friend.id !== id));
      } catch (err) {
        console.error("Failed to delete friend", err);
      }
    }

    async function addFriend(friend) {
      try {
        const res = await fetch('/api/friends', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(friend),
        });
        if (!res.ok) throw new Error("Failed to add friend");
        const data = await res.json();
        setFriends((prev) => [data, ...prev]);
      } catch (err) {
        console.error("Failed to add friend", err);
      }
    }

    async function fetchFriends() {
      try {
        const res = await fetch('/api/friends', { credentials: 'include' });
        if (!res.ok) throw new Error("Failed to fetch friends");
        const data = await res.json();
        setFriends(data);
      } catch (err) {
        console.error("Failed to fetch friends", err);
      }
    }

    useEffect(() => {
      fetchFriends();
    }, []);

  return (
    <BrowserRouter>
  <div className="app bg-dark text-light">
        <header>
            <h1 id="site-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              Goals<sup>&reg;</sup>
              <button
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  padding: 0,
                }}
                title="AI Chat"
                onClick={() => setChatOpen((v) => !v)}
              >
                &#9733;
              </button>
            </h1>
            <nav>

                <menu>
                    <ul className="nav nav-underline justify-content-center">
                        <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/media">Media</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/friends">Friends</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/settings">Settings</NavLink></li>
                        {isLoggedIn && (
                          <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                          </li>
                        )}
                    </ul>
                </menu>
            </nav>
        </header>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login onLogin={handleLogin}/>} exact />
            <Route path="/home" element={isLoggedIn ? (<Home goals={goals} onDeleteGoal={deleteGoal} onUpdateGoal={updateGoal} />) : (<Navigate to="/login" replace />)} />
            <Route path="/media" element={isLoggedIn ? (<Media />) : (<Navigate to="/login" replace />)} />
            <Route path="/friends" element={isLoggedIn ? (<Friends friends={friends} onAddFriend={addFriend} onDeleteFriend={deleteFriend} />) : (<Navigate to="/login" replace />)} />
            <Route path="/settings" element={isLoggedIn ? (<Settings />) : (<Navigate to="/login" replace />)} />
            <Route path="/goalMaker" element={isLoggedIn ? (<GoalMaker onAddGoal={handleAddGoal} />) : (<Navigate to="/login" replace />)} />
            <Route path="/friends/:id" element={isLoggedIn ? (<IndividualFriend />) : (<Navigate to="/login" replace />)} />
            <Route path='*' element={<NotFound />} />
          </Routes>

        <footer>
            <hr />
            <span className="text-reset">Collin Kinnaird</span>
            <br />
            <a href="https://github.com/collinkinnaird-collab/starter">GitHub</a>
        </footer>

        <AiChat open={chatOpen} onClose={() => setChatOpen(false)} />
  </div>
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}