import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UsernameForm = () => {
    // State for the new username and error messages
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});

    // Accessing the router history and URL parameters
    const history = useHistory();
    const { id } = useParams();

    // Getting the current user data and a function to update it
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    // Effect to set the initial username based on the current user's data
    useEffect(() => {
        if (currentUser?.profile_id?.toString() === id) {
            setUsername(currentUser.username);
        } else {
            // Redirect to the home page if the user does not match
            history.push("/");
        }
    }, [currentUser, history, id]);

    // Function to handle form submission and update the username
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Sending a request to update the username
            await axiosRes.put("/dj-rest-auth/user/", {
                username,
            });
            // Updating the current user with the new username
            setCurrentUser((prevUser) => ({
                ...prevUser,
                username,
            }));
            // Navigating back to the previous page
            history.goBack();
        } catch (err) {
            // Handling errors and setting error messages
            setErrors(err.response?.data);
        }
    };

    return (
        <Row>
            <Col className="py-2 mx-auto text-center" md={6}>
                <Container className={appStyles.Content}>
                    <Form onSubmit={handleSubmit} className="my-2">
                        {/* Form input for changing the username */}
                        <Form.Group>
                            <Form.Label>Change username</Form.Label>
                            <Form.Control
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        {/* Displaying error messages, if any */}
                        {errors?.username?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        {/* Buttons to cancel or save the changes */}
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Blue}`}
                            onClick={() => history.goBack()}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Blue}`}
                            type="submit"
                        >
                            Save
                        </Button>
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default UsernameForm;
