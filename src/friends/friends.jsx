import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export function Friends({ friends, onAddFriend, onDeleteFriend }) {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetchSuggestions();
    }, []);

    async function fetchSuggestions() {
        try {
            const res = await fetch('/api/friend-suggestions', { credentials: 'include' });
            if (!res.ok) throw new Error('Failed to fetch suggestions');
            const data = await res.json();
            setSuggestions(data.suggestions || []);
        } catch (err) {
            console.error('Failed to fetch suggestions:', err);
        }
    }

    async function handleAddFromSuggestion(email) {
        await onAddFriend({ email });
        setSuggestions((prev) => prev.filter((s) => s.email !== email));
    }

    return (
        <main className="col-12 col-md-10 col-lg-10 p-3">
            <div className="container-fluid">
                <div className="row g-3">

                    <div className="col-12 col-lg-6">
                        <div className="scroll-panel">
                            <div className="sticky-top-row">
                                <div className="px-2">
                                    <div className="card g-3 custom">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-0">Your Friends</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {friends.length === 0 && (
                                <div className="card p-4 custom text-center mt-3">
                                    <p className="mb-0">No friends yet — add some from suggestions!</p>
                                </div>
                            )}

                            {friends.map((friend) => (
                                <div className="row g-3 mb-3" key={friend._id || friend.email}>
                                    <div className="col-12">
                                        <div className="card p-3 custom d-flex flex-row align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                                <img src={friend.avatar || "/images/image_1.png"} alt={friend.email} width="40" height="40" className="rounded-circle" />
                                                <span>{friend.email}</span>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <NavLink className="btn btn-outline-info btn-sm" to={`/friends/${friend._id}`}>
                                                    View
                                                </NavLink>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => onDeleteFriend(friend._id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="scroll-panel">
                            <div className="sticky-top-row">
                                <div className="px-2">
                                    <div className="card g-3 custom">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-0">Suggestions</p>
                                            <button className="btn btn-outline-info btn-sm" onClick={fetchSuggestions}>
                                                Refresh
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {suggestions.length === 0 && (
                                <div className="card p-4 custom text-center mt-3">
                                    <p className="mb-0">No suggestions right now</p>
                                </div>
                            )}

                            {suggestions.map((user) => (
                                <div className="row g-3 mb-3" key={user._id || user.email}>
                                    <div className="col-12">
                                        <div className="card p-3 custom d-flex flex-row align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                                <img src={user.avatar || "/images/image_1.png"} alt={user.email} width="40" height="40" className="rounded-circle" />
                                                <span>{user.email}</span>
                                            </div>
                                            <button
                                                className="btn btn-outline-success btn-sm"
                                                onClick={() => handleAddFromSuggestion(user.email)}
                                            >
                                                Add Friend
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
