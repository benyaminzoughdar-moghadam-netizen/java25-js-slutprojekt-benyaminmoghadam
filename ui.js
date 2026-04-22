const IMG_URL = "https://image.tmdb.org/t/p/w200";

export function renderMovies(movies, limit = true) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const list = limit ? movies.slice(0, 10) : movies;

  list.forEach(movie => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${movie.poster_path ? IMG_URL + movie.poster_path : ''}" />
      <h3>${movie.title || "No title"}</h3>
      <p>${movie.release_date || ""}</p>
      <p>⭐ ${movie.vote_average ?? ""}</p>
      <p>${movie.overview || ""}</p>
    `;

    app.appendChild(div);
  });
}

export function renderPersons(persons) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  persons.forEach(person => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${person.profile_path ? IMG_URL + person.profile_path : ''}" />
      <h3>${person.name || "No name"}</h3>
      <p>⭐ ${person.popularity ?? ""}</p>
      <p>${person.known_for_department || ""}</p>
      <div>
        ${(person.known_for || []).map(item => `
          <p>${item.media_type === "movie" ? "Movie" : "TV"}: ${item.title || item.name || ""}</p>
        `).join("")}
      </div>
    `;

    app.appendChild(div);
  });
}