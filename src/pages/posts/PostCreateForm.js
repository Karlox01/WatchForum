import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostCreateForm() {
    const [errors, setErrors] = useState({});
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        images: [],  // Change from 'image' to 'images' as an array for multiple images
    });
    const { title, content, images } = postData;
    const imageInput = useRef(null);
    const history = useHistory();

    const handleChange = (event, value) => {
        if (event && event.target && event.target.name) {
            // Regular input change
            setPostData({
                ...postData,
                [event.target.name]: event.target.value,
            });
        } else {
            // ReactQuill editor change
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);

        // Append each image to the formData
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            history.push(`/posts/${data.id}`);
        } catch (err) {
            console.log(err);
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
                                    <figure key={index}>
                                        <Image className={appStyles.Image} src={URL.createObjectURL(image)} rounded />
                                    </figure>
                                ))}
                            </>
                        ) : (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                                onClick={openFileInput}
                            >
                                Upload Images
                            </Button>
                        )}
                        <Form.File
                            id="image-upload"
                            accept="image/*"
                            multiple={true}  // Allow multiple files to be selected
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
                            Create
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

export default PostCreateForm;
