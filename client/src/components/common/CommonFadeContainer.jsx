import { motion } from "framer-motion";

import React from "react";

const CommonFadeContainer = ({ children, stagger = 0.3, className = "" }) => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const childrenWithVariants = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { variants: itemVariants })
      : child,
  );

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      {childrenWithVariants}
    </motion.div>
  );
};

export default CommonFadeContainer;
