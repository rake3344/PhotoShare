import pool from "../db.js";

/**
 *
 * @param {*} id the user that is logged in
 * @param {*} id_user the user that is going to be followed
 * @returns true if the user is already following the other user or false if not
 */

export const userAlreadyFollow = async (id, id_user) => {
  try {
    const [alreadyFollow] = await pool.query(
      "SELECT * FROM followers WHERE follower_id = ? && following_id = ?",
      [id, id_user]
    );
    if (alreadyFollow.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id the user that is logged in
 * @param {*} id_user the user that is going to be followed
 * @returns follow the user
 */

export const followUser = async (id, id_user) => {
  try {
    await pool.query(
      "INSERT INTO followers (follower_id, following_id) VALUES (?, ?)",
      [id, id_user]
    );
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id the user that is logged in
 * @returns the count of followers of the user
 */

export const countFollowers = async (id) => {
  try {
    const [followersCount] = await pool.query(
      "SELECT COUNT('follower_id') AS followers_user FROM followers WHERE following_id = ?",
      [id]
    );
    return followersCount;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id the user that is logged in
 * @returns the count of following of the user
 */

export const countFollowing = async (id) => {
  try {
    const [followingCount] = await pool.query(
      "SELECT COUNT('following_id') AS following_user FROM followers WHERE follower_id = ?",
      [id]
    );
    return followingCount;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id the user that is logged in
 * @returns the followers data of the user
 */

export const followersData = async (id) => {
  try {
    const [followers] = await pool.query(
      "SELECT username, first_name, last_name, email, profile_photo FROM users INNER JOIN followers ON users.id_user = followers.follower_id WHERE following_id = ?",
      [id]
    );
    return followers;
  } catch (error) {
    return error;
  }
};

export const getCountFollowersFromUser = async (id_user) => {
  try {
    const [followers] = await pool.query(
      "SELECT COUNT('follower_id') AS followers_user FROM followers WHERE following_id = ?",
      [id_user]
    );
    return followers;
  } catch (error) {
    return error;
  }
};

export const getCountFollowingFromUser = async (id_user) => {
  try {
    const [following] = await pool.query(
      "SELECT COUNT('following_id') AS following_user FROM followers WHERE follower_id = ?",
      [id_user]
    );
    return following;
  } catch (error) {
    return error;
  }
};

export const unfollowUser = async (id, id_user) => {
  try {
    await pool.query(
      "DELETE FROM followers WHERE follower_id = ? && following_id = ?",
      [id, id_user]
    );
    return true;
  } catch (error) {
    return error;
  }
};
