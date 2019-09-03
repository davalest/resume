import React from 'react';
import Fab from "@material-ui/core/Fab";
import "./Skills.scss";
import { getString } from "resources";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: darken('#6e6e6e', 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#6e6e6e',
    },
})(LinearProgress);

const ProgressBar = (text1, text2, value) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className="title-bar-text">- {getString(text1)}
                <p className="subtitle-bar-text">{getString(text2)}</p> </span>
            <BorderLinearProgress
                variant="determinate"
                color="primary"
                value={value}
            />
        </div>
    );
};


const useStyles = makeStyles({
        root: {
            flexGrow: 1,
        },
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
            color: "#46ABB7 !important",
            "&:focus": {
                outline: 0
            }
        }
    }
);


const Knowledge = () => {
    const classes = useStyles();

    return (
        <div className="known-external">
            <div className="container known-internal">
                <div className="row">
                    <div className="col-xs-6 col-md-3 d-flex justify-content-center align-self-center">
                        <Fab color="primary"
                             aria-label="resume"
                             disabled={true}
                             className={classes.personalButton}
                        >
                            {getString("other_knowledge").toUpperCase()}
                        </Fab>
                    </div>
                    <div className="col-xs-12 col-md-9">
                        <div className="row">
                            <div className="col-12 mt-5">
                                <p className="other-subtitle">
                                    {getString("language_skills").toUpperCase()}
                                </p>
                                <div className="other-language">
                                    {ProgressBar("spanish_exp", "native", 90)}
                                    {ProgressBar("english_adv", "advanced", 70)}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12">
                                <p className="other-subtitle">
                                    {getString("other_data").toUpperCase()}
                                </p>
                            </div>
                            <div className="col-6">
                                <ul className="other-list">
                                    <li>
                                        Google Analytics
                                    </li>
                                    <li>
                                        SEO
                                    </li>
                                    <li>
                                        Grid & Layout
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="other-list">
                                    <li>
                                        {getString("cross_browser")}
                                    </li>
                                    <li>
                                        {getString("responsive_implementation")}
                                    </li>
                                    <li>
                                        {getString("team_working_skills")}
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

export default Knowledge;