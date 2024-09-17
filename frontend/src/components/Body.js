import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { FaBalanceScale, FaBook, FaGavel, FaFileAlt, FaQuoteLeft, FaSearch, FaInfoCircle, FaArrowRight, FaChevronDown, FaLandmark, FaUniversity, FaNewspaper, FaLightbulb, FaUserGraduate, FaHandshake, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const LazyLoadedComponent = lazy(() => import('./LazyLoadedComponent'));

const Body = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedItem, setExpandedItem] = useState(null);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const sectionStyle = "bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 transition-all duration-300 hover:shadow-2xl border-l-4 border-blue-500 transform hover:-translate-y-1 flex flex-col h-full";
  const headingStyle = `font-bold text-blue-900 mb-8 ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'}`;
  const subHeadingStyle = `font-semibold text-blue-800 mb-3 ${isMobile ? 'text-lg' : 'text-xl'}`;

  const features = [
    { icon: FaBalanceScale, title: "Key Features", items: ['Fundamental Rights (Articles 12-35)', 'Directive Principles of State Policy (Articles 36-51)', 'Fundamental Duties (Article 51A)', 'Federal Structure with Unitary Features', 'Independent Judiciary', 'Separation of Powers'] },
    { icon: FaBook, title: "Care-Related Information", items: ['Article 21: Right to Life and Personal Liberty', 'Article 41: Right to work, to education and public assistance', 'Article 42: Just work conditions and maternity relief', 'Article 47: Nutrition, living standards, and public health', 'Article 39: Equal right to health and opportunity'] },
    { icon: FaGavel, title: "Summarisation of Judgments", items: ['Main legal issues addressed', 'Key arguments presented', 'Court\'s reasoning and decision', 'Implications for future cases', 'Dissenting opinions', 'Historical context'] },
    { icon: FaFileAlt, title: "Court Documents", items: ['Writ Petitions', 'Public Interest Litigations (PILs)', 'Review Petitions', 'Curative Petitions', 'Amicus Curiae Briefs', 'Interim Orders'] },
    { icon: FaSearch, title: "Legal Research Tools", items: ['Case Law Database', 'Statute Search', 'Legal Commentary', 'Citation Analysis', 'Comparative Law Resources', 'Legal Journals'] },
    { icon: FaInfoCircle, title: "Legal Education", items: ['Constitutional History', 'Landmark Cases', 'Legal Terminology', 'Comparative Constitutional Law', 'Moot Court Competitions', 'Online Courses'] }
  ];

  const toggleExpand = useCallback((idx) => {
    setExpandedItem(expandedItem === idx ? null : idx);
  }, [expandedItem]);

  const renderFeatureContent = (feature, idx) => {
    return (
      <motion.div
        key={idx}
        variants={itemVariants}
        className={`${sectionStyle} group`}
        onClick={() => toggleExpand(idx)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {React.createElement(feature.icon, {
              className: "text-blue-600 text-xl mr-2 group-hover:scale-110 transition-transform duration-300"
            })}
            <h3 className="text-base md:text-lg font-semibold text-blue-800">{feature.items[idx]}</h3>
          </div>
          <FaChevronDown className={`text-blue-600 transition-transform duration-300 ${expandedItem === idx ? 'transform rotate-180' : ''}`} />
        </div>
        <AnimatePresence>
          {expandedItem === idx && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-600 text-xs md:text-sm mb-3">
                Detailed information about {feature.items[idx]} goes here. This section provides in-depth knowledge and analysis relevant to the topic, including historical context, current interpretations, and potential future implications.
              </p>
              <div className="flex justify-between items-center mt-2">
                <motion.div
                  className="flex items-center text-blue-600 font-medium text-xs md:text-sm cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  Learn More <FaArrowRight className="ml-1 md:ml-2" />
                </motion.div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-100 text-blue-600 p-1 md:p-2 rounded-full"
                  >
                    <FaDownload size={12} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-100 text-blue-600 p-1 md:p-2 rounded-full"
                  >
                    <FaExternalLinkAlt size={12} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="container mx-auto px-4 py-8 md:py-16 lg:py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50"
    >
      <motion.h1 
        variants={itemVariants}
        className={`${headingStyle} text-center mb-8 relative`}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          Constitution of India, 1950: Legal Care Information
        </span>
      </motion.h1>
      
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {features.map((feature, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeTab === index
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {feature.title}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
        >
          {features[activeTab].items.map((item, idx) => renderFeatureContent(features[activeTab], idx))}
        </motion.div>
      </AnimatePresence>

      <motion.div 
        variants={itemVariants}
        className="mt-12 text-center bg-gradient-to-r from-blue-100 to-blue-200 p-4 md:p-6 lg:p-8 rounded-3xl shadow-inner max-w-4xl mx-auto"
      >
        <FaQuoteLeft className="text-blue-400 text-3xl mb-3 mx-auto opacity-50" />
        <p className="text-gray-700 italic text-sm md:text-base lg:text-lg leading-relaxed mb-3">
          "The Constitution is not a mere lawyers' document, it is a vehicle of Life, and its spirit is always the spirit of Age."
        </p>
        <p className="text-blue-600 font-semibold text-xs md:text-sm">- B.R. Ambedkar</p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-12 text-center"
      >
        <h3 className={`${subHeadingStyle} mb-4`}>Explore More</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { title: 'Constitutional Amendments', icon: FaLandmark },
            { title: 'Recent Judgments', icon: FaGavel },
            { title: 'Legal News', icon: FaNewspaper },
            { title: 'FAQ', icon: FaInfoCircle },
            { title: 'Legal Insights', icon: FaLightbulb },
            { title: 'Career Opportunities', icon: FaUserGraduate }
          ].map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white py-2 px-3 rounded-full text-xs md:text-sm hover:bg-blue-600 transition-all duration-300 shadow-md flex items-center"
              data-tooltip-id={`tooltip-${index}`}
              data-tooltip-content={`Click to explore ${item.title}`}
            >
              <item.icon className="mr-1 md:mr-2" />
              {item.title}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-12 bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8"
      >
        <h3 className={`${subHeadingStyle} mb-4 text-center`}>Latest Updates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'New Amendment Proposed', date: 'June 15, 2023', icon: FaLandmark, description: 'A new amendment has been proposed to strengthen digital privacy rights.' },
            { title: 'Landmark Judgment on Privacy', date: 'June 10, 2023', icon: FaGavel, description: 'Supreme Court delivers a groundbreaking judgment on data protection.' },
            { title: 'Legal Education Reform', date: 'June 5, 2023', icon: FaUniversity, description: 'Major reforms announced in legal education curriculum across India.' },
            { title: 'AI in Indian Judiciary', date: 'May 30, 2023', icon: FaLightbulb, description: 'Indian courts to implement AI for case management and legal research.' },
            { title: 'Environmental Law Symposium', date: 'May 25, 2023', icon: FaHandshake, description: 'National symposium on environmental laws and sustainable development.' },
            { title: 'Pro Bono Initiative Launch', date: 'May 20, 2023', icon: FaBalanceScale, description: 'New nationwide pro bono legal service initiative launched for underprivileged.' }
          ].map((update, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-2">
                <update.icon className="text-blue-600 text-lg mr-2" />
                <h4 className="font-semibold text-blue-800 text-sm">{update.title}</h4>
              </div>
              <p className="text-gray-600 text-xs mb-1">{update.date}</p>
              <p className="text-gray-700 text-xs">{update.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 text-blue-600 text-xs font-medium flex items-center"
              >
                Read More <FaArrowRight className="ml-1" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Suspense fallback={<div className="text-center py-6">Loading...</div>}>
        <LazyLoadedComponent />
      </Suspense>

      {/* Tooltips */}
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <Tooltip key={index} id={`tooltip-${index}`} />
      ))}
    </motion.div>
  );
};

export default Body;