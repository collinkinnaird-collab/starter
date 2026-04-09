import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import ProgressCircle from '../components/progressCircle';

export function IndividualFriend() {
    const { id } = useParams();
    const [friendEmail, setFriendEmail] = useState('');
    const [friendAvatar, setFriendAvatar] = useState('/images/image_1.png');
    const [personalGoals, setPersonalGoals] = useState([]);
    const [partnerGoals, setPartnerGoals] = useState([]);

    useEffect(() => {
        async function fetchFriendGoals() {
            try {
                const res = await fetch(`/api/friend-goals/${id}`, { credentials: 'include' });
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setFriendEmail(data.friendEmail || '');
                setFriendAvatar(data.friendAvatar || '/images/image_1.png');
                setPersonalGoals(data.personalGoals || []);
                setPartnerGoals(data.partnerGoals || []);
            } catch (err) {
                console.error('Failed to fetch friend goals:', err);
            }
        }
        fetchFriendGoals();
    }, [id]);

    return (
        <main className="col-12 col-md-10 col-lg-10 p-3">
            <div className="container-fluid">
                <div className="row">
                    <aside className="col-12 col-md-3 col-lg-2 border-end p-3 sticky-sidebar">
                        <img src={friendAvatar} className="img-fluid rounded-circle mb-3" alt="friend" width="250" />
                        <p className="small">{friendEmail}</p>
                        <NavLink className="btn btn-outline-info btn-sm" to="/friends">Back to Friends</NavLink>
                    </aside>

                    <section className="col-12 col-md-9 col-lg-10">
                        <div className="row g-3">

                            <div className="col-12 col-lg-6">
                                <div className="scroll-panel">
                                    <div className="sticky-top-row">
                                        <div className="px-2">
                                            <div className="card g-3 custom">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-0">Their Goals</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {personalGoals.map((goal) => (
                                        <div className="row g-3 mb-3" key={goal._id}>
                                            <div className="col-6">
                                                <div className="card p-3 custom h-100 d-flex align-items-center justify-content-center">
                                                    <ProgressCircle
                                                        initialPercent={goal.progress}
                                                        onChange={() => {}}
                                                        step={0}
                                                        max={100}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="card p-3 custom h-100 d-flex justify-content-between">
                                                    <div>
                                                        <p className="mb-2">{goal.title}</p>
                                                        <p className="small text-muted mb-0">personal goal</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {personalGoals.length === 0 && (
                                        <div className="card p-4 custom text-center">
                                            <p className="mb-0">No goals yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-12 col-lg-6">
                                <div className="scroll-panel">
                                    <div className="sticky-top-row">
                                        <div className="px-2">
                                            <div className="card g-3 custom">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-0">Goals with you</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {partnerGoals.map((goal) => (
                                        <div className="row g-3 mb-3" key={goal._id}>
                                            <div className="col-6">
                                                <div className="card p-3 custom h-100 d-flex align-items-center justify-content-center">
                                                    <ProgressCircle
                                                        initialPercent={goal.progress}
                                                        onChange={() => {}}
                                                        step={0}
                                                        max={100}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="card p-3 custom h-100 d-flex justify-content-between">
                                                    <div>
                                                        <p className="mb-2">{goal.title}</p>
                                                        <p className="small text-muted mb-0">partner goal</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {partnerGoals.length === 0 && (
                                        <div className="card p-4 custom text-center">
                                            <p className="mb-0">No partner goals together yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
