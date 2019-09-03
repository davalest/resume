import React from 'react';
import Fab from "@material-ui/core/Fab";
import { makeStyles } from '@material-ui/core/styles';
import "./Info.scss";
import { getString } from "resources";


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
            color: "#FF0100 !important",
            "&:focus": {
                outline: 0
            }
        }
    }
);


const Schooling = () => {
    const classes = useStyles();
    return (
        <div className="info-external">
            <div className="container info-internal">
                <div className="row">
                    <div className="col-xs-6 col-md-3 d-flex justify-content-center align-self-center">
                        <Fab color="primary"
                             aria-label="resume"
                             disabled={true}
                             className={classes.personalButton}
                        >
                            {getString("education").toUpperCase()}
                        </Fab>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-12 mt-5 mt-md-0 col-md-3">
                                <p className="schooling-dates">{getString("now")}</p>
                            </div>
                            <div className="col-12 col-md-9">
                                <p className="info-job">Técnico Superior de Desarrollo de Aplicaciones Web</p>
                                <p>- Ilerna, Online</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-5 mt-md-0 col-md-3">
                                <p className="schooling-dates">2017</p>
                            </div>
                            <div className="col-12 col-md-9">
                                <p className="info-job">Técnico Superior de Administración de Sistemas
                                                            Informáticos y Redes</p>
                                <p>- IES Lázaro Cárdenas, Collado Villalba.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-5 mt-md-0 col-md-3">
                                <p className="schooling-dates">2015</p>
                            </div>
                            <div className="col-12 col-md-9">
                                <p className="info-job">Técnico de Sistemas Microinformáticos y Redes</p>
                                <p>- IES Infanta Elena, Galapagar.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schooling;