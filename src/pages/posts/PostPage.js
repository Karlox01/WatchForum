import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../comments/Comment";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function PostPage() {
    // Retrieve post ID from the route parameters
    const { id } = useParams();

    // State to manage the post data
    const [post, setPost] = useState({ results: [] });

    // Access current user information from the context
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;

    // State to manage the comments data
    const [comments, setComments] = useState({ results: [] });

    // Fetch post and comments data when the component mounts
    useEffect(() => {
        const handleMount = async () => {
            try {
                // Use Promise.all to fetch both post and comments concurrently
                const [
                    { data: post },
                    { data: comments }
                ] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                    axiosReq.get(`/comments/?post=${id}`)
                ]);

                // Update the state with fetched post and comments data
                setPost({ results: [post] });
                setComments(comments);
            } catch (err) {
                // Handle error, show a message to the user, etc.
            }
        };

        // Call the handleMount function when the component mounts
        handleMount();
    }, [id]);

    return (
        <Container fluid>
            {/* Render the Post component with post data */}
            <Post {...post.results[0]} setPosts={setPost} style={{ width: "100%" }} />

            <Container>
                {/* Check if there are comments to display */}
                {comments.results.length ? (
                    <InfiniteScroll
                        children={comments.results.map((comment) => (
                            // Render Comment component for each comment
                            <Comment
                                key={comment.id}
                                {...comment}
                                setPost={setPost}
                                setComments={setComments}
                            />
                        ))}
                        dataLength={comments.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!comments.next}
                        next={() => fetchMoreData(comments, setComments)}
                    />
                ) : null}

                {/* Render CommentCreateForm if there is a current user */}
                {currentUser && (
                    <CommentCreateForm
                        profile_id={currentUser.profile_id}
                        profileImage={profile_image}
                        post={id}
                        setPost={setPost}
                        setComments={setComments}
                    />
                )}

                {/* Render a message if there are no comments and no current user */}
                {!currentUser && !comments.results.length && (
                    <span>No comments yet!</span>
                )}
            </Container>
        </Container>
    );
}

export default PostPage;
