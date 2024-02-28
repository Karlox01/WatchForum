# WatchForum

![Watches By Karl Logo](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709073642/NavBar_rwzaky.jpg)

**Description:** WatchForum is a Django-based web application focused on facilitating discussions about watches and timepieces. Inspired by the Code Institute's Moments template project, it serves as a platform for watch enthusiasts to engage in conversations, share insights, and explore the world of horology.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Website Intentions](#website-intentions)
- [Creation Process](#creation-process)
  - [Strategy](#strategy)
  - [Structure](#structure)
  - [Design](#design)
  - [Surface](#surface)
- [Features](#features)
  - [Homepage](#homepage)
  - [Browse Watches](#browse-watches)
  - [Messaging System](#messaging-system)
  - [User Dashboard](#user-dashboard)
- [Testing](#testing)
  - [HTML Validator](#html-validator)
  - [CSS Validator](#css-validator)
  - [Lighthouse](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709074441/LightHouse_irdd6k.jpg)
  - [Manual Testing](#manual-testing)
  - [Issues and Their Solutions](#issues-and-their-solutions)
- [Deployment](#deployment)
- [Credits](#credits)
  - [Content](#content)
  - [Media](#media)
  - [Code](#code)

![am i responsive](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709074659/Am_i_repsonsive_evc9zk.jpg)
## Introduction

WatchForum is a dedicated space for watch enthusiasts to discuss, share, and explore the fascinating world of watches and timepieces. Whether you're a seasoned collector or a casual enthusiast, WatchForum provides a platform for meaningful conversations and insights.

## Features

- **Engaging Conversations**: Join discussions, share insights, and connect with like-minded individuals.
- **Inspired by Moments Template**: Built upon the foundation of the Code Institute's Moments template project.

## Website Intentions

**For the User:**

- Engage in conversations about watches and timepieces.
- Share insights, experiences, and knowledge with the community.

**For the Site Developer:**

- Provide a user-friendly platform for watch enthusiasts.
- Foster a sense of community and shared passion.

## Creation Process

## Strategy
WatchForum operates as a discussion-centric platform, dedicated to creating a vibrant community for watch enthusiasts. The strategy revolves around connecting like-minded individuals, fostering meaningful conversations, and providing a dedicated space for users to share their passion for watches. By prioritizing user engagement and interaction, WatchForum aims to cultivate an environment where enthusiasts can explore, discuss, and celebrate the fascinating world of horology.

## Structure
The architecture of WatchForum is crafted to ensure an intuitive and engaging user experience. This minimalistic and elegant design prioritizes simplicity while offering a seamless platform for users. Here's a breakdown of the key components:

 



# WatchForum - Version 43

## Homepage and Core Features

![HomePage](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709074927/HomePage_y27wwb.jpg)

The homepage serves as the gateway to the WatchForum community, meticulously designed to offer a visually captivating and welcoming environment. Here's an overview of the core features:

- **Forums / Threaded Discussions**: At the heart of WatchForum, our discussion forums provide a structured space for meaningful conversations about various aspects of watches. The ongoing efforts to implement threaded discussions aim to enhance user experience further. This feature will simplify users' ability to follow and participate in specific topics, fostering a more organized and dynamic platform for watch enthusiasts.

- **Messaging System (Planned)**: Set for incorporation in late Winter 2024, the messaging system is a significant upcoming feature. It is designed to enable direct communication between users, fostering a more personal level of connection. Members will be able to share insights, engage in private discussions, and build a stronger sense of community within WatchForum.

- **User Dashboard (Future Expansion - Spring 2024)**: While the current version of the User Dashboard provides essential functionalities, I have ambitious plans for its expansion in Spring 2024. This expansion will introduce additional features and tools, allowing users to personalize their experience, track contributions, and navigate the platform more efficiently

## Post Creation Site

The Post Creation Site on WatchForum is where the community comes alive through user-generated content. This space empowers users to express their passion for watches by sharing thoughts, stories, and insights. The intuitive interface simplifies the process of creating engaging posts, contributing to the vibrant tapestry of discussions within the community.

### Key Features:

- **Rich Text Editor**: A user-friendly text editor enables users to format their posts with ease, making content creation a seamless experience.

- **Media Upload**: Users can enrich their posts by uploading images, allowing them to visually showcase their watch collections, favorite timepieces, or any watch-related content.

- **Topic Categorization**: Posts can be categorized into relevant topics, ensuring that discussions are organized and accessible to users interested in specific themes.

## Profile Page

The Profile Page on WatchForum serves as a personalized space for each user, reflecting their engagement, contributions, and preferences within the community. It's a dynamic representation of the user's journey and involvement in the world of watches.

### Key Elements:

- **User Information**: Displays essential details about the user, including their username, bio, and profile picture.

- **Activity Feed**: A chronological feed showcasing the user's recent activities, such as posts, comments, and interactions within the community.

- **Post History**: A collection of the user's past posts, allowing others to explore their contributions to the discussions.

- **Follower/Following Metrics**: Provides insights into the user's network within WatchForum, highlighting their followers and those they follow.

## Comment Page

The Comment Page is the epicenter of interactive discussions on WatchForum. It facilitates engagement and dialogue among community members, allowing them to share opinions, ask questions, and contribute to the ongoing conversation.

### Key Components:

- **Threaded Comments**: Enhances the readability and organization of discussions by implementing threaded comments. Users can respond directly to specific comments, creating a more structured conversational flow.

- **Reaction System**: Users can express their sentiments through a reaction system.

- **Real-Time Updates (Resolved)**: Addressing previous challenges, real-time updates ensure that users receive instant notifications about new comments, fostering a more dynamic and responsive platform.




### Design

The website design prioritizes visual appeal and user experience.

**Fonts**:
- selected from Google Fonts ensure readability and aesthetics. These include Verdana, Bebas Neue, And a new personal favourite Kode Mono.
- [Google Fonts](https://fonts.google.com/)


![Kode](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709077867/Kode_jjk0ls.jpg)

- Color Scheme: The color scheme incorporates various shades to enhance visual appeal and readability.

![Colors](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709078204/Colors_h5qhjk.png)
- Heavy use of Orangy and dark blue colors DAA520 / 2142b2

## Reusable Components

### Avatar Component

In your project, you've implemented a reusable `Avatar` component that allows for the display of user avatars with optional text. This component is flexible, adjusting avatar dimensions based on whether it's viewed on a mobile device or a specified height. Below is an example of how it can be used:

```jsx
// Example Usage of Avatar Component
import React from 'react';
import Avatar from '../components/Avatar';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h2>{user.username}</h2>
      <Avatar src={user.avatarUrl} height={120} text="Watch Enthusiast" />
      {/* Other user details and content */}
    </div>
  );
};

```

User Context Components
I have also implemented context components to manage the state of the current user and profile data. This allows for efficient handling of user-related functionalities across different parts of your application.

CurrentUserProvider: Manages the state of the current user and handles token refresh.
```
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

// Create context for current user and its setter
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks for using current user and its setter
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Provider component to manage the state of the current user
export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();

    // Function to fetch the current user on component mount
    const handleMount = async () => {
        try {
            const { data } = await axiosRes.get("dj-rest-auth/user/");
            setCurrentUser(data);
        } catch (err) {
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        handleMount();
    }, [history]);

    // Intercept axios requests and responses to handle token refresh
    useMemo(() => {
        axiosReq.interceptors.request.use(
            async (config) => {
                if (shouldRefreshToken()) {
                    try {
                        await axios.post('/dj-rest-auth/token/refresh/');
                    } catch (err) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                history.push('/signin');
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                        return config;
                    }
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        axiosRes.interceptors.response.use(
            (response) => response,
            async (err) => {
                if (err.response?.status === 401) {
                    try {
                        await axios.post('/dj-rest-auth/token/refresh/');
                    } catch {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                history.push('/signin');
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                    }
                    return axios(err.config);
                }
                return Promise.reject(err);
            }
        );
    }, [history]);

    // Provide the current user state and its setter to the child components
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};
```
ProfileDataProvider: Manages the state of profile data, including popular profiles and follow/unfollow actions.
```
 const handleFollow = async (clickedProfile) => {
        try {
            const { data } = await axiosRes.post("/followers/", {
                followed: clickedProfile.id,
            });

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        followHelper(profile, clickedProfile, data.id)
                    ),
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((profile) =>
                        followHelper(profile, clickedProfile, data.id)
                    ),
                },
            }));
        } catch (err) {
            // Handle error
        }
    };

    // Function to handle unfollow action
    const handleUnfollow = async (clickedProfile) => {
        try {
            await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        unfollowHelper(profile, clickedProfile)
                    ),
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((profile) =>
                        unfollowHelper(profile, clickedProfile)
                    ),
                },
            }));
        } catch (err) {
            // Handle error
        }
    };
```
These context components provide hooks (useCurrentUser, useSetCurrentUser, useProfileData, useSetProfileData) to easily access and modify user-related data within your application.

#Handle Follow/Unfollow 

``` const handleFollow = async (clickedProfile) => {
        try {
            const { data } = await axiosRes.post("/followers/", {
                followed: clickedProfile.id,
            });

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        followHelper(profile, clickedProfile, data.id)
                    ),
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((profile) =>
                        followHelper(profile, clickedProfile, data.id)
                    ),
                },
            }));
        } catch (err) {
            // Handle error
        }
    };

    // Function to handle unfollow action
    const handleUnfollow = async (clickedProfile) => {
        try {
            await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        unfollowHelper(profile, clickedProfile)
                    ),
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((profile) =>
                        unfollowHelper(profile, clickedProfile)
                    ),
                },
            }));
        } catch (err) {
            // Handle error
        }
    };
```

# ProfilesWithMostPosts Component

The `ProfilesWithMostPosts` component is a React functional component designed to display profiles with the most posts in the WatchForum web application. This component is utilized to showcase the most active users in terms of their posted content.

## Component Structure

![Active Profiles](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709076813/Active_users_kypqo5.jpg)

The component is organized into the following key sections:

### Imports

```jsx
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
```
- Component Function
The ProfilesWithMostPosts function component has the following main features:



Fetches posts data for all profiles using the fetchAllPages function.
Initializes and updates countsObj based on posts data.
Sets the activity counts state.
Fetches profile data for the most active profiles.
Sorts profiles based on the number of posts and updates the state.
FetchAllPages Function:

A utility function to fetch all pages of data for a given endpoint.
Render Section:

Displays a loading spinner if no data is available.
Renders most active profiles for larger screens, filtering out profiles with no activity.
For mobile screens, profiles are displayed in a flex container for improved responsiveness.
Return Statement
The JSX returned by the component renders a Container from React Bootstrap. It dynamically displays either the most active profiles or a loading spinner based on the availability of data.

 ```
return (
  <Container className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"}`}>
    {/* Conditional Rendering */}
    {profileData.mostActiveProfiles.results.length ? (
      <>
        <p className="text-center">Most active users.</p>
        {/* Conditional Rendering based on screen size */}
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


```

- **Usage**
This component is incorporated into the WatchForum application to provide users with a glimpse of the most active contributors based on their posted content.







## Testing and Issues and SOLUTIONS!

### Automated Testing

![React Tests](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709075213/Tests_aaa52j.jpg)


#### PostCreateForm Tests

The `PostCreateForm` is a crucial component allowing users to create new posts on WatchForum. Various tests have been implemented to ensure the functionality and reliability of this form:

1. **Submitting Form with Valid Data**: Verifies that the form can be successfully submitted with valid data.

    ```javascript
    test("Submitting Form with Valid Data", async () => {
      // Test details...
    });
    ```

    This test simulates entering valid data into the form, including a title and content, and then submits the form to ensure it behaves as expected.


#### NavBar Tests

The navigation bar (NavBar) is a critical component of WatchForum, providing users with essential links and options. Here are some tests conducted to ensure the NavBar functions as intended:

1. **Rendering NavBar**: Checks if the NavBar renders without any errors.

    ```javascript
    test("renders NavBar", () => {
      // Test details...
    });
    ```

2. **Rendering Link to User Profile for a Logged-In User**: Verifies that the NavBar correctly displays the link to the user's profile when they are logged in.

    ```javascript
    test("renders link to the user profile for a logged-in user", async () => {
      // Test details...
    });
    ```

3. **Rendering Sign-In and Sign-Up Buttons on Log Out**: Ensures that the NavBar correctly displays the "Sign In" and "Sign Up" buttons when a user logs out.

    ```javascript
    test("renders Sign in and Sign up buttons again on log out", async () => {
      // Test details...
    });
    ```

#### Console Logs for Debugging

During the testing phase, extensive use of console logs played a crucial role in identifying and resolving issues. This proactive approach allowed for effective debugging and swift resolution of problems. The use of console logs is especially notable in:

- **Real-Time Update Issue**: None with the front end app atm.

- **Deployment Challenges**: To address compatibility issues with Node 20 during Heroku deployment, the project had to be reverted back to using Node version 14. Console logs were instrumental in identifying and addressing these challenges.

### Manual Testing

In addition to automated testing, manual testing was conducted on various browsers and devices to ensure optimal responsiveness and a seamless user experience.

![Lighthouse](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709074441/LightHouse_irdd6k.jpg)



### Postman Testing for DRF

During the testing phase, Postman played a crucial role in ensuring the functionality and integrity of the Django Rest Framework (DRF) API. The extensive use of Postman involved various aspects, including:

1. **API Endpoint Testing:** Postman was employed to send requests to different API endpoints, validating the responses and ensuring that data retrieval, creation, updating, and deletion processes function as expected.

2. **Image Models and Serializers:** Testing images, especially when dealing with models and serializers, was a significant focus. Postman allowed for sending multipart/form-data requests to simulate the upload of image files. This helped to identify and debug issues related to image handling, serialization, and storage.

3. **Debugging:** Postman's detailed response output and error handling features were utilized for debugging. It facilitated the identification of issues with data validation, serialization errors, and other intricacies in the interaction between the front end and the DRF backend.

4. **Performance Testing:** Postman's ability to send a large number of requests in a short time frame was instrumental in assessing the performance of the DRF API. This helped in identifying potential bottlenecks, optimizing queries, and enhancing overall API efficiency.

The comprehensive testing approach using Postman ensured the robustness and reliability of the DRF API, particularly in handling image-related functionalities, and played a key role in identifying and resolving issues during the development process.


![PostMan](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709076562/Postman_numhdl.jpg)

### Known Issues and Resolutions

During the development process, the following issues were encountered and successfully addressed: [UPDATED]! 27.02.2024

- ~~**Real-Time Update Issue**: Work is in progress to resolve the ongoing challenge of updating follower/following icons in real-time.~~
 / THIS HAS NOW BEEN FULLY RESOLVED 

- **Deployment Challenges**: ~~Compatibility issues with Node 20 during Heroku deployment were resolved by reverting the project to use Node version 14.~~
/ THE SOLUTION IS  TO USE NODE V14.17.0 AS ITS THE MOST STABLE VERSION FOR WHEN DEPLOYING TO HEROKU.

I have commited to thoroughly testing this build before the deployment and am happy with the results, I have encountered no bugs and hope you wont either! :).


## Deployment

The website will be deployed to Heroku. To view it on your local server, follow these steps:


Create a new Heroku app:
heroku create your-app-name

Add a Node.js buildpack to your Heroku app:
heroku buildpacks:set heroku/nodejs
  
Set environment variables if needed (e.g., for secret keys or configurations):
heroku config:set KEY=VALUE

Deploy your application to Heroku:
git push heroku master

Open your deployed application in the browser:
heroku open


Access the website at `(https://watchforumkarlo-1fa8fac8032c.herokuapp.com/)`.

## Version Control and Commit History

WatchForum has undergone continuous improvement, and currently at version 43 it reflects a series of iterative enhancements and optimizations. I have taken the feedback received into serious consideration and implemented a more frequent commit cadence with cohesive commit messages. This approach not only contributes to a more transparent development process but also facilitates easier tracking of changes and collaboration. 

### Commit Messages

The commit messages have now been expanded to provide clear and concise information about each change, making it easier for collaborators to understand the evolution of the project. The commitment to a more structured and informative commit history aligns with the best practices in software development.

Here's a glimpse of the commit history:

 **![Another Example Commit](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709077678/Commits_pheox5.jpg)

### Future Commitment

The commitment to maintaining a detailed and comprehensible commit history remains an ongoing practice. Each commit aims to contribute positively to the project's evolution and readability. Your feedback and suggestions are always welcome as I strive to enhance the development and collaboration experience further.

Thank you for being part of WatchForum's journey!

## WatchForum - Version 43


## Credits

**Content**: Inspired by the world of horology and the passion of watch enthusiasts.

**Code**: Built upon the foundation of the [Code Institute's Moments template project](https://learn.codeinstitute.net/ci_moments_template), WatchForum incorporates elements and concepts from this project.

**Copilot**: Special thanks to GPT-3.5 Assistant - Alex for providing valuable assistance throughout the project, including testing of my code for potential errors.

**Libraries and Frameworks**:
- [Google Fonts](https://fonts.google.com/): Provides a wide range of fonts for improved readability and aesthetics.
- [Font Awesome](https://fontawesome.com/): Used for adding scalable vector icons and logos.

