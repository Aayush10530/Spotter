import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../../services/api';
import './ChatPanel.css';

const ChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    const newMsg = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsSending(true);

    try {
      const response = await sendMessage(newMsg.text);
      if (response && response.reply) {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'dispatch', text: response.reply }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'dispatch', text: 'Error: Failed to send message to dispatch.' }]);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-panel-overlay" onClick={onClose}>
      <div className="chat-panel" onClick={e => e.stopPropagation()}>
        <div className="chat-header">
          <h2 className="chat-title">
            <span className="material-symbols-outlined">mode_comment</span>
            Messages
          </h2>
          <button className="chat-close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-message-group ${msg.sender}`}>
              {msg.sender === 'dispatch' && <span className="chat-sender-label">Dispatch</span>}
              {msg.sender === 'user' && <span className="chat-sender-label">You</span>}
              <div className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isSending}
          />
          <button type="submit" className="chat-send-btn" disabled={!inputValue.trim() || isSending}>
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
