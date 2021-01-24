import React, { useEffect} from 'react';
import './Home.scss';
import Divider from "@material-ui/core/Divider";
import Tech from "../components/skills/Tech";
import Knowledge from "../components/skills/Knowledge";

const Skills = () => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <div>
            <Tech/>
            <Divider style={{maxWidth: 1024, margin: "auto"}}/>
            <Knowledge/>
        </div>
    );
}

export default Skills;
