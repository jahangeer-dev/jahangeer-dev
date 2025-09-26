import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavigationProps, NavItem } from '../types';

const Navigation: React.FC<NavigationProps> = ({ currentSection }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 p-4 hidden md:block"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-full px-6 py-3">
            <div className="flex items-center justify-between">
              <motion.div
                className="text-xl font-bold gradient-text"
                whileHover={{ scale: 1.05 }}
              >
                Jahangeer I
              </motion.div>
              <div className="flex space-x-6">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      currentSection === item.id
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        className="fixed top-4 right-4 z-50 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          className="glass p-3 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-6 h-6 flex flex-col justify-center">
            <motion.div
              className="w-full h-0.5 bg-white mb-1"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
            />
            <motion.div
              className="w-full h-0.5 bg-white mb-1"
              animate={{ opacity: isOpen ? 0 : 1 }}
            />
            <motion.div
              className="w-full h-0.5 bg-white"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
            />
          </div>
        </motion.button>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="absolute top-16 right-0 glass rounded-lg p-4 w-48"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all duration-300 ${
                  currentSection === item.id
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => scrollToSection(item.id)}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
