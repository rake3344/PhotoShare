import React, { useEffect, useState } from "react";
import "./ImageDetail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { axiosInterceptor } from "../auth/auth";
import Likes from "../Likes/Likes";
import { BsTrash } from "react-icons/bs";
import Loader from "../Loader/Loader";

axiosInterceptor();
export default function ImageDetail() {
  const { image_id } = useParams();
  const [image, setImage] = useState([]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);
  const [commentData, setCommentData] = useState({
    comment: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageFetch = async () => {
      await axios.get(`/images/image/${image_id}`).then((resp) => {
        setImage(resp.data.image);
        setLoading(false);
      });
    };
    imageFetch();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const resp = await axios.get("/user/profile");
      setUser(resp.data.userProfile);
    };
    fetchUser();
  }, []);

  // ------------------ Comments ------------------

  const handleChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.post(`/comments/${image_id}`, commentData);
    if (resp.data.msg === "Comment created") {
      setCommentData({
        comment: "",
      });
    }
  };

  useEffect(() => {
    const commentFetch = async () => {
      const resp = await axios.get(`/comments/image-comments/${image_id}`);
      setComments(resp.data.comments);
    };
    commentFetch();
  }, [commentData]);

  // ------------------ Comments ------------------ //

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
            <div className="detail-rigth-section">
              <div className="likes">
                <Likes image_id={image_id} />
              </div>
              <div className="delete-image">
                {user.id_user === image[0]?.id_user ? (
                  <BsTrash
                    className="trash"
                    onClick={() => {
                      const deleteImage = async () => {
                        const resp = await axios.delete(
                          `/images/delete-img/${image_id}`
                        );
                        if (resp.data.msg === "Image deleted") {
                          window.location.href = "/profile";
                        }
                      };
                      deleteImage();
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className="detail-img">
            <img
              src={`../../src/uploads/${image[0]?.img}`}
              alt="post imagen"
              className="detail-image"
            />
          </div>
          <div className="detail-comments">
            <div className="comment-box">
              <img
                src={
                  user.profile_photo != null
                    ? `../../src/uploads/${user.profile_photo}`
                    : `../../src/uploads/user-default.png`
                }
                alt="profile pic user login"
              />
              <div className="form-wrapper">
                <form className="form-comment" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="comment"
                    value={commentData.comment}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Write a comment..."
                  />
                  <button type="submit">Post</button>
                </form>
              </div>
            </div>
            <div className="comments">
              {comments &&
                comments.map((comment, index) => {
                  return (
                    <div className="comment" key={index}>
                      <img
                        src={
                          comment.profile_photo != null
                            ? `../../src/uploads/${comment.profile_photo}`
                            : `../../src/uploads/user-default.png`
                        }
                        alt="profile pic comment"
                      />
                      <div className="message">
                        <div className="name_icons">
                          <span className="username-comment">
                            {comment.username}
                          </span>
                          <div className="icons">
                            {comment.id_user == user.id_user ? (
                              <BsTrash
                                className="trash-icon"
                                onClick={() => {
                                  const deleteComment = async () => {
                                    const resp = await axios.delete(
                                      `/comments/${comment.id_comments}`
                                    );
                                    if (resp.data.msg === "Comment deleted") {
                                      window.location.reload();
                                    }
                                  };
                                  deleteComment();
                                }}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <span className="comment-text">
                          {comment.comment_body}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
