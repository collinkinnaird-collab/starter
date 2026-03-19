import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


export function Friends({ onAddFriend, onDeleteFriend }) {

    const [newFriend, setNewFriend] = useState("");
    const navigate = useNavigate();

    function handleAddFriend() {
        onAddFriend({ name: newFriend });
        setNewFriend("");
    }   

    function handleDeleteFriend(id) {
        onDeleteFriend(id);
        navigate("/friends");
    }

    <form onSubmit={(e) => { e.preventDefault(); handleAddFriend(); }}>
        <input type="text" value={newFriend} onChange={(e) => setNewFriend(e.target.value)} placeholder="Add a new friend" />
        <button type="submit">Add Friend</button>
    </form>

  return (
     <main className="col-12 col-md-10 col-lg-10 p-3">
            <div className="scroll-panel"/>
                <div className="row g-3 mb-3">
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <img src="/images/image_2.png" alt="settings" width="50"/><NavLink to="/friends/:id">View Profile</NavLink>
                        <p className="small">GoalMaster27</p>
                    </div></div>
                </div>
                
                <div className="row g-3 mb-3">
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <img src="/images/image_2.png" alt="settings" width="50"/><NavLink to="/friends/:id">View Profile</NavLink>
                        <p className="small">epicGirl</p>
                    </div></div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <img src="/images/image_2.png" alt="settings" width="50"/><NavLink to="/friends/:id">View Profile</NavLink>
                        <p className="small">User Name</p>
                    </div></div>
                </div>

            </main>
  );
}
