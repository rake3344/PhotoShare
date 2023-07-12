import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import __dirname from "../helpers/dirname.js";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../../client/src/uploads"),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Archivo debe ser una imagen valida");
  },
}).single("image");

export default upload;
