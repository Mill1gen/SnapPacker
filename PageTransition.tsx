import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 20,
        filter: 'blur(10px)',
        boxShadow: '0 0 0 rgba(108,36,76,0)'
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        boxShadow: [
          '0 0 20px rgba(108,36,76,0.3)',
          '0 0 40px rgba(108,36,76,0.2)',
          '0 0 20px rgba(108,36,76,0.3)'
        ]
      }}
      exit={{ 
        opacity: 0, 
        y: -20,
        filter: 'blur(10px)',
        boxShadow: '0 0 0 rgba(108,36,76,0)'
      }}
      transition={{
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
        boxShadow: {
          repeat: Infinity,
          duration: 2,
        }
      }}
      className="relative"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.15, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(108,36,76,0.15), transparent)`,
          filter: 'blur(40px)',
          transform: 'translateZ(0)',
        }}
      />
      {children}
    </motion.div>
  );
}