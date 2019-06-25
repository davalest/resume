import React, { Component } from 'react';
import './Home.scss';
import Divider from "@material-ui/core/Divider";
import Tech from "../components/skills/Tech";

class Skills extends Component {
    render() {
        return (
            <div>
                <Tech/>
                <Divider style={{maxWidth:1024, margin:"auto"}}/>
            </div>
        );
    }
}

export default Skills;
