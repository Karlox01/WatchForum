import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentEditForm(props) {
    // Destructure props
    const { id, content, setShowEditForm, setComments } = props;

    // State variable for the edited content of the comment
    const [formContent, setFormContent] = useState(content);

    // Event handler for changes in the comment content
    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    // Event handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send a PUT request to update the comment content
            await axiosRes.put(`/comments/${id}/`, {
                content: formContent.trim(),
            });

            // Update the comments list with the edited comment
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                            ...comment,
                            content: formContent.trim(),
                            updated_at: "now",
                        }
                        : comment;
                }),
            }));

            // Close the edit form
            setShowEditForm(false);
        } catch (err) {
            // Handle errors if necessary
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* Textarea for editing comment content */}
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div className="text-right">
                {/* Cancel button */}
                <button
                    className={styles.Button}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    cancel
                </button>
                {/* Save button */}
                <button
                    className={styles.Button}
                    disabled={!content.trim()} // Disable save button if content is empty
                    type="submit"
                >
                    save
                </button>
            </div>
        </Form>
    );
}

export default CommentEditForm;
