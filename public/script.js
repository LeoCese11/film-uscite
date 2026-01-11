function mostraDettagli(film) {
  const box = document.getElementById("dettagli");

  box.innerHTML = `
    <h3>${film.title}</h3>
    <p><strong>Uscita:</strong> ${film.release_date}</p>
    <p>${film.overview || "Trama non disponibile."}</p>
  `;

  box.style.display = "block";
}

async function caricaFilm(url, elementoId, ordine) {
  const res = await fetch(url);
  let film = await res.json();

  // Ordina per data
  film.sort((a, b) => {
    const dataA = new Date(a.release_date);
    const dataB = new Date(b.release_date);
    return ordine === "desc" ? dataB - dataA : dataA - dataB;
  });

  const lista = document.getElementById(elementoId);
  lista.innerHTML = "";

  film.slice(0, 12).forEach(f => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = f.poster_path
      ? `https://image.tmdb.org/t/p/w200${f.poster_path}`
      : "https://via.placeholder.com/200x300?text=No+Poster";
    img.alt = f.title;

    const titolo = document.createElement("p");
    titolo.textContent = f.title;

    // CLICK sul film
    li.addEventListener("click", () => mostraDettagli(f));

    li.appendChild(img);
    li.appendChild(titolo);
    lista.appendChild(li);
  });
}

caricaFilm("/api/usciti", "usciti", "desc");
caricaFilm("/api/uscita", "uscita", "asc");
