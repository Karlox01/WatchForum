import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { axiosReq } from "../../api/axiosDefaults"; // Import your custom axios instance
import { useProfileData } from "../../contexts/ProfileDataContext";
import Styles from "../../styles/FollowingModal.module.css";

const FollowingModal = ({ show, handleClose }) => {
    const { pageProfile } = useProfileData();
    const profileOwner = pageProfile.results[0]?.owner || "";

    const [filteredFollowers, setFilteredFollowers] = useState([]);

    const fetchFollowers = async (url, accumulatedFollowers = []) => {
        try {
            const response = await axiosReq.get(url);
            const updatedFollowers = response.data.results
                .filter((follower) => follower.owner === profileOwner)
                .map((follower) => follower.followed_name);

            const newAccumulatedFollowers = [...accumulatedFollowers, ...updatedFollowers];

            setFilteredFollowers(newAccumulatedFollowers);

            if (response.data.next) {
                // If there is a next page, recursively fetch more followers
                await fetchFollowers(response.data.next, newAccumulatedFollowers);
            }
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    };

    useEffect(() => {
        if (show) {
            const initialUrl = "/followers/"; // Update the endpoint
            fetchFollowers(initialUrl);
        }
    }, [profileOwner, show]);

    return (
        <Modal show={show} onHide={handleClose} className={Styles.followingModal}>
            <Modal.Header closeButton className={Styles.modalHeader}>
                <Modal.Title>Following</Modal.Title>
            </Modal.Header>
            <Modal.Body className={Styles.modalBody}>
                {filteredFollowers.length > 0 ? (
                    filteredFollowers.map((follower, index) => (
                        <div key={index}>{follower}</div>
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

export default FollowingModal;
