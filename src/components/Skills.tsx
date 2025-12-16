import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  name: string;
  color: string;
  bgColor: string;
  icon: string;
  skills: Skill[];
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: 'Languages',
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'rgba(0, 245, 255, 0.1)',
      icon: '💻',
      skills: [
        { name: 'JavaScript', level: 95, icon: '🟨' },
        { name: 'TypeScript', level: 90, icon: '📘' },
        { name: 'Java', level: 85, icon: '☕' },
      ],
    },
    {
      name: 'Frontend',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'rgba(191, 0, 255, 0.1)',
      icon: '🎨',
      skills: [
        { name: 'React.js', level: 95, icon: '⚛️' },
        { name: 'Next.js', level: 85, icon: '▲' },
        { name: 'Tailwind', level: 90, icon: '🎨' },
        { name: 'Framer Motion', level: 85, icon: '🎭' },
      ],
    },
    {
      name: 'Backend',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'rgba(0, 255, 136, 0.1)',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 95, icon: '💚' },
        { name: 'Express.js', level: 90, icon: '⚡' },
        { name: 'REST APIs', level: 95, icon: '🔌' },
        { name: 'Socket.io', level: 80, icon: '🔄' },
      ],
    },
    {
      name: 'Database & DevOps',
      color: 'from-orange-400 to-red-500',
      bgColor: 'rgba(255, 100, 0, 0.1)',
      icon: '🗄️',
      skills: [
        { name: 'MongoDB', level: 90, icon: '🍃' },
        { name: 'MySQL', level: 85, icon: '🐬' },
        { name: 'Redis', level: 80, icon: '🔴' },
        { name: 'Docker', level: 85, icon: '🐳' },
      ],
    },
  ];

  const additionalSkills = [
    'Microservices', 'MVC Architecture', 'Hexagonal Architecture',
    'Problem Solving', 'Communication', 'Mentoring',
    'Git', 'Postman', 'Agile/Scrum', 'Zustand'
  ];

  return (
    <section id="skills" className="min-h-screen py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-green-400 text-sm font-mono tracking-[0.3em] uppercase mb-4 block"
          >
            [ 03. SKILLS ]
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black">
            <span className="gradient-text">TECH ARSENAL</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              className="holo-card p-8 rounded-3xl group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: catIndex * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Category header */}
              <div className={`h-1 w-full bg-gradient-to-r ${category.color} rounded-full mb-6`} />

              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                {category.name}
              </h3>

              {/* Skills */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="text-white font-semibold">{skill.name}</span>
                      </div>
                      <span className={`text-transparent bg-gradient-to-r ${category.color} bg-clip-text font-bold`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${category.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: skillIndex * 0.15, ease: 'easeOut' }}
                      />

                      {/* Animated shine */}
                      <motion.div
                        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '400%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <motion.div
          className="holo-card p-10 rounded-3xl text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            <span className="text-3xl">🛠️</span> Additional Technologies
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {additionalSkills.map((skill, index) => (
              <motion.span
                key={skill}
                className="holo-card px-6 py-3 rounded-full text-gray-300 hover:text-white font-medium cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)'
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center justify-center gap-3">
            <span className="text-3xl">🏆</span>
            <span className="gradient-text">6+ Certifications</span>
          </h3>
          <p className="text-gray-400 text-lg">
            React.js • Node.js • Backend Development • JavaScript • MongoDB • Web Technologies
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
