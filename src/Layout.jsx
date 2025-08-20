import { Link, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
