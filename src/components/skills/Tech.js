import React from 'react';
import Fab from "@material-ui/core/Fab";
import {makeStyles} from '@material-ui/core/styles';
import "./Skills.scss";
import {getString} from "resources";
import SkillChart from "./SkillChart";
import moment from "moment";


const useStyles = makeStyles({
        downloadButton: {
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 998,
            "&:focus": {
                outline: 0
            }
        },
        personalButton: {
            height: 170,
            width: 170,
            fontSize: 18,
            color: "#6cb04a !important",
            "&:focus": {
                outline: 0
            }
        }
    }
);

const datesDifference = date => {
    const today = moment(new Date());
    const dateDiff = today.diff(date, 'years');
    let level;

    switch (dateDiff) {
        case dateDiff <= 1:
            return level = "beginner";

        case (dateDiff > 1 && dateDiff <= 3):
            return level = "advanced";

        case dateDiff > 3:
            return level = "expert";

        default:
            return;
    }
}

const Tech = () => {
        const classes = useStyles();
        const htmlDate = moment([2016, 5, 1]);
        const reactDate = moment([2017, 2, 1]);
        const today = moment(new Date());

        let htmlDif = today.diff(datesDifference(htmlDate), 'years');
        let reactDif = today.diff(reactDate, 'years');


        return (
            <div className="tech-external">
                <div className="container tech-internal">
                    <div className="row">
                        <div className="col-12 col-md-3 mt-5 d-flex justify-content-center align-self-center">
                            <Fab color="primary"
                                 aria-label="resume"
                                 disabled={true}
                                 className={classes.personalButton}
                            >
                                {getString("skills").toUpperCase()}
                            </Fab>
                        </div>
                        <div className="col-12 col-md-9 mb-5">
                            <div className="row">
                                <div className="col-sm-6 col-lg-3 align-self-center">
                                    <SkillChart
                                        data={[
                                            {
                                                name: 'native',
                                                value: 50
                                            },
                                            {
                                                name: 'no native',
                                                value: 50
                                            }
                                        ]}
                                        value="50%"
                                    />
                                </div>
                                <div
                                    className="col-sm-6 col-lg-3 d-flex flex-column justify-content-center align-items-center">
                                    <ul className="chart-skills">
                                        <li className="tech-title">- React Native</li>
                                        <li className="tech-subtitle">{getString("beginner")},</li>
                                        <li className="tech-subtitle">6 {getString("months").toLowerCase()}</li>
                                    </ul>
                                </div>
                                <div className="col-sm-6 col-lg-3 align-self-center">
                                    <SkillChart
                                        data={[
                                            {
                                                name: 'node',
                                                value: 75
                                            },
                                            {
                                                name: 'no node',
                                                value: 25
                                            }
                                        ]}
                                        value="75%"
                                    />
                                </div>
                                <div
                                    className="col-sm-6 col-lg-3 d-flex flex-column justify-content-center align-items-center">
                                    <ul className="chart-skills">
                                        <li className="tech-title">- Node.js</li>
                                        <li className="tech-title">- Firebase</li>
                                        <li className="tech-subtitle">{getString("advanced")},</li>
                                        <li className="tech-subtitle">2 {getString("years").toLowerCase()}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 col-lg-3 align-self-center">
                                    <SkillChart
                                        data={[
                                            {
                                                name: 'react',
                                                value: 88
                                            },
                                            {
                                                name: 'no react',
                                                value: 12
                                            }
                                        ]}
                                        value="88%"
                                    />
                                </div>
                                <div
                                    className="col-sm-6 col-lg-3 d-flex flex-column justify-content-center align-items-center">
                                    <ul className="chart-skills">
                                        <li className="tech-title">- React.js</li>
                                        <li className="tech-title">- Redux</li>
                                        <li className="tech-subtitle">{getString("advanced")},</li>
                                        <li className="tech-subtitle">{datesDifference(reactDate)} {getString("years").toLowerCase()}</li>
                                    </ul>
                                </div>
                                <div className="col-sm-6 col-lg-3 align-self-center">
                                    <SkillChart
                                        data={[
                                            {
                                                name: 'html',
                                                value: 90
                                            },
                                            {
                                                name: 'no html',
                                                value: 10
                                            }
                                        ]}
                                        value="90%"
                                    />
                                </div>
                                <div
                                    className="col-sm-6 col-lg-3 d-flex flex-column justify-content-center align-items-center">
                                    <ul className="chart-skills">
                                        <li className="tech-title">- HTML</li>
                                        <li className="tech-title">- CSS 3</li>
                                        <li className="tech-title">- SCSS</li>
                                        <li className="tech-subtitle">{getString("expert")},</li>
                                        <li className="tech-subtitle">{datesDifference(htmlDif)} {getString("years").toLowerCase()}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default Tech;