import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from "./Post";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from '../../assets/no-results.png'
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import ProfilesWithMostPosts from "../profiles/ProfilesWithMostPosts";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PostsPage({ message, filter = "" }) {
    // State to manage the posts data
    const [posts, setPosts] = useState({ results: [] });

    // State to track if the data has been loaded
    const [hasLoaded, setHasLoaded] = useState(false);

    // Get the current path from the location
    const { pathname } = useLocation();

    // Access current user information from the context
    const currentUser = useCurrentUser();

    // State to manage the search query
    const [query, setQuery] = useState("");

    // Fetch posts data when the component mounts or when filter, query, pathname, or currentUser changes
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Make API call to fetch posts based on filter and search query
                const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`)
                setPosts(data)
                setHasLoaded(true);
            } catch (err) {
                // Handle error, show a message to the user, etc.
            }
        };

        // Reset hasLoaded state and set a timer to fetch posts after a delay
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();
        }, 1000)

        // Cleanup function to clear the timer on component unmount or when dependencies change
        return () => {
            clearTimeout(timer)
        };
    }, [filter, query, pathname, currentUser]);

    return (
        <Row className="h-100">
            {/* Left Column */}
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                {/* Render the PopularProfiles component with a mobile layout */}
                <PopularProfiles mobile />

                {/* Search Bar */}
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search posts"
                    />
                </form>

                {/* Check if the data has loaded */}
                {hasLoaded ? (
                    <>
                        {/* Check if there are posts to display */}
                        {posts.results.length ? (
                            <InfiniteScroll
                                children={
                                    posts.results.map((post) => (
                                        // Render Post component for each post
                                        <Post key={post.id} titleOnly setPosts={setPosts} {...post} />
                                    ))
                                }
                                dataLength={posts.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!posts.next}
                                next={() => fetchMoreData(posts, setPosts)}
                            />
                        ) : (
                            // Render a message and NoResults image if there are no posts
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    // Render a spinner while data is loading
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>

            {/* Right Column (visible only on larger screens) */}
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                {/* Render the ProfilesWithMostPosts component */}
                <ProfilesWithMostPosts />
            </Col>
        </Row>
    );
}

export default PostsPage;
