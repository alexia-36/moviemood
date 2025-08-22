import { useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { requestMovie } from "../requestData";

export async function loader({ params }) {
  return await requestMovie({ params });
}

export default function Movie() {
  const movie = useLoaderData();

  // Funcție pentru formatarea numerelor mari
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  // Funcție pentru a calcula procentajul popularității (maxim 1000)
  const calculatePopularityPercentage = (popularity) => {
    return Math.min(100, popularity / 10);
  };

  return (
    <div className="bg-dark-100 text-white rounded-2xl shadow-lg overflow-hidden max-w-6xl mx-auto mt-25">
      <Link
        to="/movies"
        className="absolute top-38 left-11 px-1 py-1 text-white font-bold rounded-lg bg-gradient-to-r from-[#5b6c9f] to-[#486bd1] hover:opacity-70 transition xl:left-17 flex items-center"
      >
        <i className="bxr bx-arrow-left-stroke text-2xl"></i>
        Back to all movies
      </Link>
      <div className="relative h-96">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-100 to-transparent" />
        <div className="absolute bottom-6 left-6 flex gap-6 items-end">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-44 rounded-xl shadow-2xl"
          />
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            {movie.tagline && (
              <p className="italic text-light-200 text-lg mt-2">
                {movie.tagline}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <p className="text-gray-200 mb-6">{movie.overview}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-300 text-sm">
          <p>
            <span className="font-semibold text-white">Release:</span>{" "}
            {movie.release_date}
          </p>
          <p>
            <span className="font-semibold text-white">Runtime:</span>{" "}
            {movie.runtime} min
          </p>
          <p>
            <span className="font-semibold text-white">Language:</span>{" "}
            {movie.original_language.toUpperCase()}
          </p>
          <p>
            <span className="font-semibold text-white">Budget:</span> $
            {movie.budget.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-white">Revenue:</span> $
            {movie.revenue.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-white">Rating:</span>{" "}
            {movie.vote_average} / 10 ({movie.vote_count} votes)
          </p>
          <p className="col-span-2">
            <span className="font-semibold text-white">Genres:</span>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p className="col-span-2">
            <span className="font-semibold text-white">Countries:</span>{" "}
            {movie.production_countries.map((c) => c.name).join(", ")}
          </p>
          <p className="col-span-2">
            <span className="font-semibold text-white">Companies:</span>{" "}
            {movie.production_companies.map((c) => c.name).join(", ")}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scor de popularitate vizual */}
          <div className="bg-dark-100 border border-light-100/20 rounded-xl p-4">
            <h3 className="font-bold mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Audience Score
            </h3>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2.5 rounded-full"
                style={{ width: `${(movie.vote_average / 10) * 100}%` }}
              ></div>
            </div>
            <p className="text-lg flex items-baseline">
              <span className="text-2xl font-bold mr-1">
                {movie.vote_average}
              </span>
              <span className="text-gray-400 text-sm">
                /10 from {formatNumber(movie.vote_count)} votes
              </span>
            </p>
          </div>

          {/* Popularity Meter */}
          <div className="bg-dark-100 border border-light-100/20 rounded-xl p-4">
            <h3 className="font-bold mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-purple-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              Popularity Meter
            </h3>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
                style={{
                  width: `${calculatePopularityPercentage(movie.popularity)}%`,
                }}
              ></div>
            </div>
            <p className="text-lg">
              <span className="text-2xl font-bold mr-1">
                {Math.round(movie.popularity)}
              </span>
              <span className="text-gray-400 text-sm">
                current popularity score
              </span>
            </p>
          </div>

          {/* External Links */}
          <div className="bg-dark-100 border border-light-100/20 rounded-xl p-4 md:col-span-2">
            <h3 className="font-bold mb-4">External Links</h3>
            <div className="flex flex-wrap gap-4">
              {movie.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.68 1.15H5.32C3.15 1.15 1.38 2.92 1.38 5.1v13.8c0 2.17 1.77 3.95 3.94 3.95h13.36c2.17 0 3.95-1.77 3.95-3.95V5.1c0-2.18-1.78-3.95-3.95-3.95zm-6.36 15.43c0 .1-.02.19-.06.28-.07.14-.19.24-.34.3-.09.04-.19.06-.29.06h-1.48c-.21 0-.39-.13-.47-.32l-2.03-5.22-2.16 5.22c-.07.17-.24.3-.44.3H4.28c-.11 0-.22-.03-.3-.08a.6.6 0 01-.24-.85l3.57-8.12c.1-.23.33-.38.58-.38.26 0 .49.15.59.38l3.54 8.12c.1.23.03.5-.17.67zm7.6-.19c0 .33-.27.6-.6.6-.33 0-.6-.27-.6-.6V7.2c0-.33.27-.6.6-.6.33 0 .6.27.6.6v9.19z" />
                  </svg>
                  View on IMDb
                </a>
              )}

              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-[#8e8aff] to-[#7c68ff] text-white rounded-lg font-medium hover:opacity-90 transition"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Official Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
