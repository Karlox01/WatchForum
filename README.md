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


**Homepage** 



![HomePage](https://res.cloudinary.com/dzchfcdfl/image/upload/v1709074927/HomePage_y27wwb.jpg)
- The gateway to the WatchForum community, the homepage is crafted to provide a visually captivating and welcoming environment. Users are greeted with compelling visuals that draw them into the world of watches and timepieces. The design emphasizes a user-friendly interface to encourage exploration and interaction.

- **Forums / Threaded Discussions**: The heart of WatchForum lies in its discussion forums. These forums are structured to facilitate meaningful conversations about various aspects of watches. To enhance user experience, I am currently working on implementing threaded discussions. This feature will make it easier for users to follow and participate in specific topics, creating a more organized and dynamic platform for watch enthusiasts.

- **Messaging System (Planned)**: Scheduled for incorporation in late Winter 2024, the messaging system is a key feature aimed at enabling direct communication between users. This addition will make it possible for members to connect on a more personal level, share insights, and engage in private discussions, enhancing the sense of community within WatchForum.

- **User Dashboard (Future Expansion - Spring 2024)**: The user dashboard is a focal point for individuals to manage their discussions and interactions within WatchForum. While the current version provides essential functionalities, we plan to expand the user dashboard in Spring 2024. This expansion will introduce additional features and tools, empowering users to personalize their experience, track their contributions, and navigate the platform more efficiently.

The structural design of WatchForum reflects our commitment to creating a platform that not only showcases the beauty of watches but also nurtures a vibrant community where enthusiasts can connect, share their passion, and explore the world of horology together.


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





### Design

The website design prioritizes visual appeal and user experience.

**Color Scheme**:
- The project adopts a color scheme with various shades, creating a visually pleasing environment for discussions.

**Fonts**:
- Fonts selected from Google Fonts ensure readability and aesthetics. These include Verdana and Bebas Neue.
- [Google Fonts](https://fonts.google.com/)

- Color Scheme: The color scheme incorporates various shades to enhance visual appeal and readability.
- Heavy use of Orangy and dark blue colors DAA520 / 2142b2

## Features

### Homepage

- **Main Screen**: Features captivating images and a welcoming slogan.


- **Watch Selection**: Allows users to explore and engage in various watch-related discussions.



### Messaging System - This is to be included, But due to a lack of time it was not featured in the deployed build/

- **Communication**: Facilitates discussions between users.

### User Dashboard

- **Management**: Allows users to manage their discussions.

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

## Credits

**Content**: Inspired by the world of horology and the passion of watch enthusiasts.

**Code**: Built upon the foundation of the [Code Institute's Moments template project](https://learn.codeinstitute.net/ci_moments_template), WatchForum incorporates elements and concepts from this project.

**Copilot**: Special thanks to GPT-3.5 Assistant - Alex for providing valuable assistance throughout the project, including testing of my code for potential errors.

**Libraries and Frameworks**:
- [Google Fonts](https://fonts.google.com/): Provides a wide range of fonts for improved readability and aesthetics.
- [Font Awesome](https://fontawesome.com/): Used for adding scalable vector icons and logos.

