import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import GoalCard from '../components/goalCard';


export function Home() {

    const [goals, setGoals] = useState([
        { id: "g1", title: "Gain 20 pounds by the end of the year", progress: 90, isPartner: false },
        { id: "g2", title: "Read 3 books together", progress: 30, isPartner: true },
        { id: "g3", title: "Study 30 min each day", progress: 40, isPartner: false },
        { id: "g4", title: "Go on one weekly run together", progress: 25, isPartner: true },
        { id: "g5", title: "One daily act of service", progress: 99, isPartner: false },
        { id: "g6", title: "Go swimming", progress: 2, isPartner: true },
    ]);


    const deleteGoal = (id) => {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    }

    const rows = useMemo(() => {
        const copy = [...goals];
        const out = [];
        while (copy.length) out.push(copy.splice(0, 2));
        return out;
    }, [goals]);

    const personalGoals = goals.filter((g) => !g.isPartner);
    const partnerGoals = goals.filter((g) => g.isPartner);

    return (
        <main className="col-12 col-md-10 col-lg-10 p-3">
            <div className="container-fluid">
                <div className="row">
                    <aside className="col-12 col-md-3 col-lg-2 border-end p-3 sticky-sidebar">
                        <img src="/images/image_1.png" className="img-fluid rounded-circle mb-3" alt="settings" width="250" />
                        <p className="small">User Name</p>
                    </aside>

                    <section className="col-12 col-md-9 col-lg-10">
                        <div className="row g-3">

                            <div className="col-12 col-lg-6">
                                <div className="scroll-panel">
                                    <div className="sticky-top-row">
                                        <div className="px-2">
                                            <div className="card g-3 custom">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-0">your Goals</p>
                                                    <NavLink className="btn btn-outline-info" to="/goalMaker">New Goal +</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {personalGoals.map((goal) => (
                                        <div className="row g-3 mb-3" key={goal.id}>
                                            <GoalCard goal={goal} onDelete={deleteGoal} />
                                        </div>
                                    ))}

                                    {personalGoals.length === 0 && (
                                        <div className="card p-4 custom text-center">
                                            <p className="mb-2">No personal goals yet</p>
                                            <NavLink className="btn btn-outline-info" to="/goalMaker">New Goal +
                                            </NavLink>
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
                                                    <p className="mb-0">Partner Goals</p>
                                                    <NavLink className="btn btn-outline-info" to="/goalMaker">New Partner Goal +</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {partnerGoals.map((goal) => (
                                        <div className="row g-3 mb-3" key={goal.id}>
                                            <GoalCard goal={goal} onDelete={deleteGoal} />
                                        </div>
                                    ))}

                                    {partnerGoals.length === 0 && (
                                        <div className="card p-4 custom text-center">
                                            <p className="mb-2">No partner goals yet</p>
                                            <NavLink className="btn btn-outline-info" to="/goalMaker">New Goal +
                                            </NavLink>
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
