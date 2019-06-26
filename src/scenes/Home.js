import React from 'react';
import './Home.scss';
import { david } from "resources";
import PersonalCard from "../components/card/PersonalCard";


const Home = () => {
    return (
        <div className="d-flex align-items-center justify-content-center mt-5 mb-5">
            <PersonalCard
                src={david}
                title="David"
            />
        </div>
    );
};

export default Home;