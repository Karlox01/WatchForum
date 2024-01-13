import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";


const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: ''
    })
    const { username, password1, password2 } = signUpData;


    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData);
            history.push("/signin");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };
    return (
        <Row className={styles.Row}>
            <Col className={`my-auto py-2 p-md-2 ${appStyles.Content}`} md={6}>
                <Container className={`${appStyles.Content} p-4 text-center`}>
                    <h1 className={`${styles.Header} ${appStyles.NavLinks}`}>Sign Up</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username" className={`${styles.FormGroup}`}>
                            <Form.Label>- USERNAME -</Form.Label>
                            <Form.Control
                                className={`${styles.Input} bg-transparent`}
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="password1" className={`${styles.FormGroup}`}>
                            <Form.Label>- Password -</Form.Label>
                            <Form.Control
                                className={`${styles.Input} bg-transparent`}
                                type="password"
                                placeholder="Type in your new password"
                                name="password1"
                                value={password1}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password1?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group controlId="password2" className={`${styles.FormGroup}`}>
                            <Form.Label>- Confirm Password -</Form.Label>
                            <Form.Control
                                className={`${styles.Input} bg-transparent`}
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                value={password2}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password2?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Text className="text-muted">
                            Disclaimer : Never share your password with anyone!, Use a memorable but non generic username.
                        </Form.Text>
                        <Button
                            className={`${btnStyles.Button} ${styles.Wide} ${btnStyles.Bright} mt-3`}
                            variant="primary"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning" className="mt-3">
                                {message}
                            </Alert>
                        ))}
                    </Form>

                </Container>
                <Container className={`mt-3 ${appStyles.Content}`}>
                    <Link className={`${styles.Link} ${appStyles.NavLinks}`} to="/signin">
                        Already have an account? <span>Sign in</span>
                    </Link>
                </Container>
            </Col>
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={
                        "https://watches4u.pl/modules/themeconfigurator/img/68088bb83167b1de2bfa6e98df36c9814f6a08b0_men.jpg"
                    }
                />
            </Col>
        </Row>
    );
};

export default SignUpForm;
