import express from "express";
import http from "http";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 4400;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: [
      "http://localhost:4400",
      "https://campus.unicircle.io",
      "https://api.unicircle.io",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

// Serve React build
app.use(express.static(path.join(__dirname, "build")));

// SPA Fallback → Regex (ONLY working method in Express 5)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server
http.createServer(app).listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
