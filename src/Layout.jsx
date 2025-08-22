import { Link, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

export default function Layout() {
  return (
    <div className=" min-h-screen relative">
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
