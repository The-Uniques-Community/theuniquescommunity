import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbconnect from "./config/dbConfig.js";
import cookieParser from "cookie-parser";
import memberRoute from "./routes/member/memberRoute.js";
import adminRoute from "./routes/admin/adminRoute.js";
import blogRouter from "./routes/member/blogRoute.js";
import passport from './config/passport.js';
import authRoutes from './routes/Authentication/auth.routes.js';
import communityRoutes from './routes/community/community.routes.js'
import googleDriveRoutes from './routes/googleDriveUpload.routes.js'
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
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("hello its working");
});

app.use("/api/member", memberRoute);
app.use("/api/admin", adminRoute);
app.use("/api/community", communityRoutes);
app.use("/api/blog", blogRouter);
app.use("/auth", authRoutes);
app.use('/upload', googleDriveRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

dbconnect();
