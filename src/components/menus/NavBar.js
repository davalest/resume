import React from "react";
import { Nav, NavItem } from "reactstrap";
import "./NavBar.css";

class NavBar extends React.Component {
    render() {
        return (
            <div style={{height: "100vh"}}>
                <Nav
                    style={{
                        backgroundColor: "#000000",
                        position: "fixed",
                        display: "flex",
                        alignItems: "center"
                    }}
                    bsStyle="tabs"
                    stacked
                    pullLeft
                >
                    <div className="flex-container"
                         style={{ textAlign: "left" }}
                    >
                        <NavItem eventKey={0}
                                 href="/home"
                                 className="items"
                        >
                            <i className="fa fa-home" />&nbsp;&nbsp; {this.props.firstItem}
                        </NavItem>
                        <NavItem eventKey={1}
                                 href="/about"
                                 title="/about"
                                 className="items"
                        >
                            <i className="fa fa-user" /> &nbsp;&nbsp;{this.props.secondItem}
                        </NavItem>
                        <NavItem eventKey={2}
                                 href="/skills"
                                 title="/skills"
                                 className="items"
                        >
                            <i className="fa fa-percent" /> &nbsp;&nbsp;{this.props.thirdItem}
                        </NavItem>
                        <NavItem eventKey={3}
                                 href="/experience"
                                 title="/experience"
                                 className="items"
                        >
                            <i className="fas fa-briefcase" />&nbsp;&nbsp; {this.props.fourthItem}
                        </NavItem>
                        <NavItem eventKey={4}
                                 href="/education"
                                 title="/education"
                                 className="items"
                        >
                            <i className="fa fa-graduation-cap" />&nbsp;&nbsp; {this.props.fifthItem}
                        </NavItem>
                        <NavItem eventKey={5}
                                 href="/contact"
                                 title="/contact"
                                 className="items"
                        >
                            <i className="fa fa-envelope" />&nbsp;&nbsp; {this.props.sixthItem}
                        </NavItem>
                    </div>
                </Nav>
            </div>
        );
    }
}

export default NavBar;