// import { useLoaderData } from "react-router-dom";

// const API_BASE_URL = "https://api.themoviedb.org/3/movie";
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const API_OPTIONS = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${API_KEY}`,
//   },
// };

// export async function loader({ params }) {
//   const endpoint = `${API_BASE_URL}/${params.id}`;
//   const response = await fetch(endpoint, API_OPTIONS);
//   if (!response.ok) {
//     throw new Error("Failed to fetch movies");
//   }
//   const data = await response.json();
//   return data;
// }

// export default function Movie() {
//   const movie = useLoaderData();

//   return "movie";
//}
import { useLoaderData } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function loader({ params }) {
  const endpoint = `${API_BASE_URL}/${params.id}`;
  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }
  const data = await response.json();
  return data;
}

export default function Movie() {
  const movie = useLoaderData();

  // Formatare date și durată
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Backdrop cu titlu și tagline */}
      <div
        className="h-[28rem] w-full bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.85)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        }}
      >
        <div className="absolute bottom-10 left-10 max-w-4xl">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="text-2xl italic text-blue-300 mt-2 drop-shadow">
              {movie.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Conținut principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Poster */}
          <div className="lg:w-2/5 xl:w-1/3 flex justify-center lg:justify-start">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl shadow-2xl w-80 transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Informații - în dreptul posterului */}
          <div className="lg:w-3/5 xl:w-2/3 bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
            {/* Genuri */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-blue-700/70 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-gray-800/40 p-6 rounded-lg">
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Status
                </p>
                <p className="font-semibold text-lg">{movie.status}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Data lansării
                </p>
                <p className="font-semibold text-lg">
                  {formatDate(movie.release_date)}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Durată
                </p>
                <p className="font-semibold text-lg">
                  {formatRuntime(movie.runtime)}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Rating
                </p>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl mr-2">★</span>
                  <span className="font-semibold text-lg">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    ({movie.vote_count} voturi)
                  </span>
                </div>
              </div>

              {movie.budget > 0 && (
                <div>
                  <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                    Buget
                  </p>
                  <p className="font-semibold text-lg">
                    ${movie.budget.toLocaleString()}
                  </p>
                </div>
              )}

              {movie.revenue > 0 && (
                <div>
                  <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                    Venituri
                  </p>
                  <p className="font-semibold text-lg">
                    ${movie.revenue.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
                Prezentare
              </h2>
              <p className="text-lg leading-relaxed text-gray-100">
                {movie.overview}
              </p>
            </div>

            {/* Informații de producție - Grid compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Companii de producție */}
              {movie.production_companies.length > 0 && (
                <div className="bg-gray-800/60 p-5 rounded-xl">
                  <h2 className="text-xl font-bold mb-3 text-white">
                    Companii de producție
                  </h2>
                  <div className="space-y-3">
                    {movie.production_companies.map((company) => (
                      <div key={company.id} className="flex items-center">
                        {company.logo_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            className="h-8 mr-3 bg-white p-1 rounded"
                          />
                        ) : (
                          <div className="h-8 w-8 mr-3 bg-gray-700 rounded flex items-center justify-center">
                            <span className="text-xs">🎬</span>
                          </div>
                        )}
                        <span>{company.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Țări de producție */}
              {movie.production_countries.length > 0 && (
                <div className="bg-gray-800/60 p-5 rounded-xl">
                  <h2 className="text-xl font-bold mb-3 text-white">
                    Țări de producție
                  </h2>
                  <div className="space-y-2">
                    {movie.production_countries.map((country) => (
                      <div
                        key={country.iso_3166_1}
                        className="flex items-center"
                      >
                        <span className="text-2xl mr-2">🌍</span>
                        <span>{country.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Limbi vorbite */}
              {movie.spoken_languages.length > 0 && (
                <div className="bg-gray-800/60 p-5 rounded-xl">
                  <h2 className="text-xl font-bold mb-3 text-white">
                    Limbi vorbite
                  </h2>
                  <div className="space-y-2">
                    {movie.spoken_languages.map((language) => (
                      <div
                        key={language.iso_639_1}
                        className="flex items-center"
                      >
                        <span className="text-2xl mr-2">🗣️</span>
                        <span>{language.english_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Link-uri externe */}
              <div className="bg-gray-800/60 p-5 rounded-xl">
                <h2 className="text-xl font-bold mb-3 text-white">
                  Mai multe informații
                </h2>
                <div className="space-y-3">
                  {movie.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${movie.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition"
                    >
                      <span className="text-2xl mr-2">🎭</span>
                      <span>Pagina IMDb</span>
                    </a>
                  )}
                  {movie.homepage && (
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition"
                    >
                      <span className="text-2xl mr-2">🌐</span>
                      <span>Site-ul oficial</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
