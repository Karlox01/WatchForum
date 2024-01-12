import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import profile from '../assets/profile.png'
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <Navbar.Brand className={styles.centerBrand}>
                    <img src={profile} alt="profile" height="50px" />
                </Navbar.Brand >
                <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.NavBarDropDown}/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-center">
                        <Nav.Link 
                        className={styles.NavLinks}>
                            <i className="fas fa-home" style={{ marginRight: '10px'}}></i>
                            Home
                        </Nav.Link>
                        <Nav.Link 
                        className={styles.NavLinks}>
                            <i className="fas fa-sign-in-alt" style={{ marginRight: '10px'}}></i>
                            Sign IN
                        </Nav.Link>
                        <Nav.Link 
                        className={styles.NavLinks}>
                            <i className="fas fa-user-plus" style={{ marginRight: '10px'}}></i>
                            Sign UP
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar