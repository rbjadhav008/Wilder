import React from 'react';
import { BellOff, AlertTriangle, ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';

export default function AlarmOverlay({ trade, isOpen, onSilence }) {
  if (!isOpen || !trade) return null;

  const isBuy = (trade.direction || 'BUY').toUpperCase().includes('BUY');
  const actionColor = isBuy ? '#10b981' : '#f43f5e';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10000,
      background: 'rgba(244, 63, 94, 0.25)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      animation: 'siren-flash 1s infinite alternate'
    }}>
      <div style={{
        background: '#0c1322',
        border: `3px solid ${actionColor}`,
        borderRadius: '24px',
        padding: '36px 30px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        boxShadow: `0 0 60px ${actionColor}80, 0 25px 60px rgba(0,0,0,0.9)`,
        position: 'relative'
      }}>
        {/* Siren Beacon */}
        <div style={{
          fontSize: '3.5rem',
          marginBottom: '10px',
          animation: 'float-icon 0.8s infinite alternate'
        }}>
          🚨
        </div>

        <h3 style={{
          fontSize: '1.4rem',
          fontWeight: 900,
          color: '#fff',
          letterSpacing: '0.04em',
          marginBottom: '6px'
        }}>
          CRITICAL TRADE ALARM TRIGGERED
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
          WILDER Multi-Agent Consensus &ge; 85% &bull; Process discipline enforced
        </p>

        {/* Direction Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 24px',
          borderRadius: '999px',
          background: isBuy ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
          border: `2px solid ${actionColor}`,
          fontSize: '1.2rem',
          fontWeight: 900,
          color: actionColor,
          marginBottom: '24px',
          boxShadow: `0 0 25px ${actionColor}50`
        }}>
          {isBuy ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          <span>{trade.direction || 'BUY'} {trade.symbol || 'XAUUSD'}</span>
        </div>

        {/* Trade Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          background: 'rgba(7, 11, 20, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '16px 14px',
          marginBottom: '26px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Entry Level</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }} className="mono">
              ${Number(trade.entry_price || 4172.5).toFixed(1)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Stop Loss (0.5%)</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f43f5e' }} className="mono">
              ${Number(trade.stop_loss || 4169.2).toFixed(1)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target 1 (3R+)</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }} className="mono">
              ${Number(trade.take_profit_1 || 4182.4).toFixed(1)}
            </div>
          </div>

          <div style={{
            gridColumn: 'span 3',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '10px',
            marginTop: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Calculated Risk / Reward Ratio:</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8' }} className="mono">
              {trade.rr_ratio || '1:3.2R (PASS)'}
            </span>
          </div>
        </div>

        {/* Silence Button */}
        <button
          onClick={onSilence}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #e11d48, #f43f5e)',
            color: '#fff',
            border: 'none',
            borderRadius: '16px',
            padding: '16px 20px',
            fontSize: '1rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 8px 30px rgba(244, 63, 94, 0.5)',
            transition: 'all 0.2s ease'
          }}
        >
          <BellOff size={20} />
          <span>ACKNOWLEDGE &amp; SILENCE ALARM</span>
        </button>
      </div>
    </div>
  );
}
