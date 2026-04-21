import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Image Imports
import childImg from './assets/content/child.png';
import curiosImg from './assets/content/curios.png';

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY ? import.meta.env.VITE_GEMINI_API_KEY.trim() : "";
const genAI = new GoogleGenerativeAI(API_KEY);

// SVG Icons
const IconAcademy = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);
const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

// --- SHARED COMPONENTS ---
const Header = ({ type = 'landing', user = null }) => {
  const navigate = useNavigate();
  
  return (
    <header className="main-header">
      <div className="container header-inner">
        <Link to="/" className="logo-group">
          <IconAcademy />
          <span className="brand-name">AetherLearn</span>
        </Link>
        
        {type === 'landing' ? (
          <>
            <nav className="nav-links">
              <a href="#built" className="nav-link">Build Skills</a>
              <a href="#lab" className="nav-link">Interactive Lab</a>
              <a href="#resources" className="nav-link">Resources</a>
            </nav>
            <div className="header-actions">
              <button className="btn btn-outline" onClick={() => navigate('/chat')}>Sign In</button>
              <button className="btn btn-primary" onClick={() => navigate('/chat')}>Get Started</button>
            </div>
          </>
        ) : (
          <div className="header-actions">
            <div className="user-profile">
              <IconUser />
              <span>{user?.name || 'Explorer'}</span>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/')}>Exit Lab</button>
          </div>
        )}
      </div>
    </header>
  );
};

