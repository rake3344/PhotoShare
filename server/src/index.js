import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import followerRouter from "./routes/followers.js";
import imagesRouter from "./routes/images.js";
import commentsRouter from "./routes/comments.js";
config();

const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/user", userRouter);
app.use("/followers", followerRouter);
app.use("/images", imagesRouter);
app.use("/comments", commentsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
