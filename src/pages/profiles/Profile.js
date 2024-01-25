import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";


const Profile = (props) => {
    const { profile, mobile, imageSize = 85 } = props;
    const { id, following_id, image, owner, posts_count, comments_count, followers_count } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const { handleFollow, handleUnfollow } = useSetProfileData();

    return (
        <div
            className={`my-3 d-flex align-items-center ${mobile && "flex-column"} ${styles.margin}`}
            style={{ marginTop: "40px" }}q
        >
            <div>
                <Link className="align-self-center" to={`/profiles/${id}`}>
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div className={styles.WordBreak}>
                <span className={styles.ownerofPost}>{owner}</span>
                {posts_count !== undefined ? <p>Posts: {posts_count}</p> : <p>Posts: 0</p>}
                {comments_count !== undefined ? <p>Comments: {comments_count}</p> : <p>Comments: 0</p>}
                {followers_count !== undefined ? <p>Followers: {followers_count}</p> : <p> Followers: 0</p>}
            </div>
            <div className={`text-right m-10 ${!mobile && "m-4"}`}>
                {!mobile &&
                    currentUser &&
                    
                    !is_owner &&
                    (following_id ? (
                        <Button
                            className={btnStyles.unfollowButton}
                            onClick={() => handleUnfollow(profile)}
                        >
                            <i className='far fa-thumbs-down' />
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