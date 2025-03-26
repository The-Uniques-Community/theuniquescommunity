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
import guestRoute from "./routes/member/guestRoute.js";
import eventRouter from "./routes/admin/eventRoutes.js";
import communityRoutes from './routes/community/community.routes.js'
import googleDriveRoutes from './routes/googleDriveUpload.routes.js'
import memberAdminRouter from "./routes/admin/memberRoute.js";
import fineRouter from "./routes/admin/fineRoute.js";
import publicMemberRouter from "./routes/landing/publicMemberRouter.js";
import memberFineRoute from "./routes/member/fineRoute.js";
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
app.use("/api/fine", memberFineRoute)
app.use("/api/admin", adminRoute);
app.use("/api/admin/member",memberAdminRouter)
app.use("/api/community", communityRoutes);
app.use("/api/blog", blogRouter);
app.use("/auth", authRoutes);
app.use("/api/guest", guestRoute);
app.use("/api/events", eventRouter)
app.use('/upload', googleDriveRoutes);
app.use("/api/admin/fine", fineRouter);
app.use("/api/public/members", publicMemberRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


dbconnect();
