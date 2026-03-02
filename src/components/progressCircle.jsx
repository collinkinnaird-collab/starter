import React, { useMemo, useState } from 'react';


export default function ProgressCircle({ 
    initialPercent = 0,
    step = 5,
    max = 100
    }) {
        const [percent, setPercent] = useState(() => Number(initialPercent) || 0);
    
        const clampedPercent = useMemo(() => {
            const n = Number(percent) || 0;
            return Math.max(0, Math.min(max, n));
        }, [percent, max]);

        function handleClick() {
            setPercent((prev) => {
                const next = (Number(prev) || 0) + (Number(step) || 0);
                return next > max ? 0 : next;
            });
        }
    return (
        <button
            type="button"
            className="progress-circle"
            onClick={handleClick}

            role="progressbar"
            aria-label="Goal progress"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={clampedPercent}
            style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer"}}
        >
            <svg viewBox="0 0 36 36" className="circular-chart" aria-hidden="true">
                <path className="circle-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                <path className="circle" strokeDasharray={`${clampedPercent} 100`} d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" />
                <text className="percentage" x="50%" y="50%" dy=".3em">{clampedPercent}%</text>
            </svg>
        </button>
    )

}