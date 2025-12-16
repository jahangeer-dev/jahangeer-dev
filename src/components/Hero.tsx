import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const roles = ["Full Stack Developer", "MERN Stack Trainer", "Backend Architect", "Tech Mentor"];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Aurora effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)',
            top: '10%',
            left: '60%',
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(191,0,255,0.12) 0%, transparent 70%)',
            bottom: '20%',
            left: '10%',
          }}
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <motion.div
          className="text-center"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
          }}
        >
          {/* Profile with holographic ring */}
          <motion.div
            className="mb-10 flex justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring' }}
          >
            <div className="relative">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-dashed border-cyan-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border border-purple-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* Profile image */}
              <div className="relative glow-border rounded-full p-1">
                <img
                  src="/profile.jpeg"
                  alt="Jahangeer I"
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover"
                />
                {/* Status indicator */}
                <motion.div
                  className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-4 border-[#0a0a1a]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Floating particles around image */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400"
                  style={{
                    top: `${30 + Math.sin(i * 60 * (Math.PI / 180)) * 60}%`,
                    left: `${50 + Math.cos(i * 60 * (Math.PI / 180)) * 60}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Glitch Name */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 glitch"
            data-text="JAHANGEER"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="gradient-text-aurora">JAHANGEER</span>
          </motion.h1>

          {/* Animated role text */}
          <motion.div
            className="h-12 mb-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.h2
              key={currentRole}
              className="text-2xl md:text-3xl lg:text-4xl font-bold neon-text"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {roles[currentRole]}
            </motion.h2>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Building the future with{' '}
            <span className="text-cyan-400">MERN Stack</span> &{' '}
            <span className="text-purple-400">Microservices</span>.
            <br />
            Mentored <span className="text-pink-400 font-bold">200+</span> students.
            Delivered <span className="text-green-400 font-bold">10+</span> production apps.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              className="cyber-button px-10 py-4 rounded-lg text-lg font-semibold tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>⚡</span>
                HIRE ME
              </span>
            </motion.button>

            <motion.button
              className="holo-card px-10 py-4 rounded-lg text-lg font-semibold tracking-wide text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex items-center gap-2">
                <span>🚀</span>
                EXPLORE
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="mt-16 flex justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[
              { href: 'mailto:jahangeer7704@gmail.com', icon: '📧', label: 'Email' },
              { href: 'https://www.linkedin.com/in/jahangeer-dev/', icon: '💼', label: 'LinkedIn' },
              { href: 'https://github.com/jahangeer-dev', icon: '🐙', label: 'GitHub' },
            ].map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="holo-card w-14 h-14 rounded-full flex items-center justify-center text-2xl pulse-glow"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-8 h-14 border-2 border-cyan-400/50 rounded-full flex justify-center relative overflow-hidden"
            animate={{
              boxShadow: [
                '0 0 10px rgba(0,245,255,0.3)',
                '0 0 30px rgba(0,245,255,0.5)',
                '0 0 10px rgba(0,245,255,0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-4 bg-cyan-400 rounded-full mt-2"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <motion.p
            className="text-cyan-400/60 text-xs mt-2 text-center tracking-widest"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SCROLL
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
