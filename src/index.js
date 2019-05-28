import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./scenes/Home";
import About from "./scenes/About";
import Skills from "./scenes/Skills";
import Experience from "./scenes/Experience";
import Education from "./scenes/Education";
import Contact from "./scenes/Contact";
import NavDrawer from "./components/menus/NavDrawer";
import { getString } from "resources";

class App extends Component {
    render() {
        return (
            <Router>
                <div style={{backgroundColor:"#ff0000"}}>
                    <NavDrawer
                        firstItem={getString("home")}
                        secondItem={getString("about")}
                        thirdItem={getString("skills")}
                        fourthItem={getString("experience")}
                        fifthItem={getString("education")}
                        sixthItem={getString("contact")}
                    />
                    <Switch>
                        <Route path="/:lan/contact"
                               component={Contact}
                        />
                        <Route path="/contact"
                               component={Contact}
                        />
                        <Route path="/:lan/education"
                               component={Education}
                        />
                        <Route path="/education"
                               component={Education}
                        />
                        <Route path="/:lan/experience"
                               component={Experience}
                        />
                        <Route path="/experience"
                               component={Experience}
                        />
                        <Route path="/:lan/skills"
                               component={Skills}
                        />
                        <Route path="/skills"
                               component={Skills}
                        />
                        <Route path="/:lan/gluquo"
                               component={About}
                        />
                        <Route path="/about"
                               component={About}
                        />
                        <Route path="/:lan/gluquo"
                               component={Home}
                        />
                        <Route path="/"
                               component={Home}
                        />
                    </Switch>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
