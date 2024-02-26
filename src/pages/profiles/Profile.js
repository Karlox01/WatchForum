import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
    // Destructure props to get required values
    const { profile, mobile, imageSize = 85 } = props;
    const { id, following_id, image, owner, posts_count, comments_count, followers_count } = profile;

    // Access current user data from context
    const currentUser = useCurrentUser();
    // Check if the current user is the owner of the profile
    const is_owner = currentUser?.username === owner;

    // Access functions to handle follow and unfollow actions
    const { handleFollow, handleUnfollow } = useSetProfileData();

    return (
        <div
            className={`my-3 d-flex align-items-center ${mobile && "flex-column"} ${styles.margin}`}
            style={{ marginTop: "40px" }}
        >
            <div>
                {/* Link to the profile page */}
                <Link className="align-self-center" to={`/profiles/${id}`}>
                    {/* Render the profile image */}
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div className={styles.WordBreak}>
                {/* Display profile owner's username */}
                <span className={styles.ownerofPost}>{owner}</span>
                {/* Display posts count */}
                {posts_count !== undefined ? <p>Posts: {posts_count}</p> : <p>Posts: 0</p>}
                {/* Display comments count */}
                {comments_count !== undefined ? <p>Comments: {comments_count}</p> : <p>Comments: 0</p>}
                {/* Display followers count */}
                {followers_count !== undefined ? <p>Followers: {followers_count}</p> : <p> Followers: 0</p>}
            </div>
            <div className={styles.buttons}>
                {/* Render follow/unfollow button based on conditions */}
                {!mobile &&
                    currentUser &&
                    !is_owner &&
                    (following_id ? (
                        // Render unfollow button if already following
                        <Button
                            className={btnStyles.unfollowButton}
                            onClick={() => handleUnfollow(profile)}
                        >
                            <i className='far fa-thumbs-down' />
                        </Button>
                    ) : (
                        // Render follow button if not following
                        <Button
                            className={btnStyles.followButton}
                            onClick={() => handleFollow(profile)}
                        >
                            <i className={`far fa-thumbs-up ${styles.iconColor}`} />
                        </Button>
                    ))}
            </div>
        </div>
    );
};

export default Profile;
