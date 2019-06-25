import React, {useState} from 'react';
import {
    Collapse, Navbar, NavbarToggler, Nav, NavItem
} from 'reactstrap';
import { getString } from 'resources';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import "./Header.scss";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        if (window.innerWidth < 770)
            setIsOpen(!isOpen);
    };
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
                                 onClick={toggle}
                        >
                            <span className="name-title">David Valenciano</span> <br />
                            <span className="work-title">Frontend Developer</span>
                        </NavLink>
                    </NavItem>
                    <NavbarToggler onClick={toggle}
                                   value="button"
                                   aria-label="menu"
                    />
                    <Collapse isOpen={isOpen}
                              navbar
                              style={isOpen ? {
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
                                         onClick={toggle}
                                >
                                    <span className="items">{getString("home").toUpperCase()}</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"
                                         to="/myresume"
                                         activeStyle={{ color: '#5ac4c3' }}
                                         onClick={toggle}
                                >
                                    <span className="items">{getString("resume").toUpperCase()}</span></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"
                                         to="/skills"
                                         activeStyle={{ color: '#5ac4c3' }}
                                         onClick={toggle}
                                >
                                    <span className="items">{getString("skills").toUpperCase()}</span></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;
