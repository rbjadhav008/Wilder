import React from 'react';
import { 
  TrendingUp, 
  Brain, 
  ShieldCheck, 
  Calendar, 
  Cpu, 
  Wallet, 
  ArrowUpRight, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BookOpen,
  Heart
} from 'lucide-react';

export default function ExecutiveHome({ onOpenBlock, liveData, onSpeakBriefing }) {
  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  const goldPrice = liveData?.price ? `$${Number(liveData.price).toFixed(2)}` : '$4,172.50';
  const newsSafe = liveData?.news?.safe ? 'SAFE' : 'CAUTION';
  const sessionName = liveData?.session?.session || 'NEW_YORK_OVERLAP';

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 20px 100px 20px' }}>
      {/* Executive Welcome Hero */}
      <div className="glass-panel" style={{
        padding: '30px 28px',
        marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(18, 28, 51, 0.85))',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(56, 189, 248, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={18} color="#38bdf8" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                WILDER Autonomous Assistant OS
              </span>
            </div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
              {timeGreeting}, <span style={{ color: '#38bdf8' }}>Rushi</span>.
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '640px', lineHeight: 1.6 }}>
              WILDER is actively monitoring your life, personal tasks, and financial intelligence. 
              The <strong style={{ color: '#38bdf8' }}>AI Trading Block</strong> is online with continuous institutional market scanning.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={onSpeakBriefing}
              className="btn-primary" 
              style={{ fontSize: '0.84rem', padding: '10px 18px' }}
            >
              <Volume2 size={16} />
              <span>Listen to Executive Briefing</span>
            </button>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'right' }}>
              Powered by native voice synthesis
            </span>
          </div>
        </div>

        {/* Real-time System Health Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={16} color="#10b981" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Defense &amp; News Shield</div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#10b981' }}>{newsSafe} (Zero Blackouts)</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={16} color="#38bdf8" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Market Kill Zone</div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#38bdf8' }}>{sessionName}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={16} color="#f59e0b" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Live Gold (XAUUSD)</div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f59e0b' }} className="mono">{goldPrice}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={16} color="#a855f7" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PIN &amp; Siren Security</div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#c084fc' }}>ENFORCED &amp; ACTIVE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Life Management Blocks */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          Personal Assistant Blocks
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          WILDER manages your life through specialized modular blocks. Tap any block to enter.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {/* BLOCK 1: AI TRADING BLOCK (ACTIVE & INTEGRATED) */}
        <div 
          onClick={() => onOpenBlock('trading')}
          className="glass-panel" 
          style={{
            padding: '24px',
            cursor: 'pointer',
            border: '2px solid rgba(56, 189, 248, 0.4)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(2, 132, 199, 0.12))',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.3), rgba(56, 189, 248, 0.2))',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8'
            }}>
              <TrendingUp size={24} />
            </div>
            <span className="badge-pill badge-emerald">
              <span className="pulse-dot"></span> LIVE &amp; ACTIVE
            </span>
          </div>

          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            AI Trading &amp; Financial Block
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
            Full institutional trading terminal with live Gold/BTC feeds, 3R risk gate, MetaAPI/MT5 account status, and emergency sirens.
          </p>

          {/* Quick Metrics Bar */}
          <div style={{
            background: 'rgba(7, 11, 20, 0.7)',
            borderRadius: '12px',
            padding: '12px 14px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            marginBottom: '18px',
            border: '1px solid var(--border-subtle)'
          }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Gold Price</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8' }} className="mono">{goldPrice}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>3R Gate</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10b981' }}>HARD PASS</div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Signals Today</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#c084fc' }}>Active Scan</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>
              Includes MT5 &amp; Account Details
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#38bdf8',
              fontWeight: 800,
              fontSize: '0.88rem'
            }}>
              <span>Open Trading Block</span>
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>

        {/* BLOCK 2: AI VOICE & CHAT INTELLIGENCE (ACTIVE) */}
        <div 
          onClick={() => onOpenBlock('assistant')}
          className="glass-panel" 
          style={{
            padding: '24px',
            cursor: 'pointer',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(168, 85, 247, 0.08))'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(168, 85, 247, 0.2))',
              border: '1px solid rgba(168, 85, 247, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c084fc'
            }}>
              <Brain size={24} />
            </div>
            <span className="badge-pill badge-purple">AI ASSISTANT</span>
          </div>

          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            WILDER Voice &amp; Chat Intelligence
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
            Direct interactive dialog with WILDER. Ask about market bias, risk limits, portfolio status, or have briefings read aloud.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Speech Synthesizer &amp; NLP Active
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#c084fc', fontWeight: 800, fontSize: '0.88rem' }}>
              <span>Chat with WILDER</span>
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>

        {/* BLOCK 3: SECURITY VAULT & PIN SHIELD (ACTIVE) */}
        <div 
          onClick={() => onOpenBlock('security')}
          className="glass-panel" 
          style={{
            padding: '24px',
            cursor: 'pointer',
            border: '1px solid rgba(244, 63, 94, 0.35)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(244, 63, 94, 0.08))'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.3), rgba(244, 63, 94, 0.2))',
              border: '1px solid rgba(244, 63, 94, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f43f5e'
            }}>
              <ShieldCheck size={24} />
            </div>
            <span className="badge-pill badge-rose">VAULT SHIELD</span>
          </div>

          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            Security Shield &amp; Siren Controls
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
            Configure your 4-digit master PIN lock, test emergency siren tones, and manage device access defense.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Default PIN: 1234
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f43f5e', fontWeight: 800, fontSize: '0.88rem' }}>
              <span>Security Settings</span>
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>

        {/* BLOCK 4: GRANNY STORYTELLER & BOOK READER (ACTIVE) */}
        <div 
          onClick={() => onOpenBlock('storyteller')}
          className="glass-panel" 
          style={{
            padding: '24px',
            cursor: 'pointer',
            border: '1px solid rgba(245, 158, 11, 0.45)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(245, 158, 11, 0.1))',
            boxShadow: '0 8px 30px rgba(245, 158, 11, 0.12)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.35), rgba(245, 158, 11, 0.2))',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f59e0b'
            }}>
              <BookOpen size={24} />
            </div>
            <span className="badge-pill" style={{
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#f59e0b',
              border: '1px solid rgba(245, 158, 11, 0.4)'
            }}>
              <Heart size={12} style={{ fill: '#f59e0b' }} />
              <span>GRANNY VOICE ACTIVE</span>
            </span>
          </div>

          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            Granny Storyteller &amp; Book Reader
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
            Upload any book copy or test preloaded 1-page bedtime stories. Narrates in warm English like your grandmother. Live mic interrupts on <strong style={{ color: '#f59e0b' }}>"STOP"</strong> or <strong style={{ color: '#f59e0b' }}>"CLOSED"</strong>, or tap to cancel.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700 }}>
              Test 1-Page Preload Available
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 800, fontSize: '0.88rem' }}>
              <span>Open Storyteller</span>
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>

        {/* BLOCK 5: SMART AUTOMATIONS & IOT (UPCOMING MODULE) */}
        <div 
          className="glass-panel" 
          style={{
            padding: '24px',
            opacity: 0.82,
            border: '1px dashed rgba(255, 255, 255, 0.15)',
            background: 'rgba(15, 23, 42, 0.5)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8'
            }}>
              <Cpu size={24} />
            </div>
            <span className="badge-pill badge-amber">FUTURE INTEGRATION</span>
          </div>

          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#e2e8f0', marginBottom: '6px' }}>
            Smart Automations &amp; IoT Hub
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
            Automate phone actions, smart home triggers, Telegram dispatch channels, and scheduled workflows.
          </p>
          <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600 }}>
            ⏳ Architecture Provisioned for Future Expansion
          </span>
        </div>

        {/* BLOCK 6: WEALTH & NET WORTH (UPCOMING MODULE) */}
        <div 
          className="glass-panel" 
          style={{
            padding: '24px',
            opacity: 0.82,
            border: '1px dashed rgba(255, 255, 255, 0.15)',
            background: 'rgba(15, 23, 42, 0.5)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8'
            }}>
              <Wallet size={24} />
            </div>
            <span className="badge-pill badge-amber">FUTURE INTEGRATION</span>
          </div>

          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#e2e8f0', marginBottom: '6px' }}>
            Wealth, Crypto &amp; Net Worth
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
            Track total net worth, compounding tier milestones, cash-flow reserves, and long-term asset growth.
          </p>
          <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600 }}>
            ⏳ Architecture Provisioned for Future Expansion
          </span>
        </div>
      </div>
    </div>
  );
}
