import { motion } from "framer-motion";

const InlineLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white shadow-lg">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-yellow-400 rounded-full"
            animate={{ y: [-6, 6, -6], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "mirror",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <motion.p
        className="text-gray-300 mt-3 text-sm font-semibold"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror" }}
      >
        Loading data...
      </motion.p>
    </div>
  );
};

export default InlineLoader;