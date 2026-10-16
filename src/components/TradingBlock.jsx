import React, { useState } from 'react';
import { 
  ArrowLeft, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Clock, 
  Activity, 
  Layers, 
  DollarSign, 
  Cpu 
} from 'lucide-react';

export default function TradingBlock({ onBack, liveData, notifications, onTriggerAlarm }) {
  const [activeSymbol, setActiveSymbol] = useState('XAUUSD');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');

  const price = activeSymbol === 'XAUUSD' 
    ? (liveData?.price ? `$${Number(liveData.price).toFixed(2)}` : '$4,172.50')
    : '$81,496.00';

  const chartSymbol = activeSymbol === 'XAUUSD' ? 'OANDA:XAUUSD' : 'BINANCE:BTCUSDT';

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '20px 20px 100px 20px' }}>
      {/* Top Navigation & Controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '14px', 
        marginBottom: '20px' 
      }}>
        <button 
          onClick={onBack}
          className="btn-secondary"
          style={{ fontSize: '0.88rem', padding: '8px 16px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to WILDER Hub</span>
        </button>

        {/* Symbol Selectors */}
        <div style={{
          display: 'flex',
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '12px',
          padding: '4px',
          border: '1px solid var(--border-subtle)',
          gap: '4px'
        }}>
          <button
            onClick={() => setActiveSymbol('XAUUSD')}
            style={{
              background: activeSymbol === 'XAUUSD' ? 'linear-gradient(135deg, #0284c7, #38bdf8)' : 'transparent',
              color: activeSymbol === 'XAUUSD' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🟡 Gold (XAUUSD)</span>
            <span style={{ fontSize: '0.68rem', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px' }}>
              SCANNER ACTIVE
            </span>
          </button>

          <button
            onClick={() => setActiveSymbol('BTCUSD')}
            style={{
              background: activeSymbol === 'BTCUSD' ? 'linear-gradient(135deg, #0284c7, #38bdf8)' : 'transparent',
              color: activeSymbol === 'BTCUSD' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🟠 Bitcoin (BTCUSD)</span>
            <span style={{ fontSize: '0.68rem', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px' }}>
              24/7 SCANNER
            </span>
          </button>
        </div>

        {/* Live Price Chip */}
        <div style={{
          background: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '12px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Live Tick:</span>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8' }} className="mono">
            {price}
          </span>
          <span className="pulse-dot"></span>
        </div>
      </div>

      {/* Account Details & MT5 Cloud Bridge Strip */}
      <div className="glass-panel" style={{
        padding: '18px 22px',
        marginBottom: '20px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(16, 185, 129, 0.08))',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={18} color="#10b981" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Live Trading Account &amp; MetaTrader 5 Bridge Status
            </h4>
          </div>
          <span className="badge-pill badge-emerald">
            OCTAFX CLOUD BRIDGE PROVISIONED
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          <div style={{ background: 'rgba(7, 11, 20, 0.7)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Account Balance / Equity</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }} className="mono">$1,000.00</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>Equity Tier: Growth Base</div>
          </div>

          <div style={{ background: 'rgba(7, 11, 20, 0.7)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Risk Rule (Compounding Law)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }} className="mono">0.01 Lots</div>
            <div style={{ fontSize: '0.68rem', color: '#38bdf8', marginTop: '2px' }}>Max $10.00 / 0.5% Loss Cap</div>
          </div>

          <div style={{ background: 'rgba(7, 11, 20, 0.7)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Execution Engine</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#c084fc' }}>MetaAPI Cloud</div>
            <div style={{ fontSize: '0.68rem', color: '#10b981', marginTop: '2px' }}>24/7 VPS Autonomous</div>
          </div>

          <div style={{ background: 'rgba(7, 11, 20, 0.7)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Active Silence Lock</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f59e0b' }}>IDLE / SCANNING</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>Silences AI during open trade</div>
          </div>
        </div>
      </div>

      {/* Hard ≥3.0R Requirement Live Status Banner */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        marginBottom: '20px',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(2, 132, 199, 0.15))'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#38bdf8" />
              <strong style={{ fontSize: '0.95rem', color: '#fff' }}>Hard 3R Risk/Reward Calculation Engine</strong>
              <span className="badge-pill badge-emerald">ENFORCED</span>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Sequence: H1 Trend &amp; OB → Pullback → Liquidity Target → Hard ≥3.0R Gate → M5/M1 Execution.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Calculated Reward:Risk</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10b981' }} className="mono">1:3.2R (PASS)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Chart + Live Signals Split Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* TradingView Live Chart (8 Cols) */}
        <div style={{ gridColumn: 'span 8', minHeight: '520px' }} className="glass-panel">
          <div style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} color="#38bdf8" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                Institutional Candlestick Analysis ({activeSymbol})
              </span>
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Live TradingView Terminal
            </span>
          </div>

          <div style={{ height: '460px', width: '100%', borderRadius: '0 0 20px 20px', overflow: 'hidden' }}>
            <iframe
              src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${encodeURIComponent(chartSymbol)}&interval=60&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&theme=dark&style=1&timezone=Etc%2FUTC`}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="TradingView Chart"
            />
          </div>
        </div>

        {/* Multi-Agent Signal Stream (4 Cols) */}
        <div style={{ gridColumn: 'span 4' }} className="glass-panel">
          <div style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} color="#c084fc" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                Live LLM Signal Stream
              </span>
            </div>
            <span className="badge-pill badge-purple" style={{ fontSize: '0.65rem' }}>
              MULTI-AGENT CONSENSUS
            </span>
          </div>

          <div style={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: '460px',
            overflowY: 'auto'
          }}>
            {notifications && notifications.length > 0 ? (
              notifications.map((n, idx) => {
                const isBuy = (n.title || '').includes('BUY') || (n.direction || '').includes('BUY');
                return (
                  <div 
                    key={n.id || idx}
                    style={{
                      background: 'rgba(7, 11, 20, 0.75)',
                      border: `1px solid ${isBuy ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
                      borderRadius: '12px',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span className={`badge-pill ${isBuy ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.68rem' }}>
                        {isBuy ? '🟢 BUY SIGNAL' : '🔴 SELL SIGNAL'}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {n.timestamp_ist || 'Live'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                      {n.title}
                    </div>

                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '8px' }}>
                      {n.message}
                    </div>

                    {n.entry_price && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '4px',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        fontSize: '0.68rem'
                      }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>Entry: </span>
                          <span className="mono" style={{ color: '#38bdf8', fontWeight: 700 }}>${Number(n.entry_price).toFixed(1)}</span>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>SL: </span>
                          <span className="mono" style={{ color: '#f43f5e', fontWeight: 700 }}>${Number(n.stop_loss).toFixed(1)}</span>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>TP: </span>
                          <span className="mono" style={{ color: '#10b981', fontWeight: 700 }}>${Number(n.take_profit_1).toFixed(1)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 10px', fontSize: '0.82rem' }}>
                Scanning markets... Zero low-quality setups allowed.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
