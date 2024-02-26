import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import FollowingModal from "./FollowingModal";
import FollowersModal from "./FollowersModal";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({ results: [] });
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [showFollowersModal, setShowFollowersModal] = useState(false);
    const [followers, setFollowers] = useState([]);

    const currentUser = useCurrentUser();
    const { id } = useParams();

    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user profile, user posts, and user followers
                const [{ data: pageProfile }, { data: profilePosts }, { data: followersData }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/posts/?owner__profile=${id}`),
                        axiosReq.get(`/followers/?owner=${id}`),
                    ]);

                // Update profile data in context
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));

                // Set fetched data
                setProfilePosts(profilePosts);
                setFollowers(followersData.results);

                // Set hasLoaded to true after data fetching is complete
                setHasLoaded(true);
            } catch (err) {
                // Handle errors during data fetching
            }
        };

        // Fetch data on component mount
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            {/* User Profile Information */}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>

                <Col lg={6}>
                    <h3 className="m-2 p-2">{profile?.owner}</h3>
                    <div className="mb-2">User's full name: {profile?.name}</div>

                    {/* Display profile edit dropdown for the owner */}
                    {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}

                    {/* User stats (posts, followers, following) */}
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div>{profile?.posts_count}</div>
                            <div>posts</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <Button
                                variant="link"
                                className="text-decoration-none p-0"
                                onClick={() => {
                                    setShowFollowersModal(true);
                                }}
                            >
                                <div>{profile?.followers_count}</div>
                                <div>followers</div>
                            </Button>
                        </Col>
                        <Col xs={3} className="my-2">
                            <Button
                                variant="link"
                                className="text-decoration-none p-0"
                                onClick={() => setShowFollowingModal(true)}
                            >
                                <div>{profile?.following_count}</div>
                                <div>following</div>
                            </Button>
                        </Col>
                    </Row>
                </Col>

                {/* Follow/Unfollow Button (not shown for the owner) */}
                {!profile?.is_owner && (
                    <Col lg={3} className="text-lg-right p-5">
                        {currentUser &&
                            (profile?.following_id ? (
                                <Button
                                    className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                                    onClick={() => handleUnfollow(profile)}
                                >
                                    unfollow
                                </Button>
                            ) : (
                                <Button
                                    className={`${btnStyles.Button} ${btnStyles.Black}`}
                                    onClick={() => handleFollow(profile)}
                                >
                                    follow
                                </Button>
                            ))}
                    </Col>
                )}
            </Row>

            {/* Display user's bio content */}
            {profile?.content && <Col className="p-3">{profile.content}</Col>}
        </>
    );

    const mainProfilePosts = (
        <>
            {/* Display user's posts */}
            <hr />
            <p className="text-center">{profile?.name}'s posts</p>
            <hr />

            {/* Display user's posts or a message if no posts are found */}
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setProfilePosts} />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <Asset
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted yet.`}
                />
            )}
        </>
    );

    return (
        <Row>
            {/* Popular Profiles Section (hidden on mobile) */}
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>

            {/* Main Profile Section */}
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Container className={appStyles.Content}>
                    {/* Display main profile information and posts */}
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfilePosts}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>

            {/* Popular Profiles Section (shown on mobile) */}
            <PopularProfiles mobile />

            {/* Following Modal */}
            <FollowingModal
                show={showFollowingModal}
                handleClose={() => setShowFollowingModal(false)}
                followingList={followers}
            />

            {/* Followers Modal */}
            <FollowersModal
                show={showFollowersModal}
                handleClose={() => setShowFollowersModal(false)}
                followingList={followers}
            />
        </Row>
    );
}

export default ProfilePage;
