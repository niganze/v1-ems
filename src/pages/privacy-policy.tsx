import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 * i } }),
};

const PrivacyPolicy: React.FC = () => {
  const [accepted, setAccepted] = useState<null | boolean>(null);
  const navigate = useNavigate();

  const handleAccept = () => setAccepted(true);
  const handleDecline = () => navigate('/contact');

  const sections = [
    {
      title: 'Introduction',
      content: (
        <p>
          Welcome to our Event Management website. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our services.
        </p>
      ),
    },
    {
      title: 'What Information We Collect',
      content: (
        <ul className="list-disc ml-6">
          <li>Personal identification information (Name, email address, phone number, etc.)</li>
          <li>Event details and preferences you provide</li>
          <li>Usage data and cookies for website analytics</li>
        </ul>
      ),
    },
    {
      title: 'How We Use Your Information',
      content: (
        <ul className="list-disc ml-6">
          <li>To provide and improve our event management services</li>
          <li>To communicate with you about your events and inquiries</li>
          <li>To personalize your experience on our website</li>
          <li>To send you updates, newsletters, and promotional materials (if you opt in)</li>
        </ul>
      ),
    },
    {
      title: 'Data Security',
      content: (
        <p>
          We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet is 100% secure.
        </p>
      ),
    },
    {
      title: 'Third-Party Services',
      content: (
        <p>
          Our website may contain links to third-party sites or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review their privacy policies before providing any personal information.
        </p>
      ),
    },
    {
      title: 'Your Rights',
      content: (
        <ul className="list-disc ml-6">
          <li>You have the right to access, update, or delete your personal information.</li>
          <li>You may opt out of receiving marketing communications at any time.</li>
          <li>To exercise your rights, please contact us using the information below.</li>
        </ul>
      ),
    },
    {
      title: 'Contact Us',
      content: (
        <p>
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:info@emsrwanda.com" className="text-pink-300 underline">info@emsrwanda.com</a>.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-16 px-2">
        <motion.div
          className="w-full max-w-2xl mx-auto px-6 py-8 rounded-2xl shadow-2xl bg-white text-black border border-white/10 relative"
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <h1 className="text-3xl font-bold mb-6 text-pink-400">Privacy Policy</h1>
          <AnimatePresence>
            {accepted === null && sections.map((section, i) => (
              <motion.section
                key={section.title}
                className="mb-6"
                custom={i}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={sectionVariants}
              >
                <h2 className="text-xl font-semibold mb-2 text-purple-300">{section.title}</h2>
                {section.content}
              </motion.section>
            ))}
          </AnimatePresence>
          <div className="text-xs text-gray-500 mt-8 mb-4">Last updated: {new Date().toLocaleDateString()}</div>
          {/* Accept/Decline Buttons or Thank You Message */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {accepted === null && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:from-purple-600 hover:to-pink-500 transition-all"
                  onClick={handleAccept}
                >
                  Accept
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-gray-700 to-indigo-900 text-white font-semibold px-8 py-3 rounded-lg shadow hover:from-indigo-900 hover:to-gray-700 transition-all border border-white/20"
                  onClick={handleDecline}
                >
                  Decline
                </motion.button>
              </>
            )}
            {accepted === true && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-lg font-semibold text-center"
              >
                Thank you for accepting our privacy policy!
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default PrivacyPolicy; 