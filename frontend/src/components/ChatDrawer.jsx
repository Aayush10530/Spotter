import React, { useState, useRef, useEffect } from 'react';

const ChatDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'dispatch', text: 'SpotterAI Dispatch online. How can we help you today?', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      sender: 'driver',
      text: input,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });
      const data = await response.json();
      
      const dispatchMsg = {
        sender: 'dispatch',
        text: data.reply,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, dispatchMsg]);
    } catch (err) {
      console.error('Failed to send message', err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-[60] transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[400px] bg-white dark:bg-[#1C1C1E] shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-[56px] px-4 border-b border-outline-variant dark:border-gray-800 flex items-center justify-between bg-surface-container-lowest dark:bg-[#1C1C1E]">
          <h2 className="font-semibold text-on-surface dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-blue-400">support_agent</span>
            Dispatch Support
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-high dark:hover:bg-gray-800 rounded-full transition-colors text-on-surface-variant dark:text-gray-300 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#FAF9F6] dark:bg-[#121212]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col max-w-[80%] ${msg.sender === 'driver' ? 'self-end items-end' : 'self-start items-start'}`}>
              <div className={`p-3 rounded-2xl ${msg.sender === 'driver' ? 'bg-primary text-white rounded-br-none' : 'bg-white dark:bg-[#2C2C2E] text-on-surface dark:text-white border border-outline-variant dark:border-gray-700 rounded-bl-none'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
              <span className="text-[11px] text-on-surface-variant dark:text-gray-500 mt-1 mx-1">{msg.time}</span>
            </div>
          ))}
          {isTyping && (
             <div className="self-start flex flex-col max-w-[80%] items-start">
              <div className="p-3 rounded-2xl bg-white dark:bg-[#2C2C2E] text-on-surface dark:text-white border border-outline-variant dark:border-gray-700 rounded-bl-none flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
             </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        <div className="p-4 border-t border-outline-variant dark:border-gray-800 bg-white dark:bg-[#1C1C1E]">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 h-[40px] px-4 border border-outline-variant dark:border-gray-700 rounded-full bg-transparent text-sm text-on-surface dark:text-white focus:outline-none focus:border-primary dark:focus:border-blue-400"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-colors ${input.trim() ? 'bg-primary text-white hover:bg-opacity-90' : 'bg-surface-variant dark:bg-gray-800 text-on-surface-variant dark:text-gray-500 cursor-not-allowed'}`}
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatDrawer;
