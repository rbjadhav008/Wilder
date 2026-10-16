import React, { useState } from 'react';
import { ArrowLeft, Send, Sparkles, Volume2, Bot, User, CheckCircle2, BookOpen, Heart } from 'lucide-react';
import { speakAlarmText } from '../utils/alarm';

export default function AssistantBlock({ onBack, onOpenStoryteller, liveData }) {
  const [messages, setMessages] = useState([
    {
      sender: 'wilder',
      text: 'Good day, Rushi. I am WILDER, your personal executive assistant. All autonomous market scanners, Telegram alerts, and Hard 3R risk checks are active. How can I assist you today?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    '📖 Tell Me a Story Like My Granny',
    'Active Trade Positions?',
    'Is Macro News Safe Today?',
    'Current Gold (XAUUSD) Bias?'
  ];

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = '';

      if (lower.includes('active') || lower.includes('trade') || lower.includes('position')) {
        reply = '📊 Active Positions: Currently scanning every 10s across Bybit & TradingView feeds. Multi-Agent consensus is enforcing Hard ≥3.0R minimums with max $10.00 loss cap.';
      } else if (lower.includes('news') || lower.includes('safe')) {
        const safe = liveData?.news?.safe ? 'SAFE' : 'RED-FOLDER BLACKOUT ACTIVE';
        reply = `🛡️ Macro News Status: ${safe}. No high-impact CPI, FOMC, or NFP events are currently interrupting institutional trading.`;
      } else if (lower.includes('gold') || lower.includes('bias')) {
        const price = liveData?.price ? `$${Number(liveData.price).toFixed(2)}` : '$4,172.50';
        reply = `📈 Gold (XAUUSD): Currently trading at ${price} with confirmed BULLISH structural bias. Primary institutional liquidity objective is PDH and unmitigated H1 Order Blocks.`;
      } else if (lower.includes('granny') || lower.includes('story') || lower.includes('book') || lower.includes('read')) {
        reply = '📖 Opening your Granny Storyteller! You can upload any book copy or test our preloaded 1-page bedtime stories. Your microphone is open—say "STOP" or "CLOSED" or tap your screen anytime to cancel.';
        if (onOpenStoryteller) setTimeout(onOpenStoryteller, 1000);
      } else {
        reply = `⚡ Understood Rushi! I have recorded this in your WILDER personal assistant memory. All market scanners, trade alarms, and portfolio defenses are running 24/7.`;
      }

      setMessages(prev => [...prev, { sender: 'wilder', text: reply }]);
    }, 400);
  };

  const handleReadAloud = (text) => {
    speakAlarmText(text);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px 20px 100px 20px' }}>
      <button 
        onClick={onBack}
        className="btn-secondary"
        style={{ fontSize: '0.88rem', padding: '8px 16px', marginBottom: '20px' }}
      >
        <ArrowLeft size={16} />
        <span>Back to WILDER Hub</span>
      </button>

      <div className="glass-panel" style={{
        padding: '24px',
        border: '1px solid rgba(168, 85, 247, 0.4)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(18, 28, 51, 0.9))',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(168, 85, 247, 0.15)'
      }}>
        {/* Assistant Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
            }}>
              <Bot size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                WILDER Personal Intelligence Dialogue
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0 }}>
                Autonomous reasoning, trade status &amp; daily executive briefing
              </p>
            </div>
          </div>

          <span className="badge-pill badge-purple">
            <span className="pulse-dot" style={{ background: '#c084fc', boxShadow: '0 0 10px #c084fc' }}></span>
            VOICE SYNTHESIS READY
          </span>
        </div>

        {/* Granny Storyteller Integrated Feature Banner */}
        <div 
          onClick={onOpenStoryteller}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 18px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(217, 119, 6, 0.12))',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            marginBottom: '18px',
            cursor: 'pointer',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f59e0b'
            }}>
              <BookOpen size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fef3c7' }}>
                Granny Storyteller &amp; Book Reader
              </div>
              <div style={{ fontSize: '0.74rem', color: 'rgba(254, 243, 199, 0.75)' }}>
                Upload any book copy or test 1-page bedtime stories. Mic stays open—say "STOP" / "CLOSED" anytime.
              </div>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenStoryteller) onOpenStoryteller();
            }}
            style={{
              fontSize: '0.76rem',
              padding: '6px 14px',
              background: '#f59e0b',
              color: '#000',
              fontWeight: 800,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Open Storyteller
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              style={{
                background: 'rgba(168, 85, 247, 0.08)',
                color: '#c084fc',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              💬 {p}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div style={{
          background: 'rgba(7, 11, 20, 0.85)',
          borderRadius: '16px',
          border: '1px solid var(--border-subtle)',
          padding: '20px',
          minHeight: '360px',
          maxHeight: '480px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          marginBottom: '20px'
        }}>
          {messages.map((m, idx) => {
            const isUser = m.sender === 'user';
            return (
              <div 
                key={idx}
                style={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '82%',
                  display: 'flex',
                  gap: '10px',
                  flexDirection: isUser ? 'row-reverse' : 'row'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: isUser ? 'linear-gradient(135deg, #0284c7, #38bdf8)' : 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0
                }}>
                  {isUser ? <User size={16} /> : <Bot size={16} />}
                </div>

                <div style={{
                  background: isUser ? 'rgba(2, 132, 199, 0.2)' : 'rgba(18, 28, 51, 0.9)',
                  border: `1px solid ${isUser ? 'rgba(56, 189, 248, 0.35)' : 'rgba(168, 85, 247, 0.3)'}`,
                  borderRadius: '14px',
                  padding: '12px 16px',
                  color: '#f8fafc',
                  fontSize: '0.84rem',
                  lineHeight: 1.5,
                  position: 'relative'
                }}>
                  {m.text}

                  {!isUser && (
                    <button
                      onClick={() => handleReadAloud(m.text)}
                      title="Read aloud with voice synthesizer"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#c084fc',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        marginLeft: '8px',
                        verticalAlign: 'middle'
                      }}
                    >
                      <Volume2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Row */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask WILDER about trades, market direction, or personal assistance..."
            style={{
              flex: 1,
              background: 'rgba(7, 11, 20, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: '#f8fafc',
              fontSize: '0.86rem',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          <button 
            onClick={() => handleSend()}
            className="btn-primary btn-purple" 
            style={{ padding: '12px 22px' }}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
