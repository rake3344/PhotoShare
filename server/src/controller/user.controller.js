import { v4 as uuidv4 } from "uuid";
import pool from "../db/db.js";
import { compare, hash } from "bcrypt";
import { SignJWT } from "jose";
import { config } from "dotenv";
import {
  banUser,
  editProfile,
  editProfilePic,
  getAllUsersWithImages,
  getUserAdmin,
  getUserLogin,
  getUsersAdmin,
  mostPopularUsers,
  unbanUser,
  updataEmail,
  updataUsername,
  updateFirstName,
  updateLastName,
  updatePassword,
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
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const userAdmin = async (req, res) => {
  try {
    const { id } = req;
    const userAdmin = await getUserAdmin(id);
    if (userAdmin.length === 0)
      return res.status(401).json({ msg: "No login" });
    res.status(200).json({ userAdmin });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const userBan = async (req, res) => {
  try {
    const { id } = req;
    const { id_user } = req.params;
    const userAdmin = await getUserAdmin(id);
    if (userAdmin.length === 0) res.status(401).json({ msg: "No access" });
    const ban = await banUser(id_user);
    if (ban === true) {
      res.status(200).json({ msg: "User banned successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const userUnban = async (req, res) => {
  try {
    const { id } = req;
    const { id_user } = req.params;
    const userAdmin = await getUserAdmin(id);
    if (userAdmin.length === 0) res.status(401).json({ msg: "No access" });
    const unBan = await unbanUser(id_user);
    if (unBan === true) {
      res.status(200).json({ msg: "User unbanned successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const mostPopulars = async (req, res) => {
  try {
    const { id } = req;
    const user = await getUserLogin(id);
    if (user.length === 0) return res.status(200).json({ msg: "No login" });
    const populars = await mostPopularUsers();
    res.status(200).json({ populars });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const editProfileUser = async (req, res) => {
  try {
    const { id } = req;
    const { username, first_name, last_name, email, newpassword } = req.body;
    const hashPassword = await hash(newpassword, 12);
    const user = await getUserLogin(id);
    if (user.length === 0) return res.status(200).json({ msg: "No login" });
    if (
      username === "" &&
      first_name === "" &&
      last_name === "" &&
      email === "" &&
      newpassword === ""
    )
      return res.status(200).json({ msg: "Empty fields" });
    if (username && !first_name && !last_name && !email && !newpassword) {
      const editUsername = await updataUsername(id, username);
      if (editUsername === true) {
        return res.status(200).json({ msg: "Profile edited successfully" });
      } else {
        res.status(200).json({ editUsername });
      }
    }

    if (first_name && !username && !last_name && !email && !newpassword) {
      const editFirstName = await updateFirstName(id, first_name);
      if (editFirstName === true) {
        return res.status(200).json({ msg: "Profile edited successfully" });
      } else {
        res.status(200).json({ editFirstName });
      }
    }

    if (last_name && !username && !first_name && !email && !newpassword) {
      const editLastName = await updateLastName(id, last_name);
      if (editLastName === true) {
        return res.status(200).json({ msg: "Profile edited successfully" });
      } else {
        res.status(200).json({ editLastName });
      }
    }

    if (email && !username && !first_name && !last_name && !newpassword) {
      const editEmail = await updataEmail(id, email);
      if (editEmail === true) {
        return res.status(200).json({ msg: "Profile edited successfully" });
      } else {
        res.status(200).json({ editEmail });
      }
    }

    if (newpassword && !username && !first_name && !last_name && !email) {
      const editPassword = await updatePassword(id, hashPassword);
      if (editPassword === true) {
        return res.status(200).json({ msg: "Profile edited successfully" });
      } else {
        res.status(200).json({ editPassword });
      }
    }
    if (username && first_name && last_name && email && newpassword) {
      const editAll = await editProfile(
        id,
        username,
        first_name,
        last_name,
        email,
        hashPassword
      );
      if (editAll === true) {
        return res.status(200).json({ msg: "Profile updated successfully" });
      } else {
        res.status(200).json({ editAll });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const changeProfilePic = async (req, res) => {
  try {
    const { id } = req;
    let file = "";
    if (req.file === undefined) {
      file = "";
    } else {
      file = req.file.filename;
    }
    const changePhoto = await editProfilePic(id, file);
    if (changePhoto === true) {
      res.status(200).json({ msg: "Profile photo changed successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
