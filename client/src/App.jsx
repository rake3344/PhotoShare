import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer } from "react-toastify";
import { decodeToken } from "./components/auth/auth";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Admin from "./components/Admin/Admin";
import Upload from "./components/Upload/Upload";
import UserProfile from "./components/UserProfile/UserProfile";
import ImageDetail from "./components/ImageDetail/ImageDetail";
import Edit from "./components/Edit/Edit";
import ChangeProfilePic from "./components/ChangeProfilePic/ChangeProfilePic";

function App() {
  const access = decodeToken();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={access ? <Home /> : <Navigate to="/" />} />
        <Route
          path="/"
          element={!access ? <Login /> : <Navigate to="/home" />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={access ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={access ? <Admin /> : <Navigate to="/" />}
        />
        <Route
          path="/upload"
          element={access ? <Upload /> : <Navigate to="/" />}
        />
        <Route
          path="/user/:user_id"
          element={access ? <UserProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/image/:image_id"
          element={access ? <ImageDetail /> : <Navigate to="/" />}
        />
        <Route path="/edit" element={access ? <Edit /> : <Navigate to="/" />} />
        <Route
          path="/change-pic"
          element={access ? <ChangeProfilePic /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
