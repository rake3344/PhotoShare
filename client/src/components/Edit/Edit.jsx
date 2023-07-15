import React, { useState } from "react";
import "./Edit.css";
import axios from "axios";
import { axiosInterceptor, getToken } from "../auth/auth";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";

axiosInterceptor();
export default function Edit() {
  const [data, setData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    newpassword: "",
  });

  const toastEditedSuccess = () => {
    toast.success("Profile edited successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const toastEmptyFields = () => {
    toast.error("Empty fields", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.put("/user/edit", data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(resp);
    if (resp.data.msg === "Profile edited successfully") {
      toastEditedSuccess();
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1500);
    }

    if (resp.data.msg === "Empty fields") {
      toastEmptyFields();
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-container">
        <div className="edit-title">
          <h1>
            Edit Your <span>Profile</span>
          </h1>
        </div>
        <div className="edit-form-container">
          <form className="form-edit" onSubmit={handleSubmit}>
            <div className="edit-form">
              <div className="inputs-container">
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  placeholder="Change username..."
                  autoComplete="off"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="first_name"
                  value={data.first_name}
                  placeholder="Change name..."
                  autoComplete="off"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="last_name"
                  value={data.last_name}
                  placeholder="Change lastname..."
                  autoComplete="off"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  placeholder="Change email..."
                  autoComplete="off"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="newpassword"
                  value={data.newpassword}
                  placeholder="Change password..."
                  onChange={handleChange}
                />
                <button type="submit">Edit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
