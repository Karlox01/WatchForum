import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Comment from './Comment';
import styles from '../../styles/CommentCreateEditForm.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useHistory } from 'react-router';
import { axiosRes } from '../../api/axiosDefaults';

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id, images: initialImages } = props;
  const [content, setContent] = useState("");
  const [images, setImages] = useState(initialImages || []);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("post", post);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const { data } = await axiosRes.post("/comments/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // If the API response includes 'images' field, update the comment's images
      if (data.images) {
        data.images = data.images.map((imageData) => ({
          id: imageData.id,
          image: imageData.image,
        }));
      }

      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));

      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));

      // Reset the form state after successful comment submission
      setContent("");
      setImages([]);
    } catch (err) {
      console.error(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleCancel = () => {
    // Reset the form state on cancel
    setContent("");
    setImages([]);

    // Reset the file input to clear selected images
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Implement any other action you want when cancel is clicked
    history.goBack(); // Navigates back
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={`${appStyles.Content} ${styles.Container}`}>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={8}>
            <Form.Group>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your comment..."
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.File
                id="custom-file"
                label="Choose an image (optional)"
                custom
                onChange={handleImageChange}
                multiple
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={8} className="text-center">
            <Button className={`${btnStyles.Button} ${btnStyles.Bright}`} type="submit">
              Post Comment
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Bright}`} variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default CommentCreateForm;
