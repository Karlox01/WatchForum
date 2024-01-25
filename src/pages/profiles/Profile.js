import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";


const Profile = (props) => {
    const { profile, mobile, imageSize = 75 } = props;
    const { id, following_id, image, owner, posts_count, comments_count } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const { handleFollow, handleUnfollow } = useSetProfileData();

    return (
        <div
            className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
        >
            <div>
                <Link className="align-self-center" to={`/profiles/${id}`}>
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div className={`mx-2 ${styles.WordBreak}`}>
                <strong>{owner}</strong>
                {posts_count && <p>Posts: {posts_count}</p>}
                {comments_count && <p>Comments: {comments_count}</p>}
            </div>
            <div className={`text-right ${!mobile && "ml-auto"}`}>
                {!mobile &&
                    currentUser &&
                    !is_owner &&
                    (following_id ? (
                        <Button
                            className={btnStyles.unfollowButton}
                            onClick={() => handleUnfollow(profile)}
                        >
                            <i className={`far fa-thumbs-down ${styles.iconColor}`} />
                        </Button>
                    ) : (
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