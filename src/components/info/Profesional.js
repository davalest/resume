import React from 'react';
import Fab from "@material-ui/core/Fab";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import "./Info.scss";
import { getString, resume } from "resources";


const useStyles = makeStyles({
        downloadButton: {
            position: "fixed",
            bottom: 30,
            right: 30,
            borderRadius: "50%",
            backgroundColor: "#252525",
            color: "#6cb04a",
            height: 80,
            width: 80,
            zIndex: 998,
            "&:focus": {
                outline: 0
            }
        },
        downloadIcon: {
            fontSize: 30
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


const Profesional = () => {
    const classes = useStyles();
    return (
        <div className="info-external">
            <div className="container info-internal">
                <Tooltip title={<p className="download-text">{getString("download_resume")}</p>}>
                    <Fab
                        variant="extended"
                        href={resume}
                        download
                        aria-label={getString("download_resume")}
                        className={classes.downloadButton}
                    >
                        <CloudDownloadIcon className={classes.downloadIcon} />
                    </Fab>
                </Tooltip>
                <div className="row">
                    <div className="col-xs-12 col-md-3 d-flex justify-content-center align-self-center">
                        <div>
                            <Fab color="primary"
                                 aria-label="resume"
                                 disabled={true}
                                 className={classes.personalButton}
                            >
                                {getString("work_experience").toUpperCase()}
                            </Fab>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-9">
                        <div className="row resume-line">
                            <div className="col-12 mt-5 mt-md-0 col-md-3">
                                <p className="info-dates">{getString("feb_actual")}</p>
                            </div>
                            <div className="col-12 col-md-9">
                                    <span className="info-company">QUO Health SL </span>
                                    <span className="info-job">Front-end Developer </span>
                                    <span className="info-projects">{getString("developed_projects")} </span>
                                    <ul>
                                        <li className="info-app">
                                            gluQUO Diabetes Academy -> {getString("web_app_dev")}
                                            <p className="info-tech">{getString("used_tech")} HTML 5,
                                                                                              SCSS,
                                                                                              Bootstrap,
                                                                                              React.js,
                                                                                              Firebase. </p>
                                        </li>
                                        <li className="info-app">
                                            O.K Transport -> {getString("web_app_dev")}
                                            <p className="info-tech">{getString("used_tech")} HTML 5, SCSS,
                                                                                              Bootstrap,
                                                                                              React.js,
                                                                                              Moment.js,
                                                                                              Node.js,
                                                                                              MongoDB,
                                                                                              LoopBack. </p>
                                        </li>
                                        <li className="info-app">
                                            gluQUO PRO -> {getString("web_app_dev")}
                                            <p className="info-tech">{getString("used_tech")} HTML 5,
                                                                                              SCSS,
                                                                                              Bootstrap,
                                                                                              React.js,
                                                                                              Moment.js,
                                                                                              Node.js,
                                                                                              Firebase. </p>
                                        </li>
                                        <li className="info-app">
                                            Optima CC -> {getString("website_development")}
                                            <p className="info-tech">{getString("used_tech")}
                                                HTML 5, CSS 3, Bootstrap, React.js,
                                                Node.js</p>
                                        </li>
                                        <li className="info-app">
                                            gluQUO -> {getString("website_development")}
                                            <p className="info-tech">{getString("used_tech")} HTML 5, CSS
                                                                                              3,
                                                                                              Bootstrap,
                                                                                              React.js,
                                                                                              Node.js.</p>
                                        </li>
                                        <li className="info-app">
                                            QUO Health -> {getString("design_website_development")}
                                            <p className="info-tech">{getString("used_tech")} HTML 5, CSS
                                                                                              3,
                                                                                              Bootstrap,
                                                                                              JQuery.</p>
                                        </li>
                                    </ul>
                            </div>
                        </div>
                        <div className="row resume-line">
                            <div className="col-12 mt-5 mt-md-0 col-md-3">
                                <p className="info-dates">2016</p>
                            </div>
                            <div className="col-12 col-md-9">
                                    <span className="info-company">Freelance</span>
                                    <span className="info-job"> Front-end Developer </span>
                                    <span className="info-projects">{getString("developed_projects")} </span>
                                    <ul>
                                        <li className="info-app">
                                            MarVal -> {getString("design_website_development")}
                                            <p className="info-tech">{getString("used_tech")} HTML 5, CSS 3,
                                                                                              Bootstrap, JQuery. </p>
                                        </li>
                                        <li className="info-app">
                                            La Parada -> {getString("design_website_development")}
                                            <p className="info-tech">{getString("used_tech")} HTML 5, CSS
                                                                                              3, Bootstrap, JQuery. </p>
                                        </li>
                                    </ul>
                            </div>
                        </div>
                        <div className="row resume-line">
                            <div className="col-12 mt-5 mt-md-0 col-md-3">
                                <p className="info-dates">Septiembre 2015 – Julio 2016</p>
                            </div>
                            <div className="col-12 col-md-9">
                                    <span className="info-company">Hospitales HM (Montepríncipe)</span>
                                    <span className="info-job"> IT CAU </span>
                                    <span className="info-projects">{getString("developed_tasks")} </span>
                                    <ul>
                                        <li>
                                            <p className="info-tech">Mantenimiento y gestión de incidencias. </p>
                                        </li>
                                        <li>
                                            <p className="info-tech">Desarrollo e implementación de
                                                                     infraestructura. </p>
                                        </li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profesional;