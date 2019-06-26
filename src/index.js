import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Home from "./scenes/Home";
import Myresume from "./scenes/Myresume";
import Skills from "./scenes/Skills";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#979797",
            contrastText: "#FFFFFF"
        },
        secondary: {
            light: "#979797",
            main: "#333333",
            contrastText: "#FFFFFF"
        },
        type: "dark"
    },
    typography: {
        useNextVariants: true
    }
});

const App = () => {
    return (

        <Router>
            <MuiThemeProvider theme={theme}>
                <Header />
                <div style={{ paddingTop: 80 }}>
                    <Switch>
                        <Route path="/:lan/skills"
                               component={Skills}
                        />
                        <Route path="/skills"
                               component={Skills}
                        />
                        <Route path="/:lan/myresume"
                               component={Myresume}
                        />
                        <Route path="/myresume"
                               component={Myresume}
                        />
                        <Route path="/"
                               component={Home}
                        />
                    </Switch>
                    <Footer />
                </div>
            </MuiThemeProvider>
        </Router>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));
