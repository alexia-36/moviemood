import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Movies, { loader as moviesLoader } from "./pages/Movies.jsx";
import Movie, { loader as movieLoader } from "./pages/Movie.jsx";

import Error from "./Error.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="movies" element={<Movies />} loader={moviesLoader} />
      <Route path="movies/:id" element={<Movie />} loader={movieLoader} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

createRoot(document.getElementById("root")).render(<App />);
