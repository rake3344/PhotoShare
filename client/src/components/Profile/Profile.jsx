import React, { useEffect, useState } from "react";
import "./Profile.css";
import { axiosInterceptor } from "../auth/auth";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

axiosInterceptor();
export default function Profile() {
  const [data, setData] = useState({
    username: "",
    name: "",
    lastname: "",
    email: "",
    profile_photo: "",
  });

  const [images, setImages] = useState([]);
  const [posts, setPosts] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const resp = await axios.get("/user/profile");
      console.log(resp);
      setData({
        username: resp.data.userProfile.username,
        name: resp.data.userProfile.first_name,
        lastname: resp.data.userProfile.last_name,
        email: resp.data.userProfile.email,
        profile_photo: resp.data.userProfile.profile_photo,
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFollowers = async () => {
      const resp = await axios.get("/followers/count-followers");
      setFollowers(resp.data.followers);
    };
    fetchFollowers();
  }, []);

  useEffect(() => {
    const fetchFollowing = async () => {
      const resp = await axios.get("/followers/count-following");
      setFollowing(resp.data.following);
    };
    fetchFollowing();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchImages = async () => {
      const resp = await axios.get("/images/get-images");
      setImages(resp.data.images);
    };
    fetchImages();
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await axios.get("/images/posts-count");
      setPosts(resp.data.posts);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="profile">
          <header className="profile__header">
            <div className="profile__header__container">
              <div className="container__header__profile">
                <div className="container__header__image">
                  <img
                    src={
                      data.profile_photo != null
                        ? `../../src/uploads/${data.profile_photo}`
                        : "../../src/uploads/user-default.png"
                    }
                    alt="profile-image"
                  />
                </div>
                <div className="profile-user-settings">
                  <h1 className="profile-username">{data.username}</h1>
                  <button className="profile-edit-btn">Edit Profile</button>
                </div>
                <div className="profile-stats">
                  <ul>
                    <li>
                      <span className="profile-stats-count">{posts}</span> posts
                    </li>
                    <li>
                      <span className="profile-stats-count">{followers}</span>{" "}
                      followers
                    </li>
                    <li>
                      <span className="profile-stats-count">{following}</span>{" "}
                      following
                    </li>
                  </ul>
                </div>
                <div className="profile-bio">
                  <span>{data.email}</span>
                  <span className="profile-name">{data.name}</span>
                </div>
              </div>
            </div>
          </header>
          <div className="img-area">
            <div className="img-area__wrapper">
              {images &&
                images.map((image, index) => {
                  return (
                    <div className="single-box" key={index}>
                      <Link to={`/image/${image.id_image}`}>
                        <img
                          src={`../../src/uploads/${image.img}`}
                          alt="thumbnail-photos"
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
}
