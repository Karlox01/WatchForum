// FollowersModal.js
import React from "react";
import Styles from "../../styles/FollowersModal.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useProfileData } from "../../contexts/ProfileDataContext";

const FollowersModal = ({ show, handleClose, followingList }) => {
    const { pageProfile } = useProfileData();
    const profileOwner = pageProfile.results[0]?.owner || "";

    // Filter followers based on the owner's username
    const filteredFollowers = followingList
        .filter((follower) => follower.followed_name === profileOwner)
        .map((follower) => follower.owner);

    return (
        <Modal show={show} onHide={handleClose} className={Styles.followersModal}>
            <Modal.Header closeButton className={Styles.modalHeader}>
                <Modal.Title>Followers</Modal.Title>
            </Modal.Header>
            <Modal.Body className={Styles.modalBody}>
                {filteredFollowers.length > 0 ? (
                    filteredFollowers.map((follower) => (
                        <div key={follower}>{follower}</div>
                    ))
                ) : (
                    <div>No followers found.</div>
                )}
            </Modal.Body>
            <Modal.Footer className={Styles.modalFooter}>
                <Button variant="secondary" onClick={handleClose} className={Styles.btnSecondary}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FollowersModal;
