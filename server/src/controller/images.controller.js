import { v4 as uuidv4 } from "uuid";
import { getUserLogin } from "../db/querys/user-querys.js";
import {
  countLikes,
  countPosts,
  countPostsFromUser,
  deleteImages,
  dislikeImages,
  getImagesById,
  getImagesByUser,
  getImagesUser,
  likeImages,
  uploadImages,
} from "../db/querys/images-querys.js";

export const uploadImage = async (req, res) => {
  try {
    const { id } = req;
    const uuid = uuidv4();
    const user = await getUserLogin(id);
    if (user.length === 0) return res.status(200).json({ msg: "No login" });
    let imageFile = "";
    if (req.file === undefined) {
      imageFile = "";
    } else {
      imageFile = req.file.filename;
    }
    const uploadImg = await uploadImages(id, uuid, imageFile);
    if (uploadImg === true) res.status(200).json({ msg: "Image uploaded" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const { id } = req;
    const user = await getUserLogin(id);
    if (user.length === 0) return res.status(200).json({ msg: "No login" });
    const images = await getImagesUser(id);
    if (images.length === 0) return res.status(200).json({ msg: "No images" });
    return res.status(200).json({ images });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const imageLike = async (req, res) => {
  try {
    const { id } = req;
    const { image_id } = req.params;
    const user = await getUserLogin(id);
    if (user.length === 0) return res.status(200).json({ msg: "No login" });
    const images = await getImagesUser(id);
    if (images.length === 0) return res.status(200).json({ msg: "No images" });
    const likeImg = await likeImages(id, image_id);
    if (likeImg === true) return res.status(200).json({ msg: "Image liked" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const dislikeImage = async (req, res) => {
  try {
    const { id } = req;
    const { image_id } = req.params;
    const user = await getUserLogin(id);
    if (user.length === 0) res.status(200).json({ msg: "No login" });
    const dislike = await dislikeImages(id, image_id);
    if (dislike === true) res.status(200).json({ msg: "Image disliked" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const postsCount = async (req, res) => {
  try {
    const { id } = req;
    const user = await getUserLogin(id);
    if (user.length === 0) return res.status(200).json({ msg: "No login" });
    const postsNum = await countPosts(id);
    const posts = postsNum[0];
    res.status(200).json({ posts: posts.posts_user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getImagesUserById = async (req, res) => {
  try {
    const { id } = req;
    const { user_id } = req.params;
    const user = await getUserLogin(id);
    if (user.length === 0) return res.status(200).json({ msg: "No login" });
    const images = await getImagesByUser(user_id);
    if (images.length === 0) return res.status(200).json({ msg: "No images" });
    return res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getImageUserById = async (req, res) => {
  try {
    const { id } = req;
    const { image_id } = req.params;
    const user = await getUserLogin(id);
    if (user.length === 0) return res.status(200).json({ msg: "No login" });
    const image = await getImagesById(image_id);
    res.status(200).json({ image });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCountLikes = async (req, res) => {
  try {
    const { id } = req;
    const { image_id } = req.params;
    const user = await getUserLogin(id);
    if (user.length === 0) res.status(200).json({ msg: "No login" });
    const likes = await countLikes(image_id);
    res.status(200).json({ likes: likes[0].likes });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCountPostsFromUser = async (req, res) => {
  try {
    const { id } = req;
    const { user_id } = req.params;
    const user = await getUserLogin(id);
    if (user.length === 0) res.status(200).json({ msg: "No login" });
    const posts = await countPostsFromUser(user_id);
    res.status(200).json({ posts: posts[0].posts });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const imageDelete = async (req, res) => {
  try {
    const { id } = req;
    const { image_id } = req.params;
    const user = await getUserLogin(id);
    if (user.length === 0) res.status(200).json({ msg: "No login" });
    const imageDelete = await deleteImages(image_id);
    if (imageDelete === true) {
      res.status(200).json({ msg: "Image deleted" });
    } else {
      res.status(200).json({ msg: imageDelete });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
