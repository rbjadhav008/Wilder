// Audio Alarm & Speech Synthesizer Engine for WILDER
let audioCtx = null;
let sirenInterval = null;

export function startAlarmSiren() {
  stopAlarmSiren();
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    let toggle = false;
    sirenInterval = setInterval(() => {
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(toggle ? 920 : 1240, audioCtx.currentTime);
        toggle = !toggle;

        gain.gain.setValueAtTime(0.24, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.22);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.22);
      } catch (e) {
        console.warn('Audio node error:', e);
      }
    }, 260);
  } catch (err) {
    console.warn('AudioContext error:', err);
  }
}

export function stopAlarmSiren() {
  if (sirenInterval) {
    clearInterval(sirenInterval);
    sirenInterval = null;
  }
}

export function speakAlarmText(text) {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('SpeechSynthesis error:', err);
  }
}

export function triggerTradeAlert(trade) {
  startAlarmSiren();
  const dir = trade.direction || 'BUY';
  const sym = trade.symbol || 'XAUUSD';
  const entry = trade.entry_price || 'current price';
  const tp = trade.take_profit_1 || 'Target 1';

  speakAlarmText(`Attention Rushi! Urgent Trade Alarm from WILDER. New ${dir} signal on ${sym} at ${entry}. Target ${tp}. Process discipline enforced!`);

  if ('vibrate' in navigator) {
    try {
      navigator.vibrate([400, 180, 400, 180, 800]);
    } catch (e) {}
  }
}
