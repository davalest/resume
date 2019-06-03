import React, { Component } from 'react';
import './Home.css';
import Paper from '@material-ui/core/Paper';


class Home extends Component {
    render() {
        return (
            <div style={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "flex-end"
            }}
            >
                <Paper style={{
                    minHeight: 400,
                    display: "flex",
                    alignItems: "center"
                }}
                >

                </Paper>
            </div>
        );
    }
}

export default Home;