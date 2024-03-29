// src/pages/auth/SignInForm.js

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

// Component for the Sign In form
const SignInForm = () => {
    const setCurrentUser = useSetCurrentUser();
    const currentUser = useCurrentUser();

    // Use the redirect hook conditionally
    useRedirect(currentUser ? "loggedIn" : null);

    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInData;

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const history = useHistory();

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Attempt to log in
            const { data } = await axios.post("/dj-rest-auth/login/", signInData);

            // Update current user and token timestamp
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            history.goBack();
        } catch (err) {
            // Handle login errors
            setErrors(err.response?.data);
        }
    };

    // Handle form input changes
    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Row className={styles.Row}>
            <Col className={`my-auto py-2 p-md-2 ${appStyles.Content}`} md={6}>
                <Container className={`${appStyles.Content} p-4 text-center`}>
                    <h1 className={`${styles.Header} ${appStyles.NavLinks}`}>Sign In</h1>

                    <Form onSubmit={handleSubmit}>
                        {/* Username Input */}
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
                        {/* Display username errors, if any */}
                        {errors.username?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}

                        {/* Password Input */}
                        <Form.Group controlId="password" className={`${styles.FormGroup}`}>
                            <Form.Label>- Password -</Form.Label>
                            <Form.Control
                                className={`${styles.Input} bg-transparent`}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {/* Display password errors, if any */}
                        {errors.password?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        {/* Checkbox to show/hide password */}
                        <Form.Group controlId="showPassword" className={`${styles.FormGroup} text-center`}>
                            <Form.Check
                                type="checkbox"
                                label="Show Password"
                                onChange={() => setShowPassword(!showPassword)}
                                className="d-inline-block"
                            />
                        </Form.Group>

                        {/* Sign In Button */}
                        <Button
                            className={`${btnStyles.Button} ${styles.Wide} ${btnStyles.Bright} mt-3`}
                            variant="primary"
                            type="submit"
                        >
                            Sign In
                        </Button>
                        {/* Display non-field errors, if any */}
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning" className="mt-3">
                                {message}
                            </Alert>
                        ))}
                    </Form>
                </Container>
                {/* Link to Sign Up page */}
                <Container className={`mt-3 ${appStyles.Content}`}>
                    <Link className={`${styles.Link} ${appStyles.NavLinks}`} to="/signup">
                        Don't have an account? <span>Sign up now!</span>
                    </Link>
                </Container>
            </Col>
            {/* Image Section */}
            <Col md={6} className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}>
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

export default SignInForm;
