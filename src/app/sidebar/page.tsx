"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsShare } from "react-icons/bs";
import type { JSX } from "react";
interface NavItem {
  icon: JSX.Element;
  title: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sideList: NavItem[] = [
    {
      icon: <AiOutlineHome className="text-2xl" />,
      title: "item 1",
    },
    {
      icon: <AiOutlineHome className="text-2xl" />,
      title: "item 2",
    },
    {
      icon: <AiOutlineHome className="text-2xl" />,
      title: "item 3",
    },
    {
      icon: <AiOutlineHome className="text-2xl" />,
      title: "item 4",
    },
  ];

  const navList: NavItem[] = [
    {
      icon: <AiOutlineHome className="text-2xl mr-2" />,
      title: "item",
    },
    {
      icon: <AiOutlineHome className="text-2xl" />,
      title: "",
    },
    {
      icon: <AiOutlineHome className="text-2xl" />,
      title: "",
    },
  ];

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

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

  return (
    <nav className="flex w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-10">
      <div className="flex items-center">
        <button className="mr-2" aria-label="Open Menu" onClick={handleDrawer}>
          <GiHamburgerMenu className="text-3xl" />
        </button>

        <img
          src="https://i.imgur.com/520zDfd.png"
          alt="Logo"
          className="h-auto w-24"
        />
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex md:justify-between md:bg-transparent">
          {navList.map(({ icon, title }, index) => (
            <button
              key={index}
              title="Wishlist"
              className="flex items-center p-3 font-medium mr-2 text-center bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              <span>{icon}</span>
              <span>{title}</span>
            </button>
          ))}
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
        <span className="flex w-full items-center p-4 border-b">
          <img
            src="https://i.imgur.com/520zDfd.png"
            alt="Logo"
            className="h-auto w-32 mx-auto"
          />
        </span>
        {sideList.map(({ icon, title }, index) => (
          <span
            key={index}
            className="flex items-center p-4 hover:bg-pink-500 hover:text-white"
          >
            <span className="mr-2">{icon}</span>
            <span>{title}</span>
          </span>
        ))}
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
  );
};

export default Navbar;
