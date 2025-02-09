import { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaAngleUp, FaBars, FaTimes } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Header = ({ isMenu }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(10);
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  const navBar = [
    { label: "Home", path: "/" },
    { label: "Product", path: "/products" },
    {
      label: "Services",
      path: "/services",
      services: [
        { label: "Service 1", path: "/services/services-1" },
        { label: "Service 2", path: "/services/services-2" },
        { label: "Service 3", path: "/services/services-3" },
        { label: "Service 4", path: "/services/services-4" },
      ],
    },
    { label: "About", path: "/about" },
  ];

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (window.scrollY > lastScrollY && !isMenu) {
          setIsVisible(false);
          setDropDown(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }, 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isMenu]);

  return (
    <>
      <header
        className={`${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } hidden md:flex fixed transform duration-300 top-0 w-full h-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg justify-between px-8 md:px-8 lg:px-20 items-center text-white z-50`}
      >
        <span className="text-2xl font-bold tracking-wide cursor-pointer">
          <AiFillProduct className="size-10 md:size-12" />
        </span>
        <nav>
          <ul className="flex gap-10 items-center">
            {navBar.map((item, index) => (
              <li
                key={index}
                className="relative text-lg font-medium group"
                onMouseEnter={() => item.services && setDropDown(true)}
                onMouseLeave={
                  useEffect(() =>
                  {
                    const interval = setInterval(() => {
                      setDropDown(false);
                    }, 7000);
                    return () => clearInterval(interval);
                  }, [])
                  }
              >
                <NavLink to={item.path} className="flex items-center gap-2 cursor-pointer">
                  {item.label}
                  {item.services && (dropDown ? <FaAngleUp /> : <FaAngleDown />)}
                  
                </NavLink>
                
                {item.services && dropDown && (
                  <div
                    className="absolute top-14 w-40 bg-gray-800 shadow-lg rounded-xl py-2 z-50"
                    ref={dropdownRef}
                  >
                    <ul>
                      {item.services.map((list, i) => (
                        <li
                          key={i}
                          className="text-lg font-medium flex justify-center items-center hover:bg-white hover:text-gray-900 p-2 cursor-pointer"
                        >
                          <NavLink to={list.path}>{list.label}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <header className="flex md:hidden fixed top-0 w-full h-16 bg-gray-900 shadow-lg px-6 items-center justify-between text-white z-50">
        <span className="text-xl font-bold">
          <AiFillProduct className="size-8" />
        </span>
        <button onClick={() => setMobileMenu(!mobileMenu)} className="text-2xl">
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      <div
        className={`fixed top-0 left-0 h-full w-full flex justify-center items-center bg-gray-900 text-white z-50 transform ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 p-6`}
      >
        <button onClick={() => setMobileMenu(false)} className="absolute top-5 right-5 text-2xl">
          <FaTimes />
        </button>
        <ul className="mt-12 space-y-6">
          {navBar.map((item, index) => (
            <li key={index} className="relative text-xl text-center font-medium">
              {item.services ? (
                <>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setDropDown(!dropDown)}
                  >
                    {item.label} {dropDown ? <FaAngleUp /> : <FaAngleDown />}
                  </div>
                  {dropDown && (
                    <ul className="ml-5 mt-2 space-y-2">
                      {item.services.map((list, i) => (
                        <li key={i} className="text-base cursor-pointer hover:text-gray-400">
                          <NavLink to={list.path}>{list.label}</NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink to={item.path} className="cursor-pointer hover:text-gray-400">
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;