import React, { Component } from 'react';
import './Home.scss';
import { david } from "resources";
import PersonalCard from "../components/card/PersonalCard";


class Home extends Component {
    render() {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            >
                <PersonalCard
                    src={david}
                    title="David"
                />

            </div>
        );
    }
}

export default Home;