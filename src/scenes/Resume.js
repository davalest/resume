import React from 'react';
import './Home.scss';
import Divider from "@material-ui/core/Divider";
import Profesional from "../components/info/Profesional";
import Schooling from "../components/info/Schooling";

const Resume = () => {
    return (
        <div>
            <Profesional />
            <Divider />
            <Schooling />
        </div>
    );
};

export default Resume;
