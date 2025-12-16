import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useInView } from 'framer-motion';

// ==================== DATA ====================
const DATA = {
  name: "Jahangeer I",
  role: "Tech",
  roles: ["Full Stack Developer", "MERN Stack Trainer", "Backend Architect", "Tech Mentor"],
  bio: "Building scalable web applications with MERN Stack & Microservices. Mentored 200+ students in modern web technologies.",
  email: "jahangeer7704@gmail.com",
  phone: "+91 8428140571",
  location: "Villupuram, Tamil Nadu",
  linkedin: "https://linkedin.com/in/jahangeer-dev",
  github: "https://github.com/jahangeer-dev",
  stats: [
    { icon: "🎓", value: 8.4, label: "CGPA", suffix: "" },
    { icon: "👥", value: 200, label: "STUDENTS", suffix: "+" },
    { icon: "🚀", value: 10, label: "PROJECTS", suffix: "+" },
    { icon: "📜", value: 6, label: "CERTS", suffix: "+" },
  ],
  skills: {
    Languages: [{ name: "JavaScript", level: 95 }, { name: "TypeScript", level: 90 }, { name: "Java", level: 85 }],
    Frontend: [{ name: "React.js", level: 95 }, { name: "Next.js", level: 85 }, { name: "Tailwind", level: 90 }, { name: "Framer Motion", level: 88 }],
    Backend: [{ name: "Node.js", level: 95 }, { name: "Express.js", level: 92 }, { name: "REST APIs", level: 95 }, { name: "Socket.io", level: 82 }],
    Database: [{ name: "MongoDB", level: 90 }, { name: "MySQL", level: 85 }, { name: "Redis", level: 80 }, { name: "Docker", level: 85 }],
  },
  experience: [
    { role: "MERN Stack Trainer", company: "GzofTech", period: "Jan 2025", icon: "👨‍🏫" },
    { role: "Backend Developer", company: "Chronexa", period: "May-Jun 2025", icon: "⚙️" },
    { role: "Full Stack Developer", company: "Tred Scanner", period: "Mar-May 2025", icon: "🌐" },
  ],
  projects: [
    { name: "GzofTech", desc: "Educational platform for MERN Stack training", tech: ["React", "Node.js", "MongoDB"], image: "/gzoft.png" },
    { name: "PatchWatch", desc: "Security vulnerability monitoring system", tech: ["Next.js", "Prisma", "NVD API"], image: "/patchwatch.png" },
    { name: "Tred Scanner", desc: "Community platform with microservices", tech: ["React", "MongoDB", "Redis"], image: "/tredscanner.png" },
  ],
};

// ==================== CUSTOM CURSOR ====================
function MagicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Update trails
      trailsRef.current.forEach((trail, i) => {
        if (trail) {
          setTimeout(() => {
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
          }, i * 30);
        }
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .interactive')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Trailing particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailsRef.current[i] = el; }}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999] transition-all"
          style={{
            background: `rgba(139, 92, 246, ${0.5 - i * 0.1})`,
            transform: 'translate(-50%, -50%)',
            transitionDuration: `${100 + i * 50}ms`,
          }}
        />
      ))}

      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] rounded-full border-2 border-purple-500/50"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          borderColor: isHovering ? 'rgba(236, 72, 153, 0.8)' : 'rgba(139, 92, 246, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      {/* Cursor dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}

