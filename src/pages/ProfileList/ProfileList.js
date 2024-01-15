

import React, { useEffect, useState } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import Post from '../posts/Post';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axiosRes.get('/profiles/');
        setProfiles(response.data.results);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div>
      {profiles.map((profile) => (
        <Post
          key={profile.id}
          user_joined_at={profile.user_joined_at}
          ownerCreatedAt={profile.user_joined_at}  // Pass the user creation date
          id={profile.id}
          owner={profile.owner}
          profile_id={profile.profile_id}
          profile_image={profile.profile_image}
          comments_count={profile.comments_count}
          likes_count={profile.likes_count}
          like_id={profile.like_id}
          title={profile.title}
          content={profile.content}
          image={profile.image}
          updated_at={profile.updated_at}
          created_at={profile.created_at}
          postPage={profile.postPage}
          setPosts={profile.setPosts}
          posts_count={profile.posts_count}
        />
      ))}
    </div>
  );
};

export default ProfileList;
