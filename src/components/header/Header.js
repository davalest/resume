import React from 'react';
import {
    Collapse, Navbar, NavbarToggler, Nav, NavItem
} from 'reactstrap';
import { getString } from 'resources';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import "./Header.scss";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        if (window.innerWidth < 770)
            this.setState({
                isOpen: !this.state.isOpen
            });
    };

    render() {
        return (
            <div className="header-container">
                <div className="navbar-container">
                    <Navbar expand="lg"
                            dark
                    >
                        <NavItem style={{ listStyle: "none" }}>
                            <NavLink className="nav-link"
                                     exact
                                     to="/"
                                     onClick={this.toggle}
                            >
                                <span className="name-title">David Valenciano</span> <br />
                                <span className="work-title">Frontend Developer</span>
                            </NavLink>
                        </NavItem>
                        <NavbarToggler onClick={this.toggle}
                                       value="button"
                                       aria-label="menu"
                        />
                        <Collapse isOpen={this.state.isOpen}
                                  navbar
                                  style={this.state.isOpen ? {
                                      backgroundColor: "#E1DBDB",
                                      paddingLeft: '1rem'
                                  } : ""}
                        >
                            <Nav className="ml-auto"
                                 navbar
                            >
                                <NavItem>
                                    <NavLink className="nav-link"
                                             exact
                                             to="/"
                                             activeStyle={{ color: '#5ac4c3' }}
                                             onClick={this.toggle}
                                    >
                                        <span className="items">{getString("home").toUpperCase()}</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"
                                             to="/resume"
                                             activeStyle={{ color: '#5ac4c3' }}
                                             onClick={this.toggle}
                                    >
                                        <span className="items">{getString("resume").toUpperCase()}</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"
                                             to="/projects"
                                             activeStyle={{ color: '#5ac4c3' }}
                                             onClick={this.toggle}
                                    >
                                        <span className="items">{getString("project").toUpperCase()}</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"
                                             to="/education"
                                             activeStyle={{ color: '#5ac4c3' }}
                                             onClick={this.toggle}
                                    ><span
                                        className="items"
                                    >{getString("education").toUpperCase()}</span></NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </div>
        );
    }
}
