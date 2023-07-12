import pool from "../db.js";

/**
 *
 * @param {*} uuid the comment id
 * @param {*} id_user the user that is logged in
 * @param {*} id_image the image that is going to be commented
 * @param {*} comment the comment that is going to be created
 * @returns true if the comment was created
 */

export const createComment = async (uuid, id_user, id_image, comment) => {
  try {
    await pool.query(
      "INSERT INTO comments (id_comments, comment_body, activo, user_id, image_id) VALUES (?, ?, ?, ?, ?)",
      [uuid, comment, 1, id_user, id_image]
    );
    return true;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id_image the image id
 * @returns the comments of the image
 */

export const getImageComments = async (id_image) => {
  try {
    const [comments] = await pool.query(
      "SELECT id_user, username, first_name, last_name, email, comments.created_at, profile_photo, comments.activo, id_comments, comment_body FROM users INNER JOIN comments ON users.id_user = comments.user_id WHERE comments.image_id = ? && comments.activo = 1 && users.activo = 1",
      [id_image]
    );
    if (comments.length === 0) {
      return false;
    }
    return comments;
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 *
 * @param {*} id_comment the comment id
 * @returns true if the comment was deleted
 */

export const deleteComment = async (id_comment) => {
  try {
    await pool.query("UPDATE comments SET activo = 0 WHERE id_comments = ?", [
      id_comment,
    ]);
    return true;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id_comment id of the comment that is going to be edited
 * @param {*} comment new comment
 * @returns true if the comment was edited
 */

export const commentEdit = async (id_comment, comment) => {
  try {
    await pool.query(
      "UPDATE comments SET comment_body = ? WHERE id_comments = ?",
      [comment, id_comment]
    );
    return true;
  } catch (error) {
    return error;
  }
};
