import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: "MERN Stack Trainer",
      company: "GzofTech",
      period: "January 2025",
      description: [
        "Mentored 200+ students in MERN Stack development",
        "Designed comprehensive curriculum for full-stack web development",
        "Conducted hands-on training sessions and coding workshops",
        "Helped students build real-world projects and portfolios"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript"]
    },
    {
      title: "Full Stack Developer",
      company: "Sirtifai SPP",
      period: "June 2025",
      description: [
        "Built responsive and animated business website",
        "Designed modern UI with scroll-based animations and responsive layouts",
        "Implemented interactive contact form with EmailJS integration",
        "Optimized component structure for scalability and maintainability"
      ],
      technologies: ["React.js", "Tailwind CSS", "Framer Motion", "EmailJS"]
    },
    {
      title: "Backend Developer",
      company: "Chronexa",
      period: "May 2025 – June 2025",
      description: [
        "Developed scalable HR management system handling payroll and leave modules",
        "Built REST APIs for payroll and leave management",
        "Optimized relational schema for performance and scalability",
        "Collaborated with frontend and QA teams in agile sprints"
      ],
      technologies: ["Node.js", "Express.js", "MySQL", "REST APIs"]
    },
    {
      title: "Full Stack Developer",
      company: "Tred Scanner",
      period: "March 2025 - May 2025",
      description: [
        "Built modular platform for group/channel management and threaded discussions",
        "Developed Resources and Tred Space microservices with RESTful APIs",
        "Designed responsive React interfaces for community platform",
        "Implemented real-time features using Socket.io and Redis"
      ],
      technologies: ["Node.js", "Express.js", "MongoDB", "React.js", "Redis", "Socket.io"]
    }
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="experience" className="min-h-screen flex items-center py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A journey through my professional career and key achievements
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-transparent transform md:-translate-x-1/2"></div>

          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full transform md:-translate-x-1/2 z-10"></div>

              {/* Content */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-12 md:ml-0`}>
                <motion.div
                  className="glass p-8 rounded-2xl"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 md:mb-0">
                      {experience.title}
                    </h3>
                    <span className="text-primary-400 font-semibold">
                      {experience.period}
                    </span>
                  </div>
                  
                  <h4 className="text-lg text-gray-300 mb-4 font-semibold">
                    {experience.company}
                  </h4>

                  <ul className="text-gray-400 mb-6 space-y-2">
                    {experience.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary-500 mr-2 mt-1.5 flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm border border-primary-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Resume Button */}
        <motion.div
          className="text-center mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="glass px-8 py-4 rounded-full text-white font-semibold hover:bg-primary-500/20 transition-all duration-300 inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // In a real application, you would have a resume PDF file to download
              const link = document.createElement('a');
              link.href = '/JAHANGEER I.pdf';
              link.download = 'Jahangeer_I_Resume.pdf';
              link.click();
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Resume</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
