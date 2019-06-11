import React, {Component} from 'react';
import './Home.scss';
import InfoSection from "../components/info/InfoSection";

class Resume extends Component {
    render() {
        return (
            <div style={{paddignTop: 100}}>
                <InfoSection/>
            </div>
        );
    }
}

export default Resume;
