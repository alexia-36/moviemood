import { useState, useEffect } from "react";
import { useLoaderData, Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

import Search from "../components/Search";
import MoviesCard from "../components/MoviesCard";
import { requestMovies } from "../requestData";

import { updateSearchCount } from "../appwrite";

//returneaza filmele curente
export async function loader() {
  return await requestMovies();
}

const GENRES = {
  28: "action",
  35: "comedy",
  18: "drama",
  878: "science fiction",
  27: "horror",
  10749: "romance",
  53: "thriller",
  12: "adventure",
};

export default function Movies() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedInputDebounced] = useDebounce(searchInput, 500);

  const [movies, setMovies] = useState(useLoaderData() || []);

  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get("genre") || "all";

  //adaug scroll
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const moviesEl = movies //aici nu exista ternary pentru ca genre mereu o sa aiba valoare (fie gen fi "all")
    .filter((movie) => {
      if (genre == "all") return true;
      return movie.genre_ids.some((id) => GENRES[id] === genre);
    })

    .map((movie) => (
      <div key={movie.id}>
        <Link
          to={`/movies/${movie.id}`}
          state={{ searchParams: searchParams.toString(), genre: genre }}
        >
          <MoviesCard movie={movie} />
        </Link>
      </div>
    ));

  //functie care face update la searchParams
  function handleFilter(key, value) {
    setSearchParams(() => {
      if (value === "all") {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
      return searchParams;
    });
  }

  // apeleaza requestMovies pentru a incarca filmele cautate
  useEffect(() => {
    async function requestSearchedhMovies() {
      const response = await requestMovies(searchedInputDebounced);
      setMovies(response || []);
      if (searchedInputDebounced && response.length > 0) {
        await updateSearchCount(searchedInputDebounced, response[0]);
      }
    }
    requestSearchedhMovies();
  }, [searchedInputDebounced]);

  //prettier-ignore
  return (
    <div className="space-y-9">
      <h1 className="mt-[70px]">
        Find <span className="text-gradient">Movies</span> You'll Enjoy Without
        the Hassle
      </h1>

      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <h2 className="mt-20 mb-4 text-white text-2xl font-bold sm:text-3xl">
        All Movies
      </h2>
      <section className="flex flex-wrap gap-3">
        <button className="px-4 py-2 rounded-full bg-red-800 hover:bg-red-900 text-white font-medium transition" onClick={() => handleFilter("genre", "action")}>Action</button>
        <button className="px-4 py-2 rounded-full bg-cyan-800 hover:bg-cyan-900 text-white font-medium transition" onClick={() => handleFilter("genre", "science fiction")}>Science Fiction</button>
        <button className="px-4 py-2 rounded-full bg-yellow-700 hover:bg-yellow-800 text-white font-medium transition" onClick={() => handleFilter("genre", "comedy")}>Comedy</button>
        <button className="px-4 py-2 rounded-full bg-purple-800 hover:bg-purple-900 text-white font-medium transition" onClick={() => handleFilter("genre", "drama")}>Drama</button>
        <button className="px-4 py-2 rounded-full bg-pink-800 hover:bg-pink-900 text-white font-medium transition" onClick={() => handleFilter("genre", "romance")}>Romance</button>
        <button className="px-4 py-2 rounded-full bg-neutral-700 hover:bg-neutral-800 text-white font-medium transition" onClick={() => handleFilter("genre", "horror")}>Horror</button>
        <button className="px-4 py-2 rounded-full bg-orange-800 hover:bg-orange-900 text-white font-medium transition" onClick={() => handleFilter("genre", "thriller")}>Thriller</button>
        <button className="px-4 py-2 rounded-full bg-green-800 hover:bg-green-900 text-white font-medium transition" onClick={() => handleFilter("genre", "adventure")}>Adventure</button>
        <button className="px-4 py-2 rounded-full bg-[#6b66ef] hover:bg-[#6385ed] text-white font-medium transition" onClick={() => handleFilter("genre", "all")}>All</button>
     </section>



      <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies && moviesEl}
      </ul>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[#5b6c9f] to-[#486bd1] text-white p-3 rounded-full shadow-lg hover:opacity-80 transition">↑</button>)}
    </div>
  );
}
