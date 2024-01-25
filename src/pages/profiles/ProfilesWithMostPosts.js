import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Profile from "./Profile";

const ProfilesWithMostPosts = ({ mobile }) => {
    const [profileData, setProfileData] = useState({
        mostActiveProfiles: { results: [] },
    });
    const { mostActiveProfiles } = profileData;
    const currentUser = useCurrentUser();
    const [activityCounts, setActivityCounts] = useState({}); // Initialize counts as a state

    useEffect(() => {
        const handleMount = async () => {
            try {
                const postsData = await fetchAllPages("/posts/");
                const commentsData = await fetchAllPages("/comments/");

                const countsObj = {};
                postsData.forEach((post) => {
                    const userId = post.profile_id;
                    countsObj[userId] = {
                        posts: (countsObj[userId] && countsObj[userId].posts) ? countsObj[userId].posts + 1 : 1,
                        comments: countsObj[userId] && countsObj[userId].comments ? countsObj[userId].comments : 0,
                    };
                });

                commentsData.forEach((comment) => {
                    const userId = comment.profile_id;
                    countsObj[userId] = {
                        posts: countsObj[userId] && countsObj[userId].posts ? countsObj[userId].posts : 0,
                        comments: (countsObj[userId] && countsObj[userId].comments) ? countsObj[userId].comments + 1 : 1,
                    };
                });

                setActivityCounts(countsObj);

                const sortedProfiles = Object.keys(countsObj).sort((a, b) =>
                    countsObj[b].posts + countsObj[b].comments - (countsObj[a].posts + countsObj[a].comments)
                );

                const { data } = await axiosReq.get(`/profiles/?id__in=${sortedProfiles.slice(0, 4).join(",")}`);
                setProfileData((prevState) => ({
                    ...prevState,
                    mostActiveProfiles: data,
                }));
            } catch (err) {

            }
        };

        handleMount();
    }, [currentUser]);

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
        <Container
            className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"
                }`}
        >
            {mostActiveProfiles.results.length ? (
                <>
                    <p className="text-center">Most active users.</p>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {mostActiveProfiles.results.map((profile) => (
                                <Profile
                                    key={profile.id}
                                    profile={{
                                        ...profile,
                                        posts_count: activityCounts[profile.id] ? activityCounts[profile.id].posts : 'Posts: 0',
                                        comments_count: activityCounts[profile.id] ? activityCounts[profile.id].comments : 'Comments: 0',
                                    }}
                                    mobile
                                />
                            ))}
                        </div>
                    ) : (
                        mostActiveProfiles.results.map((profile) => (
                            <Profile className='text-center p-2'
                                key={profile.id}
                                profile={{
                                    ...profile,
                                    posts_count: activityCounts[profile.id] ? activityCounts[profile.id].posts : ' 0',
                                    comments_count: activityCounts[profile.id] ? activityCounts[profile.id].comments : ' 0',
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
