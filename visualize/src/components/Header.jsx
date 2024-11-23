// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vocalize</h1>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/history" className="mr-4">History</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
