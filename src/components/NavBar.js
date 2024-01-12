import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import profile from '../assets/profile.png'

const NavBar = () => {
    return (
        <Navbar style={{ background: '#301934' }} expand="md" fixed="top">
            <Container>
                <Navbar.Brand>
                    <img src={profile} alt="profile" height="50px" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{ color: 'green' }}>
                    <Nav className="ms-auto">
                        <Nav.Link 
                        style={{ color: 'green' }}>
                            <i className="fas fa-home"></i>
                            HOME
                        </Nav.Link>
                        <Nav.Link 
                        style={{ color: 'green' }}>
                            <i className="fas fa-sign-in-alt"></i>
                            Sign in
                        </Nav.Link>
                        <Nav.Link 
                        style={{ color: 'green' }}>
                            <i className="fas fa-user-plus"></i>
                            Sign up
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar