import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import profile from '../assets/profile.png'
import axios from 'axios';
import styles from '../styles/NavBar.module.css';
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { removeTokenTimestamp } from '../utils/utils';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();


    const { expanded, setExpanded, ref } = useClickOutsideToggle();


    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch (err) {
            console.log(err)
        }
    };

    const addPostIcon = (
        <NavLink
            to="/posts/create"
            className={styles.NavLinks}
            activeClassName={styles.Active}>
            <i className="fas fa-plus-square" style={{ marginRight: '5px' }}></i>
            Create a new Post
        </NavLink>
    )

    const loggedInIcons = <>
        <NavLink
            to="/feed"
            className={styles.NavLinks}
            activeClassName={styles.Active}>
            <i className="fas fa-stream" style={{ marginRight: '5px' }}></i>
            Forum
        </NavLink>
        <NavLink
            to="/liked"
            className={styles.NavLinks}
            activeClassName={styles.Active}>
            <i className="fas fa-heart" style={{ marginRight: '5px' }}></i>
            Liked Posts
        </NavLink>
        <NavLink
            to="/signout"
            onClick={handleSignOut}
            className={styles.NavLinks}
            activeClassName={styles.Active}>
            <i className="fas fa-sign-out-alt" style={{ marginRight: '5px' }}></i>
            Sign Out
        </NavLink>
        <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}>
            <Avatar src={currentUser?.profile_image} alt="img" text={currentUser?.username}  />
        </NavLink>
    </>;
    const loggedOutIcons = (
        <>
            <NavLink
                to="/signin"
                className={styles.NavLinks}
                activeClassName={styles.Active}>
                <i className="fas fa-sign-in-alt" style={{ marginRight: '5px' }}></i>
                Sign IN
            </NavLink>
            <NavLink
                to="/signup"
                className={styles.NavLinks}
                activeClassName={styles.Active}>
                <i className="fas fa-user-plus" style={{ marginRight: '5px' }}></i>
                Sign UP
            </NavLink>
        </>
    );


    return (
        <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <NavLink to="/" className={styles.centerBrand}>
                    <Navbar.Brand>
                        <img src={profile} alt="profile" height="50px" />
                    </Navbar.Brand>
                </NavLink>
                {currentUser && addPostIcon}
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    className={styles.NavBarDropDown}
                    aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-center">
                        <NavLink
                            exact
                            className={styles.NavLinks}
                            activeClassName={styles.Active}
                            to="/">
                            <i className="fas fa-home" style={{ marginRight: '5px' }}></i>
                            Home
                        </NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar