import React from 'react';
import { FaEnvelope, FaPhone, FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const socialIconVariants = {
    hover: { scale: 1.2, rotate: 15, transition: { duration: 0.3 } }
  };

  const features = [
    'Advanced Legal Query Handling',
    'Intelligent Court Judgment Summarization',
    'Secure Document Management',
    'Comprehensive Multilingual Support'
  ];

  const socialIcons = [
    { Icon: FaTwitter, link: 'https://twitter.com/courtifyai' },
    { Icon: FaLinkedin, link: 'https://linkedin.com/company/courtifyai' },
    { Icon: FaFacebook, link: 'https://facebook.com/courtifyai' },
    { Icon: FaInstagram, link: 'https://instagram.com/courtifyai' }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            className="mb-8 lg:mb-0"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">Courtify AI</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-blue-100">
              Empowering legal professionals with cutting-edge AI-driven solutions for queries, judgments, and documents in Indian languages.
            </p>
          </motion.div>
          <motion.div 
            className="mb-8 lg:mb-0"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-blue-200">Features</h4>
            <ul className="text-xs sm:text-sm space-y-2">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="transition-colors duration-200 hover:text-blue-300 cursor-pointer flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-2 text-blue-400">•</span>{feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            className="mb-8 lg:mb-0"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-blue-200">Contact Us</h4>
            <div className="text-xs sm:text-sm space-y-3">
              <motion.p className="flex items-center group" whileHover={{ x: 5 }}>
                <FaEnvelope className="mr-2 group-hover:text-blue-300 transition-colors duration-200" />
                <a href="mailto:info@courtifyai.com" className="hover:underline group-hover:text-blue-300 transition-colors duration-200">info@courtifyai.com</a>
              </motion.p>
              <motion.p className="flex items-center group" whileHover={{ x: 5 }}>
                <FaPhone className="mr-2 group-hover:text-blue-300 transition-colors duration-200" />
                <a href="tel:+911234567890" className="hover:underline group-hover:text-blue-300 transition-colors duration-200">+91 123 456 7890</a>
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-blue-200">Follow Us</h4>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, link }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-300 transition-colors duration-200"
                  whileHover="hover"
                  variants={socialIconVariants}
                >
                  <Icon size={isMobile ? 20 : 24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-blue-600 text-center text-xs sm:text-sm"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <p>&copy; {currentYear} Courtify AI. All rights reserved.</p>
          <p className="mt-2 text-blue-200">
            Supported languages: English and all Scheduled Languages of India as per the Constitution of India, 1950.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
