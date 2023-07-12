import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import "./Likes.css";
import { axiosInterceptor } from "../auth/auth";

axiosInterceptor();
export default function Likes({ image_id }) {
  const [liked, setLiked] = useState([]);
  const [user, setUser] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const userFetch = async () => {
      const resp = await axios.get("/user/profile");
      setUser(resp.data.userProfile);
    };
    userFetch();
  }, []);

  const handledLike = async () => {
    const resp = await axios.post(`/images/like-image/${image_id}`);
    if (resp.data.msg == "Image liked") {
      const updatedLikes = [...liked, image_id, user.id_user];
      setLiked(updatedLikes);
      localStorage.setItem("likedImages", JSON.stringify(updatedLikes));
    }
  };

  const handleDislike = async () => {
    const resp = await axios.delete(`/images/dislike/${image_id}`);
    if (resp.data.msg == "Image disliked") {
      const updateLiked = liked.filter((id) => id !== user.id_user);
      setLiked(updateLiked);
      localStorage.setItem("likedImages", JSON.stringify(updateLiked));
    }
  };

  const fetchLikes = async () => {
    const resp = await axios.get(`/images/likes/${image_id}`);
    setLikes(resp.data.likes);
  };
  fetchLikes();

  useEffect(() => {
    const likedsImagesFromStorage =
      JSON.parse(localStorage.getItem("likedImages")) || [];

    setLiked(likedsImagesFromStorage);
  }, []);

  return (
    <>
      {liked.includes(image_id) && liked.includes(user.id_user) ? (
        <BsHeartFill className="heart" onClick={handleDislike} />
      ) : (
        <BsHeart className="heart" onClick={handledLike} />
      )}
      <span className="likes-count">{likes} likes</span>
    </>
  );
}
