import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { FaBalanceScale, FaBook, FaGavel, FaFileAlt, FaQuoteLeft, FaSearch, FaInfoCircle, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

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
    { icon: FaBalanceScale, title: "Key Features", items: ['Fundamental Rights (Articles 12-35)', 'Directive Principles of State Policy (Articles 36-51)', 'Fundamental Duties (Article 51A)', 'Federal Structure with Unitary Features', 'Independent Judiciary'] },
    { icon: FaBook, title: "Care-Related Information", items: ['Article 21: Right to Life and Personal Liberty', 'Article 41: Right to work, to education and public assistance', 'Article 42: Just work conditions and maternity relief', 'Article 47: Nutrition, living standards, and public health'] },
    { icon: FaGavel, title: "Summarisation of Judgments", items: ['Main legal issues addressed', 'Key arguments presented', 'Court\'s reasoning and decision', 'Implications for future cases'] },
    { icon: FaFileAlt, title: "Court Documents", items: ['Writ Petitions', 'Public Interest Litigations (PILs)', 'Review Petitions', 'Curative Petitions'] },
    { icon: FaSearch, title: "Legal Research Tools", items: ['Case Law Database', 'Statute Search', 'Legal Commentary', 'Citation Analysis'] },
    { icon: FaInfoCircle, title: "Legal Education", items: ['Constitutional History', 'Landmark Cases', 'Legal Terminology', 'Comparative Constitutional Law'] }
  ];

  const toggleExpand = (idx) => {
    setExpandedItem(expandedItem === idx ? null : idx);
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="container mx-auto px-4 py-12 md:py-16 lg:py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50"
    >
      <motion.h1 
        variants={itemVariants}
        className={`${headingStyle} text-center mb-12 relative`}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          Constitution of India, 1950: Legal Care Information
        </span>
      </motion.h1>
      
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex justify-center space-x-2 md:space-x-4 overflow-x-auto pb-4">
          {features.map((feature, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
        >
          {features[activeTab].items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`${sectionStyle} group cursor-pointer`}
              onClick={() => toggleExpand(idx)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {React.createElement(features[activeTab].icon, {
                    className: "text-blue-600 text-2xl mr-3 group-hover:scale-110 transition-transform duration-300"
                  })}
                  <h3 className="text-lg font-semibold text-blue-800">{item}</h3>
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
                    <p className="text-gray-600 text-sm mb-4">
                      Detailed information about {item} goes here. This section provides in-depth knowledge and analysis relevant to the topic.
                    </p>
                    <motion.div
                      className="mt-auto flex items-center text-blue-600 font-medium text-sm"
                      whileHover={{ x: 5 }}
                    >
                      Learn More <FaArrowRight className="ml-2" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div 
        variants={itemVariants}
        className="mt-16 text-center bg-gradient-to-r from-blue-100 to-blue-200 p-6 md:p-8 lg:p-10 rounded-3xl shadow-inner max-w-4xl mx-auto"
      >
        <FaQuoteLeft className="text-blue-400 text-4xl mb-4 mx-auto opacity-50" />
        <p className="text-gray-700 italic text-base md:text-lg lg:text-xl leading-relaxed mb-4">
          "The Constitution is not a mere lawyers' document, it is a vehicle of Life, and its spirit is always the spirit of Age."
        </p>
        <p className="text-blue-600 font-semibold text-sm md:text-base">- B.R. Ambedkar</p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-16 text-center"
      >
        <h3 className={`${subHeadingStyle} mb-6`}>Explore More</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {['Constitutional Amendments', 'Recent Judgments', 'Legal News', 'FAQ'].map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600 transition-all duration-300 shadow-md"
            >
              {item}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Body;