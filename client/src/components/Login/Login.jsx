import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { setToken } from "../auth/auth";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    pass: "",
  });

  const [loading, setLoading] = useState(false);

  const toastFillAllFields = () => {
    toast.error("Fill all fields", {
      position: "top-center",
      autoClose: 500,
    });
  };

  const toastInvaildCredentials = () => {
    toast.error("Invalid Credentials!", {
      position: "top-center",
      autoClose: 500,
    });
  };

  const toastUserDoesNotExist = () => {
    toast.error("User does not exist!", {
      position: "top-center",
      autoClose: 500,
    });
  };

  const toastLoginSuccess = () => {
    toast.success("Login Success!", {
      position: "top-center",
      autoClose: 500,
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
    setLoading(true);
    const resp = await axios.post("/user/login", data);
    console.log(resp);
    if (resp.data.error === "Invalid credentials") {
      toastInvaildCredentials();
      setTimeout(() => {
        window.location.href = "/";
        return setLoading(false);
      }, 1000);
    }
    if (resp.data.msg === "fill all fields") {
      toastFillAllFields();
      return setLoading(false);
    }
    if (resp.data.msg === "Invalid credentials") {
      toastInvaildCredentials();
      return setLoading(false);
    }
    if (resp.data.error === "User does not exist") {
      toastUserDoesNotExist();
      return setLoading(false);
    }
    if (resp.data.access) {
      toastLoginSuccess();
      setTimeout(() => {
        setToken(resp.data.access);
        setLoading(false);
        window.location.href = "/home";
      }, 1000);
    }
  };

  return (
    <>
      <div className="wrapper_login">
        <div className="title-login-container">
          <h1 className="title-login">
            Photo<span className="span_login">Share</span>
          </h1>
        </div>
        <div className="form_login__wrapper">
          <form onSubmit={handleSubmit} className="form__login">
            <h1 className="h1__login">Login</h1>
            <div className="inputs__container">
              <input
                type="text"
                name="email"
                value={data.email}
                placeholder="Email..."
                autoComplete="off"
                onChange={handleChange}
                className="input__login"
              />

              <input
                type="password"
                name="pass"
                value={data.pass}
                placeholder="Password..."
                onChange={handleChange}
                className="input__login"
              />
            </div>
            <button className="login__btn">
              {loading ? "Loading..." : "Login"}
            </button>
            <p>
              Dont have an account? <a href="/register">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
