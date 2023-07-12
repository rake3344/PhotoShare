import {
  countFollowers,
  countFollowing,
  followUser,
  followersData,
  userAlreadyFollow,
} from "../db/querys/followers-querys.js";
import { getUserLogin } from "../db/querys/user-querys.js";

export const follow = async (req, res) => {
  try {
    const { id } = req;
    const { id_user } = req.params;
    const user = await getUserLogin(id);
    if (user.length === 0) return res.status(200).json({ msg: "No login" });
    const userFollow = await getUserLogin(id_user);
    if (userFollow.length === 0)
      return res.status(200).json({ msg: "User does not exist" });
    const alreadyFollow = await userAlreadyFollow(id, id_user);
    if (alreadyFollow === true)
      return res.status(200).json({ msg: "Already follow" });
    await followUser(id, id_user);
    return res.status(200).json({ msg: "Followed successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getCountFollowers = async (req, res) => {
  try {
    const { id } = req;
    const followersCount = await countFollowers(id);
    const followers = followersCount[0];
    res.status(200).json({ followers: followers.followers_user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getCountFollowing = async (req, res) => {
  try {
    const { id } = req;
    const followingCount = await countFollowing(id);
    const following = followingCount[0];
    res.status(200).json({ following: following.following_user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getFollowersData = async (req, res) => {
  try {
    const { id } = req;
    const followers = await followersData(id);
    res.status(200).json({ followers });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
