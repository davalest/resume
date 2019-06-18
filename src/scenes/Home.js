import React from 'react';
import './Home.scss';
import { david } from "resources";
import PersonalCard from "../components/card/PersonalCard";


const Home = () => {
    return (
        <div className="personal-container">
            <PersonalCard
                src={david}
                title="David"
            />

        </div>
    );
};

export default Home;