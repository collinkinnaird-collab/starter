import React, { useMemo, useState, useRef, useEffect } from 'react';


export default function ProgressCircle({ 
    initialPercent = 0,
    onChange,
    step = 1,
    max = 100
    }) {
        const [percent, setPercent] = useState(() => Number(initialPercent) || 0);

        const intervalRef = useRef(null);

        useEffect(() => {
            setPercent(Number(initialPercent) || 0);
        }, [initialPercent]);

        const clampedPercent = useMemo(() => {
            const n = Number(percent) || 0;
            return Math.max(0, Math.min(max, n));
        }, [percent, max]);

        function setNextPercent(nextOrUpdater) {
            setPercent((prev) => {
                const next = typeof nextOrUpdater === "function" ? nextOrUpdater(prev) : nextOrUpdater;
                const clamped = Math.max(0, Math.min(max, Number(next) || 0));
                onChange?.(clamped);
                return clamped;
            });
        }

        function handleClick() {
                setNextPercent((prev) => Math.min(max, prev + step));
            }

        function handleHoldStart() {
            if (intervalRef.current !== null) return;

            intervalRef.current = setInterval(() => {
                setPercent((prev) => {

                    const next = Math.max(0, Math.min(max, (Number(prev) || 0) + step));
                    onChange?.(next);
                    return next;
                });
            }, 50);
        }

        function handleHoldEnd() {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        useEffect(() => {
            return () => {
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
        }, []);

    return (
        <button
            type="button"
            className="progress-circle"
            onClick={handleClick}
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
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
