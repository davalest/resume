import React from 'react';
import {
    Collapse, Navbar, NavbarToggler, Nav, NavItem
} from 'reactstrap';
import { getString } from 'resources';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import "./Header.css";

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.dropDownToggle = this.dropDownToggle.bind(this);
        this.state = {
            isOpen: false,
            isOpenDrop: false
        };
    }

    toggle = () => {
        if (window.innerWidth < 995)
            this.setState({
                isOpen: !this.state.isOpen
            });
    };

    dropDownToggle() {
        this.setState({
            isOpenDrop: !this.state.isOpenDrop
        });
    }


    render() {
        return (
            <div className="header-container">
                <div className="navbar-container">
                    <Navbar expand="lg" dark fixed>
                        <NavItem>
                            <NavLink className="nav-link"
                                     exact
                                     to="/"
                                     onClick={this.toggle}>
                                <span className="name-title">David Valenciano</span> <br/>
                                <span className="work-title">Web Developer</span>
                            </NavLink>
                        </NavItem>
                        <NavbarToggler onClick={this.toggle}
                                       value="button"
                                       aria-label="menu"
                        />
                        <Collapse isOpen={this.state.isOpen}
                                  navbar
                                  style={this.state.isOpen ? {
                                      backgroundColor: "#e7e5df",
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
                                    ><span
                                        className="items"
                                    >{getString("resume").toUpperCase()}</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"
                                             to="/projects"
                                             activeStyle={{ color: '#5ac4c3' }}
                                             onClick={this.toggle}
                                    ><span
                                        className="items"
                                    >{getString("project").toUpperCase()}</span></NavLink>
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
                                <NavItem><NavLink className="nav-link"
                                                  to="/contact"
                                                  activeStyle={{ color: '#5ac4c3' }}
                                                  onClick={this.toggle}
                                ><span
                                    className="items"
                                >{getString("contact").toUpperCase()}</span></NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </div>
        );
    }
}
