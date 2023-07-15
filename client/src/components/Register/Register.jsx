import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    pass: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const toastFillAllFields = () => {
    toast.error("Fill all fields!", {
      position: "top-center",
      autoClose: 500,
    });
  };

  const toasUserAlreadyExists = () => {
    toast.error("User already exists!", {
      position: "top-center",
      autoClose: 500,
    });
  };

  const toastUserCreatedSuccessfully = () => {
    toast.success("User created successfully!", {
      position: "top-center",
      autoClose: 500,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resp = await axios.post("/user/register", data);
    if (resp.data.error === "fill all fields") {
      toastFillAllFields();
      return setLoading(false);
    } else if (resp.data.error === "User already exists") {
      toasUserAlreadyExists();
      return setLoading(false);
    } else if (resp.data.msg === "User created successfully") {
      toastUserCreatedSuccessfully();
      setTimeout(() => {
        setLoading(false);
        window.location.href = "/";
      }, 1000);
    }
  };

  return (
    <>
      <div className="wrapper__register">
        <div className="title-register-container">
          <h1 className="h1__register">
            Photo<span className="register-span">Share</span>
          </h1>
        </div>
        <div className="form-register__wrapper">
          <form onSubmit={handleSubmit} className="form__register">
            <h1 className="signup-title">Sign Up</h1>
            <div className="form__wrapper">
              <input
                type="text"
                name="first_name"
                value={data.first_name}
                placeholder="Name..."
                autoComplete="off"
                className="input-register"
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                value={data.last_name}
                placeholder="Last Name..."
                autoComplete="off"
                className="input-register"
                onChange={handleChange}
              />
              <input
                type="text"
                name="email"
                value={data.email}
                placeholder="Email..."
                autoComplete="off"
                className="input-register"
                onChange={handleChange}
              />

              <input
                type="text"
                name="username"
                value={data.username}
                placeholder="Username..."
                autoComplete="off"
                className="input-register"
                onChange={handleChange}
              />

              <input
                type="password"
                name="pass"
                value={data.pass}
                placeholder="Password..."
                className="input-register"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn-register">
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <p className="p-account">
              Already have an account? <a href="/">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
