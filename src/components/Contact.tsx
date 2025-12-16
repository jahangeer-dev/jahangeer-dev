import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'jahangeer7704@gmail.com', href: 'mailto:jahangeer7704@gmail.com' },
    { icon: '📱', label: 'Phone', value: '+91 8428140571', href: 'tel:+918428140571' },
    { icon: '📍', label: 'Location', value: 'Villupuram, Tamil Nadu', href: '#' },
  ];

  const socialLinks = [
    { icon: '💼', name: 'LinkedIn', url: 'https://www.linkedin.com/in/jahangeer-dev/', color: 'from-blue-400 to-blue-600' },
    { icon: '🐙', name: 'GitHub', url: 'https://github.com/jahangeer-dev', color: 'from-gray-400 to-gray-600' },
    { icon: '📧', name: 'Email', url: 'mailto:jahangeer7704@gmail.com', color: 'from-red-400 to-pink-600' },
  ];

  return (
    <section id="contact" className="min-h-screen py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Aurora decoration */}
      <motion.div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)' }}
        animate={{ x: [-50, 50, -50], y: [-30, 30, -30] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(191,0,255,0.1) 0%, transparent 70%)' }}
        animate={{ x: [50, -50, 50], y: [30, -30, 30] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-pink-400 text-sm font-mono tracking-[0.3em] uppercase mb-4 block">
            [ 04. CONTACT ]
          </span>
          <h2 className="text-5xl md:text-7xl font-black">
            <span className="gradient-text">LET'S CONNECT</span>
          </h2>
          <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
            Let's collaborate on your next project. I'm excited to work on innovative solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            className="holo-card p-8 rounded-3xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-3xl">💬</span>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${status === 'success'
                    ? 'bg-green-500'
                    : status === 'error'
                      ? 'bg-red-500'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400'
                  } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : status === 'success' ? (
                  '✅ Message Sent!'
                ) : status === 'error' ? (
                  '❌ Failed to Send'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>⚡</span>
                    SEND MESSAGE
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Contact Info */}
            <div className="holo-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">📋</span>
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">{info.icon}</span>
                    <div>
                      <div className="text-gray-400 text-sm">{info.label}</div>
                      <div className="text-white font-semibold">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="holo-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🌐</span>
                Follow Me
              </h3>

              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 p-4 rounded-xl bg-gradient-to-br ${social.color} bg-opacity-20 text-center hover:scale-105 transition-all`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-3xl block mb-2">{social.icon}</span>
                    <span className="text-white font-medium text-sm">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="holo-card p-8 rounded-3xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="gradient-text">Let's Work Together</span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Currently available for freelance projects and full-time opportunities.
                Let's build something amazing together!
              </p>
              <motion.div
                className="mt-6 inline-block px-6 py-2 rounded-full bg-green-500/20 border border-green-500/50"
                animate={{ boxShadow: ['0 0 20px rgba(34,197,94,0.3)', '0 0 40px rgba(34,197,94,0.5)', '0 0 20px rgba(34,197,94,0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-green-400 font-bold">🟢 Available for Work</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-24 text-center text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>Designed & Built by <span className="text-cyan-400">Jahangeer I</span></p>
          <p className="mt-2 text-sm">© 2025 All Rights Reserved</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
