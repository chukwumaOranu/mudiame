require("./config/env.config");

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
const footerGalleryRoutes = require("./src/routes/footerGallery.routes");
const bookingRoutes = require("./src/routes/booking.routes");
const contactRoutes = require("./src/routes/contact.routes");
const { testDbConnection } = require("./config/db.config");

const app = express();
app.set("trust proxy", 1);

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
app.use(
  express.json({
    limit: "10mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
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

app.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "mudiame-server",
    message: "Mudiame API is running.",
    health: "/api/health",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/classic-blog", classicBlogRoutes);
app.use("/api/classic-blog/categories", categoryRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/permissions", permissionRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/footer-gallery", footerGalleryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  testDbConnection().catch((error) => {
    console.error("MySQL connection failed:", error.message);
  });
});
