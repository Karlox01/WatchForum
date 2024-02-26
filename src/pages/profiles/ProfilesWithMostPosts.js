import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const ProfilesWithMostPosts = ({ mobile }) => {
    const [profileData, setProfileData] = useState({
        mostActiveProfiles: { results: [] },
    });
    const currentUser = useCurrentUser();
    const [activityCounts, setActivityCounts] = useState({});
    const { handleFollow, handleUnfollow } = useSetProfileData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch posts data for all profiles
                const postsData = await fetchAllPages("/posts/");


                // Initialize countsObj inside the useEffect
                const countsObj = {};

                // Update countsObj based on posts data
                postsData.forEach((post) => {
                    const userId = post.profile_id;
                    countsObj[userId] = { posts: (countsObj[userId]?.posts || 0) + 1 };
                });

                // Set activity counts
                setActivityCounts(countsObj);

                // Fetch profile data for the most active profiles
                const { data } = await axiosReq.get(`/profiles/`);
                
                // Sort profiles based on the number of posts
                const sortedProfiles = data.results.sort((a, b) => {
                    return (countsObj[b.id]?.posts || 0) - (countsObj[a.id]?.posts || 0);
                });

                // Set profile data state
                setProfileData((prevState) => ({
                    ...prevState,
                    mostActiveProfiles: { results: sortedProfiles.slice(0, 10) },
                }));
            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };

        fetchData();
    }, [currentUser, handleFollow, handleUnfollow]); // Include countsObj in the dependency array

    // Function to fetch all pages of data for a given endpoint
    const fetchAllPages = async (endpoint) => {
        let allData = [];
        let nextPage = `${endpoint}`;
        while (nextPage) {
            const response = await axiosReq.get(nextPage);
            allData = [...allData, ...response.data.results];
            nextPage = response.data.next;
        }
        return allData;
    };

    return (
        <Container className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"}`}>
            {profileData.mostActiveProfiles.results.length ? (
                <>
                    <p className="text-center">Most active users.</p>
                    {mobile ? (
                        // Display profiles in a flex container for mobile view
                        <div className="d-flex justify-content-around">
                            {profileData.mostActiveProfiles.results.map((profile) => (
                                <Profile
                                    key={profile.id}
                                    profile={{
                                        ...profile,
                                        posts_count: activityCounts[profile.id]?.posts || 0,
                                    }}
                                    mobile
                                />
                            ))}
                        </div>
                    ) : (
                        // Display profiles for larger screens, filtering out profiles with no activity
                        profileData.mostActiveProfiles.results
                            .filter(profile => activityCounts[profile.id]?.posts > 0)
                            .map((profile) => (
                                <Profile
                                    key={profile.id}
                                    profile={{
                                        ...profile,
                                        posts_count: activityCounts[profile.id]?.posts || 0,
                                    }}
                                />
                            ))
                    )}
                </>
            ) : (
                // Display a loading spinner if no data is available yet
                <Asset spinner />
            )}
        </Container>
    );
};

export default ProfilesWithMostPosts;
