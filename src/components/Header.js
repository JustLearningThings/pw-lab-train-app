import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

function Header() {
  const { toggleTheme, darkMode } = useTheme();

  return (
    <header className={`py-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'}`} style={ {padding: 15} }>
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Train App</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="hover:text-gray-300 transition duration-300"
              >
                Home
              </Link>
            </li>
            {/* <li>
              <Link
                to="/analytics"
                className="hover:text-gray-300 transition duration-300"
              >
                Analytics
              </Link>
            </li> */}
            <li>
              <Link
                to="/exercises"
                className="hover:text-gray-300 transition duration-300"
              >
                Exercises
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-gray-300 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className="hover:text-gray-300 transition duration-300"
              >
                Toggle Theme
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
