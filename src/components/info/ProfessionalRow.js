import { getString } from "resources";
import React from "react";

const ProfesionalRow = ({company, job,}) => (
    <div className="row resume-line">
        <div
            className="col-12 mt-5 mt-md-0 col-md-3">
            <p className="info-dates">{ getString("actual_work") }</p>
        </div>
        <div className="col-12 col-md-9">
            <span
                className="info-company">{ company } </span>
            <span
                className="info-job">{ job } </span>
            <span
                className="info-projects">{ getString("developed_projects") } </span>
            <ul>
                <li className="info-app">
                    InmoScout24
                    -> { getString("web_app_dev") }
                    <p className="info-tech">{ getString("used_tech") } HTML
                        5,
                        SCSS,
                        React.js,
                        Redux,
                        Typescript. </p>
                </li>
            </ul>
        </div>
    </div>
)

