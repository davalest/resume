import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./scenes/Home";
import Resume from "./scenes/Resume";
import Skills from "./scenes/Skills";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <div style={{paddingTop: 80}}>
                        <Switch>
                            <Route path="/:lan/skills"
                                   component={Skills}
                            />
                            <Route path="/skills"
                                   component={Skills}
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
                    </div>
                    <Footer />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
