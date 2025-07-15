import { cn } from "@/lib/utils";
import React from "react";

const SectionHeading = ({ className = "", children, gradient }) => {
  return (
    <h2
      className={cn(
        "font-bold text-center leading-12! text-3xl sm:text-4xl sm:leading-14 md:text-5xl md:leading-16 opacity-80",
        gradient &&
          "bg-gradient-to-r from-blue-500 via-blue-700 to-blue-500 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default SectionHeading;
