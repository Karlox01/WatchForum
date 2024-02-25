import React from 'react';
import styles from '../styles/Avatar.module.css';

const Avatar = ({ src, height, text, isMobile }) => {
    const avatarHeight = isMobile ? 65 : height;
    const avatarWidth = isMobile ? 65 : height;

    return (
        <div className={styles.AvatarContainer}>
            <img
                className={styles.Avatar}
                src={src}
                height={avatarHeight}
                width={avatarWidth}
                alt="avatar"
            />
            <span className={styles.AvatarText}>{text}</span>
        </div>
    );
};

export default Avatar;