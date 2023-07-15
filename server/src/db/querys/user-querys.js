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
      "SELECT id_user, username, first_name, last_name, email, user_role FROM users WHERE id_user = ? && activo = 1 && user_role = 1",
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
      "SELECT id_user, username, first_name, last_name, email, user_role, profile_photo, activo, followers FROM users WHERE id_user <> ?",
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

export const banUser = async (id_user) => {
  try {
    await pool.query("UPDATE users SET activo = 0 WHERE id_user = ?", [
      id_user,
    ]);
    return true;
  } catch (error) {
    return error;
  }
};

export const unbanUser = async (id_user) => {
  try {
    await pool.query("UPDATE users SET activo = 1 WHERE id_user = ?", [
      id_user,
    ]);
    return true;
  } catch (error) {
    return error;
  }
};

export const mostPopularUsers = async () => {
  try {
    const [populars] = await pool.query(
      "SELECT users.id_user, users.username, users.first_name, users.last_name, users.email, users.profile_photo, users.activo, following_id, COUNT(follower_id) AS followers FROM followers JOIN users ON users.id_user = followers.following_id GROUP BY following_id ORDER BY following_id DESC LIMIT 5"
    );
    return populars;
  } catch (error) {
    return error;
  }
};

export const editProfile = async (
  id,
  username,
  first_name,
  last_name,
  email,
  newPassword
) => {
  try {
    await pool.query(
      "UPDATE users SET username = ?, first_name = ?, last_name = ?, email = ?, pass = ? WHERE id_user = ?",
      [username, first_name, last_name, email, newPassword, id]
    );
    return true;
  } catch (error) {
    return error;
  }
};

export const editProfilePic = async (id, profile_photo) => {
  try {
    await pool.query("UPDATE users SET profile_photo = ? WHERE id_user = ?", [
      profile_photo,
      id,
    ]);
    return true;
  } catch (error) {
    return error;
  }
};

export const updatePassword = async (id, newPassword) => {
  try {
    await pool.query("UPDATE users SET pass = ? WHERE id_user = ?", [
      newPassword,
      id,
    ]);
    return true;
  } catch (error) {
    return error;
  }
};

export const updataUsername = async (id, username) => {
  try {
    await pool.query("UPDATE users SET username = ? WHERE id_user = ?", [
      username,
      id,
    ]);
    return true;
  } catch (error) {
    return error;
  }
};

export const updataEmail = async (id, email) => {
  try {
    await pool.query("UPDATE users SET email = ? WHERE id_user = ?", [
      email,
      id,
    ]);
    return true;
  } catch (error) {
    return error;
  }
};
export const updateFirstName = async (id, first_name) => {
  try {
    await pool.query("UPDATE users SET first_name = ? WHERE id_user = ?", [
      first_name,
      id,
    ]);
    return true;
  } catch (error) {
    return error;
  }
};

export const updateLastName = async (id, last_name) => {
  try {
    await pool.query("UPDATE users SET last_name = ? WHERE id_user = ?", [
      last_name,
      id,
    ]);
    return true;
  } catch (error) {
    return error;
  }
};
