import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getTrendingMovies } from "../appwrite";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function loadTrendingMovies() {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    }
    loadTrendingMovies();
  }, []);

  const trendingMoviesEl = trendingMovies.map((movie, index) => (
    <li key={movie.$id}>
      <p>{index + 1}</p>
      <Link to={`/movies/${movie.movie_id}`}>
        <img
          src={movie.poster_url ? movie.poster_url : "/no-movie.png"}
          alt={movie.searchTerm}
        />
      </Link>
    </li>
  ));

  return (
    <div className="flex flex-col items-center justify-center ">
      <img src="/hero.png" alt="Hero image" className="w-150 mt-1" />
      <h1 className="mt-[-50px]">
        Find your next favorite film with
        <span className="text-gradient"> MovieMood</span>
      </h1>
      <h3 className=" mt-2 mx-auto max-w-4xl text-center text-xl  leading-tight tracking-[-1%] text-[#aabcf5] sm:text-[25px] sm:leading-[30px]">
        Search movies by title, explore detailed information, and uncover
        everything from plots and casts to ratings and reviews—all in one place.
      </h3>

      {trendingMovies && (
        <section className="trending">
          <h2 className="text-white font-bold text-2xl sm:text-3xl">
            Trending Movies
          </h2>
          <ul className="flex flex-row overflow-y-auto gap-5 -mt-8 w-full hide-scrollbar">
            {trendingMoviesEl}
          </ul>
        </section>
      )}
    </div>
  );
}
