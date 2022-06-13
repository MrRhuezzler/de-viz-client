import Logo from "../assests/logo.png";
import { VscTriangleDown } from "react-icons/vsc";
import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../hooks/authContext";

export const pages = [
  { path: "/login", title: "Login" },
  { path: "/register", title: "Register" },
];

export const authenticatedPages = [
  // { path: "/", title: "Home" },
  { path: "/query", title: "Query" },
  { path: "/datasource", title: "Data Source" },
  { path: "/dashboard", title: "Dashboard" },
];

const Navbar = () => {
  const location = useLocation();

  const { auth, loggedin } = useContext(AuthContext);
  const [dropped, setDropped] = useState(false);

  return (
    <div className="h-[50px] px-3 py-2 bg-white">
      <div className="flex flex-row items-center h-full px-4 space-x-5">
        <div className="h-5/6 grow flex flex-row items-center">
          <img src={Logo} className="h-full inline aspect-square" />
          <p className="font-mont italic ml-1">isualize your database</p>
        </div>
        <div className="flex flex-row space-x-4 justify-end items-center grow">
          {auth === null || auth === undefined || auth === {} ? (
            <>
              <div>
                {pages.map((value, index) => (
                  <Link
                    key={index}
                    to={value.path}
                    className={`hover:text-pinkz-500 px-3 py-2 relative ${
                      value.path === location.pathname
                        ? "before:content-[''] before:w-full before:h-[3px] before:bg-pinkz-500 before:absolute before:bottom-0 before:left-0"
                        : ""
                    }`}
                  >
                    {value.title}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row justify-end items-center space-x-3">
                {authenticatedPages.map((value, index) => (
                  <Link
                    key={index}
                    to={value.path}
                    className={`hover:text-pinkz-500 px-3 py-2 relative ${
                      location.pathname.includes(value.path)
                        ? "before:content-[''] before:w-full before:h-[3px] before:bg-pinkz-500 before:absolute before:bottom-0 before:left-0"
                        : ""
                    }`}
                  >
                    {value.title}
                  </Link>
                ))}
              </div>
              <div className="flex flex-row items-center space-x-2">
                <p>{auth?.user?.name}</p>
                <div className="relative">
                  <button>
                    <VscTriangleDown onClick={(e) => setDropped(!dropped)} />
                  </button>
                  {dropped && (
                    <div
                      onMouseLeave={(e) => setDropped(!dropped)}
                      className="absolute top-[150%] z-10 right-0 w-[150px] shadow-xl bg-white"
                    >
                      <div className="flex flex-col">
                        <Link
                          to="/profile"
                          className="px-5 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/logout"
                          className="px-5 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
