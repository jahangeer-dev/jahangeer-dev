import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Loading from './components/Loading';

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<string>('hero');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      const sections = ['hero', 'about', 'experience', 'skills', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && scrollPosition >= element.offsetTop) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative">
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ 
            antialias: false, 
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: true
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          <Suspense fallback={null}>
            <Scene3D currentSection={currentSection} />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation */}
      <Navigation currentSection={currentSection} />

      {/* Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Contact />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
