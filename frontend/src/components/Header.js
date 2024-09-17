import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } },
  };

  const navItemVariant = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white text-blue-900 shadow-lg' 
          : 'bg-gradient-to-r from-blue-900 to-blue-700 text-white'
      }`}
    >
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <motion.div
            variants={logoVariants}
            className="flex items-center"
          >
            <div className="flex items-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Courtify AI</h1>
            </div>
          </motion.div>
          {isDesktop ? (
            <nav className="flex items-center space-x-8">
              <NavLink>Features</NavLink>
              <NavLink>About</NavLink>
              <NavLink>Contact</NavLink>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full ${
                  isScrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                } font-semibold transition-all duration-200 shadow-md hover:shadow-lg`}
              >
                Get Started
              </motion.button>
            </nav>
          ) : (
            <button
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {!isDesktop && isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden ${
              isScrolled ? 'bg-white' : 'bg-blue-800'
            }`}
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                <NavItem>Features</NavItem>
                <NavItem>About</NavItem>
                <NavItem>Contact</NavItem>
                <li>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full px-6 py-2 rounded-full ${
                      isScrolled 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-white text-blue-600 hover:bg-blue-50'
                    } font-semibold transition-all duration-200 shadow-md hover:shadow-lg`}
                  >
                    Get Started
                  </motion.button>
                </li>
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const NavLink = ({ children }) => (
  <span
    className="text-lg font-medium hover:text-blue-300 transition-colors duration-200 cursor-pointer"
  >
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  </span>
);

const NavItem = ({ children }) => (
  <motion.li
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span
      className="block text-lg font-medium hover:text-blue-300 transition-colors duration-200 cursor-pointer"
    >
      {children}
    </span>
  </motion.li>
);

export default Header;
