import React, { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';


export function GoalMaker({ onAddGoal}) {

    const [searchParams] = useSearchParams();
    const [goalType, setGoalType] = useState("physical");
    const [measurement, setMeasurement] = useState("count");
    const [title, setTitle] = useState("");
    const [isPartner, setIsPartner] = useState(searchParams.get('partner') === 'true');

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const trimmed = title.trim();
        if(!trimmed) return;

        const payload = {
            title: trimmed,
            goalType,
            measurement,
            progress: 0,
            isPartner,
        };

        try{
            const url = isPartner ? "/api/partner-goals" : "/api/goals";
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error("Failed to create goal");
            const { goal } = await res.json();

            if (typeof onAddGoal === 'function') onAddGoal(goal);
        setTitle("");
        setIsPartner(false);
        navigate("/home");
        } catch (err) {
            console.error('failed to save goal',err);
            alert("Error creating goal: " + err.message);
        }
    }
  return (
     <main>
            <section>
                <menu>
                    <li><NavLink className="btn btn-outline-light" to="/home">Back</NavLink></li>
                </menu>
                <p> 
                    Try making a goal that will push you a little bit, make sure it is something measurable
                </p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="goalType">Goal Type: </label>
                    <select id="goalType" value={goalType} onChange={e => setGoalType(e.target.value)}>
                        <option value="physical">Physical</option>
                        <option value="spiritual">Spiritual</option>
                        <option value="intellectual">Intellectual</option>
                        <option value="social">Social</option>
                        <option value="financial">Financial</option>
                    </select>

                <label htmlFor="measurement">Measurement: </label>
                <select id="measurement" value={measurement} onChange={e => setMeasurement(e.target.value)}>
                    <option value="count">count</option>
                    <option value="time">time</option>
                </select>

                <label htmlFor="goalTitle">Goal: </label>
                <input type="text" id="goalTitle" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Study 30 min each day" />


                  <section>

                     <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="isPartner"
              checked={isPartner}
              onChange={(e) => setIsPartner(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isPartner">
              Partner goal
            </label>
          </div>
          
                <button 
                    className="btn btn-outline-light"
                    type="submit"
                >
                Create Goal</button>
            </section>
                </form>




            </section>

        </main>
  );
}
