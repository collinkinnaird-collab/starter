import React from 'react';
import { NavLink } from 'react-router-dom';


export function Friends() {
  return (
     <main className="col-12 col-md-10 col-lg-10 p-3">
            <div className="scroll-panel"/>
                <div className="row g-3 mb-3">
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <img src="../images/ChatGPT Image Jan 27, 2026 at 07_41_48 PM.png" alt="settings" width="50"/><NavLink to="indivFriend.html">View Profile</NavLink>
                        <p className="small">GoalMaster27</p>
                    </div></div>
                </div>
                
                <div className="row g-3 mb-3">
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <img src="../images/ChatGPT Image Jan 27, 2026 at 07_41_48 PM.png" alt="settings" width="50"/><NavLink to="indivFriend.html">View Profile</NavLink>
                        <p className="small">epicGirl</p>
                    </div></div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <img src="../images/ChatGPT Image Jan 27, 2026 at 07_41_48 PM.png" alt="settings" width="50"/><NavLink to="indivFriend.html">View Profile</NavLink>
                        <p className="small">User Name</p>
                    </div></div>
                </div>

            </main>
  );
}
