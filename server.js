import express from "express";
import fetch from "node-fetch";
import geoip from "geoip-lite";

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "it-IT";

// Middleware log dispositivo + IP + localizzazione
app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'] || "Unknown";
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  let device = "Desktop";
  if (/mobile/i.test(userAgent)) device = "Mobile";
  else if (/tablet|ipad/i.test(userAgent)) device = "Tablet";

  const geo = geoip.lookup(ip) || {};
  const country = geo.country || "Unknown";
  const region = geo.region || "";
  const city = geo.city || "";

  console.log(`🔔 Nuova visita:
Device: ${device}
IP: ${ip}
Localizzazione: ${city} ${region} ${country}
User-Agent: ${userAgent}
---------------------------`);

  next();
});

// Serve file statici
app.use(express.static("public"));

// API film usciti
app.get("/api/usciti", async (req, res) => {
  const r = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&region=IT`
  );
  const data = await r.json();
  res.json(data.results);
});

// API film in uscita
app.get("/api/uscita", async (req, res) => {
  const r = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}&region=IT`
  );
  const data = await r.json();
  res.json(data.results);
});

app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
});
