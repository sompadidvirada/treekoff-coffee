import { motion } from "framer-motion";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1] // Standard deceleration curve
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;