import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router";

function PostEditForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    images: [],
  });
  const { title, content, images } = postData;
  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`);
        const { title, content, images, is_owner } = data;

        // Make sure to map the images array to extract the 'image' property
        const formattedImages = images.map((img) => img.image);

        is_owner ? setPostData({ title, content, images: formattedImages }) : history.push('/');
      } catch (err) {
        // Handle error if any
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event, value) => {
    if (event && event.target && event.target.name) {
      setPostData({
        ...postData,
        [event.target.name]: event.target.value,
      });
    } else {
      setPostData({
        ...postData,
        content: value,
      });
    }
  };

  const handleChangeImages = (event) => {
    if (event.target.files.length) {
      const selectedImages = Array.from(event.target.files);
      setPostData({
        ...postData,
        images: selectedImages,
      });
    }
  };

  const handleDeleteImage = async (index) => {
    try {
      const updatedImages = [...images];
      const deletedImage = updatedImages.splice(index, 1)[0]; // Removed image
  
      console.log("Before request - Updated Images:", updatedImages);
      console.log("Deleted Image:", deletedImage);
  
      // Make a request to your server to update the post and delete the image
      await axiosReq.put(`/posts/${id}/`, { deletedImages: [deletedImage.id] });
  
      console.log("After request - Updated Images:", updatedImages);
  
      setPostData((prevData) => ({
        ...prevData,
        images: updatedImages,
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
      // Handle error, show a message to the user, etc.
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    // Append each image to the formData
    for (let i = 0; i < images.length; i++) {
      formData.append(`image_${i}`, images[i]);
    }

    try {
      // Make API call to update post data
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const openFileInput = () => {
    imageInput.current.click();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={`${appStyles.Content} ${styles.Container}`}>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={8}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <ReactQuill
                className={appStyles.quill}
                value={content}
                onChange={(value) => handleChange(null, value)}
                modules={{
                  toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'color': [] }, { 'background': [] }],
                    ['link', 'image', 'video'],
                    ['clean'],
                  ],
                  clipboard: {
                    matchVisual: false,
                  },
                }}
                formats={null}
              />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={8} className="text-center">
            {images.length > 0 ? (
              <>
                {images.map((image, index) => (
                  <div key={index} className={styles.CurrentImageContainer}>
                    <Image
                      className={appStyles.Image}
                      src={image}  // Assuming 'image' is the URL in your API response
                      rounded
                    />
                    <Button
                      className={`${btnStyles.Button} ${btnStyles.Danger}`}
                      onClick={() => handleDeleteImage(index)}
                    >
                      Delete Image
                    </Button>
                  </div>
                ))}
              </>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                onClick={openFileInput}
              >
                Add More Images
              </Button>
            )}
            <Form.File
              id="image-upload"
              accept="image/*"
              multiple={true}
              onChange={handleChangeImages}
              ref={imageInput}
              className="d-none"
            />
            {errors?.images?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={8} className="text-center">
            <Button
              className={`${btnStyles.Button} ${btnStyles.Bright}`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Bright}`}
              type="submit"
            >
              Edit and Save
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default PostEditForm;
