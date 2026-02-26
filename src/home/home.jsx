import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';


function ProgressCircle({ percent }) {
    const pct = Math.max(0, Math.min(100, Number(percent) || 0));
    return (
        <div 
          className="progress-circle"
          role="progressbar"
          aria-label="Goal progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={pct}
          ><svg viewBox="0 0 36 36" className="circular-chart" aria-hidden="true">
                                        <path className="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <path className="circle" strokeDasharray={`${pct} 100`} d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                                        <text className="percentage" x="50%" y="50%" dy=".3em">{pct}%</text>
                             </svg>
                             </div>
    )

}

function GoalCard({ goal, onDelete }) {
    return (
            <>
            <div className="col-6 col-lg-3">
            <div className="card p-3 custom h-100 d-flex align-items-center justify-content-center">
                <ProgressCircle percent={goal.progress} />

                </div>
             </div>

             <div className="col-6 col-lg-3">
                 <div className="card p-3 custom h-100 d-flex justify-content-between">
                     <div>
                        <p className="mb-2">{goal.title}</p>
                        <p className="small text-muted mb-0">
                            {goal.isPartner ? "partner goal" : "your goal"}
                        </p>
                     </div>

                     <div className="d-flex gap-2 mt-3">
                        <button 
                            type="button"
                            className="btn btn-outliner-danger btn-sm"
                            onClick={() => onDelete(goal.id)}
                            >
                                Delete
                            </button>
                     </div>
                 </div>
             </div>
             </>
    )
}


export function Home() {

  const deleteGoal = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  }  

  const rows = useMemo(() => {
    const copy = [...goals];
    const out = [];
    while (copy.length) out.push(copy.splice(0, 2));
    return out;
  }, [goals]);
  
  return (
     <main className="col-12 col-md-10 col-lg-10 p-3">
          <div className="container-fluid">
            <div className="row">
                <aside className="col-12 col-md-3 col-lg-2 border-end p-3 sticky-sidebar">
                    <img src="/images/image_1.png" className="img-fluid rounded-circle mb-3" alt="settings" width="250"/>
                    <p className="small">User Name</p>
                </aside>

            <section className="col-12 col-md-9 col-lg-10">
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

              {rows.map((row, index) => (
                <div className="row g-3 mb-3" key={index}>
                  {row.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} onDelete={deleteGoal} />
                  ))}
                </div>
              ))}

              {goals.length === 0 && (
                <div className="card p-4 custom text-center">
                    <p className="mb-2">No goals yet</p>
                    <NavLink className="btn btn-outline-info" to="/goalMaker">New Goal +
                    </NavLink>
                </div>
              )}
              </div>
            </section>
        </div>
        </div>

        </main>
  );
}
