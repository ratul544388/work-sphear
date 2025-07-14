import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="flex gap-1 items-center font-bold text-xl">
      <img src="/logo.png" alt="Logo" className="size-10" />
      WorkSphere
    </Link>
  );
};

export default Logo;
