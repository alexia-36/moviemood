import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className=" flex justify-between items-center h-12 m-6">
      <Link to="/">
        <img src="logo.png" className="w-13" />
      </Link>
      <nav className="flex justify-between  w-50 ">
        <Link to="movies">
          <h2>Explore Movies</h2>
        </Link>
      </nav>
    </header>
  );
}
