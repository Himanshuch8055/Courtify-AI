import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaBars, FaTimes, FaComments } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const Sidebar = ({ onNewChat, currentChatId, chats, onSelectChat, onDeleteChat }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), []);

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  };

  const chatItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <>
      <AnimatePresence>
        {(isMobile || isTablet) && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isOpen || (!isMobile && !isTablet)) && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-64 sm:w-72 md:w-80 bg-gradient-to-b from-gray-100 to-gray-200 p-4 overflow-y-auto z-40 shadow-xl"
          >
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              onClick={onNewChat}
              className="w-full py-3 px-4 mb-6 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md transition-colors duration-300 hover:bg-blue-700"
            >
              <FaPlus className="mr-2" /> New Chat
            </motion.button>

            <div className="space-y-3">
              {chats && chats.length > 0 ? (
                chats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    variants={chatItemVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      chat.id === currentChatId
                        ? 'bg-blue-200 shadow-inner'
                        : 'hover:bg-gray-300'
                    }`}
                    onClick={() => onSelectChat(chat.id)}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <FaComments className={chat.id === currentChatId ? 'text-blue-600' : 'text-gray-600'} />
                      <span className="truncate font-medium">{chat.title}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    >
                      <FaTrash />
                    </motion.button>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-gray-600 italic text-center py-8 px-4 bg-white rounded-lg shadow-inner"
                >
                  <FaComments className="mx-auto mb-4 text-4xl text-gray-400" />
                  <p>No chats available yet. Start a new conversation!</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Sidebar);
