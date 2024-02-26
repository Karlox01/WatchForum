// src/components/Avatar.js

import React from 'react';
import styles from '../styles/Avatar.module.css';

// Avatar component for displaying user avatars with optional text
const Avatar = ({ src, height, text, isMobile }) => {
    // Adjust avatar dimensions based on mobile or specified height
    const avatarHeight = isMobile ? 65 : height;
    const avatarWidth = isMobile ? 65 : height;

    return (
        <div className={styles.AvatarContainer}>
            {/* Display the avatar image */}
            <img
                className={styles.Avatar}
                src={src}
                height={avatarHeight}
                width={avatarWidth}
                alt="avatar"
            />
            {/* Display optional text associated with the avatar */}
            <span className={styles.AvatarText}>{text}</span>
        </div>
    );
};

export default Avatar;  // Export the Avatar component
