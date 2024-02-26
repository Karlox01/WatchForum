// FollowingModal.js
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { axiosReq } from "../../api/axiosDefaults"; // Import your custom axios instance
import { useProfileData } from "../../contexts/ProfileDataContext";
import Styles from "../../styles/FollowingModal.module.css";

const FollowingModal = ({ show, handleClose }) => {
    // Access profile data from the context
    const { pageProfile } = useProfileData();

    // Get the owner of the profile
    const profileOwner = pageProfile.results[0]?.owner || "";

    // State to store the list of filtered followers
    const [filteredFollowers, setFilteredFollowers] = useState([]);

    // Function to fetch followers recursively
    const fetchFollowers = async (url, accumulatedFollowers = []) => {
        try {
            // Make API call to get followers
            const response = await axiosReq.get(url);

            // Filter and map the followers to get the followed names
            const updatedFollowers = response.data.results
                .filter((follower) => follower.owner === profileOwner)
                .map((follower) => follower.followed_name);

            // Combine the newly fetched followers with the accumulated followers
            const newAccumulatedFollowers = [...accumulatedFollowers, ...updatedFollowers];

            // Update the state with the current list of filtered followers
            setFilteredFollowers(newAccumulatedFollowers);

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
        <Modal show={show} onHide={handleClose} className={Styles.followingModal}>
            <Modal.Header closeButton className={Styles.modalHeader}>
                <Modal.Title>Following</Modal.Title>
            </Modal.Header>
            <Modal.Body className={Styles.modalBody}>
                {filteredFollowers.length > 0 ? (
                    // Render the list of filtered followers
                    filteredFollowers.map((follower, index) => (
                        <div key={index}>{follower}</div>
                    ))
                ) : (
                    // Render message if no filtered followers found
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
