import Footer from "@/components/footer";
import React from "react";
import { Outlet } from "react-router";

const LayoutWithFooter = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutWithFooter;
