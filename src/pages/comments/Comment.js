// Comment.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Media } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import CommentEditForm from './CommentEditForm';
import styles from '../../styles/Comment.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    images,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {

    }
  };

  return (
    <Card className={styles.Comment}>
      <Media>
        <Media.Body className={styles.commentcontent}>
          <div className={styles.OwnerDateContainer}>
            <Link to={`/profiles/${profile_id}`} className={styles.Avatar}>
              <Avatar src={profile_image} />
            </Link>
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>Last commented {updated_at}</span>
            {is_owner && !showEditForm && (
              <div className={styles.MoreDropdownContainer}>
                <MoreDropdown handleEdit={() => setShowEditForm(true)} handleDelete={handleDelete} />
              </div>
            )}
          </div>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <>
              <p className={styles.commentbox}>{content}
                {images && images.length > 0 && (
                  <div className={styles.commentImages}>
                    {images.map((image) => (
                      <img key={image.id} src={image.image} alt={`comment-${id}-image`} className={styles.commentImage} />
                    ))}
                  </div>
                )}</p>
            </>
          )}
        </Media.Body>
      </Media>
    </Card>
  );
};

export default Comment;
