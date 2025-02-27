import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbconnect from "./config/dbConfig.js";
import cookieParser from "cookie-parser";
import memberRoute from "./routes/member/memberRoute.js";
import adminRoute from "./routes/admin/adminRoute.js";
import blogRouter from "./routes/member/blogRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello its working");
});

app.use("/api/member", memberRoute);
app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

dbconnect();
