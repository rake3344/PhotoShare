import { Router } from "express";
import { verifyToken } from "../middlewares/session.js";
import {
  follow,
  getCountFollowers,
  getCountFollowing,
  getFollowersData,
} from "../controller/followers.controller.js";

const followerRouter = Router();

followerRouter.post("/follow/:id_user", verifyToken, follow);
followerRouter.get("/count-followers", verifyToken, getCountFollowers);
followerRouter.get("/count-following", verifyToken, getCountFollowing);
followerRouter.get("/followers-data", verifyToken, getFollowersData);

export default followerRouter;
