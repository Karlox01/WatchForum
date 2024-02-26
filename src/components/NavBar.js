// src/components/NavBar.js

import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import profile from '../assets/profile.png'
import axios from 'axios';
import styles from '../styles/NavBar.module.css';
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { removeTokenTimestamp } from '../utils/utils';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { useHistory } from 'react-router-dom';

// NavBar component with navigation links
const NavBar = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    // Get the current user and set current user functions from context
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const history = useHistory();
    // State and ref for handling dropdown toggle
    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    // Handle user sign out
    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();

            history.push('/');
        } catch (err) {
            // Handle error
        }
    };

    // Icon for creating a new post
    const addPostIcon = (
        <NavLink
            to="/posts/create"
            className={styles.Post}
            activeClassName={styles.Active}>
            <i className="fas fa-plus-square" style={{ marginRight: '5px' }}></i>
            Create a new Post
        </NavLink>
    )

    // Icons for logged-in and logged-out users
    const loggedInIcons = <>
        <div className={styles.TooltipContainer}>
            <NavLink
                to="/liked"
                className={styles.NavLinks}
                activeClassName={styles.Active}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}>
                {/* Heart icon */}
                <i className="fas fa-heart" style={{ marginRight: '5px' }}></i>
                {/* Tooltip */}
                {showTooltip && <span className={styles.TooltipText}>Liked Posts</span>}
            </NavLink>
        </div>
        <NavLink
            to="/signout"
            onClick={handleSignOut}
            className={styles.NavLinks}
            activeClassName={styles.Active}>
            <i className="fas fa-sign-out-alt" style={{ marginRight: '5px' }}></i>
            SignOUT
        </NavLink>
        <NavLink className={styles.NavLinks} to={`/profiles/${currentUser?.profile_id}`}>

            <Avatar src={currentUser?.profile_image} height={35} width={35} alt="img" text={currentUser?.username} />
        </NavLink>
    </>;
    const loggedOutIcons = (
        <>
            <NavLink
                to="/signin"
                className={styles.NavLinks}
                activeClassName={styles.Active}>
                <i className="fas fa-sign-in-alt" style={{ marginRight: '5px' }}></i>
                SignIN
            </NavLink>
            <NavLink
                to="/signup"
                className={styles.NavLinks}
                activeClassName={styles.Active}>
                <i className="fas fa-user-plus" style={{ marginRight: '5px' }}></i>
                SignUP
            </NavLink>
        </>
    );

    return (
        <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
            <Container>
                {/* Navigation link to home */}
                <NavLink to="/" className={styles.centerBrand}>
                    <Navbar.Brand>
                        {/* Brand logo (commented out due to missing image) */}
                        {/* <img src={profile} alt="profile" height="50px" /> */}
                        {/* Brand name */}
                        <div className={styles.brand}> Watches By Karl</div>
                        {/* Forum text */}
                        <div className={styles.forum}>Forums</div>
                    </Navbar.Brand>
                </NavLink>
                {/* Add post icon for logged-in users */}
                {currentUser && addPostIcon}
                {/* Toggle button for responsive design */}
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    className={styles.NavBarDropDown}
                    aria-controls="basic-navbar-nav" />
                {/* Navigation links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-center">
                        <NavLink
                            exact
                            className={styles.NavLinks}
                            activeClassName={styles.Active}
                            to="/">
                            {/* Home icon */}
                            <i className="fas fa-home" style={{ marginRight: '5px' }}></i>

                        </NavLink>
                        {/* Render appropriate icons based on user authentication */}
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
