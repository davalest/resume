import React from 'react';
import './Home.scss';
import Divider from "@material-ui/core/Divider";
import Profesional from "../components/info/Profesional";
import Schooling from "../components/info/Schooling";

const Myresume = () => {
    return (
        <div>
            <Profesional />
            <Divider style={{maxWidth:1024, margin:"auto"}}/>
            <Schooling />
        </div>
    );
};

export default Myresume;
