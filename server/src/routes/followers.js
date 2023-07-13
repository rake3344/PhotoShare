import { Router } from "express";
import { verifyToken } from "../middlewares/session.js";
import {
  alreadyFollow,
  countFollowersUser,
  countFollowingUser,
  follow,
  getCountFollowers,
  getCountFollowing,
  getFollowersData,
  unFollow,
} from "../controller/followers.controller.js";

const followerRouter = Router();

followerRouter.post("/follow/:id_user", verifyToken, follow);
followerRouter.get("/count-followers", verifyToken, getCountFollowers);
followerRouter.get("/count-following", verifyToken, getCountFollowing);
followerRouter.get("/followers-data", verifyToken, getFollowersData);
followerRouter.get("/followers-user/:id_user", verifyToken, countFollowersUser);
followerRouter.get("/following-user/:id_user", verifyToken, countFollowingUser);
followerRouter.get("/already-follow/:id_user", verifyToken, alreadyFollow);
followerRouter.delete("/unfollow/:id_user", verifyToken, unFollow);

export default followerRouter;
