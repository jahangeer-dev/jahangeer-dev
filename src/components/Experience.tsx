import { motion } from 'framer-motion';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  tech: string[];
  icon: string;
  color: string;
}

const Experience = () => {
  const experiences: Experience[] = [
    {
      title: 'MERN Stack Trainer',
      company: 'GzofTech',
      period: 'January 2025',
      description: [
        'Mentored 200+ students in MERN Stack development',
        'Designed comprehensive curriculum for full-stack web development',
        'Conducted hands-on training sessions and coding workshops',
        'Helped students build real-world projects and portfolios',
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript'],
      icon: '👨‍🏫',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Full Stack Developer',
      company: 'Sirtifai SPP',
      period: 'June 2025',
      description: [
        'Built responsive and animated business website',
        'Designed modern UI with scroll-based animations',
        'Implemented interactive contact form with EmailJS',
        'Optimized component structure for scalability',
      ],
      tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'EmailJS'],
      icon: '🎨',
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Backend Developer',
      company: 'Chronexa',
      period: 'May - June 2025',
      description: [
        'Developed scalable HR management system',
        'Built REST APIs for payroll and leave management',
        'Optimized relational schema for performance',
        'Collaborated with frontend and QA teams',
      ],
      tech: ['Node.js', 'Express.js', 'MySQL', 'REST APIs'],
      icon: '⚙️',
      color: 'from-orange-500 to-red-600',
    },
    {
      title: 'Full Stack Developer',
      company: 'Tred Scanner',
      period: 'March - May 2025',
      description: [
        'Built modular platform for group/channel management',
        'Developed microservices with RESTful APIs',
        'Designed responsive React interfaces',
        'Implemented real-time features using Socket.io',
      ],
      tech: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Redis', 'Socket.io'],
      icon: '🌐',
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <section id="experience" className="min-h-screen py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-purple-400 text-sm font-mono tracking-[0.3em] uppercase mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            [ 02. EXPERIENCE ]
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black">
            <span className="gradient-text">WORK HISTORY</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line with glow */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 blur-md"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Experience cards */}
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Timeline node */}
              <motion.div
                className="absolute left-4 md:left-1/2 w-12 h-12 -translate-x-6 md:-translate-x-6 z-20 holo-card rounded-full flex items-center justify-center text-2xl pulse-glow"
                whileHover={{ scale: 1.2 }}
              >
                {exp.icon}
              </motion.div>

              {/* Content card */}
              <div className={`w-full md:w-[45%] ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-20' : 'md:pl-20'}`}>
                <motion.div
                  className="holo-card p-8 rounded-3xl group relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {exp.title}
                      </h3>
                      <span className={`text-transparent bg-gradient-to-r ${exp.color} bg-clip-text font-bold`}>
                        {exp.period}
                      </span>
                    </div>

                    {/* Company */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-xl">🏢</span>
                      <span className="text-gray-300 text-lg font-semibold">{exp.company}</span>
                    </div>

                    {/* Description */}
                    <ul className="space-y-3 mb-6">
                      {exp.description.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 text-gray-400"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="text-cyan-400 mt-1">▹</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${exp.color} bg-opacity-20 text-white/90 border border-white/10`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Corner glow */}
                  <div className={`absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-br ${exp.color} rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resume Download */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="cyber-button px-10 py-4 rounded-lg text-lg font-semibold tracking-wide inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/JAHANGEER I.pdf';
              link.download = 'Jahangeer_I_Resume.pdf';
              link.click();
            }}
          >
            <span>📄</span>
            <span>DOWNLOAD RESUME</span>
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ⬇️
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
