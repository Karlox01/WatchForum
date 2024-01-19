import React from 'react';
import styles from '../../styles/Post.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';
import ReactHtmlParser from 'react-html-parser';
import { useHistory, Link } from 'react-router-dom';

const Post = ({ titleOnly, setPosts, ...props }) => {
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
        posts_count,
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
            setPosts((prevPosts) => {
                const updatedResults = prevPosts.results.map((post) =>
                    post.id === id ? { ...post, likes_count: post.likes_count + 1, like_id: data.id } : post
                );

                return { ...prevPosts, results: updatedResults };
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => {
                const updatedResults = prevPosts.results.map((post) =>
                    post.id === id ? { ...post, likes_count: post.likes_count - 1, like_id: null } : post
                );

                return { ...prevPosts, results: updatedResults };
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className={styles.Post}>
            <Row>
                <Col xs={12} md={2} className="pt-2">
                    <Link to={`/profiles/${profile_id}`} className={styles.AvatarLink}>
                        <Avatar src={profile_image} height={100} />
                        <div className={styles.AvatarDetails}>
                            <span>{owner}</span>
                        </div>
                    </Link>
                </Col>
                <Col xs={12} md={10}>
                    <Card.Body>
                        {titleOnly ? (
                            <div className={styles.PostTitleLink}>
                                <Card.Title className={`text-center ${styles.Title}`}>
                                    <Link to={`/posts/${id}`} className={styles.PostLink}>
                                        {title}
                                    </Link>
                                </Card.Title>
                                <div className={styles.PostBar}>
                                    {is_owner ? (
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>You can't like your own post!</Tooltip>}
                                        >
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
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Log in to like posts</Tooltip>}
                                        >
                                            <i className={`far fa-heart ${styles.LikeIcon}`} />
                                        </OverlayTrigger>
                                    )}
                                    {likes_count}
                                    <span className={styles.LikeIcon} onClick={handleLike}>
                                        <i className={`far fa-comments ${styles.LikeIcon}`} />
                                        {comments_count}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className={styles.PostTitleLinkOnPost}>
                                    <Link to={`/posts/${id}`} className={styles.PostLinkOnPost}>
                                        <Card.Title className={`text-center ${styles.Title}`}>{title}</Card.Title>
                                    </Link>
                                    <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete}/>
                                </div>
                                <div className={`${styles.ContentContainer} ${styles.Content}`}>
                                    {content && ReactHtmlParser(content)}
                                </div>
                                <div className={styles.PostBar}>
                                    {is_owner ? (
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>You can't like your own post!</Tooltip>}
                                        >
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
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Log in to like posts</Tooltip>}
                                        >
                                            <i className={`far fa-heart ${styles.LikeIcon}`} />
                                        </OverlayTrigger>
                                    )}
                                    {likes_count}
                                    <span className={styles.LikeIcon} onClick={handleLike}>
                                        <i className={`far fa-comments ${styles.LikeIcon}`} />
                                        {comments_count}
                                    </span>
                                </div>
                            </>
                        )}
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default Post;
