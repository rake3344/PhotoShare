import React, { useState } from "react";
import "./Upload.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { axiosInterceptor, getToken } from "../auth/auth";
import { toast } from "react-toastify";

axiosInterceptor();
export default function Upload() {
  const [file, setFile] = useState(null);

  const toastUploadSuccess = () => {
    toast.success("Upload successful", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", file);
    const resp = await axios.post("/images/upload-image", formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (resp.data.msg === "Image uploaded") {
      toastUploadSuccess();
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1500);
    }
  };

  return (
    <>
      <Navbar />
      <div className="upload-container">
        <div className="upload-form">
          <form onSubmit={handleSubmit}>
            <h1 className="upload-title">
              Share Your <span>Picture</span>
            </h1>

            <div className="form-group">
              {/* <div className="title-wrapper">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                />
              </div> */}
              <div className="img-wrapper">
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  className="img-input"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="upload-btn">
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
