import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center relative z-50 -top-20 w-full h-screen bg-gray-900 text-white space-y-6 overflow-hidden">
      <motion.div
        className="relative w-20 h-20 flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute w-16 h-16 border-4 border-t-yellow-400 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
      </motion.div>
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-yellow-400 rounded-full"
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "mirror",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <motion.p
        className="text-lg font-semibold text-gray-300"
        initial={{ scale: 0.9, opacity: 0.4 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
      >
        Loading products...
      </motion.p>
    </div>
  );
};

export default Loading;