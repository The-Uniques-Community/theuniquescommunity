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
import passwordResetRoutes from './routes/member/otpRoute.js'
import guestRoute from "./routes/member/guestRoute.js";
import eventRouter from "./routes/admin/eventRoutes.js";
import communityRoutes from './routes/community/community.routes.js'
import googleDriveRoutes from './routes/googleDriveUpload.routes.js'
import memberAdminRouter from "./routes/admin/memberRoute.js";
import fineRouter from "./routes/admin/fineRoute.js";
import publicMemberRouter from "./routes/landing/publicMemberRouter.js";
import memberFineRoute from "./routes/member/fineRoute.js";
import publicEnquiryRouter from "./routes/landing/publicRoute.js";
import enquiryRoute from "./routes/admin/enquiryRoute.js";
import { getAuth } from "./controller/googleDriveService.js";
import { google } from 'googleapis';
import campusAmbassadorRouter from "./routes/community/campusAmbassadorRoute.js";
import migrationRouter from "./routes/admin/migrationRoutes.js";
import trainerRoute from "./routes/admin/trainerRoute.js";
import projectRouter from "./routes/community/projectRoute.js";
import statsRouter from "./routes/community/statsRoute.js";
import batchRouter from "./routes/community/batchRoute.js";
import communityBenefitsRouter from "./routes/community/communityBenefitsRoute.js";
import customMemberRouter from "./routes/community/customMemberRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
// Check if an origin is permitted: all vercel.app subdomains, localhost, organization domains, and configured env vars
const isAllowedOrigin = (origin) => {
  // Allow requests with no origin (e.g. mobile apps, curl, Postman, server-to-server)
  if (!origin) return true;

  try {
    const { hostname } = new URL(origin);

    // Allow vercel.app root and all *.vercel.app subdomains
    if (hostname === "vercel.app" || hostname.endsWith(".vercel.app")) {
      return true;
    }

    // Allow localhost and 127.0.0.1 for local development
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".localhost")
    ) {
      return true;
    }

    // Allow community domain(s)
    if (hostname === "theuniques.in" || hostname.endsWith(".theuniques.in")) {
      return true;
    }

    // Allow origins configured via environment variables (comma-separated or single)
    const envOrigins = [
      process.env.CLIENT_URL,
      process.env.FRONTEND_URL,
      process.env.ALLOWED_ORIGINS,
    ].filter(Boolean);

    for (const envOrigin of envOrigins) {
      const allowedList = envOrigin.split(",").map((s) => s.trim());
      for (const allowed of allowedList) {
        if (!allowed) continue;
        if (allowed === origin) return true;
        try {
          if (new URL(allowed).hostname === hostname) return true;
        } catch (_) {}
      }
    }

    return false;
  } catch {
    return false;
  }
};

// Robust CORS middleware handling allowed origins and preflight requests
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (isAllowedOrigin(origin)) {
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, token, X-Requested-With, Accept, Origin"
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, Authorization, token");
  }

  if (req.method === "OPTIONS") {
    if (isAllowedOrigin(origin)) {
      return res.status(204).end();
    }
    return res.status(403).json({ message: "Not allowed by CORS" });
  }
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token", "X-Requested-With", "Accept", "Origin"],
    exposedHeaders: ["Content-Type", "Authorization", "token"],
    optionsSuccessStatus: 204,
  })
);
// Ensure database is connected on serverless requests
app.use(async (req, res, next) => {
  try {
    await dbconnect();
  } catch (err) {
    console.error("DB connection error in middleware:", err);
  }
  next();
});

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("hello its working");
});

app.use("/api/member", memberRoute);
app.use("/api/fine", memberFineRoute)
app.use("/api/admin", adminRoute);
app.use("/api/admin/member",memberAdminRouter)
app.use("/api/community", communityRoutes);
app.use("/api/blogs", blogRouter);
app.use("/auth", authRoutes);
app.use("/auth/password-reset", passwordResetRoutes); // Add this line
app.use("/api/guest", guestRoute);
app.use("/api/events", eventRouter)
app.use('/upload', googleDriveRoutes);
app.use("/api/admin/fine", fineRouter);
app.use("/api/public/members", publicMemberRouter);
app.use('/api/contact', publicEnquiryRouter);
app.use('/api/admin/enquiry', enquiryRoute);
app.use('/api', campusAmbassadorRouter);
app.use('/api/admin/migration', migrationRouter);
app.use("/api/admin/trainers", trainerRoute);
app.use("/api/projects", projectRouter);
app.use("/api/community/projects", projectRouter);
app.use("/api/stats", statsRouter);
app.use("/api/batches", batchRouter);
app.use("/api/community-benefits", communityBenefitsRouter);
app.use("/api/custom-members", customMemberRouter);


app.get('/api/image-proxy/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;
    if (!fileId) {
      return res.status(400).send('File ID is required');
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    // Get the auth client from your existing Google Drive service
    const auth = await getAuth();
    const drive = google.drive({ version: 'v3', auth });
    
    // Get the actual file content as a stream directly (single API roundtrip)
    const response = await drive.files.get({
      fileId,
      alt: 'media'
    }, { responseType: 'stream' });
    
    // Set content type and cache headers
    res.setHeader('Content-Type', response.headers['content-type'] || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    
    // Pipe the image data directly to the response
    response.data.pipe(res);
  } catch (error) {
    console.error('Error proxying Google Drive image:', error?.message || error);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.status(200).send(
      '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="#f1f5f9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">Image N/A</text></svg>'
    );
  }
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;