import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-[#050510] flex items-center justify-center z-50">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Aurora effects */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.2) 0%, transparent 70%)' }}
        animate={{ x: [-100, 100, -100], y: [-100, 100, -100] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(191,0,255,0.15) 0%, transparent 70%)' }}
        animate={{ x: [100, -100, 100], y: [100, -100, 100] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="text-center relative z-10">
        {/* Animated rings */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <motion.div
            className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-4 border-4 border-purple-500/30 rounded-full"
            animate={{ rotate: -360, scale: [1, 0.9, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-8 border-4 border-pink-500/30 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-5xl">🚀</span>
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-2">
            <span className="gradient-text">INITIALIZING</span>
          </h2>
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
