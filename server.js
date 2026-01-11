import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

const API_KEY = "571264ec4418dc0e55025e65dde09283"; // <- Metti qui la tua API TMDb
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "it-IT";

app.use(express.static("public"));

// Film usciti di recente
app.get("/api/usciti", async (req, res) => {
  const r = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&region=IT`
  );
  const data = await r.json();
  res.json(data.results);
});

// Film in uscita
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
