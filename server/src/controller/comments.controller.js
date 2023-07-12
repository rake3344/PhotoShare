import {
  commentEdit,
  createComment,
  deleteComment,
  getImageComments,
} from "../db/querys/comments-query.js";
import { v4 as uuidv4 } from "uuid";
import { getUserLogin } from "../db/querys/user-querys.js";

export const comment = async (req, res) => {
  try {
    const { id } = req;
    const { image_id } = req.params;
    const { comment } = req.body;
    const uuid = uuidv4();
    const user = await getUserLogin(id);
    if (user.length === 0) res.status(200).json({ msg: "No login" });
    const commented = await createComment(uuid, id, image_id, comment);
    if (commented === true) res.status(200).json({ msg: "Comment created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCommentsFromImage = async (req, res) => {
  try {
    const { id } = req;
    const { image_id } = req.params;
    const user = await getUserLogin(id);
    if (user.length === 0) res.status(200).json({ msg: "No login" });
    const comments = await getImageComments(image_id);
    if (comments === false) {
      res.status(200).json({ msg: "No comments" });
    } else {
      res.status(200).json({ comments });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const commentDelete = async (req, res) => {
  try {
    const { id } = req;
    const { comment_id } = req.params;
    const user = await getUserLogin(id);
    if (user.length === 0) res.status(200).json({ msg: "No login" });
    const banComment = await deleteComment(comment_id);
    if (banComment === true) res.status(200).json({ msg: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const editComment = async (req, res) => {
  try {
    const { id } = req;
    const { comment_id } = req.params;
    const { comment } = req.body;
    const user = await getUserLogin(id);
    if (user.length === 0) res.status(200).json({ msg: "No login" });
    const editComment = await commentEdit(comment_id, comment);
    if (editComment === true) res.status(200).json({ msg: "Comment edited" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
