import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData } from "../../contexts/ProfileDataContext";

// FollowingModal.jsx

// ...

const FollowingModal = ({ show, handleClose }) => {
    const currentUser = useCurrentUser();
    const { pageProfile } = useProfileData();

    // Extracting the followers list from the pageProfile
    const followers = pageProfile.results[0]?.followers || [];

    // Extracting the owner's username from the profiles
    const profileOwner = pageProfile.results[0]?.owner || "";

    console.log("Followers:", followers);
    console.log("Profile Owner:", profileOwner);

    // Filter followers based on the owner's username in the profiles
    const filteredFollowers = followers
        .filter((follower) => follower.owner === profileOwner)
        .map((follower) => follower.followed_name);

    console.log("Filtered Followers:", filteredFollowers);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Following</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {filteredFollowers.length > 0 ? (
                    filteredFollowers.map((follower) => (
                        <div key={follower}>{follower}</div>
                    ))
                ) : (
                    <div>No followers found.</div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FollowingModal;

