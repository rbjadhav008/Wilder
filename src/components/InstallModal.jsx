import React from 'react';
import { Download, X, Smartphone, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export default function InstallModal({ isOpen, onClose, onInstall, canPrompt }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '28px',
        border: '1px solid rgba(56, 189, 248, 0.4)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(7, 11, 20, 0.98))',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.2)',
        borderRadius: '20px',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'var(--text-muted)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            marginBottom: '14px',
            boxShadow: '0 0 25px rgba(56, 189, 248, 0.5)'
          }}>
            <Smartphone size={28} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', margin: '0 0 6px 0' }}>
            Download &amp; Install WILDER
          </h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Install WILDER directly on your phone as a standalone mobile app with home screen icon &amp; offline support.
          </p>
        </div>

        {/* Direct One-Click Button (if supported by browser) */}
        {canPrompt ? (
          <button
            onClick={() => {
              onInstall();
              onClose();
            }}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
              color: '#fff',
              border: 'none',
              fontWeight: 900,
              fontSize: '0.96rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 8px 30px rgba(56, 189, 248, 0.5)',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            <Download size={20} />
            <span>Install WILDER App Now</span>
          </button>
        ) : null}

        {/* 2-Step Android Chrome Instructions */}
        <div style={{
          background: 'rgba(7, 11, 20, 0.7)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          padding: '18px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Instant Mobile Installation Steps:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.2)',
                border: '1px solid #38bdf8',
                color: '#38bdf8',
                fontSize: '0.8rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                1
              </div>
              <div style={{ fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                In Chrome on your phone, tap the <strong>three dots (⋮)</strong> at the top right corner.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.2)',
                border: '1px solid #38bdf8',
                color: '#38bdf8',
                fontSize: '0.8rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                2
              </div>
              <div style={{ fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                Tap <strong>"Install app"</strong> (or <strong>"Install WILDER"</strong>). Tap <strong>"Install"</strong> to confirm.
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Update Advantage */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '10px',
          padding: '10px 14px',
          color: '#10b981',
          fontSize: '0.78rem'
        }}>
          <CheckCircle2 size={16} flexShrink={0} />
          <span>
            <strong>Automatic Cloud Upgrades:</strong> Whenever new features are added (like Granny Storyteller), opening the app updates it automatically!
          </span>
        </div>
      </div>
    </div>
  );
}
