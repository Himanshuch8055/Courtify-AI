import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaComments } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body from "../components/Body";
import ChatWidget from "../components/ChatWidget";

const Main = () => {
  const [language, setLanguage] = useState("english");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const genAI = new GoogleGenerativeAI("AIzaSyBnZXehQHaFBfv81v9xasJ46QNFLeHiqs0");

  const handleNewUserMessage = async (newMessage) => {
    setMessages((prev) => [...prev, { text: newMessage, user: true }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Legal Care AI Assistant: ${language === "english" ? "English" : "Scheduled Language"} response. Query: "${newMessage}"`;
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();
      setMessages((prev) => [...prev, { text: aiResponse, user: false }]);
    } catch (error) {
      console.error("AI response error:", error);
      setMessages((prev) => [...prev, { text: "Error occurred. Please retry.", user: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => setLanguage(prev => prev === "english" ? "scheduled" : "english");
  const toggleChat = () => setIsChatOpen(prev => !prev);
  const filteredMessages = messages.filter(msg => msg.text.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 mt-12">
        <Body />
      </main>
      <Footer />

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-4 bottom-20 w-80 z-50"
          >
            <input
              type="text"
              placeholder="Filter messages..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-2 mb-4 border rounded shadow-md"
            />
            <ChatWidget
              handleNewUserMessage={handleNewUserMessage}
              title="Legal Care AI Assistant"
              subtitle={`Chatting in ${language === "english" ? "English" : "Scheduled Language"}`}
              messages={filteredMessages}
              isLoading={isLoading}
              isOpen={isChatOpen}
              onClose={toggleChat}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-blue-500 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
      >
        <FaComments size={20} className="md:w-6 md:h-6" />
      </motion.button>
    </div>
  );
};

export default Main;
