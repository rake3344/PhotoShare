import React, { useEffect, useState } from "react";
import "./Profile.css";
import { axiosInterceptor, getToken } from "../auth/auth";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/user/profile").then((resp) => {
        setData({
          username: resp.data.userProfile.username,
          name: resp.data.userProfile.first_name,
          lastname: resp.data.userProfile.last_name,
          email: resp.data.userProfile.email,
          profile_photo: resp.data.userProfile.profile_photo,
        });
        setLoading(false);
      });
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
    const fetchImages = async () => {
      setLoading(true);
      await axios.get("/images/get-images").then((resp) => {
        setImages(resp.data.images);
        setLoading(false);
      });
    };
    fetchImages();
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
          <div className="profile__wrapper">
            <div className="profile__image__wrapper">
              <img
                src={
                  data.profile_photo != null
                    ? `../../src/uploads/${data.profile_photo}`
                    : `../../src/uploads/user-default.png`
                }
                alt="profile-pic"
                className="profile__image"
              />
              <Link to="/change-pic" className="link-edit-pic">
                <label className="label-pic">
                  <MdOutlineAddPhotoAlternate className="icon" />
                </label>
              </Link>
            </div>
            <div className="profile__info">
              <div className="profile__username">
                <h1 className="username__info">{data.username}</h1>
                <Link to="/edit">
                  <button className="edit-profile-btn">Edit profile</button>
                </Link>
              </div>
              <div className="profile__stats">
                <span className="user__stats">{posts} posts</span>
                <span className="user__stats">{followers} followers</span>
                <span className="user__stats">{following} following</span>
              </div>
              <div className="profile__name__email">
                <span>{data.email}</span>
                <span>{data.name}</span>
              </div>
            </div>
          </div>
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
