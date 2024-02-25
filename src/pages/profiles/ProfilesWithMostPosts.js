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
                const postsData = await fetchAllPages("/posts/");
                const commentsData = await fetchAllPages("/comments/");

                // Initialize countsObj inside the useEffect
                const countsObj = {};

                postsData.forEach((post) => {
                    const userId = post.profile_id;
                    countsObj[userId] = { posts: (countsObj[userId]?.posts || 0) + 1, comments: countsObj[userId]?.comments || 0 };
                });

                commentsData.forEach((comment) => {
                    const userId = comment.profile_id;
                    countsObj[userId] = { posts: countsObj[userId]?.posts || 0, comments: (countsObj[userId]?.comments || 0) + 1 };
                });

                setActivityCounts(countsObj);

                const sortedProfiles = Object.keys(countsObj).sort((a, b) =>
                    countsObj[b].posts + countsObj[b].comments - (countsObj[a].posts + countsObj[a].comments)
                );

                const { data } = await axiosReq.get(`/profiles/?id__in=${sortedProfiles.join(",")}`);

                setProfileData((prevState) => ({
                    ...prevState,
                    mostActiveProfiles: { results: data?.results?.slice(0, 10) || [] },
                }));
            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };

        fetchData();
    }, [currentUser, handleFollow, handleUnfollow]); // Include countsObj in the dependency array

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
                        <div className="d-flex justify-content-around">
                            {profileData.mostActiveProfiles.results.map((profile) => (
                                <Profile
                                    key={profile.id}
                                    profile={{
                                        ...profile,
                                        posts_count: activityCounts[profile.id]?.posts || 0,
                                        comments_count: activityCounts[profile.id]?.comments || 0,
                                    }}
                                    mobile
                                />
                            ))}
                        </div>
                    ) : (
                        profileData.mostActiveProfiles.results
                            .filter(profile => activityCounts[profile.id]?.posts + activityCounts[profile.id]?.comments > 0)
                            .map((profile) => (
                                <Profile
                                    key={profile.id}
                                    profile={{
                                        ...profile,
                                        posts_count: activityCounts[profile.id]?.posts || 0,
                                        comments_count: activityCounts[profile.id]?.comments || 0,
                                    }}
                                />
                            ))
                    )}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default ProfilesWithMostPosts;
