require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRoutes = require("./src/routes/auth.routes");
const classicBlogRoutes = require("./src/routes/classicBlog.routes");
const categoryRoutes = require("./src/routes/category.routes");
const adminUserRoutes = require("./src/routes/adminUser.routes");
const permissionRoutes = require("./src/routes/permission.routes");
const portfolioRoutes = require("./src/routes/portfolio.routes");

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(
  helmet({
    // Allow frontend origin to render uploaded images/files served from this API.
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve(__dirname, "src/upload")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change-this-in-env",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "mudiame-server" });
});

app.use("/api/auth", authRoutes);
app.use("/api/classic-blog", classicBlogRoutes);
app.use("/api/classic-blog/categories", categoryRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/permissions", permissionRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
