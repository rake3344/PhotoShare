import pool from "../db.js";

/**
 *
 * @param {*} id_user the user that is logged in
 * @param {*} id_image the image that is going to be uploaded
 * @param {*} title the title of the image
 * @param {*} imageFile the image file that is going to be uploaded
 * @returns true if the image was uploaded
 */

export const uploadImages = async (id_user, id_image, imageFile) => {
  try {
    await pool.query(
      "INSERT INTO images(id_image, img, user_id, activo) VALUES (?, ?, ?, ?)",
      [id_image, imageFile, id_user, 1]
    );
    return true;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id_user the user that is logged in
 * @returns the images of the user
 */

export const getImagesUser = async (id_user) => {
  try {
    const [images] = await pool.query(
      "SELECT * FROM images WHERE user_id = ?",
      [id_user]
    );
    return images;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id_user the user that is logged in
 * @param {*} id_image the image that is going to be liked
 * @returns true if the image was liked
 */

export const likeImages = async (id_user, id_image) => {
  try {
    await pool.query(
      "INSERT INTO images_likes(user_id, image_id) VALUES (?, ?)",
      [id_user, id_image]
    );
    return true;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id_user
 * @param {*} id_image
 * @returns true if the image was disliked
 */

export const dislikeImages = async (id_user, id_image) => {
  try {
    await pool.query(
      "DELETE FROM images_likes WHERE user_id = ? && image_id = ?",
      [id_user, id_image]
    );
    return true;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id the user that is logged in
 * @returns the number of posts of the user
 */

export const countPosts = async (id) => {
  try {
    const [postsCount] = await pool.query(
      "SELECT COUNT('id_image') AS posts_user FROM images WHERE user_id = ?",
      [id]
    );
    return postsCount;
  } catch (error) {
    return error;
  }
};

export const getImagesAllWithUser = async () => {
  try {
    const [images] = await pool.query("SELECT * FROM images");
    return images;
  } catch (error) {
    return error;
  }
};

export const getImagesByUser = async (user_id) => {
  try {
    const [images] = await pool.query(
      "SELECT id_user, username, first_name, last_name, email, profile_photo, id_image, img FROM users INNER JOIN images ON users.id_user = images.user_id WHERE users.id_user = ?",
      [user_id]
    );
    return images;
  } catch (error) {
    return error;
  }
};

export const getImagesById = async (id_image) => {
  try {
    const [images] = await pool.query(
      "SELECT id_user, username, first_name, last_name, email, profile_photo, id_image, img FROM users INNER JOIN images ON users.id_user = images.user_id WHERE images.id_image = ?",
      [id_image]
    );
    return images;
  } catch (error) {
    return error;
  }
};

export const countLikes = async (id_image) => {
  try {
    const [likes] = await pool.query(
      "SELECT COUNT(user_id) AS likes FROM images_likes WHERE image_id = ?",
      [id_image]
    );
    return likes;
  } catch (error) {
    return error;
  }
};
