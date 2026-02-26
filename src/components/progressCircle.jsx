import React from 'react';


export default function ProgressCircle({ percent }) {
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