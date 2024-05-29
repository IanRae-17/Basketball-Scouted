// src/components/Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { User, FileText, Airplane, UsersThree } from "phosphor-react";

const Header = () => {
  return (
    <header className="bg-neutral-500 text-white p-4">
      <nav className="container mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Basketball Scouted</h1>
        <div className="hidden md:flex space-x-4">
          <NavLink
            exact
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Players
          </NavLink>
          <NavLink
            to="/contracts"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Contracts
          </NavLink>
          <NavLink
            to="/scouting"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Scouting
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Team
          </NavLink>
        </div>
        <div className="md:hidden flex space-x-4">
          <NavLink
            exact
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            <User size={24} />
          </NavLink>
          <NavLink
            to="/contracts"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            <FileText size={24} />
          </NavLink>
          <NavLink
            to="/scouting"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            <Airplane size={24} />
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }
          >
            <UsersThree size={24} />
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
