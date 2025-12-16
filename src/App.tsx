import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useInView } from 'framer-motion';

// ==================== DATA ====================
const DATA = {
  name: "Jahangeer I",
  title: "Tech",
  tagline: "Full Stack Developer crafting beautiful, scalable web experiences",
  bio: "Building scalable web applications with MERN Stack & Microservices. Mentored 200+ students in modern web technologies.",
  email: "jahangeer7704@gmail.com",
  phone: "+91 8428140571",
  location: "Villupuram, Tamil Nadu",
  linkedin: "https://linkedin.com/in/jahangeer-dev",
  github: "https://github.com/jahangeer-dev",

  stats: [
    { icon: "🎓", value: 8.4, label: "CGPA", suffix: "", decimals: 1 },
    { icon: "👥", value: 200, label: "STUDENTS", suffix: "+", decimals: 0 },
    { icon: "🚀", value: 10, label: "PROJECTS", suffix: "+", decimals: 0 },
    { icon: "📜", value: 6, label: "CERTS", suffix: "+", decimals: 0 },
  ],

  skills: {
    Frontend: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind", level: 90 },
      { name: "Framer Motion", level: 88 },
    ],
    Backend: [
      { name: "Node.js", level: 92 },
      { name: "Express", level: 90 },
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL", level: 85 },
    ],
    Database: [
      { name: "MongoDB", level: 90 },
      { name: "MySQL", level: 85 },
      { name: "Redis", level: 80 },
      { name: "Docker", level: 85 },
    ],
    Languages: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 88 },
      { name: "Python", level: 80 },
      { name: "SQL", level: 85 },
    ],
  },

  experience: [
    {
      icon: "🎓",
      role: "MERN Stack Trainer",
      company: "GzofTech",
      period: "Jan 2025",
      points: ["Mentored 200+ students", "Conducted hands-on workshops", "Specialized in MERN Stack"],
    },
    {
      icon: "💼",
      role: "Full Stack Developer",
      company: "Tred Scanner",
      period: "Mar-May 2025",
      points: ["Developed scalable applications", "Microservices architecture", "Real-time features with Socket.io"],
    },
    {
      icon: "⚙️",
      role: "Backend Developer",
      company: "Chronexa",
      period: "May-Jun 2025",
      points: ["Built HRMS system", "REST API development", "Database optimization"],
    },
  ],

  projects: [
    { name: "GzofTech", desc: "Educational platform for MERN Stack training", tech: ["React", "Node.js", "MongoDB"], image: "/gzoft.png" },
    { name: "PatchWatch", desc: "Security vulnerability monitoring system", tech: ["Next.js", "Prisma", "NVD API"], image: "/patchwatch.png" },
    { name: "Tred Scanner", desc: "Community platform with microservices", tech: ["React", "MongoDB", "Redis"], image: "/tredscanner.png" },
  ],

  education: {
    degree: "B.Tech in Computer Science",
    school: "Achariya College of Engineering Technology",
    cgpa: "8.4",
    years: "2021 - 2025",
  },

  tags: ["MERN Stack", "Microservices", "Real-time", "Mentoring"],
};

// ==================== PARTICLE NETWORK ====================
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();

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

    // Initialize 100 particles
    particles.current = [];
    for (let i = 0; i < 100; i++) {
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
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p, i) => {
        // Mouse repulsion (200px radius)
        const dx = p.x - mousePos.current.x;
        const dy = p.y - mousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200;
          p.vx += (dx / dist) * force * 0.02;
          p.vy += (dy / dist) * force * 0.02;
        }

        // Move with friction
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${0.5 + Math.random() * 0.2})`;
        ctx.fill();

        // Draw connections (< 150px apart)
        particles.current.slice(i + 1).forEach(p2 => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - d / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="particles-canvas" />;
}

// ==================== CUSTOM CURSOR ====================
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

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
          }, (i + 1) * 40);
        }
      });
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .interactive')) setHovering(true);
    };
    const handleMouseOut = () => setHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Trail particles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailsRef.current[i] = el; }}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999]"
          style={{
            background: `rgba(168, 85, 247, ${0.5 - i * 0.15})`,
            transform: 'translate(-50%, -50%)',
            transition: `all ${100 + i * 50}ms ease-out`,
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed rounded-full pointer-events-none z-[9999] border-2 border-purple-500/60"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: clicking ? 16 : hovering ? 48 : 24,
          height: clicking ? 16 : hovering ? 48 : 24,
          backgroundColor: clicking ? 'rgba(168, 85, 247, 0.3)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      {/* Center dot */}
      <motion.div
        className="fixed w-1 h-1 bg-white rounded-full pointer-events-none z-[9999]"
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

// ==================== SCROLL PROGRESS ====================
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// ==================== ANIMATED TEXT ====================
function AnimatedTitle({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            type: 'spring',
            stiffness: 100,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// ==================== COUNTER ====================
function Counter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
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
        setCount(decimals > 0 ? Math.floor(start * 10) / 10 : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value, decimals]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

// ==================== TILT CARD ====================
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setStyle({
      rotateX: (y - 0.5) * -10,
      rotateY: (x - 0.5) * 10,
    });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`glass p-6 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      animate={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setStyle({ rotateX: 0, rotateY: 0 })}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ y: -12, boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)' }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  );
}

// ==================== MAGNETIC BUTTON ====================


// ==================== SECTION WRAPPER ====================
function Section({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      className={`py-20 px-4 md:px-8 ${className}`}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.section>
  );
}

