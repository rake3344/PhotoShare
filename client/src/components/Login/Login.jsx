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
    if (resp.data.msg === "User does not exist") {
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
      <div className="wrapper">
        <h1 className="wrapper__title">
          Photo<span>Share</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <h1 className="h1__login">Login</h1>
          <div className="form__wrapper">
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="Email..."
              autoComplete="off"
              onChange={handleChange}
            />

            <input
              type="password"
              name="pass"
              value={data.pass}
              placeholder="Password..."
              onChange={handleChange}
            />

            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? <span>Loading...</span> : "Login"}
            </button>
          </div>
          <p>
            Dont have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </>
  );
}
