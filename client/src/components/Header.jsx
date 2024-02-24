import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="h-16 flex items-center justify-between max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="sm:text-xl text-sm font-bold flex flex-wrap">
            <span className="text-slate-500">Itsh</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="p-3 rounded-lg bg-slate-100 flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none  w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex items-center gap-2">
          <NavLink to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </NavLink>
          <NavLink to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </NavLink>
          <NavLink to="/profile">
            {currentUser ? (
              <img
                className="w-7 h-7 rounded-full object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign In</li>
            )}
          </NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Header;
