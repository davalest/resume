import React, {useEffect} from 'react';
import './Home.scss';
import {david} from "resources";
import Divider from "@material-ui/core/Divider";
import PersonalCard from "../components/card/PersonalCard";
import Personal from "../components/info/Personal";


const Home = () => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <div className="container">
            <div className="row">
                <div className="d-flex align-items-center justify-content-center mt-5 mb-5">
                    <PersonalCard
                        src={david}
                        title="David"
                    />
                </div>
            </div>
            <Divider style={{
                maxWidth: 1024,
                margin: "auto"
            }}
            />
            <div className="row">
                <Personal/>
            </div>
        </div>
    );
};

export default Home;