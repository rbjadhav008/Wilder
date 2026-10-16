import React from 'react';
import { Shield, Bell, Send, Lock, AlertTriangle, Sparkles } from 'lucide-react';

export default function Header({ onLock, onTestAlarm, onNavigate, activeTab }) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(7, 11, 20, 0.85)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      {/* Brand Identity */}
      <div 
        onClick={() => onNavigate('home')}
        style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
        title="Return to WILDER Executive Hub"
      >
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          background: '#0c1322',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src="/logo.png" alt="WILDER AI Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '0.04em', color: '#fff', margin: 0 }}>
              WILDER
            </h1>
            <span className="badge-pill badge-cyan" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
              EXECUTIVE OS
            </span>
          </div>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0 }}>
            Personal Intelligence &amp; Autonomous Trading Engine
          </p>
        </div>
      </div>

      {/* Action Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <div className="badge-pill badge-emerald" style={{ padding: '6px 12px' }}>
          <span className="pulse-dot"></span>
          <span>Cloud 24/7 Active</span>
        </div>

        <button 
          onClick={onTestAlarm}
          className="btn-secondary"
          style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.35)', background: 'rgba(244, 63, 94, 0.1)' }}
          title="Test emergency trade siren and voice announcement"
        >
          <AlertTriangle size={15} />
          <span>Test Alarm</span>
        </button>

        <button 
          onClick={onLock}
          className="btn-secondary"
          style={{ color: '#c084fc', borderColor: 'rgba(168, 85, 247, 0.35)', background: 'rgba(168, 85, 247, 0.1)' }}
          title="Lock app with 4-Digit Security PIN"
        >
          <Lock size={15} />
          <span>Lock Shield</span>
        </button>

        <a 
          href="https://t.me/Trading_2901_rushi_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          style={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.35)', textDecoration: 'none' }}
        >
          <Send size={14} />
          <span style={{ fontSize: '0.78rem' }}>@Trading_2901_rushi_bot</span>
        </a>
      </div>
    </header>
  );
}
