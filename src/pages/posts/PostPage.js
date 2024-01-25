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
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [
                    { data: post },
                    { data: comments }
                ] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                    axiosReq.get(`/comments/?post=${id}`)
                ]);
                setPost({ results: [post] });
                setComments(comments);
            } catch (err) {
                
            }
        };
        handleMount();
    }, [id]);

    return (
        <Container fluid>
            <Post {...post.results[0]} setPosts={setPost} style={{ width: "100%" }} />
            <Container>
                {comments.results.length ? (
                    <InfiniteScroll
                        children={comments.results.map((comment) => (
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
                {currentUser && (
                    <CommentCreateForm
                        profile_id={currentUser.profile_id}
                        profileImage={profile_image}
                        post={id}
                        setPost={setPost}
                        setComments={setComments}
                    />
                )}
                {!currentUser && !comments.results.length && (
                    <span>No comments yet!</span>
                )}
            </Container>
        </Container>
    );
}

export default PostPage;