// ==================== HERO SECTION ====================
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
      {/* Status badge */}
      <motion.div
        className="glass px-4 py-2 rounded-full flex items-center gap-2 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.span
          className="w-2 h-2 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-sm text-gray-300">Open to opportunities</span>
      </motion.div>

      {/* Main title */}
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-center glow-text">
        <AnimatedTitle text="Portfolio" className="gradient-text" delay={0.5} />
      </h1>

      {/* Tagline */}
      <motion.p
        className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        {DATA.tagline}
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-purple-500 rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <span className="text-xs text-gray-500 mt-2 tracking-widest">SCROLL</span>
      </motion.div>
    </section>
  );
}

// ==================== ABOUT SECTION ====================
function AboutSection() {
  return (
    <Section id="about">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
        {/* Profile Card */}
        <TiltCard className="lg:col-span-3">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="relative shrink-0">
              <motion.div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 blur opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <img
                src="/profile.jpeg"
                alt={DATA.name}
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover"
              />
              <motion.div
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a0a2e]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold">{DATA.name}</h2>
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">Available</span>
              </div>
              <p className="text-purple-400 font-semibold mb-4">{DATA.title}</p>
              <p className="text-gray-400 leading-relaxed mb-6">{DATA.bio}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {DATA.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="skill-tag interactive"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {DATA.stats.map((stat, i) => (
            <TiltCard key={stat.label} className="text-center">
              <motion.span
                className="text-3xl block mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
              >
                {stat.icon}
              </motion.span>
              <div className="text-2xl font-bold gradient-text">
                <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
            </TiltCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ==================== SKILLS SECTION ====================
function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const categories = Object.keys(DATA.skills);

  return (
    <Section id="skills">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-4xl">⚡</span>
          <span className="gradient-text">Skills</span>
        </h2>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-tab interactive ${activeCategory === cat ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
              {activeCategory === cat && (
                <motion.span className="ml-2" initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Skills */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {DATA.skills[activeCategory as keyof typeof DATA.skills].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-purple-400 font-bold">{skill.level}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

// ==================== EXPERIENCE SECTION ====================
function ExperienceSection() {
  return (
    <Section id="experience">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <span className="text-4xl">💼</span>
          <span className="gradient-text">Experience</span>
        </h2>

        <div className="relative pl-10">
          {/* Timeline line */}
          <motion.div
            className="timeline-line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            style={{ originY: 0 }}
          />

          {/* Experience items */}
          <div className="space-y-12">
            {DATA.experience.map((exp, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                {/* Timeline dot */}
                <div className="timeline-dot absolute -left-[26px] top-2" />

                <TiltCard className="ml-4">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{exp.icon}</span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <span className="text-sm text-gray-500">{exp.period}</span>
                      </div>
                      <p className="text-purple-400 font-medium mb-4">{exp.company}</p>
                      <ul className="space-y-2">
                        {exp.points.map((point, j) => (
                          <motion.li
                            key={j}
                            className="flex items-start gap-2 text-gray-400"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + j * 0.1 }}
                          >
                            <span className="text-purple-500 mt-1">•</span>
                            {point}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ==================== PROJECTS SECTION ====================
function ProjectsSection() {
  return (
    <Section id="projects">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <span className="text-4xl">🚀</span>
          <span className="gradient-text">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATA.projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <TiltCard className="overflow-hidden group p-0">
                {/* Image */}
                <div className="relative h-48 img-zoom overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e] via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{project.name}</h3>
                    <motion.span
                      className="text-purple-400"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="skill-tag text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ==================== CONTACT SECTION ====================
function ContactSection() {
  const contacts = [
    { icon: '📧', label: 'Email', text: 'Get in touch', href: `mailto:${DATA.email}` },
    { icon: '💼', label: 'LinkedIn', text: 'Connect', href: DATA.linkedin },
    { icon: '🐙', label: 'GitHub', text: 'View Code', href: DATA.github },
    { icon: '📱', label: 'Phone', text: 'Call me', href: `tel:${DATA.phone}` },
  ];

  return (
    <Section id="contact">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Education */}
        <TiltCard>
          <div className="flex items-start gap-4">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shrink-0"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🎓
            </motion.div>
            <div>
              <h3 className="text-xl font-bold mb-1">{DATA.education.degree}</h3>
              <p className="text-gray-400 mb-2">{DATA.education.school}</p>
              <div className="flex gap-4 text-sm">
                <span className="gradient-text font-bold">CGPA: {DATA.education.cgpa}</span>
                <span className="text-gray-500">{DATA.education.years}</span>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Contact */}
        <TiltCard>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🤝</span>
            Let's Connect
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {contacts.map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="glass p-4 rounded-xl flex items-center gap-3 interactive ripple"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">{contact.icon}</span>
                <div>
                  <div className="text-xs text-gray-500">{contact.label}</div>
                  <div className="font-medium text-sm">{contact.text}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </TiltCard>
      </div>

      {/* Location */}
      <motion.div
        className="max-w-6xl mx-auto mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="glass inline-flex items-center gap-2 px-6 py-3 rounded-full">
          <span className="text-xl">📍</span>
          <span className="text-gray-300">{DATA.location}</span>
        </span>
      </motion.div>
    </Section>
  );
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <motion.footer
      className="py-12 text-center border-t border-white/5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <p className="text-gray-500">
        Designed & Built by <span className="gradient-text font-semibold">Jahangeer I</span> • 2025
      </p>
    </motion.footer>
  );
}

// ==================== MAIN APP ====================
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a1f] flex items-center justify-center z-[10000]">
        <div className="relative w-24 h-24">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: i === 0 ? '#a855f7' : i === 1 ? '#ec4899' : '#f97316' }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5 - i * 0.2, repeat: Infinity, ease: 'linear' }}
            />
          ))}
          <motion.div
            className="absolute inset-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <ParticleNetwork />
      <CustomCursor />
      <ScrollProgress />

      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
