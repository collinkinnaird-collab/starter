import React, { useState } from 'react';
import ProgressCircle from '../components/progressCircle';

const SAMPLE_POSTS = [
    { id: "p1", user: "GoalMaster27", avatar: "/images/image_1.png", title: "Gain 20 pounds by the end of the year", progress: 90 },
    { id: "p2", user: "epicGirl", avatar: "/images/image_2.png", title: "Eat 1 fruit a day", progress: 80 },
    { id: "p3", user: "RunnerDude", avatar: "/images/image_1.png", title: "Run a half marathon", progress: 45 },
    { id: "p4", user: "BookWorm99", avatar: "/images/image_2.png", title: "Read 12 books this year", progress: 58 },
    { id: "p5", user: "FitQueen", avatar: "/images/image_2.png", title: "Do 100 push-ups in a row", progress: 33 },
    { id: "p6", user: "ZenMaster", avatar: "/images/image_1.png", title: "Meditate every morning for 30 days", progress: 70 },
    { id: "p7", user: "CodeNinja", avatar: "/images/image_1.png", title: "Ship a side project this month", progress: 15 },
    { id: "p8", user: "ChefMode", avatar: "/images/image_2.png", title: "Cook dinner 5 nights a week", progress: 62 },
];

export function Media() {
    const [posts] = useState(SAMPLE_POSTS);

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

                {posts.map((post) => (
                    <div className="row g-3 mb-3" key={post.id}>
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
                                        <img src={post.avatar} alt={post.user} width="28" height="28" className="rounded-circle" />
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
