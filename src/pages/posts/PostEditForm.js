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
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useParams } from "react-router";

function PostEditForm() {
    const [errors, setErrors] = useState({});
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
    });
    const { title, content, image } = postData;
    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/${id}`);
                const { title, content, image, is_owner } = data;

                is_owner ? setPostData({ title, content, image }) : history.push('/');
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [history, id]);

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

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleDeleteImage = async () => {
        try {
            // Delete the image on the server
            await axiosReq.delete(image);
            // Set image to an empty string to clear it locally
            setPostData({
                ...postData,
                image: "",
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/posts/${id}/`, formData);
            history.push(`/posts/${id}`);
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
                        {image ? (
                            <figure>
                                <Image className={appStyles.Image} src={image} rounded />
                                <Button
                                    className={`${btnStyles.Button} ${btnStyles.Bright}`}
                                    onClick={handleDeleteImage}
                                    variant="danger"
                                >
                                    {image ? 'Delete Image' : 'Cancel Deletion'}
                                </Button>
                            </figure>
                        ) : (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                                onClick={openFileInput}
                            >
                                Upload Image
                            </Button>
                        )}
                        <Form.File
                            id="image-upload"
                            accept="image/*"
                            onChange={handleChangeImage}
                            ref={imageInput}
                            className="d-none"
                        />
                        {errors?.image?.map((message, idx) => (
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