// --- PAGES ---

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <Header type="landing" />
      <main style={{ paddingTop: 'calc(var(--header-height))' }}>
        <section className="hero-section">
          <div className="container hero-split">
            <div className="hero-text animate-fade">
              <h1 className="hero-main-title">Personalized AI Tutoring for the Next Generation</h1>
              <p className="hero-desc">
                Shift from static content to adaptive, multimodal journeys. AetherLearn uses Gemini AI 
                to turn every question into a masterpiece of understanding.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/chat')}>
                  Start Learning Now <IconArrow />
                </button>
                <button className="btn btn-outline btn-lg">View Tutorials</button>
              </div>
            </div>
            <div className="hero-visual animate-fade">
              <div className="hero-image-wrapper">
                <img src={childImg} alt="Learner" className="hero-main-img" />
              </div>
              <div className="floating-badge">98% Clarity Rate</div>
            </div>
          </div>
        </section>

        <section className="feature-section bg-light">
          <div className="container grid-3">
            <div className="feature-card">
              <h4>Code Logic</h4>
              <p>From snippets to full architecture, understand exactly how your logic flows.</p>
            </div>
            <div className="feature-card highlighted">
              <h4>Multimodal Depth</h4>
              <p>Generated visuals and explanations that adapt to your unique learning style.</p>
            </div>
            <div className="feature-card">
              <h4>Skill Tracking</h4>
              <p>Every lesson builds into a comprehensive roadmap of your expanding expertise.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <IconAcademy />
            <span>AetherLearn</span>
          </div>
          <p className="copyright">&copy; 2026 AetherLearn AI. Redefining interactive education.</p>
        </div>
      </footer>

      <style jsx="true">{`
        .hero-section { padding: 6rem 0; background: linear-gradient(135deg, #fff7ed 0%, #ffffff 100%); }
        .hero-split { display: grid; grid-template-columns: 1.25fr 1fr; gap: 4rem; align-items: center; }
        .hero-main-title { font-size: 3.8rem; margin-bottom: 2rem; color: #0f172a; line-height: 1.1; letter-spacing: -0.05em; font-weight: 800; }
        .hero-desc { font-size: 1.25rem; margin-bottom: 3.5rem; color: #475569; max-width: 580px; }
        .hero-actions { display: flex; gap: 1.5rem; }
        .hero-image-wrapper { position: relative; border-radius: 2.5rem; overflow: hidden; box-shadow: 0 30px 60px -15px rgba(0,0,0,0.1); border: 4px solid white; }
        .hero-main-img { width: 100%; height: auto; display: block; }
        .floating-badge { position: absolute; bottom: -20px; right: 20px; background: var(--accent-secondary); color: white; padding: 1rem 2rem; border-radius: 3rem; font-weight: 800; }
        .bg-light { background: #f8fafc; padding: 6rem 0; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
        .feature-card { background: white; padding: 3rem; border-radius: 1.5rem; border: 1px solid var(--border-color); }
        .feature-card.highlighted { border-color: var(--accent-primary); box-shadow: 0 10px 30px rgba(0, 100, 224, 0.05); }
        .footer { padding: 4rem 0; border-top: 1px solid var(--border-color); text-align: center; }
        .footer-brand { display: flex; align-items: center; justify-content: center; gap: 0.75rem; color: var(--accent-primary); margin-bottom: 1rem; }
      `}</style>
    </div>
  );
};

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Welcome back! I am your Aether AI Tutor. Ready to turn your curiosity into mastery today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;
    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsTyping(true);

    const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro-001", "gemini-pro"];
    let success = false;
    let lastError = "";

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();
        if (text) {
          setMessages(prev => [...prev, { role: 'ai', content: text }]);
          success = true;
          break; 
        }
      } catch (error) {
        lastError = error.message;
      }
    }

    if (!success) {
      setMessages(prev => [...prev, { role: 'ai', content: `Neural connection error: ${lastError}` }]);
    }
    setIsTyping(false);
  };

  return (
    <div className="chat-page">
      <Header type="chat" user={{ name: 'Explorer One' }} />
      <main className="container tutor-layout" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
        <section className="chat-interface">
          <div className="chat-box">
            {messages.map((m, i) => (
              <div key={i} className={`msg-bubble ${m.role}`}>
                <div className="sender-label">{m.role === 'ai' ? 'Aether AI' : 'You'}</div>
                <div className="msg-text">{m.content}</div>
              </div>
            ))}
            {isTyping && <div className="typing-status">Aether is mapping neural paths...</div>}
            <div ref={chatEndRef} />
          </div>
          
          <div className="chat-input-container">
            <div className="input-vibrant-wrapper">
              <textarea 
                className="vibrant-input"
                placeholder="Ask me anything..." 
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                rows="1"
              />
              <button className={`send-btn ${inputValue.trim() ? 'active' : ''}`} onClick={handleSend} disabled={isTyping}>
                <IconArrow />
              </button>
            </div>
          </div>
        </section>
        
        <aside className="logic-panel">
          <div className="logic-viz">
            <div className="viz-image-frame">
               <img src={curiosImg} alt="Curiosity" className="viz-asset" />
            </div>
            <h4>Multimodal Context</h4>
            <p>Gemini AI is analyzing your input for cross-domain synthesis.</p>
          </div>
        </aside>
      </main>

      <style jsx="true">{`
        .chat-page { background: #f8fafc; min-height: 100vh; }
        .tutor-layout { display: grid; grid-template-columns: 1fr 340px; gap: 2rem; height: calc(100vh - 40px); }
        .chat-interface { display: flex; flex-direction: column; background: white; border-radius: 2rem; border: 1px solid var(--border-color); overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.04); }
        .chat-box { flex: 1; overflow-y: auto; padding: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .msg-bubble { max-width: 85%; }
        .msg-text { padding: 1.2rem 1.8rem; border-radius: 1.5rem; font-size: 1rem; line-height: 1.6; }
        .msg-bubble.ai .msg-text { background: #f1f5f9; color: var(--text-header); border-bottom-left-radius: 0.4rem; }
        .msg-bubble.user { align-self: flex-end; }
        .msg-bubble.user .msg-text { background: var(--accent-primary); color: white; border-bottom-right-radius: 0.4rem; }
        .sender-label { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; margin-bottom: 0.4rem; color: var(--text-body); letter-spacing: 0.05em; }
        .msg-bubble.user .sender-label { text-align: right; }
        .chat-input-container { padding: 2.5rem; background: #ffffff; border-top: 1px solid var(--border-color); }
        .input-vibrant-wrapper { display: flex; align-items: center; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 4rem; padding: 0.5rem 0.5rem 0.5rem 2rem; }
        .vibrant-input { flex: 1; background: transparent; border: none; outline: none; font-size: 1.1rem; padding: 0.8rem 0; resize: none; font-family: inherit; }
        .send-btn { width: 48px; height: 48px; border-radius: 50%; background: #cbd5e1; color: white; display: flex; align-items: center; justify-content: center; border: none; transition: 0.3s; }
        .send-btn.active { background: var(--accent-primary); cursor: pointer; }
        .logic-panel { background: white; border-radius: 2rem; border: 1px solid var(--border-color); padding: 2.5rem; }
        .logic-viz { text-align: center; }
        .viz-image-frame { border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-color); }
        .viz-asset { width: 100%; display: block; }
      `}</style>
    </div>
  );
};

// --- APP ROOT ---
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
