import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    const stats = [
        { label: 'CGPA', value: '8.4' },
        { label: 'Students Mentored', value: '200+' },
        { label: 'Projects Delivered', value: '10+' },
        { label: 'Certifications', value: '6+' },
    ];

    const fadeInVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="about" className="min-h-screen flex items-center py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInVariants}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="gradient-text">About Me</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Passionate developer with a strong foundation in full-stack development and system administration
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12 items-center mb-16">
                    {/* Profile Image */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInVariants}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="lg:col-span-1 flex justify-center"
                    >
                        <div className="relative">
                            <motion.div
                                className="glass p-4 rounded-3xl"
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src="/profile.jpeg"
                                    alt="Jahangeer I"
                                    className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
                                />
                            </motion.div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full opacity-20 blur-xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-15 blur-xl"></div>
                        </div>
                    </motion.div>

                    {/* About Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInVariants}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <div className="glass p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-6 text-white">My Journey</h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                I'm a passionate Full Stack Developer with hands-on experience in building scalable web applications using
                                the MERN stack and microservices architecture.
                            </p>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                I specialize in React.js, Node.js, and JavaScript/TypeScript development, with proven ability to deliver
                                clean, efficient code and mentor others. My strong focus on backend development and real-time systems
                                has helped me successfully deliver multiple projects across HRMS, community platforms, and business portfolios.
                            </p>
                            <p className="text-gray-300 leading-relaxed mb-8">
                                As a MERN Stack trainer at GzofTech, I've mentored 200+ students, sharing my passion for modern web
                                technologies and helping aspiring developers grow in their careers.
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat) => (
                                    <motion.div
                                        key={stat.label}
                                        className="bg-white/5 p-4 rounded-xl text-center border border-white/10"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="text-2xl font-bold gradient-text mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-gray-400 text-xs">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Education Section */}
                <motion.div
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInVariants}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className="glass p-8 rounded-2xl text-center">
                        <h3 className="text-2xl font-bold mb-6 text-white">Education</h3>
                        <div className="max-w-2xl mx-auto">
                            <h4 className="text-xl font-semibold text-primary-400 mb-2">B.Tech in Computer Science and Engineering</h4>
                            <p className="text-gray-300 mb-2">Achariya College of Engineering Technology</p>
                            <p className="text-gray-400 mb-2">Puducherry, India</p>
                            <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
                                <span>2021 – 2025</span>
                                <span>•</span>
                                <span className="text-primary-400 font-semibold">CGPA: 8.4</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    <motion.div
                        className="glass p-8 rounded-2xl text-center"
                        variants={fadeInVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">Frontend Development</h3>
                        <p className="text-gray-400">
                            Creating responsive and interactive user interfaces with React.js, Vue.js, and modern CSS frameworks.
                        </p>
                    </motion.div>

                    <motion.div
                        className="glass p-8 rounded-2xl text-center"
                        variants={fadeInVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">Backend Development</h3>
                        <p className="text-gray-400">
                            Building robust server-side applications with Node.js, Python, and database management systems.
                        </p>
                    </motion.div>

                    <motion.div
                        className="glass p-8 rounded-2xl text-center"
                        variants={fadeInVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">System Administration</h3>
                        <p className="text-gray-400">
                            Managing cloud infrastructure, CI/CD pipelines, and ensuring optimal system performance.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
