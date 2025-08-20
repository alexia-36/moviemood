import { useState, useEffect, use } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

import Search from "../components/Search";
import MoviesCard from "../components/MoviesCard";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
//functie care incarca filmele
export async function loader(text = "") {
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

export default function Movies() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedInputDebounced] = useDebounce(searchInput, 500);

  const [movies, setMovies] = useState(useLoaderData() || []);

  const moviesEl = movies.map((movie) => (
    <div key={movie.id}>
      <Link to={`/movies/${movie.id}`}>
        <MoviesCard movie={movie} />
      </Link>
    </div>
  ));

  // apeleaza loader pentru a incarca filmele cautate
  useEffect(() => {
    async function fetchMovies() {
      const response = await loader(searchedInputDebounced);
      setMovies(response || []);
    }
    fetchMovies();
  }, [searchedInputDebounced]);

  return (
    <div>
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      {movies && moviesEl}
    </div>
  );
}
