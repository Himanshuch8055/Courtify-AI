import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaSpinner, FaTimes } from "react-icons/fa";

const ChatWidget = ({ handleNewUserMessage, title, subtitle, messages, isLoading, isOpen, onClose }) => {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      handleNewUserMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed right-4 bottom-20 w-96 h-[70vh] bg-white rounded-lg shadow-xl flex flex-col"
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1">
          <FaTimes size={16} />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.user ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg max-w-[80%] ${message.user ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}>
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              <FaSpinner className="animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex items-end bg-white rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-grow p-2 bg-transparent outline-none resize-none max-h-32 min-h-[40px]"
            rows={1}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`p-2 rounded-r-lg self-end ${isLoading || !inputMessage.trim() ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:text-blue-600"}`}
          >
            <FaPaperPlane className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatWidget;
