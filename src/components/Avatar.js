import React from 'react';
import styles from '../styles/Avatar.module.css';

const Avatar = ({ src, height = 45, text }) => {
    return (
        <div className={styles.AvatarContainer}>
            <img
                className={styles.Avatar}
                src={src}
                height={height}
                width={height}
                alt="avatar"
            />
            <span className={styles.AvatarText}>{text}</span>
        </div>
    );
};

export default Avatar;