// FollowersModal.js
import React, { useEffect, useState } from "react";
import Styles from "../../styles/FollowersModal.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefaults";

const FollowersModal = ({ show, handleClose }) => {
    // Access profile data from the context
    const { pageProfile } = useProfileData();

    // Get the owner of the profile
    const profileOwner = pageProfile.results[0]?.owner || "";

    // State to store the list of followers
    const [followers, setFollowers] = useState([]);

    // Function to fetch followers recursively
    const fetchFollowers = async (url, accumulatedFollowers = []) => {
        try {
            // Make API call to get followers
            const response = await axiosReq.get(url);

            // Filter and map the followers to get the owner of each follower
            const updatedFollowers = response.data.results
                .filter((follower) => follower.followed_name === profileOwner)
                .map((follower) => follower.owner);

            // Combine the newly fetched followers with the accumulated followers
            const newAccumulatedFollowers = [...accumulatedFollowers, ...updatedFollowers];

            // Update the state with the current list of followers
            setFollowers(newAccumulatedFollowers);

            // If there is a next page, recursively fetch more followers
            if (response.data.next) {
                await fetchFollowers(response.data.next, newAccumulatedFollowers);
            }
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    };

    useEffect(() => {
        // Fetch followers when the modal is shown
        if (show) {
            const initialUrl = "/followers/"; // Update the endpoint
            fetchFollowers(initialUrl);
        }
    }, [profileOwner, show]);

    return (
        <Modal show={show} onHide={handleClose} className={Styles.followersModal}>
            <Modal.Header closeButton className={Styles.modalHeader}>
                <Modal.Title>Followers</Modal.Title>
            </Modal.Header>
            <Modal.Body className={Styles.modalBody}>
                {followers.length > 0 ? (
                    // Render the list of followers
                    followers.map((follower) => (
                        <div key={follower}>{follower}</div>
                    ))
                ) : (
                    // Render message if no followers found
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
