import { Router } from "express";
import { verifyToken } from "../middlewares/session.js";
import {
  comment,
  commentDelete,
  editComment,
  getCommentsFromImage,
} from "../controller/comments.controller.js";

const commentsRouter = Router();

commentsRouter.post("/:image_id", verifyToken, comment);
commentsRouter.get(
  "/image-comments/:image_id",
  verifyToken,
  getCommentsFromImage
);
commentsRouter.delete("/:comment_id", verifyToken, commentDelete);
commentsRouter.put("/edit-comment/:comment_id", verifyToken, editComment);

export default commentsRouter;
