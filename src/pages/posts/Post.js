import React from 'react';
import styles from '../../styles/Post.module.css';
import ownerstyle from '../../styles/Comment.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';
import ReactHtmlParser from 'react-html-parser';
import { useHistory, Link } from 'react-router-dom';

// Function to truncate content to the first n words
const truncate = (text, wordsCount) => {
  const words = text.split(' ');
  const truncatedWords = words.slice(0, wordsCount);
  return truncatedWords.join(' ');
};

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
    images,
    updated_at,
    created_at,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  // Redirect to edit post page
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  // Delete post
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      // Handle errors if necessary
    }
  };

  // Like a post
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/likes/', { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // Handle errors if necessary
    }
  };

  // Unlike a post
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      // Handle errors if necessary
    }
  };

  // Function to truncate content to the first 10 words
  const truncatedContent = content ? truncate(content, 10) : '';

  return (
    <Card className={styles.Post}>
      <Row>
        <Col xs={12} md={2} className="pt-2">
          <Link to={`/profiles/${profile_id}`} className={styles.AvatarLink}>
            <Avatar src={profile_image} height={75} width={75} />
            <hr />
            <div className={styles.AvatarDetails}>
              <span> Topic started by</span>
              <div className={ownerstyle.Owner}>{owner}</div>
              <p>Created on :{created_at}</p>
              <p>Last updated : {updated_at}</p>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={10}>
          <Card.Body>
            {titleOnly ? (
              // Display for title only
              <div className={styles.PostTitleLink}>
                <Card.Title className={`text-center ${styles.Title}`}>
                  <Link to={`/posts/${id}`} className={styles.PostLink}>
                    {title}
                  </Link>
                </Card.Title>
                <span className={styles.TruncatedContent}>{ReactHtmlParser(truncatedContent)}</span>
                <div className={styles.PostBar}>
                  {/* Like button */}
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
                  {/* Comment count */}
                  <span className={styles.LikeIcon}>
                    <i className={`far fa-comments ${styles.LikeIcon}`} />
                    {comments_count}
                  </span>
                </div>
              </div>
            ) : (
              // Display for full post
              <>
                <div className={styles.PostTitleLinkOnPost}>
                  {/* Link to full post */}
                  <Link to={`/posts/${id}`} className={styles.PostLinkOnPost}>
                    <Card.Title className={`text-center ${styles.Title}`}>{title}</Card.Title>
                  </Link>
                  {/* More options dropdown for post owner */}
                  {is_owner && (
                    <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
                  )}
                </div>
                {/* Post content */}
                <div className={`${styles.ContentContainer} ${styles.Content}`}>
                  {content && ReactHtmlParser(content)}
                  {/* Display post images if present */}
                  {images && images.length > 0 && (
                    <div>
                      <Row>
                        {images.map((image, index) => (
                          <Col key={index} xs={12} md={6} lg={4}>
                            {/* Link to full post with image */}
                            <Link to={`/posts/${id}`} className={styles.ImageLink}>
                              <Card.Img
                                src={image.image}
                                alt={title}
                                className={`${styles.ImagePost} ${styles.PostImage}`}
                              />
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}
                </div>
                {/* Like and Comment bar */}
                <div className={styles.PostBar}>
                  {/* Like button */}
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
                  {/* Comment count */}
                  <span className={styles.LikeIcon}>
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
