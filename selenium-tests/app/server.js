const path = require("path");
const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 3000;
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Enable JSON body parsing
app.use(express.static(path.join(__dirname, "public")));

const authGuard = (req, res, next) => {
  if (req.cookies.auth === "1") {
    return next();
  }
  return res.redirect("/login");
};

// API Routes
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const isJson = req.headers['content-type'] === 'application/json' || req.headers['accept'] === 'application/json';
  
  if (username === "demo" && password === "demo") {
    res.cookie("auth", "1", { httpOnly: true });
    if (isJson) {
      return res.json({ success: true, redirect: "/dashboard" });
    }
    return res.redirect("/dashboard");
  }
  
  if (isJson) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  return res.redirect("/login?error=1");
});

app.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/login?logout=1");
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  return res.send(`Uploaded: ${req.file.originalname}`);
});

app.get("/api/delayed", (req, res) => {
  const delayMs = Number(req.query.delay || 2000);
  setTimeout(() => {
    res.json({ message: "Loaded after delay", at: new Date().toISOString() });
  }, delayMs);
});

// SPA Handling
const serveSpa = (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
};

app.get("/", serveSpa);
app.get("/login", serveSpa);
app.get("/dashboard", authGuard, serveSpa);
app.get("/dashboard/*", authGuard, serveSpa); // Handle dashboard sub-routes

// Specific pages from legacy that might be direct routes now
app.get("/new-window", (req, res) => {
    // Keep legacy behavior if needed, or migrate to SPA?
    // The test might expect a simple HTML page for new-window.
    // If we migrate, it should be a route in SPA.
    serveSpa(req, res);
});

app.get("/iframe-content", (req, res) => {
    // This is likely loaded inside an iframe. It should probably be a simple static file or a specific route.
    // We can serve a specific file for this if we want to keep it simple, or make it a route.
    // For now, let's assume we migrated it to a route /iframe-content
    serveSpa(req, res);
});


// Catch-all for SPA
app.get("*", (req, res) => {
    if (req.path.startsWith('/api') || req.path.includes('.')) {
        return res.status(404).send('Not Found');
    }
    serveSpa(req, res);
});

app.listen(port, () => {
  console.log(`Demo app running on http://localhost:${port}`);
});
