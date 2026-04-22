import { getTopRated, getPopular, searchMovie, searchPerson } from "./api.js";
import { renderMovies, renderPersons } from "./ui.js";

let currentData = [];
let currentType = "";

export function setupEvents() {

  const topBtn = document.getElementById("topRatedBtn");
  const popularBtn = document.getElementById("popularBtn");
  const sortSelect = document.getElementById("sortSelect");
  const form = document.getElementById("searchForm");

  if (!topBtn || !popularBtn || !sortSelect || !form) {
    console.error("Elements not found in DOM");
    return;
  }

  topBtn.addEventListener("click", async () => {
    try {
      document.getElementById("app").innerHTML = "Loading...";
      const movies = await getTopRated();
      currentData = movies;
      currentType = "movie";
      renderMovies(movies, true);
    } catch (error) {
      console.error(error);
      showError("Något gick fel vid top rated");
    }
  });

  popularBtn.addEventListener("click", async () => {
    try {
      document.getElementById("app").innerHTML = "Loading...";
      const movies = await getPopular();
      currentData = movies;
      currentType = "movie";
      renderMovies(movies, true);
    } catch (error) {
      console.error(error);
      showError("Något gick fel vid popular");
    }
  });

  sortSelect.addEventListener("change", () => {
    if (currentData.length === 0) return;

    let sorted = [...currentData];
    const value = sortSelect.value;

    if (value === "title-asc") {
      sorted.sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));
    }

    if (value === "title-desc") {
      sorted.sort((a, b) => (b.title || b.name).localeCompare(a.title || a.name));
    }

    if (value === "rating-asc") {
      sorted.sort((a, b) => (a.vote_average || a.popularity) - (b.vote_average || b.popularity));
    }

    if (value === "rating-desc") {
      sorted.sort((a, b) => (b.vote_average || b.popularity) - (a.vote_average || a.popularity));
    }

    if (currentType === "movie") {
      renderMovies(sorted, false);
    } else {
      renderPersons(sorted);
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = document.getElementById("searchInput").value.trim();
    const type = document.getElementById("searchType").value;

    if (!query) {
      showError("Skriv något i sökfältet");
      return;
    }

    try {
      let results;

      if (type === "movie") {
        document.getElementById("app").innerHTML = "Loading...";
        results = await searchMovie(query);

        if (results.length === 0) {
          showError("Inga filmer hittades");
          return;
        }

        currentData = results;
        currentType = "movie";
        renderMovies(results, false);

      } else {
        document.getElementById("app").innerHTML = "Loading...";
        results = await searchPerson(query);

        if (results.length === 0) {
          showError("Inga personer hittades");
          return;
        }

        currentData = results;
        currentType = "person";
        renderPersons(results);
      }

    } catch (error) {
      console.error(error);
      showError("Något gick fel vid sökning");
    }
  });
}

function showError(message) {
  const app = document.getElementById("app");
  app.innerHTML = `<p style="color:red;">${message}</p>`;
}