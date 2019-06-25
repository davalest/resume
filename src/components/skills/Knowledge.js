import React from 'react';
import Fab from "@material-ui/core/Fab";
import "./Skills.scss";
import { getString } from "resources";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('#0088FE', 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#0088FE',
    },
})(LinearProgress);

const ProgressBar = (text) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <p>{text}</p>
            <BorderLinearProgress
                variant="determinate"
                color="primary"
                value={50}
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
            height: 150,
            width: 150,
            fontSize: 18,
            color: "#5ac4c3 !important",
            "&:focus": {
                outline: 0
            }
        }
    }
);


const Knowledge = () => {
    const classes = useStyles();

    return (
        <div className="tech-external">
            <div className="container tech-internal">
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
                    <div className="col-9">
                        <p>
                            {getString("languages").toUpperCase()}
                        </p>
                        {ProgressBar("Castellano")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Knowledge;