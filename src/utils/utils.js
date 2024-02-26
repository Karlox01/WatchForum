import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// Helper functions for handling data fetching, following/unfollowing, and token management

// Function to fetch more data (pagination)
export const fetchMoreData = async (resource, setResource) => {
  try {
    // Fetching more data from the next URL
    const { data } = await axiosReq.get(resource.next);
    // Updating the resource state with the new data
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    // Error handling for data fetching
  }
};

// Helper function for handling follow action
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ?
    {
      ...profile,
      followers_count: profile.followers_count + 1,
      following_id,
    }
    : profile.is_owner
      ?
      { ...profile, following_count: profile.following_count + 1 }
      :
      profile;
};

// Helper function for handling unfollow action
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ?
    {
      ...profile,
      followers_count: profile.followers_count - 1,
      following_id: null,
    }
    : profile.is_owner
      ?
      { ...profile, following_count: profile.following_count - 1 }
      :
      profile;
};

// Function to set the timestamp of the refresh token
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Function to check if the token should be refreshed based on the timestamp
export const shouldRefreshToken = () => {
  return !!localStorage.getItem('refreshTokenTimestamp');
};

// Function to remove the refresh token timestamp from local storage
export const removeTokenTimestamp = () => {
  localStorage.removeItem('refreshTokenTimestamp');
};
