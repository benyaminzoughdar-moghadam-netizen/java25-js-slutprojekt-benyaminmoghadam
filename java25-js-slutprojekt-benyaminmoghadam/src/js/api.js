const API_KEY = "db43f87364e2f674f1a7e3ef480a0b98";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchData(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Request failed");
  }

  const data = await res.json();
  return data.results || [];
}

export function getTopRated() {
  return fetchData(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
}

export function getPopular() {
  return fetchData(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
}

export function searchMovie(query) {
  return fetchData(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
}

export function searchPerson(query) {
  return fetchData(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}`);
}