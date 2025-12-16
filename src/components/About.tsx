import { motion } from 'framer-motion';

const About = () => {
    const stats = [
        { value: '8.4', label: 'CGPA', icon: '🎓', color: 'from-cyan-400 to-blue-500' },
        { value: '200+', label: 'Students Mentored', icon: '👨‍🏫', color: 'from-purple-400 to-pink-500' },
        { value: '10+', label: 'Projects Delivered', icon: '🚀', color: 'from-green-400 to-emerald-500' },
        { value: '6+', label: 'Certifications', icon: '🏆', color: 'from-orange-400 to-red-500' },
    ];

    const expertise = [
        {
            title: 'Frontend Mastery',
            description: 'React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion - Creating pixel-perfect, responsive interfaces.',
            icon: '⚛️',
            gradient: 'from-cyan-500 to-blue-600',
        },
        {
            title: 'Backend Architecture',
            description: 'Node.js, Express.js, REST APIs, Microservices, Socket.io - Building robust, scalable server systems.',
            icon: '⚡',
            gradient: 'from-purple-500 to-pink-600',
        },
        {
            title: 'Database & DevOps',
            description: 'MongoDB, MySQL, Redis, Docker, Git - Managing data and deployment with modern tooling.',
            icon: '🔧',
            gradient: 'from-green-500 to-emerald-600',
        },
    ];

    return (
        <section id="about" className="min-h-screen py-24 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 grid-bg opacity-20" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="text-cyan-400 text-sm font-mono tracking-[0.3em] uppercase mb-4 block"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        [ 01. WHO AM I ]
                    </motion.span>
                    <h2 className="text-5xl md:text-7xl font-black">
                        <span className="gradient-text">ABOUT ME</span>
                    </h2>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-5 gap-12 items-center mb-24">
                    {/* Profile Side */}
                    <motion.div
                        className="lg:col-span-2 flex justify-center"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative">
                            {/* Decorative rings */}
                            <motion.div
                                className="absolute -inset-8 border border-cyan-500/20 rounded-3xl"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="absolute -inset-16 border border-purple-500/10 rounded-3xl"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* Image container */}
                            <div className="holo-card p-3 rounded-3xl">
                                <img
                                    src="/profile.jpeg"
                                    alt="Jahangeer I"
                                    className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-2xl"
                                />
                            </div>

                            {/* Floating badge */}
                            <motion.div
                                className="absolute -bottom-4 -right-4 holo-card px-4 py-2 rounded-full"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <span className="text-cyan-400 font-bold">Available for Work</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="holo-card p-8 rounded-3xl">
                            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-4xl">💫</span>
                                <span className="gradient-text">My Journey</span>
                            </h3>

                            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                                <p>
                                    I'm a <span className="text-cyan-400 font-semibold">passionate Full Stack Developer</span> with hands-on experience in building scalable web applications using the{' '}
                                    <span className="text-purple-400 font-semibold">MERN stack</span> and{' '}
                                    <span className="text-pink-400 font-semibold">microservices architecture</span>.
                                </p>
                                <p>
                                    As a <span className="neon-text-purple font-bold">MERN Stack Trainer</span> at GzofTech, I've mentored <span className="text-green-400 font-bold">200+ students</span>, sharing my passion for modern web technologies.
                                </p>
                                <p>
                                    From <span className="text-orange-400">HRMS systems</span> to{' '}
                                    <span className="text-blue-400">community platforms</span>, I deliver clean, efficient code with a strong focus on{' '}
                                    <span className="text-cyan-400">backend development</span> and{' '}
                                    <span className="text-pink-400">real-time systems</span>.
                                </p>
                            </div>

                            {/* Education Badge */}
                            <motion.div
                                className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">🎓</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">B.Tech in Computer Science</h4>
                                        <p className="text-gray-400">Achariya College of Engineering Technology</p>
                                        <p className="text-cyan-400 font-semibold">2021 – 2025 | CGPA: 8.4</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="holo-card p-6 rounded-2xl text-center group"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <span className="text-5xl mb-4 block group-hover:scale-125 transition-transform">
                                {stat.icon}
                            </span>
                            <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                {stat.value}
                            </div>
                            <div className="text-gray-400 text-sm uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Expertise Cards */}
                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {expertise.map((item, i) => (
                        <motion.div
                            key={item.title}
                            className="holo-card p-8 rounded-3xl group relative overflow-hidden"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            {/* Gradient background on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Corner decoration */}
                            <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${item.gradient} rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default About;
