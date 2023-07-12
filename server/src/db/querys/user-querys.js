import pool from "../db.js";

/**
 *
 * @param {*} id the user that is logged in
 * @returns the user login data
 */

export const getUserLogin = async (id) => {
  try {
    const [user] = await pool.query(
      "SELECT id_user, username, first_name, last_name, email FROM users WHERE id_user = ? && activo = 1",
      [id]
    );
    return user;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id
 * @returns the user admin data
 */

export const getUserAdmin = async (id) => {
  try {
    const [user] = await pool.query(
      "SELECT username, first_name, last_name, email, user_role FROM users WHERE id_user = ? && activo = 1 && user_role = 1",
      [id]
    );
    return user;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id
 * @returns all the users data
 */

export const getUsersAdmin = async (id) => {
  try {
    const [users] = await pool.query(
      "SELECT username, first_name, last_name, email, user_role, profile_photo FROM users WHERE id_user <> ?",
      [id]
    );
    return users;
  } catch (error) {
    return error;
  }
};

export const getAllUsersWithImages = async (id) => {
  try {
    const [users] = await pool.query(
      "SELECT id_user, username, first_name, last_name, email, images.created_at, profile_photo, user_role, images.activo, id_image, img FROM users INNER JOIN images ON users.id_user = images.user_id WHERE users.id_user <> ? && users.activo = 1 && images.activo = 1",
      [id]
    );
    return users;
  } catch (error) {
    return error;
  }
};
