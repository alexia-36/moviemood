const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
//functie care incarca filmele curente si cautate
export async function requestMovies(text = "") {
  const endpoint = text
    ? `${API_BASE_URL}/search/movie?query=${text}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.results;
}

//functie care incarca un film specific
export async function requestMovie({ params }) {
  const endpoint = `${API_BASE_URL}/movie/${params.id}`;
  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }
  const data = await response.json();
  return data;
}
