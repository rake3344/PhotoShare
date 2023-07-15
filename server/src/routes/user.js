import { Router } from "express";
import {
  changeProfilePic,
  editProfileUser,
  getAllImagesWithUser,
  getUser,
  getUsers,
  login,
  mostPopulars,
  register,
  uploadPhotoProfile,
  userAdmin,
  userBan,
  userUnban,
} from "../controller/user.controller.js";
import { verifyToken } from "../middlewares/session.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users-admin", verifyToken, getUsers);
userRouter.get("/profile", verifyToken, getUser);
userRouter.get("/images", verifyToken, getAllImagesWithUser);
userRouter.get("/user-admin", verifyToken, userAdmin);
userRouter.get("/populars", verifyToken, mostPopulars);
userRouter.post("/photo-profile", verifyToken, upload, uploadPhotoProfile);
userRouter.put("/ban/:id_user", verifyToken, userBan);
userRouter.put("/unban/:id_user", verifyToken, userUnban);
userRouter.put("/edit", verifyToken, editProfileUser);
userRouter.put("/change-pic", upload, verifyToken, changeProfilePic);

export default userRouter;
