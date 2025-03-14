import { motion } from "framer-motion";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export function Loading({ size = "md", message }: LoadingProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`relative ${sizes[size]}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer ring with neon glow */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 border-[#9F00FF]
                     shadow-[0_0_20px_rgba(159,0,255,0.6),inset_0_0_15px_rgba(159,0,255,0.4)]`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
            boxShadow: [
              "0 0 20px rgba(159,0,255,0.6), inset 0 0 15px rgba(159,0,255,0.4)",
              "0 0 40px rgba(159,0,255,0.8), inset 0 0 30px rgba(159,0,255,0.6)",
              "0 0 20px rgba(159,0,255,0.6), inset 0 0 15px rgba(159,0,255,0.4)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Inner spinning circle */}
        <motion.div
          className={`absolute inset-2 rounded-full bg-gradient-to-r from-[#9F00FF] to-[#B94FFF]
                     shadow-[0_0_15px_rgba(159,0,255,0.4)]`}
          animate={{
            rotate: 360,
            scale: [1, 0.9, 1],
            background: [
              "linear-gradient(to right, #9F00FF, #B94FFF)",
              "linear-gradient(to right, #B94FFF, #9F00FF)",
              "linear-gradient(to right, #9F00FF, #B94FFF)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute inset-[35%] rounded-full bg-white"
          animate={{
            opacity: [1, 0.5, 1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {message && (
        <motion.p
          className="text-[#9F00FF] font-medium"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
