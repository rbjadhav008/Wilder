import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, Bell, Volume2, Smartphone, Save } from 'lucide-react';

export default function SecurityView({ onBack, onTestAlarm }) {
  const [newPin, setNewPin] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [sirenEnabled, setSirenEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [vibrateEnabled, setVibrateEnabled] = useState(true);

  const handleSavePin = () => {
    if (newPin.length === 4 && /^\d+$/.test(newPin)) {
      localStorage.setItem('wilder_pin', newPin);
      setSaveStatus(`✓ Master Security PIN updated to: ${newPin}`);
      setNewPin('');
      setTimeout(() => setSaveStatus(''), 4000);
    } else {
      alert('Please enter exactly 4 numbers for your PIN.');
    }
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '20px 20px 100px 20px' }}>
      <button 
        onClick={onBack}
        className="btn-secondary"
        style={{ fontSize: '0.88rem', padding: '8px 16px', marginBottom: '20px' }}
      >
        <ArrowLeft size={16} />
        <span>Back to WILDER Hub</span>
      </button>

      <div className="glass-panel" style={{
        padding: '28px',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(18, 28, 51, 0.9))'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.3), rgba(56, 189, 248, 0.2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8'
          }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              WILDER Security Vault &amp; Defense Settings
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Master PIN credentials, trade alarm configurations &amp; cloud authorization
            </p>
          </div>
        </div>

        {/* Change Master PIN Section */}
        <div style={{
          background: 'rgba(7, 11, 20, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            🔐 Master 4-Digit Security PIN
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Protects your personal assistant and trading accounts from unauthorized access. Default demo PIN is <strong>1234</strong>.
          </p>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="password"
              maxLength={4}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
              placeholder="New 4 digits (e.g. 5678)"
              className="mono"
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '1rem',
                width: '190px',
                textAlign: 'center',
                letterSpacing: '0.3em'
              }}
            />
            <button onClick={handleSavePin} className="btn-primary" style={{ padding: '10px 18px' }}>
              <Save size={16} />
              <span>Update Master PIN</span>
            </button>
          </div>

          {saveStatus && (
            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
              {saveStatus}
            </div>
          )}
        </div>

        {/* Trade Alarm Preferences */}
        <div style={{
          background: 'rgba(7, 11, 20, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            🚨 Emergency Trade Alarm Channels
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Choose how WILDER notifies you when high-probability institutional BUY/SELL signals trigger.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={sirenEnabled} 
                onChange={(e) => setSirenEnabled(e.target.checked)} 
                style={{ width: '18px', height: '18px', accentColor: '#38bdf8' }}
              />
              <div>
                <strong style={{ fontSize: '0.86rem', color: '#fff' }}>Dual-Pitch Audio Siren</strong>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Continuous repeating emergency beacon tone until acknowledged.</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={voiceEnabled} 
                onChange={(e) => setVoiceEnabled(e.target.checked)} 
                style={{ width: '18px', height: '18px', accentColor: '#a855f7' }}
              />
              <div>
                <strong style={{ fontSize: '0.86rem', color: '#fff' }}>AI Voice Synthesizer Announcer</strong>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Speaks the exact direction, symbol, entry level, and target aloud.</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={vibrateEnabled} 
                onChange={(e) => setVibrateEnabled(e.target.checked)} 
                style={{ width: '18px', height: '18px', accentColor: '#10b981' }}
              />
              <div>
                <strong style={{ fontSize: '0.86rem', color: '#fff' }}>Haptic Device Vibration</strong>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Pulses phone motor with emergency pattern.</div>
              </div>
            </label>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <button 
              onClick={onTestAlarm} 
              className="btn-secondary" 
              style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.4)' }}
            >
              <Bell size={16} />
              <span>Test Audio Siren &amp; Voice Announcement Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
