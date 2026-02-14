import React from 'react';
import { NavLink } from 'react-router-dom';

export function GoalMaker() {
  return (
     <main>
            <section>
                <menu>
                    <li><NavLink className="btn btn-outline-light" to="/home">Back</NavLink></li>
                </menu>
                <p> 
                    Try making a goal that will push you a little bit, make sure it is something measurable
                </p>
                <label for="select">Goal Type: </label>
                <select id="select" name="varSelect">
                    <option>Physical</option>
                    <option selected>Spiritaul</option>
                    <option>Intellectual</option>
                    <option>Social</option>
                    <option>Financial</option>

                </select>

                <label for="select">Measurement: </label>
                <select id="select" name="varSelect">
                    <option>count</option>
                    <option selected>time</option>

                </select>


            </section>

        </main>
  );
}
