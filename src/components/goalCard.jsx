import React, { useState } from 'react';
import ProgressCircle from './progressCircle';

export default function GoalCard({ goal, onDelete, onUpdateGoal}) {
    const [loading, setLoading] = useState(false);
    const [published, setPublished] = useState(goal.published || false);

    async function handleTogglePublish() {
        setLoading(true);
        try {
            if (published) {
                // Unpublish
                const res = await fetch(`/api/publish-goal/${goal.id || goal._id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('Failed to unpublish');
                setPublished(false);
                onUpdateGoal(goal.id, { published: false });
            } else {
                // Publish
                const res = await fetch('/api/publish-goal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        goalId: goal.id || goal._id,
                        title: goal.title,
                        progress: goal.progress,
                    }),
                });
                if (!res.ok) throw new Error('Failed to publish');
                setPublished(true);
                onUpdateGoal(goal.id, { published: true });
            }
        } catch (err) {
            console.error('Publish error:', err);
            alert(published ? 'Failed to unpublish goal' : 'Failed to publish goal');
        } finally {
            setLoading(false);
        }
    }

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
                        className={`btn btn-sm ${published ? 'btn-success' : 'btn-outline-info'}`}
                        style={{ position: 'absolute', top: '8px', right: '8px' }}
                        onClick={handleTogglePublish}
                        disabled={loading}
                    >
                        {loading ? '...' : published ? 'Published' : 'Publish'}
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