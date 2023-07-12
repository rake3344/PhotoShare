import { jwtVerify } from "jose";
import { config } from "dotenv";
config();

export const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) res.status(401).json({ msg: "No access" });
  const jwt = authorization.split(" ")[1];
  if (!jwt) res.status(401).json({ msg: "No access" });
  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      jwt,
      encoder.encode(process.env.SECRET)
    );
    req.id = payload.id;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
