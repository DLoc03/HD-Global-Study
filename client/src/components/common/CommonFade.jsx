import { motion } from "framer-motion";

const CommonFade = ({
  children,
  duration = 0.8,
  y = 30,
  className = "",
  variants,
}) => {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
};

export default CommonFade;
