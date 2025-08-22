import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className=" flex justify-between items-center  ">
      <Link to="/">
        <img
          src="../public/logo2.svg"
          className="w-13 bg-gradient-to-r from-[#6b66ef] to-[#6385ed]  p-1 rounded-2xl"
        />
      </Link>
      <nav className="flex justify-between">
        <Link to="movies">
          <h2 className="px-5 py-2 text-white font-bold rounded-lg bg-gradient-to-r from-[#6b66ef] to-[#504afa] hover:opacity-70 transition">
            Explore Movies
          </h2>
        </Link>
      </nav>
    </header>
  );
}
