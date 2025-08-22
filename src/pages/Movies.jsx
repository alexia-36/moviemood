import { useState, useEffect, use } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

import Search from "../components/Search";
import MoviesCard from "../components/MoviesCard";
import { requestMovies } from "../requestData";

import { updateSearchCount } from "../appwrite";

//returneaza filmele curente
export async function loader() {
  return await requestMovies();
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

  // apeleaza requestMovies pentru a incarca filmele cautate
  useEffect(() => {
    async function requestSearchedhMovies() {
      const response = await requestMovies(searchedInputDebounced);
      setMovies(response || []);
      if (searchedInputDebounced && response.results.length > 0) {
        await updateSearchCount(searchedInputDebounced, response.results[0]);
      }
    }
    requestSearchedhMovies();
  }, [searchedInputDebounced]);

  return (
    <div className="space-y-9">
      <h1 className="mt-[70px]">
        Find <span className="text-gradient">Movies</span> You'll Enjoy Without
        the Hassle
      </h1>

      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <h2 className="mt-20 mb-4 text-[#aabcf5]  text-2xl font-bold sm:text-3xl">
        All Movies
      </h2>

      <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies && moviesEl}
      </ul>
    </div>
  );
}
