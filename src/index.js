import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./scenes/Home";
import Myresume from "./scenes/Myresume";
import Skills from "./scenes/Skills";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
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
                    </div>
                    <Footer />
                </div>
            </Router>
        )
};

ReactDOM.render(<App />, document.getElementById('root'));
