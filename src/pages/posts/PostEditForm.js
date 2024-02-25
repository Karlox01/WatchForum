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

        // Map the images array to extract 'id' and 'image' properties
        const formattedImages = images.map((img) => ({
          id: img.id,
          image: img.image,
        }));

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
      console.log('Selected Images:', selectedImages);

      setPostData({
        ...postData,
        images: selectedImages,
      });
    }
  };

  const handleDeleteImage = async (index) => {
    try {
      const updatedImages = [...images];

      // Get the deleted image from the array
      const deletedImage = updatedImages[index];

      console.log('Before deletion - Deleted Image:', deletedImage);

      // Extract 'id' property from the deleted image
      const imageId = deletedImage.id;

      if (imageId) {
        const response = await axiosReq.delete(`/posts/${id}/delete-image/${imageId}/`);
        console.log('Delete Image Response:', response);

        if (response.status === 204) {
          console.log('Image deleted successfully');

          // Remove the deleted image from the state
          updatedImages.splice(index, 1);

          console.log("Updated Images after deletion:", updatedImages);

          setPostData((prevData) => ({
            ...prevData,
            images: updatedImages,
          }));
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } else {
        console.error("Invalid deleted image structure or missing image id");
      }
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
      if (images[i] instanceof File) {
        // If it's a File instance, append it to the formData
        formData.append('images', images[i]);
      } else {
        // If it's a string (image URL), add it as a string parameter
        formData.append('images_urls', images[i]);
      }
    }

    try {
      // Make API call to update post data
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}/`);
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
                    {image instanceof File ? (
                      <Image
                        className={appStyles.Image}
                        src={URL.createObjectURL(image)}
                        rounded
                      />
                    ) : (
                      <Image
                        className={appStyles.Image}
                        src={image.image}  // Assuming 'image' is the URL in your API response
                        rounded
                      />
                    )}
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
