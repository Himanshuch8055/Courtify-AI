import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaNewspaper, FaBalanceScale, FaGavel, FaLandmark, FaUniversity, FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const LazyLoadedComponent = () => {
  const [expandedItem, setExpandedItem] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const newsItems = [
    {
      icon: FaNewspaper,
      title: "Latest Constitutional Amendments",
      content: "Stay updated with the most recent changes to the Constitution of India. Our expert analysis breaks down the implications of each amendment.",
      details: "Recent amendments include changes to Article 15 and Article 16, strengthening provisions for socially and educationally backward classes."
    },
    {
      icon: FaBalanceScale,
      title: "Supreme Court Verdicts",
      content: "Read about landmark judgments that shape the interpretation of our Constitution and set precedents for future cases.",
      details: "The recent judgment on privacy as a fundamental right has far-reaching implications for data protection and individual liberties."
    },
    {
      icon: FaGavel,
      title: "Legal Reforms",
      content: "Learn about ongoing and proposed legal reforms affecting constitutional rights and the structure of our legal system.",
      details: "Current reform proposals include changes to the collegium system for judicial appointments and reforms in electoral laws."
    },
    {
      icon: FaLandmark,
      title: "Constitutional Debates",
      content: "Explore current debates on constitutional interpretation and proposed amendments.",
      details: "Ongoing debates include discussions on federalism, the scope of fundamental rights, and the balance of power between different branches of government."
    },
    {
      icon: FaUniversity,
      title: "Legal Education Initiatives",
      content: "Discover new programs and resources aimed at enhancing public understanding of the Constitution.",
      details: "Recent initiatives include the launch of online courses on constitutional law and the introduction of Constitution literacy programs in schools."
    },
    {
      icon: FaInfoCircle,
      title: "Constitutional Trivia",
      content: "Test your knowledge with interesting facts and lesser-known details about our Constitution.",
      details: "Did you know? The original Constitution of India was handwritten and took nearly 3 years to complete. It is now preserved in a helium-filled case in the Parliament library."
    }
  ];

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 md:mt-12 lg:mt-16 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl p-4 md:p-6 lg:p-8"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-6 text-center">
        Constitutional News & Updates
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {newsItems.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300"
          >
            <div className="flex items-center mb-3">
              <item.icon className="text-blue-600 text-2xl mr-3" />
              <h3 className="font-semibold text-blue-800 text-lg">{item.title}</h3>
            </div>
            <p className="text-gray-700 text-sm mb-3">{item.content}</p>
            <AnimatePresence>
              {expandedItem === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 text-sm mb-3"
                >
                  {item.details}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              onClick={() => toggleExpand(index)}
              className="text-blue-600 text-sm font-medium flex items-center hover:underline focus:outline-none"
              whileHover={{ x: 5 }}
            >
              {expandedItem === index ? 'Read Less' : 'Read More'}
              <FaArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LazyLoadedComponent;
