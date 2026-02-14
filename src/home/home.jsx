import React from 'react';
import { NavLink } from 'react-router-dom';

export function Home() {
  return (
     <main className="col-12 col-md-10 col-lg-10 p-3">
          <div className="container-fluid"/>
            <div className="row"/>
                <aside className="col-12 col-md-3 col-lg-2 border-end p-3 sticky-sidebar">
                    <img src="../images/image_1.png" className="img-fluid rounded-circle mb-3" alt="settings" width="250"/>
                    <p className="small">User Name</p>
                </aside>
            <div className="scroll-panel">

                <div className="row g-3 mb-3">
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                         <p> Goal progress </p>
                    </div></div>
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <p>Goal</p>
                        <NavLink className="btn btn-outline-info" to="/goalMaker">New Goal +</NavLink>
                    </div></div>
                     <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <p>Partner goal progress</p>
                    </div></div>
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <p>Partner goal</p>
                        <NavLink className="btn btn-outline-info" to="/goalMaker">New PartnerGoal +</NavLink>
                    </div></div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                         <div className="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" className="circular-chart" aria-hidden="true"> 
                                        <path className="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path className="circle" strokeDasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text className="percentage" x="50%" y="50%" dy=".3em">90%</text>
                             </svg>
                         </div>
                    </div></div>
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <p>Goal: Gain 20 pounds by the end of the year</p>
                    </div></div>
                     <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <div className="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" className="circular-chart" aria-hidden="true"> 
                                        <path className="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path className="circle" strokeDasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text className="percentage" x="50%" y="50%" dy=".3em">30%</text>
                             </svg>
                        </div>
                    </div></div>
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <p>Goal: read 3 books together</p>
                    </div></div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                         <div className="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" className="circular-chart" aria-hidden="true"> 
                                        <path className="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path className="circle" strokeDasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text className="percentage" x="50%" y="50%" dy=".3em">40%</text>
                             </svg>
                         </div>
                    </div></div>
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <p>Goal: study 30 min each day</p>
                    </div></div>
                     <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <div className="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" className="circular-chart" aria-hidden="true"> 
                                        <path className="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path className="circle" strokeDasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text className="percentage" x="50%" y="50%" dy=".3em">25%</text>
                             </svg>
                        </div>
                    </div></div>
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <p>Goal: go on one weekly run together</p>
                    </div></div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                         <div className="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" className="circular-chart" aria-hidden="true"> 
                                        <path className="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path className="circle" strokeDasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text className="percentage" x="50%" y="50%" dy=".3em">99%</text>
                             </svg>
                         </div>
                    </div></div>
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <p>Goal: one daily act of service </p>
                    </div></div>
                     <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <div className="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" className="circular-chart" aria-hidden="true"> 
                                        <path className="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path className="circle" strokeDasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text className="percentage" x="50%" y="50%" dy=".3em">2%</text>
                             </svg>
                        </div>
                    </div></div>
                    <div className="col-6 col-lg-3"><div className="card p-3 custom">
                        <p>Goal: go swimming </p>
                    </div></div>
                </div>
                </div>

        </main>
  );
}
