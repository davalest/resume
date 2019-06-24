import React from 'react';
import "./PersonalCard.scss";
import Avatar from "react-avatar";
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { getString } from "resources";


const useStyles = makeStyles({
        personalButton: {
            height: 150,
            width: 150,
            fontSize: 20,
            marginLeft: 30,
            marginTop: 30,
            backgroundColor: "#5ac4c3",
            "&:focus": {
                outline: 0
            }
        }
    }
);


const PersonalCard = (props) => {
    const classes = useStyles();
    return (
        <div className="personal-internal">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-5 d-flex justify-content-center">
                        <Avatar name={props.title}
                                size={380}
                                src={props.src}
                                alt={props.title}
                                round={true}
                        />
                    </div>
                    <div className="col-sm-12 col-md-7 mt-sm-4">
                        <div className="personal-text">
                            <p>{getString("who_am_i")}</p>
                            <p>{getString("where_ive_work")}</p>
                            <p>{getString("how_am_i")}</p>
                            <p>{getString("work_with_me")}</p>
                            <div>
                                <Fab color="primary"
                                     aria-label="resume"
                                     className={classes.personalButton}
                                >
                                    {getString("resume")}
                                </Fab>
                                <Fab color="primary"
                                     aria-label="projects"
                                     className={classes.personalButton}
                                >
                                    {getString("projects")}
                                </Fab>
                                <Fab color="primary"
                                     aria-label="schooling"
                                     className={classes.personalButton}
                                >
                                    {getString("education")}
                                </Fab>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalCard;