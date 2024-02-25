// FollowersModal.js
import React, { useEffect, useState } from "react";
import Styles from "../../styles/FollowersModal.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefaults";

const FollowersModal = ({ show, handleClose }) => {
    const { pageProfile } = useProfileData();
    const profileOwner = pageProfile.results[0]?.owner || "";

    const [followers, setFollowers] = useState([]);

    const fetchFollowers = async (url, accumulatedFollowers = []) => {
        try {
            const response = await axiosReq.get(url);
            const updatedFollowers = response.data.results
                .filter((follower) => follower.followed_name === profileOwner)
                .map((follower) => follower.owner);

            const newAccumulatedFollowers = [...accumulatedFollowers, ...updatedFollowers];

            setFollowers(newAccumulatedFollowers);

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
    }, [profileOwner, show,]);

        return (
            <Modal show={show} onHide={handleClose} className={Styles.followersModal}>
                <Modal.Header closeButton className={Styles.modalHeader}>
                    <Modal.Title>Followers</Modal.Title>
                </Modal.Header>
                <Modal.Body className={Styles.modalBody}>
                    {followers.length > 0 ? (
                        followers.map((follower) => (
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
