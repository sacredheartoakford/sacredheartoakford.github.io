#!/usr/bin/env node
// Drive proxy server for the Sacred Heart application site.
// Serves /api/drive-proxy?id=<fileId> -> proxies to Google Drive server-side,
// bypassing the browser CORS/403 block. Runs on 127.0.0.1:41792 (localhost only;
// exposed to the internet via a cloudflared tunnel).
const http = require("http");

const PORT = 41792;
const HOST = "127.0.0.1";

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    });
    res.end();
    return;
  }

  if (url.pathname !== "/api/drive-proxy" || req.method !== "GET") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  const fileId = url.searchParams.get("id");
  if (!fileId || !/^[a-zA-Z0-9_-]+$/.test(fileId)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing or invalid id parameter" }));
    return;
  }

  const driveUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=download`;

  fetch(driveUrl, {
    method: "GET",
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  })
    .then(async (driveRes) => {
      const contentType = driveRes.headers.get("content-type") || "application/octet-stream";
      const body = Buffer.from(await driveRes.arrayBuffer());
      res.writeHead(driveRes.status, {
        "Content-Type": contentType,
        "Content-Length": body.length,
        "Access-Control-Allow-Origin": "*",
      });
      res.end(body);
    })
    .catch((err) => {
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `Proxy failed: ${err.message}` }));
    });
});

server.listen(PORT, HOST, () => {
  console.log(`drive-proxy listening on ${HOST}:${PORT}`);
});
