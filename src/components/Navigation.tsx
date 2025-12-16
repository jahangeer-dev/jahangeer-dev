import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface NavigationProps {
  currentSection: string;
}

const Navigation = ({ currentSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-300 ${isScrolled ? 'scale-95' : ''
          }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="holo-card px-2 py-2 rounded-full flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-5 py-2 rounded-full font-medium transition-all ${currentSection === item.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentSection === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full border border-cyan-500/50"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 md:hidden holo-card p-3 rounded-xl"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <motion.span
            className="w-full h-0.5 bg-cyan-400 rounded-full"
            animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 9 : 0 }}
          />
          <motion.span
            className="w-full h-0.5 bg-cyan-400 rounded-full"
            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
          />
          <motion.span
            className="w-full h-0.5 bg-cyan-400 rounded-full"
            animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -9 : 0 }}
          />
        </div>
      </motion.button>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-40 md:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={false}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu */}
        <motion.div
          className="absolute right-4 top-20 holo-card p-4 rounded-2xl min-w-[200px]"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            scale: isMobileMenuOpen ? 1 : 0.8,
            y: isMobileMenuOpen ? 0 : -20
          }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all ${currentSection === item.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : 20 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left"
        style={{
          scaleX: 0,
        }}
        initial={false}
      />
    </>
  );
};

export default Navigation;
