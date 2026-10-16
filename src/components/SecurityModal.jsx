import React, { useState } from 'react';
import { Lock, ShieldCheck, Check, Delete } from 'lucide-react';

export default function SecurityModal({ isOpen, onUnlock }) {
  const [enteredPin, setEnteredPin] = useState('');
  const [errorFlash, setErrorFlash] = useState(false);

  if (!isOpen) return null;

  const handleDigit = (digit) => {
    if (enteredPin.length < 4) {
      const next = enteredPin + digit;
      setEnteredPin(next);
      if (next.length === 4) {
        setTimeout(() => checkPin(next), 150);
      }
    }
  };

  const handleBackspace = () => {
    setEnteredPin(prev => prev.slice(0, -1));
  };

  const checkPin = (pinToTest) => {
    const savedPin = localStorage.getItem('wilder_pin') || '1234';
    if (pinToTest === savedPin) {
      setEnteredPin('');
      onUnlock();
    } else {
      setErrorFlash(true);
      setTimeout(() => {
        setErrorFlash(false);
        setEnteredPin('');
      }, 700);
    }
  };

  const handleQuickUnlock = () => {
    setEnteredPin('1234');
    setTimeout(() => {
      setEnteredPin('');
      onUnlock();
    }, 180);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      background: 'rgba(7, 11, 20, 0.94)',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(18, 28, 51, 0.95))',
        border: `2px solid ${errorFlash ? '#f43f5e' : 'rgba(56, 189, 248, 0.35)'}`,
        borderRadius: '24px',
        padding: '36px 30px',
        width: '100%',
        maxWidth: '380px',
        textAlign: 'center',
        boxShadow: errorFlash 
          ? '0 0 50px rgba(244, 63, 94, 0.6)' 
          : '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.15)',
        transition: 'all 0.25s ease'
      }}>
        {/* Shield Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.25), rgba(56, 189, 248, 0.15))',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          margin: '0 auto 16px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#38bdf8'
        }}>
          <Lock size={28} />
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>
          WILDER Security Vault
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Enter 4-digit PIN to access Personal Assistant &amp; Trades
        </p>

        {/* PIN Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '28px' }}>
          {[1, 2, 3, 4].map(idx => {
            const filled = idx <= enteredPin.length;
            return (
              <div 
                key={idx}
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: `2px solid ${filled ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)'}`,
                  background: filled ? '#38bdf8' : 'transparent',
                  boxShadow: filled ? '0 0 15px #38bdf8' : 'none',
                  transition: 'all 0.15s ease'
                }}
              />
            );
          })}
        </div>

        {/* Numeric Keypad */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          maxWidth: '280px',
          margin: '0 auto 20px auto'
        }}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(digit => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              style={{
                height: '56px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                color: '#fff',
                fontSize: '1.3rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseDown={(e) => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)'}
              onMouseUp={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'}
            >
              {digit}
            </button>
          ))}

          <button
            onClick={handleBackspace}
            style={{
              height: '56px',
              background: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              borderRadius: '16px',
              color: '#f43f5e',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Delete size={20} />
          </button>

          <button
            onClick={() => handleDigit('0')}
            style={{
              height: '56px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              color: '#fff',
              fontSize: '1.3rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            0
          </button>

          <button
            onClick={() => checkPin(enteredPin)}
            style={{
              height: '56px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '16px',
              color: '#10b981',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Check size={22} />
          </button>
        </div>

        {/* Quick Demo Unlock */}
        <button
          onClick={handleQuickUnlock}
          className="btn-secondary"
          style={{
            fontSize: '0.78rem',
            color: '#38bdf8',
            borderColor: 'rgba(56, 189, 248, 0.3)',
            padding: '8px 18px',
            margin: '0 auto'
          }}
        >
          ⚡ Quick Unlock (Demo PIN: 1234)
        </button>
      </div>
    </div>
  );
}
