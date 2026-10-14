#!/usr/bin/env node
// Minimal static server that applies GitHub Pages-style _headers rules.
// Used ONLY for local testing — not deployed, not part of the app.
const http = require("http");
const fs = require("fs");
const path = require("path");

const DIST = path.resolve(__dirname, "..", "dist");
const HEADERS_FILE = path.join(DIST, "_headers");

// Parse _headers: a "path:" line starts a block; following indented
// "Header: value" lines belong to that path. Lines before any path: are global.
const rules = []; // { path, name, value }
let currentPath = "/*";
if (fs.existsSync(HEADERS_FILE)) {
  const lines = fs.readFileSync(HEADERS_FILE, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#") || trimmed === "") continue;
    // Detect a path header line: ends with ':' and looks like a path (starts with /)
    // and is NOT indented (path headers are at column 0).
    const isIndented = line !== line.trimStart();
    if (!isIndented && trimmed.endsWith(":")) {
      currentPath = trimmed.slice(0, -1).trim();
      continue;
    }
    // Header line: "Name: value"
    const idx = trimmed.indexOf(":");
    if (idx === -1) continue;
    const name = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    rules.push({ path: currentPath, name, value });
  }
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

const matches = (rulePath, reqPath) => {
  if (rulePath === "/*") return true;
  if (rulePath === reqPath) return true;
  return reqPath.startsWith(rulePath);
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let filePath = path.join(DIST, decodeURIComponent(url.pathname));

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const indexHtml = path.join(DIST, "index.html");
    if (fs.existsSync(indexHtml) && url.pathname !== "/_headers") {
      filePath = indexHtml;
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || "application/octet-stream";

  const headers = { "Content-Type": contentType };
  for (const rule of rules) {
    if (matches(rule.path, url.pathname) && rule.name.toLowerCase() !== "content-type") {
      headers[rule.name] = rule.value;
    }
  }
  res.writeHead(200, headers);
  fs.createReadStream(filePath).pipe(res);
});

server.listen(41900, "127.0.0.1", () => {
  console.log(`Test server on http://127.0.0.1:41900 — ${rules.length} header rules loaded`);
});
