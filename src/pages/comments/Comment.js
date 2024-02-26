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
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery

// Comment Component
const Comment = (props) => {
  // Destructure props
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

  // State for controlling the visibility of the comment edit form
  const [showEditForm, setShowEditForm] = useState(false);

  // Get current user from context
  const currentUser = useCurrentUser();

  // Check if the current user is the owner of the comment
  const is_owner = currentUser?.username === owner;

  // Use media query to determine if the device is mobile
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Function to handle comment deletion
  const handleDelete = async () => {
    try {
      // Send a DELETE request to delete the comment
      await axiosRes.delete(`/comments/${id}/`);

      // Update the post comments count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      // Remove the deleted comment from the comments list
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      // Handle errors
    }
  };

  return (
    <Card className={styles.Comment}>
      <Media>
        <Media.Body className={styles.commentcontent}>
          <div className={styles.OwnerDateContainer}>
            {/* Link to the profile of the commenter */}
            <Link to={`/profiles/${profile_id}`} className={styles.Avatar}>
              <Avatar src={profile_image} height={85} width={85} isMobile={isMobile} />
            </Link>
            {/* Display owner's name */}
            <span className={styles.Owner}>{owner}</span>
            {/* Display comment's last updated date */}
            <span className={styles.Date}>Last commented {updated_at}</span>
            {/* Display MoreDropdown for comment owner */}
            {is_owner && !showEditForm && (
              <div className={styles.MoreDropdownContainer}>
                {/* MoreDropdown component for additional actions */}
                <MoreDropdown handleEdit={() => setShowEditForm(true)} handleDelete={handleDelete} />
              </div>
            )}
          </div>
          {/* Conditional rendering of CommentEditForm or comment content */}
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
              {/* Display comment content */}
              <p className={styles.commentbox}>{content}
                {/* Display comment images if any */}
                {images && images.length > 0 && (
                  <div className={styles.commentImages}>
                    {images.map((image) => (
                      <img key={image.id} src={image.image} alt={`comment-${id}`} className={styles.commentImage} />
                    ))}
                  </div>
                )}
              </p>
            </>
          )}
        </Media.Body>
      </Media>
    </Card>
  );
};

export default Comment;
