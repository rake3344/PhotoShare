import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./Home.css";
import { axiosInterceptor } from "../auth/auth";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import Likes from "../Likes/Likes";

axiosInterceptor();
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcPosts = async () => {
      await axios.get("/user/images").then((resp) => {
        setPosts(resp.data.images);
        setLoading(false);
      });
    };
    fetcPosts();
  }, []);

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
      <div className="home-container">
        {posts &&
          posts.map((post, index) => {
            return (
              <div className="instacard" key={index}>
                <div className="header">
                  <div className="info">
                    <Link to={`/user/${post.id_user}`}>
                      <img
                        src={
                          post.profile_photo != null
                            ? `../../src/uploads/${post.profile_photo}`
                            : `../../src/uploads/user-default.png`
                        }
                        className="instacard-profile-image"
                        alt="profile-pic"
                      />
                    </Link>
                    <span className="instacard-profile-name">
                      {post.username}
                    </span>
                  </div>
                  <div className="likes">
                    <Likes image_id={post.id_image} />
                  </div>
                </div>
                <div className="image">
                  <Link to={`/image/${post.id_image}`}>
                    <img
                      src={`../../src/uploads/${post.img}`}
                      alt=""
                      className="instacard-image"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
