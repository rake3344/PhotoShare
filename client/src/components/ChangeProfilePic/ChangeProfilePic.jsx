import React, { useState } from "react";
import "./ChangeProfilePic.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { axiosInterceptor, getToken } from "../auth/auth";

axiosInterceptor();
export default function ChangeProfilePic() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", file);
    const resp = await axios.put("/user/change-pic", formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(resp);
    if (resp.data.msg === "Profile photo changed successfully") {
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-pic-container">
        <h1 className="change-title">
          Change Your Profile <span className="change-span">Pic</span>
        </h1>
        <div className="form__wrapper">
          <form onSubmit={handleSubmit} className="form-container">
            <div className="submit__wrapper">
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                className="img-input"
                onChange={handleChange}
              />
              <button type="submit" className="change-btn">
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
