import React from "react";
import TopBar from "../layout/TopBar";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="bg-gray-100 shadow-lg">
      <TopBar />
      <NavBar />
    </header>
  );
};

export default Header;
