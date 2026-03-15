import React from 'react';
import ProgressCircle from './progressCircle';

export default function GoalCard({ goal, onDelete, onUpdateGoal}) {
    return (
        <>
            <div className="col-6">
                <div className="card p-3 custom h-100 d-flex align-items-center justify-content-center">
                    <ProgressCircle 
                    initialPercent={goal.progress} 
                    onChange={(newProgress) => onUpdateGoal(goal.id, { progress: newProgress })} 
                    step={1}
                    max={100}/>

                </div>
            </div>

            <div className="col-6">
                <div className="card p-3 custom h-100 d-flex justify-content-between" style={{ position: 'relative' }}>
                    <button
                        type="button"
                        className="btn btn-outline-info btn-sm"
                        style={{ position: 'absolute', top: '8px', right: '8px' }}
                        onClick={() => alert(`Published: ${goal.title}`)}
                    >
                        Publish
                    </button>
                    <div>
                        <p className="mb-2">{goal.title}</p>
                        <p className="small text-muted mb-0">
                            {goal.isPartner ? "partner goal" : "your goal"}
                        </p>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
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