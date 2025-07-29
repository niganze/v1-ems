import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bgImage from '../assets/Home_event5.jpg'; 

const demoResponses: { [key: string]: string } = {
  'services': 'We offer event planning, live streaming, hybrid events, conferences, and workshops.',
  'contact': 'You can contact us via the Contact page or email info@emsrwanda.com.',
  'team': 'Our team consists of experienced event managers, creative directors, and technical experts.',
  'hello': 'Hello! How can I help you with your event today?',
  'hi': 'Hi there! Ask me anything about our services.',
  'price': 'Pricing depends on your event needs. Please contact us for a custom quote.',
  'location': 'We are based in Kigali, Rwanda, but serve clients nationwide and internationally.',
  'default': 'I am here to help! Ask me about our services, team, or how to get started.'
};

function getBotResponse(input: string) {
  const lower = input.toLowerCase();
  for (const key in demoResponses) {
    if (lower.includes(key)) return demoResponses[key];
  }
  return demoResponses['default'];
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 I am your EMS event assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setTimeout(() => {
      const botMsg = { from: 'bot', text: getBotResponse(input) };
      setMessages(msgs => [...msgs, botMsg]);
    }, 600);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed z-50 flex items-center justify-center text-white transition-all duration-300 rounded-full shadow-2xl bottom-24 right-10 bg-gradient-to-br from-pink-500 to-purple-600 w-14 h-14 hover:scale-110 focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Open chatbot"
        style={{ display: open ? 'none' : 'flex' }}
      >
        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M8 15s1.5 2 4 2 4-2 4-2" />
          <path d="M9 9h.01" />
          <path d="M15 9h.01" />
        </svg>
      </button>

      {!open && (
        <span className="fixed px-2 py-1 text-xs text-white rounded shadow-lg bottom-40 right-10 bg-black/70">
          Chat with us
        </span>
      )}


      {open && (
        <div
          className="fixed bottom-6 right-6 z-40 w-80 max-w-[95vw] h-[500px] rounded-2xl overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.25,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-80 max-w-[95vw] bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-violet-900/95 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="text-lg font-bold text-pink-400">EMS Chatbot</span>
              <button
                className="text-xl font-bold transition-all text-white/70 hover:text-pink-400"
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-3 space-y-2 overflow-y-auto bg-transparent" style={{ minHeight: 220 }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={msg.from === 'bot' ? 'flex items-start gap-2' : 'flex items-end justify-end gap-2'}
                >
                  {msg.from === 'bot' && (
                    <span className="flex items-center justify-center w-8 h-8 font-bold text-white rounded-full bg-gradient-to-br from-pink-500 to-purple-600">E</span>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    className={
                      'px-4 py-2 rounded-xl max-w-[80%] text-sm ' +
                      (msg.from === 'bot'
                        ? 'bg-white/10 text-white shadow'
                        : 'bg-pink-500 text-white self-end')
                    }
                  >
                    {msg.text}
                  </motion.div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 bg-transparent border-t border-white/10">
              <input
                type="text"
                className="flex-1 px-3 py-2 text-white rounded-lg bg-white/10 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
                autoFocus={open}
              />
              <button
                type="submit"
                className="px-4 py-2 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
                disabled={!input.trim()}
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
