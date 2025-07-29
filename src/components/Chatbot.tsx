import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        className="fixed bottom-24 right-10 z-50 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 focus:outline-none"
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
        <span className="fixed bottom-40 right-10 text-xs bg-black/70 text-white px-2 py-1 rounded shadow-lg">
          Chat with us
        </span>
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
              <span className="font-bold text-pink-400 text-lg">EMS Chatbot</span>
              <button
                className="text-white/70 hover:text-pink-400 transition-all text-xl font-bold"
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-transparent" style={{ minHeight: 220 }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={
                    msg.from === 'bot'
                      ? 'flex items-start gap-2'
                      : 'flex items-end justify-end gap-2'
                  }
                >
                  {msg.from === 'bot' && (
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">E</span>
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
            <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-transparent">
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
                autoFocus={open}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-500 transition-all"
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