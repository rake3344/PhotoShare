import { v4 as uuidv4 } from "uuid";
import pool from "../db/db.js";
import { compare, hash } from "bcrypt";
import { SignJWT } from "jose";
import { config } from "dotenv";
import {
  getAllUsersWithImages,
  getUserAdmin,
  getUserLogin,
  getUsersAdmin,
} from "../db/querys/user-querys.js";
config();

export const register = async (req, res) => {
  try {
    const { username, first_name, last_name, email, pass } = req.body;
    const uuid = uuidv4();
    if (!username || !first_name || !last_name || !email || !pass)
      return res.status(200).json({ error: "fill all fields" });
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (user.length > 0) {
      return res.status(200).json({ error: "User already exists" });
    }
    const hashedPassword = await hash(pass, 12);
    await pool.query(
      "INSERT INTO users (id_user, username, first_name, last_name, email, pass, user_role, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [uuid, username, first_name, last_name, email, hashedPassword, 0, 1]
    );

    return res.status(200).json({ msg: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, pass } = req.body;
    if (!email || !pass)
      return res.status(200).json({ msg: "fill all fields" });
    const [user] = await pool.query(
      "SELECT * FROM users WHERE email = ? && activo = 1",
      [email]
    );
    if (user.length > 0) {
      const match = await compare(pass, user[0].pass);
      if (match) {
        const jwtConstructor = new SignJWT({
          id: user[0].id_user,
        });
        const encoder = new TextEncoder();
        const jwt = jwtConstructor
          .setProtectedHeader({
            alg: "HS256",
            type: "JWT",
          })
          .setIssuedAt()
          .setExpirationTime("7d")
          .sign(encoder.encode(process.env.SECRET));
        const access = await jwt;
        res.status(200).json({ access });
      } else {
        res.status(200).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(200).json({ error: "User does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { id } = req;
    const user = await getUserAdmin(id);
    if (user.length === 0) return res.status(401).json({ msg: "No login" });
    const users = await getUsersAdmin(id);
    res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req;
    const [user] = await pool.query(
      "SELECT id_user, username, first_name, last_name, email, user_role, profile_photo FROM users WHERE id_user = ?",
      [id]
    );
    const userProfile = user[0];
    if (user.length === 0) return res.status(200).json({ msg: "No login" });
    res.status(200).json({ userProfile });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const uploadPhotoProfile = async (req, res) => {
  try {
    const { id } = req;
    let file = "";
    if (req.file === undefined) {
      file = "";
    } else {
      file = req.file.filename;
    }

    const [user] = await pool.query(
      "SELECT username, first_name, last_name FROM users WHERE id_user = ?",
      [id]
    );
    if (user.length > 0) {
      await pool.query("UPDATE users SET profile_photo = ? WHERE id_user = ?", [
        file,
        id,
      ]);
      return res.status(200).json({ msg: "Photo uploaded successfully" });
    } else {
      return res.status(200).json({ msg: "No login" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getAllImagesWithUser = async (req, res) => {
  try {
    const { id } = req;
    const user = await getUserLogin(id);
    if (user.length === 0) return res.status(200).json({ msg: "No login" });
    const images = await getAllUsersWithImages(id);
    // const imagesActive = images.filter((image) => image.activo === 1);
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
