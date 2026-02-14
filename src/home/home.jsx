import React from 'react';

export function Home() {
  return (
     <main class="col-12 col-md-10 col-lg-10 p-3">
          <div class="container-fluid"/>
            <div class="row"/>
                <aside class="col-12 col-md-3 col-lg-2 border-end p-3 sticky-sidebar">
                    <img src="../images/ChatGPT Image Jan 27, 2026 at 07_41_29 PM.png" class="img-fluid rounded-circle mb-3" alt="settings" width="250"/>
                    <p class="small">User Name</p>
                </aside>
            <div class="scroll-panel">
                
                <div class="row g-3 mb-3">
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                         <p> Goal progress </p>
                    </div></div>
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <p>Goal</p>
                        <a class="btn btn-outline-info" href="goalmaker.html">New Goal +</a>
                    </div></div>
                     <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <p>Partner goal progress</p>
                    </div></div>
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <p>Partner goal</p>
                        <a class="btn btn-outline-info" href="goalmaker.html">New PartnerGoal +</a>
                    </div></div>
                </div>
                
                <div class="row g-3 mb-3">
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                         <div class="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" class="circular-chart" aria-hidden="true"> 
                                        <path class="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path class="circle" stroke-dasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text class="percentage" x="50%" y="50%" dy=".3em">90%</text>
                             </svg>
                         </div>
                    </div></div>
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <p>Goal: Gain 20 pounds by the end of the year</p>
                    </div></div>
                     <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <div class="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" class="circular-chart" aria-hidden="true"> 
                                        <path class="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path class="circle" stroke-dasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text class="percentage" x="50%" y="50%" dy=".3em">30%</text>
                             </svg>
                        </div>
                    </div></div>
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <p>Goal: read 3 books together</p>
                    </div></div>
                </div>
                
                <div class="row g-3 mb-3">
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                         <div class="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" class="circular-chart" aria-hidden="true"> 
                                        <path class="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path class="circle" stroke-dasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text class="percentage" x="50%" y="50%" dy=".3em">40%</text>
                             </svg>
                         </div>
                    </div></div>
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <p>Goal: study 30 min each day</p>
                    </div></div>
                     <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <div class="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" class="circular-chart" aria-hidden="true"> 
                                        <path class="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path class="circle" stroke-dasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text class="percentage" x="50%" y="50%" dy=".3em">25%</text>
                             </svg>
                        </div>
                    </div></div>
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <p>Goal: go on one weekly run together</p>
                    </div></div>
                </div>

                <div class="row g-3 mb-3">
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                         <div class="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" class="circular-chart" aria-hidden="true"> 
                                        <path class="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path class="circle" stroke-dasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text class="percentage" x="50%" y="50%" dy=".3em">99%</text>
                             </svg>
                         </div>
                    </div></div>
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <p>Goal: one daily act of service </p>
                    </div></div>
                     <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <div class="progress-circle" role="progressbar" aria-label="Goal progress" aria-valuemin="0" aria-valuemax="100" data-percentage="65" aria-valuenow="65">
                            <svg viewBox="0 0 36 36" class="circular-chart" aria-hidden="true"> 
                                        <path class="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path class="circle" stroke-dasharray="0 100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text class="percentage" x="50%" y="50%" dy=".3em">2%</text>
                             </svg>
                        </div>
                    </div></div>
                    <div class="col-6 col-lg-3"><div class="card p-3 custom">
                        <p>Goal: go swimming </p>
                    </div></div>
                </div>
                </div>

        </main>
  );
}
