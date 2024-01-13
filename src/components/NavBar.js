import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import profile from '../assets/profile.png'
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <NavLink to="/" className={styles.centerBrand}>
                    <Navbar.Brand>
                        <img src={profile} alt="profile" height="50px" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.NavBarDropDown} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-center">
                        <NavLink 
                            exact
                            className={styles.NavLinks}
                            activeClassName={styles.Active}
                            to="/">
                            <i className="fas fa-home" style={{ marginRight: '10px' }}></i>
                            Home
                        </NavLink>
                        <NavLink 
                            to="/signin"
                            className={styles.NavLinks}
                            activeClassName={styles.Active}>
                            <i className="fas fa-sign-in-alt" style={{ marginRight: '10px' }}></i>
                            Sign IN
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className={styles.NavLinks}
                            activeClassName={styles.Active}>
                            <i className="fas fa-user-plus" style={{ marginRight: '10px' }}></i>
                            Sign UP
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar