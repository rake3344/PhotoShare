import React, { useEffect, useState } from "react";
import "./ImageDetail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { axiosInterceptor } from "../auth/auth";
import Likes from "../Likes/Likes";

axiosInterceptor();
export default function ImageDetail() {
  const { image_id } = useParams();
  const [image, setImage] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const imageFetch = async () => {
      const resp = await axios.get(`/images/image/${image_id}`);
      setImage(resp.data.image);
    };
    imageFetch();
  }, []);

  useEffect(() => {
    const commentFetch = async () => {
      const resp = await axios.get(`/comments/image-comments/${image_id}`);
      setComments(resp.data.comments);
    };
    commentFetch();
  }, []);

  return (
    <>
      <Navbar />
      <div className="detail-container">
        <div className="detail-card">
          <div className="detail-header">
            <div className="info">
              <img
                src={
                  image[0]?.profile_photo != null
                    ? `../../src/uploads/${image[0].profile_photo}`
                    : `../../src/uploads/user-default.png`
                }
                alt="profile pic"
                className="profile-image"
              />
              <span className="profile-name">{image[0]?.username}</span>
            </div>
            <div className="likes">
              <Likes image_id={image_id} />
            </div>
          </div>
          <div className="detail-img">
            <img
              src={`../../src/uploads/${image[0]?.img}`}
              alt="post imagen"
              className="detail-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}
