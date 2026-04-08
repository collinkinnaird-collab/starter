import React, { useState, useEffect } from 'react';
import ProgressCircle from '../components/progressCircle';
import { GoalEvent, GoalNotifier } from '../components/gameNotifier';

export function Media() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPublishedGoals();
    }, []);

    async function fetchPublishedGoals() {
        try {
            const res = await fetch('/api/published-goals', { credentials: 'include' });
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setPosts(data.published || []);
        } catch (err) {
            console.error('Failed to fetch published goals:', err);
        }
    }

    useEffect(() => {
        function handleEvent(event) {
            if (event.type === GoalEvent.GoalPublished) {
                setPosts((prev) => [event.value, ...prev]);
            } else if (event.type === GoalEvent.GoalUnpublished) {
                setPosts((prev) => prev.filter((p) => p.goalId !== event.value.goalId));
            } else if (event.type === GoalEvent.GoalProgressUpdate) {
                setPosts((prev) =>
                    prev.map((p) =>
                        (p._id === event.value._id)
                            ? { ...p, progress: event.value.progress }
                            : p
                    )
                );
            }
        }

        GoalNotifier.addHandler(handleEvent);
        return () => GoalNotifier.removeHandler(handleEvent);
    }, []);

    return (
        <main className="col-12 col-md-10 col-lg-8 mx-auto p-3">
            <div className="scroll-panel">
                <div className="sticky-top-row">
                    <div className="px-2">
                        <div className="card g-3 custom">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0">Published Goals</p>
                            </div>
                        </div>
                    </div>
                </div>

                {posts.length === 0 && (
                    <div className="card p-4 custom text-center mt-3">
                        <p className="mb-0">No published goals yet</p>
                    </div>
                )}

                {posts.map((post) => (
                    <div className="row g-3 mb-3" key={post._id}>
                        <div className="col-6">
                            <div className="card p-3 custom h-100 d-flex align-items-center justify-content-center">
                                <ProgressCircle
                                    initialPercent={post.progress}
                                    onChange={() => {}}
                                    step={0}
                                    max={100}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card p-3 custom h-100 d-flex justify-content-between">
                                <div>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <img src="/images/image_1.png" alt={post.user} width="28" height="28" className="rounded-circle" />
                                        <span className="small text-muted">{post.user}</span>
                                    </div>
                                    <p className="mb-0">{post.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
