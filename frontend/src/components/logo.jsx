import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router";

const Logo = ({ invert, className }) => {
  return (
    <Link
      to="/"
      className={cn(
        "flex gap-1 items-center font-bold text-xl",
        invert && "brightness-0 invert",
        className
      )}
    >
      <img src="/logo.png" alt="Logo" className="size-10" />
      WorkSphere
    </Link>
  );
};

export default Logo;
