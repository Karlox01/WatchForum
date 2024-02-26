// src/components/MoreDropdown.js

import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import styles from "../styles/MoreDropdown.module.css"
import { useHistory } from "react-router";

// Custom component for ThreeDots icon in the Dropdown
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fas fa-regular fa-gears"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

// Component for the MoreDropdown used in various contexts
export const MoreDropdown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="right">
            {/* Custom ThreeDots icon */}
            <Dropdown.Toggle as={ThreeDots} />
            {/* Dropdown menu with edit and delete options */}
            <Dropdown.Menu className="text-center">
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit">
                    <i className="fas fa-edit" />
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <i className="fas fa-trash-alt" />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

// Component for the ProfileEditDropdown used for profile-related options
export function ProfileEditDropdown({ id }) {
    const history = useHistory();
    return (
        <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
            {/* Custom ThreeDots icon */}
            <Dropdown.Toggle as={ThreeDots} />
            {/* Dropdown menu with profile-related options */}
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                >
                    <i className="fas fa-edit" /> edit profile
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/username`)}
                    aria-label="edit-username"
                >
                    <i className="far fa-id-card" />
                    change username
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/password`)}
                    aria-label="edit-password"
                >
                    <i className="fas fa-key" />
                    change password
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
