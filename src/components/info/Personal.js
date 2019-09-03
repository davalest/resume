import React from 'react';
import Fab from "@material-ui/core/Fab";
import { makeStyles } from '@material-ui/core/styles';
import "./Info.scss";
import { getString } from "resources";
import Divider from "@material-ui/core/Divider";


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


const Tuple = (title, text) => {
    return (
        <div className="col-12">
            <p>{getString(title)}: {getString(text)}</p>
            <Divider /><br />
        </div>
    );
};


const Personal = () => {
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
                            {getString("about").toUpperCase()}
                        </Fab>
                    </div>
                    <div className="col-9">
                        <div className="row mt-5">
                            {Tuple("name_title", "name_text")}
                            {Tuple("email_title", "email_text")}
                            {Tuple("phone_title", "phone_text")}
                            {Tuple("birthdate_title", "birthdate_text")}
                            {Tuple("address_title", "address_text")}
                            {Tuple("nationality_title", "nationality_text")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Personal;