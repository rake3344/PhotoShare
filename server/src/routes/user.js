import { Router } from "express";
import {
  getAllImagesWithUser,
  getUser,
  getUsers,
  login,
  register,
  uploadPhotoProfile,
} from "../controller/user.controller.js";
import { verifyToken } from "../middlewares/session.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users-admin", verifyToken, getUsers);
userRouter.get("/profile", verifyToken, getUser);
userRouter.get("/images", verifyToken, getAllImagesWithUser);
userRouter.post("/photo-profile", verifyToken, upload, uploadPhotoProfile);

export default userRouter;
