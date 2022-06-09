import React, {useEffect} from 'react';
import './Home.css';
import Divider from "@material-ui/core/Divider";
import Profesional from "../components/info/Profesional";
import Schooling from "../components/info/Schooling";

const Myresume = () => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <div>
            <Profesional />
            <Divider style={{maxWidth:1024, margin:"auto"}}/>
            <Schooling />
        </div>
    );
};

export default Myresume;
