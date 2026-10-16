import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ExecutiveHome from './components/ExecutiveHome';
import TradingBlock from './components/TradingBlock';
import AssistantBlock from './components/AssistantBlock';
import SecurityView from './components/SecurityView';
import SecurityModal from './components/SecurityModal';
import AlarmOverlay from './components/AlarmOverlay';
import MobileNav from './components/MobileNav';

import { fetchLiveFeed, fetchNotifications } from './services/api';
import { triggerTradeAlert, stopAlarmSiren, speakAlarmText } from './utils/alarm';
import { TrendingUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLocked, setIsLocked] = useState(false);
  const [liveData, setLiveData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [activeAlarmTrade, setActiveAlarmTrade] = useState(null);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const lastSeenNotifIdRef = useRef(null);
  const isInitialLoadRef = useRef(true);

  // Poll live market feed and notifications
  useEffect(() => {
    async function loadData() {
      try {
        const [feed, notifs] = await Promise.all([
          fetchLiveFeed('XAUUSD'),
          fetchNotifications()
        ]);
        setLiveData(feed);

        const notifList = notifs?.notifications || [];
        setNotifications(notifList);

        if (notifList.length > 0) {
          const latest = notifList[0];
          const latestId = latest.id || (latest.timestamp_ist + '_' + latest.title);

          if (!isInitialLoadRef.current && lastSeenNotifIdRef.current && latestId !== lastSeenNotifIdRef.current) {
            // New signal arrived - trigger alarm
            const isSignal = latest.type === 'SIGNAL_GENERATED' || latest.type === 'TRADE_FILLED' ||
              (latest.title && (latest.title.includes('BUY') || latest.title.includes('SELL')));

            if (isSignal) {
              setActiveAlarmTrade(latest);
              setIsAlarmOpen(true);
              triggerTradeAlert(latest);
            }
          }

          lastSeenNotifIdRef.current = latestId;
          isInitialLoadRef.current = false;
        }
      } catch (err) {
        console.warn('Data polling error:', err);
      }
    }

    loadData();
    const interval = setInterval(loadData, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleTestAlarm = () => {
    const demoTrade = {
      direction: 'BUY',
      symbol: 'XAUUSD',
      entry_price: liveData?.price || 4172.50,
      stop_loss: 4169.20,
      take_profit_1: 4182.40,
      rr_ratio: '1:3.2R (PASS)'
    };
    setActiveAlarmTrade(demoTrade);
    setIsAlarmOpen(true);
    triggerTradeAlert(demoTrade);
  };

  const handleSilenceAlarm = () => {
    setIsAlarmOpen(false);
    stopAlarmSiren();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSpeakBriefing = () => {
    const price = liveData?.price ? `$${Number(liveData.price).toFixed(2)}` : '$4,172.50';
    const text = `Good day, Rushi. I am WILDER. Gold is currently trading at ${price}. Red-folder news shield is safe, and your Hard 3.0R risk gate is strictly enforced. All institutional trading modules are active.`;
    speakAlarmText(text);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        onLock={() => setIsLocked(true)}
        onTestAlarm={handleTestAlarm}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeTab={activeTab}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <ExecutiveHome
            onOpenBlock={(blockId) => {
              setActiveTab(blockId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            liveData={liveData}
            onSpeakBriefing={handleSpeakBriefing}
          />
        )}

        {activeTab === 'trading' && (
          <TradingBlock
            onBack={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            liveData={liveData}
            notifications={notifications}
            onTriggerAlarm={handleTestAlarm}
          />
        )}

        {activeTab === 'assistant' && (
          <AssistantBlock
            onBack={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            liveData={liveData}
          />
        )}

        {activeTab === 'security' && (
          <SecurityView
            onBack={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTestAlarm={handleTestAlarm}
          />
        )}
      </main>

      {/* Floating Quick Trading Button (when inside Assistant or Security) */}
      {(activeTab === 'assistant' || activeTab === 'security') && (
        <button
          onClick={() => {
            setActiveTab('trading');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            position: 'fixed',
            bottom: '76px',
            right: '18px',
            zIndex: 890,
            background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '999px',
            padding: '10px 18px',
            fontSize: '0.82rem',
            fontWeight: 800,
            boxShadow: '0 8px 25px rgba(56, 189, 248, 0.45)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <TrendingUp size={16} />
          <span>Open Trading Block</span>
        </button>
      )}

      {/* Native Mobile Bottom Dock */}
      <MobileNav
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Security PIN Lock Overlay */}
      <SecurityModal
        isOpen={isLocked}
        onUnlock={() => setIsLocked(false)}
      />

      {/* Critical Trade Alarm Overlay */}
      <AlarmOverlay
        isOpen={isAlarmOpen}
        trade={activeAlarmTrade}
        onSilence={handleSilenceAlarm}
      />
    </div>
  );
}
