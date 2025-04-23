"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogin, MdAppRegistration } from "react-icons/md";
import { FaProductHunt, FaBlog } from "react-icons/fa";
import { BsShare } from "react-icons/bs";
import { RiArticleLine, RiShoppingCart2Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { MdHomeMini } from "react-icons/md"; 
import { CgProfile } from "react-icons/cg";

const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / winHeight) * 100;
    setScrollWidth(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-75"
      style={{ width: `${scrollWidth}%` }}
    />
  );
};

interface NavItem {
  icon: JSX.Element;
  title: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const router = useRouter();

  const publicNav: NavItem[] = [
    { icon: <MdLogin className="text-2xl mr-2" />, title: "Login", href: "/login" },
    { icon: <MdAppRegistration className="text-2xl mr-2" />, title: "Register", href: "/register" },
  ];

  const privateNav: NavItem[] = [
    { icon: <FaProductHunt className="text-2xl mr-2" />, title: "Product", href: "/product" },
    { icon: <MdHomeMini  className="text-2xl mr-2" />, title: "Home", href: "/" },
    { icon: <FaBlog className="text-2xl mr-2" />, title: "Blog", href: "/blog" },
    { icon: <RiArticleLine className="text-2xl mr-2" />, title: "SSG", href: "/ssg" },
    { icon: <RiArticleLine className="text-2xl mr-2" />, title: "Posts", href: "/posts" },
    { icon: <RiShoppingCart2Line className="text-2xl mr-2" />, title: "Cart", href: "/cart" },
    { icon: <CgProfile className="text-2xl mr-2" />, title: "Profile", href: "/profile" }

    
  ];

  const navList: NavItem[] = isLoggedIn ? privateNav : publicNav;

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("user-logged-out"));
    setIsLoggedIn(false);
    router.push("/login");
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
  
    checkToken();
  
    window.addEventListener("user-logged-in", checkToken);
    window.addEventListener("user-logged-out", checkToken);
  
    return () => {
      window.removeEventListener("user-logged-in", checkToken);
      window.removeEventListener("user-logged-out", checkToken);
    };
  }, []);
  
  useEffect(() => {
    const handleEscKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);
    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);

  
 

  
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <ScrollProgress />
      
      <nav className="flex w-full items-center justify-between px-6 h-16 bg-blue text-gray-700 border-b border-gray-200 z-10">
        <div className="flex items-center">
          <button className="mr-2" aria-label="Open Menu" onClick={handleDrawer}>
            <GiHamburgerMenu className="text-3xl" />
          </button>
          <span className="flex justify-center p-4 border-b">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-center"
            >
              Manish
            </motion.div>
          </span>
        </div>


        <div className="flex items-center">
          <div className="hidden md:flex md:justify-between md:bg-transparent">
            {navList.map(({ icon, title, href }, index) => (
              <Link key={index} href={href}>
                <button
                  title={title}
                  className="flex items-center p-2 font-medium mr-2 text-center bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                >
                  <span>{icon}</span>
                  <span>{title}</span>
                </button>
              </Link>
              
            ))}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="p-2 bg-red-500 text-white rounded ml-4 hover:bg-red-600"
              >
                Logout
              </button>
            )}
             
          </div>
        </div>

        {isOpen && (
          <div className="z-10 fixed inset-0 transition-opacity">
            <div
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black opacity-50"
              tabIndex={0}
            ></div>
          </div>
        )}

  
        <aside
          className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <span className="flex justify-center p-4 border-b">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-center"
            >
              Manish
            </motion.div>
          </span>


          {navList.map(({ icon, title, href }, index) => (
            <Link key={index} href={href}>
              <span className="flex items-center p-4 hover:bg-pink-500 hover:text-white cursor-pointer">
                <span className="mr-2">{icon}</span>
                <span>{title}</span>
              </span>
            </Link>
          ))}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center p-4 text-white bg-red-500 hover:bg-red-600 w-full"
            >
              Logout
            </button>
          )}

          <div className="fixed bottom-0 w-full">
            <button className="flex items-center p-4 text-white bg-blue-500 hover:bg-blue-600 w-full">
              <span className="mr-2">
                <BsShare className="text-2xl" />
              </span>
              <span>Share</span>
            </button>
          </div>
        </aside>
      </nav>
    </>
  );
};

export default Navbar;
