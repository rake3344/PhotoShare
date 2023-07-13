import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { axiosInterceptor } from "../auth/auth";

axiosInterceptor();
export default function UserProfile() {
  const { user_id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [posts, setPosts] = useState(0);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(`/images/user-images/${user_id}`).then((resp) => {
        setUser(resp.data.images);
        setLoading(false);
      });
    };
    fetchUser();
  }, []);

  const fetcFollowers = async () => {
    await axios.get(`/followers/followers-user/${user_id}`).then((resp) => {
      setFollowers(resp.data.followers);
    });
  };
  fetcFollowers();

  const fetchFollowing = async () => {
    await axios.get(`/followers/following-user/${user_id}`).then((resp) => {
      setFollowing(resp.data.following);
    });
  };
  fetchFollowing();

  useEffect(() => {
    const fetchPosts = async () => {
      await axios.get(`/images/posts-user/${user_id}`).then((resp) => {
        setPosts(resp.data.posts);
      });
    };
    fetchPosts();
  }, []);

  const fetchFollow = async () => {
    await axios.get(`/followers/already-follow/${user_id}`).then((resp) => {
      console.log(resp);
      if (resp.data.msg === "Already follow") {
        setFollow(true);
      }
      if (resp.data.msg === "Not follow") {
        setFollow(false);
      }
    });
  };
  fetchFollow();

  if (loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="user-profile-container">
        <div className="user-header">
          <img
            src={
              user.profile_photo != null
                ? `../../src/uploads/${user.profile_photo}`
                : `../../src/uploads/user-default.png`
            }
            alt="profile-pic"
            className="user-profile-image"
          />
          <div className="user-info">
            <div className="user-name-btns">
              <span className="user-name">{user[0]?.username}</span>
              {follow ? (
                <button
                  className="btn-follow"
                  onClick={() => {
                    axios
                      .delete(`/followers/unfollow/${user_id}`)
                      .then((resp) => {
                        if (resp.data.msg === "Unfollowed successfully") {
                          setFollow(false);
                        }
                      });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="btn-follow"
                  onClick={() => {
                    axios.post(`/followers/follow/${user_id}`).then((resp) => {
                      if (resp.data.msg === "Followed successfully") {
                        setFollow(true);
                      }
                    });
                  }}
                >
                  Follow
                </button>
              )}
            </div>
            <div className="user-stats">
              <span className="stats">{posts} posts</span>
              <span className="stats">{followers} followers</span>
              <span className="stats">{following} following</span>
            </div>
            <div className="user-email-name">
              <span className="user-email">{user[0]?.email}</span>
              <span className="user-real-name">{user[0]?.first_name}</span>
            </div>
          </div>
        </div>
        <div className="user-images">
          <div className="img-user-wrapper">
            {user &&
              user.map((image, index) => {
                return (
                  <div className="single-box-wrapper" key={index}>
                    <Link to={`/image/${image.id_image}`}>
                      <img
                        src={`../../src/uploads/${image.img}`}
                        alt="images from user"
                      />
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
