import { Router } from "express";
import { verifyToken } from "../middlewares/session.js";
import upload from "../middlewares/multer.js";
import {
  dislikeImage,
  getCountLikes,
  getCountPostsFromUser,
  getImageUserById,
  getImages,
  getImagesUserById,
  imageDelete,
  imageLike,
  postsCount,
  uploadImage,
} from "../controller/images.controller.js";

const imagesRouter = Router();

imagesRouter.post("/upload-image", verifyToken, upload, uploadImage);
imagesRouter.get("/get-images", verifyToken, getImages);
imagesRouter.get("/posts-count", verifyToken, postsCount);
imagesRouter.get("/user-images/:user_id", verifyToken, getImagesUserById);
imagesRouter.get("/image/:image_id", verifyToken, getImageUserById);
imagesRouter.get("/likes/:image_id", verifyToken, getCountLikes);
imagesRouter.get("/posts-user/:user_id", verifyToken, getCountPostsFromUser);
imagesRouter.post("/like-image/:image_id", verifyToken, imageLike);
imagesRouter.delete("/dislike/:image_id", verifyToken, dislikeImage);
imagesRouter.delete("/delete-img/:image_id", verifyToken, imageDelete);

export default imagesRouter;
