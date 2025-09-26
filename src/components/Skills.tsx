import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
}

interface SkillCategory {
  name: string;
  color: string;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: "Programming Languages",
      color: "from-blue-500 to-purple-600",
      skills: [
        { name: "JavaScript", level: 95, icon: "🟨", category: "programming" },
        { name: "TypeScript", level: 90, icon: "📘", category: "programming" },
        { name: "Java", level: 85, icon: "☕", category: "programming" },
      ]
    },
    {
      name: "Frontend",
      color: "from-green-500 to-teal-600",
      skills: [
        { name: "React.js", level: 95, icon: "⚛️", category: "frontend" },
        { name: "Next.js", level: 85, icon: "�", category: "frontend" },
        { name: "Tailwind CSS", level: 90, icon: "🎨", category: "frontend" },
        { name: "Zustand", level: 80, icon: "�", category: "frontend" },
        { name: "Framer Motion", level: 85, icon: "🎭", category: "frontend" },
      ]
    },
    {
      name: "Backend",
      color: "from-orange-500 to-red-600",
      skills: [
        { name: "Node.js", level: 95, icon: "�", category: "backend" },
        { name: "Express.js", level: 90, icon: "⚡", category: "backend" },
        { name: "REST APIs", level: 95, icon: "�", category: "backend" },
        { name: "Microservices", level: 85, icon: "🏗️", category: "backend" },
        { name: "Socket.io", level: 80, icon: "�", category: "backend" },
      ]
    },
    {
      name: "Database & Tools",
      color: "from-purple-500 to-pink-600",
      skills: [
        { name: "MongoDB", level: 90, icon: "🍃", category: "database" },
        { name: "MySQL", level: 85, icon: "�", category: "database" },
        { name: "Redis", level: 80, icon: "🔴", category: "database" },
        { name: "Docker", level: 85, icon: "�", category: "devops" },
        { name: "Git", level: 90, icon: "�", category: "tools" },
        { name: "Postman", level: 85, icon: "📮", category: "tools" },
      ]
    }
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="min-h-screen flex items-center py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              className="glass p-8 rounded-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              <div className={`w-full h-1 bg-gradient-to-r ${category.color} rounded-full mb-6`}></div>
              
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className={`w-3 h-3 bg-gradient-to-r ${category.color} rounded-full mr-3`}></span>
                {category.name}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {skill.icon}
                        </span>
                        <span className="text-white font-semibold">{skill.name}</span>
                      </div>
                      <span className="text-gray-400 font-medium">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full relative`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1, ease: "easeOut" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-full"
                          animate={{ 
                            x: ['0%', '100%', '0%'],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: skillIndex * 0.2
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Technologies */}
        <motion.div
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Additional Technologies & Tools
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "MVC Architecture", "Hexagonal Architecture", "Microservices", "Problem Solving",
              "Communication", "Self-Motivated", "HTML & CSS", "Backend Development",
              "React.js", "Full Stack Web Development", "SQL", "Node.js"
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="glass px-4 py-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
