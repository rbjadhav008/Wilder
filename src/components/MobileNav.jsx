import React from 'react';
import { Home, TrendingUp, Bot, Shield, Send } from 'lucide-react';

export default function MobileNav({ activeTab, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'WILDER Hub', icon: Home },
    { id: 'trading', label: 'Trading', icon: TrendingUp },
    { id: 'assistant', label: 'Assistant', icon: Bot },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(7, 11, 20, 0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 12px 14px 12px',
      zIndex: 900
    }}>
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: isActive ? '#38bdf8' : 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              fontWeight: isActive ? 800 : 600,
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '12px',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              padding: '4px 12px',
              borderRadius: '999px',
              background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
              transition: 'all 0.2s ease'
            }}>
              <Icon size={20} />
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}

      {/* Telegram Link */}
      <a
        href="https://t.me/Trading_2901_rushi_bot"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.72rem',
          fontWeight: 600,
          textDecoration: 'none',
          padding: '6px 12px'
        }}
      >
        <div style={{ padding: '4px 12px' }}>
          <Send size={20} />
        </div>
        <span>Telegram</span>
      </a>
    </nav>
  );
}
