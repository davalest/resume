import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./scenes/Home";
import Resume from "./scenes/Resume";
import Projects from "./scenes/Projects";
import Schooling from "./scenes/Schooling";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/:lan/schooling"
                               component={Schooling}
                        />
                        <Route path="/schooling"
                               component={Schooling}
                        />
                        <Route path="/:lan/projects"
                               component={Projects}
                        />
                        <Route path="/projects"
                               component={Projects}
                        />
                        <Route path="/:lan/resume"
                               component={Resume}
                        />
                        <Route path="/resume"
                               component={Resume}
                        />
                        <Route path="/"
                               component={Home}
                        />
                    </Switch>
                    <div style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                    >
                        <Footer />
                    </div>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
