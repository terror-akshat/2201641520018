const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const app = express();
app.use(express.json());

let urlStore = {};
let clickStats = {};

app.post("/shorturls", (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let code = shortcode || uuidv4().slice(0, 6);

  if (urlStore[code]) {
    return res.status(400).json({ error: "Shortcode already exists" });
  }

  const expiry = moment().add(validity, "minutes").toISOString();

  urlStore[code] = {
    originalUrl: url,
    createdAt: new Date().toISOString(),
    expiry,
  };

  clickStats[code] = [];

  return res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry,
  });
});

app.get("/:shortcode", (req, res) => {
  const { shortcode } = req.params;
  const data = urlStore[shortcode];

  if (!data) {
    return res.status(404).json({ error: "Shortcode not found" });
  }

  if (new Date() > new Date(data.expiry)) {
    return res.status(410).json({ error: "Short URL expired" });
  }

  clickStats[shortcode].push({
    timestamp: new Date().toISOString(),
    referrer: req.get("referer") || null,
    ip: req.ip,
  });

  return res.redirect(data.originalUrl);
});

app.get("/shorturls/:shortcode", (req, res) => {
  const { shortcode } = req.params;
  const data = urlStore[shortcode];

  if (!data) {
    return res.status(404).json({ error: "Shortcode not found" });
  }

  const stats = {
    originalUrl: data.originalUrl,
    createdAt: data.createdAt,
    expiry: data.expiry,
    totalClicks: clickStats[shortcode].length,
    clicks: clickStats[shortcode],
  };

  return res.json(stats);
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
