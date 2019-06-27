import React from 'react';
import "./PersonalCard.scss";
import Avatar from "react-avatar";
import { getString } from "resources";


const PersonalCard = (props) => {
    return (
        <div className="personal-internal">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-5 d-flex justify-content-center personal-avatar">
                        <Avatar name={props.title}
                                size={300}
                                src={props.src}
                                alt={props.title}
                                round={true}
                        />
                    </div>
                    <div className="col-sm-12 col-md-7 mt-sm-4 d-flex align-items-center justify-content-center">
                        <div className="personal-text">
                            <p>{getString("who_am_i")}</p>
                            <p>{getString("where_ive_work")}</p>
                            <p>{getString("how_am_i")}</p>
                            <p>{getString("work_with_me")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalCard;