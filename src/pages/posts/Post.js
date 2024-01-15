import React from 'react';
import styles from '../../styles/Post.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import Media from 'react-bootstrap/Media';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';
import moment from 'moment';
import ProfileList from '../ProfileList/ProfileList';

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        updated_at,
        created_at,
        postPage,
        setPosts,
        posts_count,
        user_joined_at,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post('/likes/', { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) =>
                    post.id === id ? { ...post, likes_count: post.likes_count + 1, like_id: data.id } : post
                ),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) =>
                    post.id === id ? { ...post, likes_count: post.likes_count - 1, like_id: null } : post
                ),
            }));
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <Card className={styles.Post}>
            <Row>
                <Col xs={12} md={2} className="pt-2">  
                    <Link to={`/profiles/${profile_id}`} className={styles.AvatarLink}>
                        <Avatar src={profile_image} height={100}  />
                        <div className={styles.AvatarDetails}>
                            <span>{owner}</span>
                            <p>User Joined At: {user_joined_at}</p>
                        </div>
                    </Link>
                </Col>
                <Col xs={12} md={10}>
                    <Card.Body>
                        {title && <Card.Title className={`text-center ${styles.Title}`}>{title}</Card.Title>}
                        <div className={`${styles.ContentContainer} ${styles.Content}`}>
                            {content && <Card.Text>{content}</Card.Text>}
                        </div>
                        <div className={styles.PostBar}>
                            {is_owner ? (
                                <OverlayTrigger placement="top" overlay={<Tooltip>You can't like your own post!</Tooltip>}>
                                    <i className={`far fa-heart ${styles.LikeIcon}`} />
                                </OverlayTrigger>
                            ) : like_id ? (
                                <span onClick={handleUnlike}>
                                    <i className={`fas fa-heart ${styles.Heart}`} />
                                </span>
                            ) : currentUser ? (
                                <span onClick={handleLike}>
                                    <i className={`far fa-heart ${styles.HeartOutline}`} />
                                </span>
                            ) : (
                                <OverlayTrigger placement="top" overlay={<Tooltip>Log in to like posts</Tooltip>}>
                                    <i className={`far fa-heart ${styles.LikeIcon}`} />
                                </OverlayTrigger>
                            )}
                            {likes_count}
                            <Link to={`/posts/${id}`} className={styles.LikeIcon}>
                                <i className={`far fa-comments ${styles.LikeIcon}`} />
                                {comments_count}
                            </Link>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default Post;
