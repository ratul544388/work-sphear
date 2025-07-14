import React from "react";
import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <motion.div
      animate={{ opacity: [0, 1], transition: { delay: 1, duration: 0 } }}
      className="h-screen flex items-center justify-center"
    >
      <span className="loader block" />
    </motion.div>
  );
};

export default PageLoader;