// ==================== PARTICLE NETWORK ====================
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < 80; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p, i) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse attraction
        const dx = mousePos.current.x - p.x;
        const dy = mousePos.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += dx * 0.0002;
          p.vy += dy * 0.0002;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${0.6 - dist / 500})`;
        ctx.fill();

        // Draw connections
        particles.current.slice(i + 1).forEach(p2 => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 - d / 800})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} id="particles-canvas" />;
}

// ==================== MORPHING BLOBS ====================
function MorphingBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] blur-[100px] opacity-30"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
          left: '-10%',
          top: '-10%',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }}
        animate={{
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '50% 60% 30% 60% / 30% 30% 70% 70%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] blur-[80px] opacity-25"
        style={{
          background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
          right: '-5%',
          bottom: '-5%',
        }}
        animate={{
          borderRadius: [
            '40% 60% 60% 40% / 70% 30% 70% 30%',
            '60% 40% 30% 70% / 30% 70% 40% 60%',
            '40% 60% 60% 40% / 70% 30% 70% 30%',
          ],
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] blur-[60px] opacity-20"
        style={{
          background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
          left: '40%',
          top: '40%',
        }}
        animate={{
          scale: [1, 1.3, 0.9, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ==================== CINEMATIC LOADER ====================
function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#0a0a1a] z-[10000] flex items-center justify-center"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="text-center">
        {/* Animated rings */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: i === 0 ? '#8b5cf6' : i === 1 ? '#ec4899' : '#22d3ee' }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.1, 1] }}
              transition={{ duration: 2 - i * 0.3, repeat: Infinity, ease: 'linear' }}
            />
          ))}
          <motion.div
            className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%]"
            style={{ width: `${progress}%` }}
            animate={{ backgroundPosition: ['0%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Text */}
        <motion.p
          className="text-white/50 text-sm tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          LOADING EXPERIENCE
        </motion.p>
      </div>
    </motion.div>
  );
}

// ==================== CHARACTER BY CHARACTER TEXT ====================
function AnimatedText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            type: 'spring',
            stiffness: 100,
          }}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// ==================== TYPING EFFECT ====================
function TypingText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setIndex((index + 1) % texts.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, texts]);

  return (
    <span className="text-purple-400">
      {text}
      <motion.span
        className="inline-block w-[3px] h-6 bg-purple-400 ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </span>
  );
}

// ==================== ANIMATED COUNTER ====================
function Counter({ value, suffix = "" }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ==================== LIQUID SKILL BAR ====================
function LiquidSkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="mb-4"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <motion.span
          className="text-purple-400 font-bold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="liquid-bar">
        <motion.div
          className="liquid-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1.5, ease: 'easeOut' }}
        >
          <div className="liquid-glow" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ==================== 3D CARD ====================
function Card3D({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotate({ x: (y - 0.5) * -20, y: (x - 0.5) * 20 });
    setGlarePos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      className={`glass-card p-6 relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, type: 'spring' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      {/* Glare effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15), transparent 50%)`,
        }}
      />
      <div style={{ transform: 'translateZ(30px)' }}>{children}</div>
    </motion.div>
  );
}

// ==================== MAIN APP ====================
function App() {
  const [loading, setLoading] = useState(true);
  const [activeSkill, setActiveSkill] = useState('Frontend');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      <AnimatePresence>
        {loading && <CinematicLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen relative">
          <ParticleNetwork />
          <MorphingBlobs />
          <MagicCursor />

          {/* Progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 origin-left z-50"
            style={{ scaleX }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
            {/* HERO */}
            <motion.header
              className="text-center mb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 interactive"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-sm text-gray-400">Open to opportunities</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-black mb-6 glow-text">
                <AnimatedText text="Portfolio" className="gradient-text" delay={0.8} />
              </h1>

              <motion.p
                className="text-xl text-gray-400 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                Full Stack Developer crafting beautiful, scalable web experiences
              </motion.p>
            </motion.header>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Profile - Large */}
              <Card3D className="lg:col-span-2 lg:row-span-2" delay={0.2}>
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <motion.div
                        className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 blur-lg opacity-50"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      />
                      <img src="/profile.jpeg" alt="Profile" className="relative w-20 h-20 rounded-2xl object-cover" />
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0f0f23]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">Available</span>
                  </div>

                  <h2 className="text-3xl font-bold mb-1">{DATA.name}</h2>
                  <div className="text-lg mb-4 h-7">
                    <TypingText texts={DATA.roles} />
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">{DATA.bio}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {['MERN Stack', 'Microservices', 'Real-time', 'Mentoring'].map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="skill-tag interactive"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Card3D>

              {/* Stats */}
              <Card3D className="lg:col-span-2" delay={0.3}>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {DATA.stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="interactive"
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <motion.span
                        className="text-3xl block mb-2"
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      >
                        {stat.icon}
                      </motion.span>
                      <p className="text-2xl font-bold gradient-text">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </Card3D>

              {/* Skills */}
              <Card3D className="lg:col-span-2 lg:row-span-2" delay={0.4}>
                <h3 className="text-xl font-bold mb-4">⚡ Skills</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {Object.keys(DATA.skills).map(cat => (
                    <motion.button
                      key={cat}
                      onClick={() => setActiveSkill(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all interactive ${activeSkill === cat
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSkill}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {DATA.skills[activeSkill as keyof typeof DATA.skills].map((skill, i) => (
                      <LiquidSkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.1} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </Card3D>

              {/* Experience */}
              <Card3D className="lg:col-span-2" delay={0.5}>
                <h3 className="text-xl font-bold mb-4">💼 Experience</h3>
                {DATA.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 mb-3 interactive ripple"
                    whileHover={{ x: 5, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                  >
                    <span className="text-2xl">{exp.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold">{exp.role}</p>
                      <p className="text-sm text-gray-500">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500">{exp.period}</span>
                  </motion.div>
                ))}
              </Card3D>

              {/* Projects with Images */}
              <Card3D className="lg:col-span-2 lg:row-span-2" delay={0.6}>
                <h3 className="text-xl font-bold mb-6">🚀 Projects</h3>
                <div className="space-y-6">
                  {DATA.projects.map((project, i) => (
                    <motion.div
                      key={i}
                      className="group relative rounded-2xl overflow-hidden border border-white/10 interactive"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.5)' }}
                    >
                      {/* Image with zoom effect */}
                      <div className="relative h-40 overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.2 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: 'easeOut' }}
                          whileHover={{ scale: 1.1 }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23] via-transparent to-transparent" />
                        {/* Holographic shimmer */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4 bg-[#0f0f23]/80 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg group-hover:text-purple-400 transition-colors">{project.name}</h4>
                          <motion.span
                            className="text-purple-400"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t, j) => (
                            <motion.span
                              key={t}
                              className="skill-tag text-xs"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + j * 0.05 }}
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card3D>

              {/* Contact */}
              <Card3D className="lg:col-span-2" delay={0.7}>
                <h3 className="text-xl font-bold mb-4">📬 Let's Connect</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '📧', label: 'Email', text: 'Get in touch', href: `mailto:${DATA.email}` },
                    { icon: '💼', label: 'LinkedIn', text: 'Connect', href: DATA.linkedin },
                    { icon: '🐙', label: 'GitHub', text: 'View Code', href: DATA.github },
                    { icon: '📱', label: 'Phone', text: 'Call me', href: `tel:${DATA.phone}` },
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 interactive ripple"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="text-xs text-gray-500">{item.label}</p>
                        <p className="font-medium text-sm">{item.text}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </Card3D>

              {/* Education */}
              <Card3D delay={0.8}>
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    🎓
                  </motion.div>
                  <div>
                    <p className="font-bold">B.Tech in Computer Science</p>
                    <p className="text-sm text-gray-500">Achariya College</p>
                    <p className="text-xs gradient-text font-semibold">CGPA: 8.4 • 2021-2025</p>
                  </div>
                </div>
              </Card3D>

              {/* Location */}
              <Card3D delay={0.9}>
                <div className="flex items-center gap-4">
                  <motion.span
                    className="text-4xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📍
                  </motion.span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="font-semibold">{DATA.location}</p>
                  </div>
                </div>
              </Card3D>
            </div>

            {/* Footer */}
            <motion.footer
              className="text-center mt-20 py-8 border-t border-white/5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-500 text-sm">
                Designed & Built by <span className="gradient-text font-semibold">Jahangeer I</span> • 2025
              </p>
            </motion.footer>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
