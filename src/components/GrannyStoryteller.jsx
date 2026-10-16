import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Mic, 
  MicOff, 
  Volume2, 
  Square, 
  Play, 
  Upload, 
  Sparkles, 
  ArrowLeft, 
  Heart, 
  VolumeX, 
  FileText, 
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Sliders
} from 'lucide-react';

// Sample 1-Page Classic Grandma Stories for immediate testing
const SAMPLE_STORIES = [
  {
    id: 'starlight',
    title: 'The Secret of the Whispering Starlight',
    pageLabel: 'Page 1 of 1 — Bedtime Wonder',
    text: `Come sit close to grandma, my sweet child, and let me pull the warm blanket right over your shoulders. Take a deep, gentle breath, and let the busy day fade away...

Long ago, on a quiet hill where the night jasmine bloomed, there lived a little girl named Tara. While the rest of the village slept under the indigo sky, Tara would open her small wooden bedroom window and listen to the stars. 

You see, the stars were not silent at all. If you listened with a quiet, patient heart, they hummed a tender lullaby—soft and golden like warm honey. 

One evening, a tiny falling star with silver wings drifted down and landed softly on Tara's windowsill. It was trembling like a dewy leaf in the morning breeze. 

"Do not be afraid, little star," Tara whispered softly, cupping her warm hands around its glowing light. "Grandma always told me that even the smallest light in the universe has a place where it belongs."

The little star sparkled with joy, warming Tara's fingertips. With a gentle breath, Tara blew a soft kiss into the night air, and the star leaped into the velvet heavens, shining brighter than all the rest.

And whenever Tara looked up, she knew she was never truly alone. And neither are you, my darling. Sweet dreams, close your eyes, and rest now.`
  },
  {
    id: 'brave_pip',
    title: 'Pip and the Golden Valley',
    pageLabel: 'Page 1 of 1 — Courage & Kindness',
    text: `Oh, come here, my brave little one! Grandma has a wonderful tale for you today. 

Once upon a sunny morning, tucked away beneath the great oak trees of the whispering woods, lived a tiny brown sparrow named Pip. Pip was the smallest bird in the entire forest, but inside his little chest beat the biggest, kindest heart you could ever imagine.

While the giant eagles soared high above the misty mountain peaks, Pip loved to hop along the garden paths, singing cheerful songs to the blooming wildflowers. 

One chilly afternoon, a great storm rolled in, and the golden key to the valley sanctuary slipped down into a narrow crevice between the stones. All the big forest animals gathered around, but not even the strongest bear could reach it.

Pip fluttered his tiny feathers, smiled warmly, and slipped right between the stones. With a cheerful chirp, he brought the key back into the sunlight! 

"You see," the wise grandmother owl whispered with a smile, "it is not how big you are on the outside that matters—it is the size of the courage and love you carry inside." 

And grandma knows that very same golden courage is inside you too, my sweetheart.`
  }
];

export default function GrannyStoryteller({ onBack }) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [customText, setCustomText] = useState(SAMPLE_STORIES[0].text);
  const [storyTitle, setStoryTitle] = useState(SAMPLE_STORIES[0].title);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(-1);
  const [micActive, setMicActive] = useState(false);
  const [voiceCommandDetected, setVoiceCommandDetected] = useState('');
  const [speechSpeed, setSpeechSpeed] = useState(0.85); // Gentle grandma cadence
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState('');
  const [isMicSupported, setIsMicSupported] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const recognitionRef = useRef(null);
  const isPlayingRef = useRef(false);
  const paragraphsRef = useRef([]);

  // Split story into readable narrative paragraphs
  const paragraphs = customText.split('\n\n').filter(p => p.trim().length > 0);
  paragraphsRef.current = paragraphs;

  // Load available system speech synthesis voices
  useEffect(() => {
    function loadVoices() {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);

        // Auto-select preferred English warm/female voice
        const englishVoices = voices.filter(v => v.lang.startsWith('en'));
        const preferred = englishVoices.find(v => 
          /natural|female|libby|samantha|victoria|karen|moira|grandma|fiona|george/i.test(v.name)
        ) || englishVoices[0] || voices[0];

        if (preferred && !selectedVoiceName) {
          setSelectedVoiceName(preferred.name);
        }
      }
    }

    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Check Speech Recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsMicSupported(false);
    }

    return () => {
      stopStorytelling();
    };
  }, []);

  // Update story selection
  const handleSelectStory = (idx) => {
    stopStorytelling();
    setActiveStoryIndex(idx);
    setStoryTitle(SAMPLE_STORIES[idx].title);
    setCustomText(SAMPLE_STORIES[idx].text);
    setUploadedFileName(null);
  };

  // Handle uploading book copy (.txt, .pdf text, image, doc)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    stopStorytelling();
    setUploadedFileName(file.name);
    setStoryTitle(file.name.replace(/\.[^/.]+$/, ''));

    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (content) {
          setCustomText(content);
        }
      };
      reader.readAsText(file);
    } else {
      // For binary files (PDF/Images), read basic preview or prompt
      const reader = new FileReader();
      reader.onload = () => {
        setCustomText(
          `📖 Book Copy Uploaded: ${file.name}\n\n` +
          `Grandma opens the book carefully, turning to page 1...\n\n` +
          `"My dear child, listen closely as I read the words written upon these pages. Every word is a treasure, and every turn of the page brings a new wonder to our cozy evening together..."`
        );
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Start Speech Recognition (Continuous Microphone Listening)
  const startMicListener = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setMicActive(true);
      };

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript.toLowerCase().trim();
          console.log('Storyteller Mic heard:', transcript);

          // User triggers: "stop", "closed", "close", "cancel", "hush", "quiet", "shut up"
          if (
            transcript.includes('stop') ||
            transcript.includes('closed') ||
            transcript.includes('close') ||
            transcript.includes('hush') ||
            transcript.includes('quiet') ||
            transcript.includes('cancel') ||
            transcript.includes('shut')
          ) {
            setVoiceCommandDetected(`Command "${transcript}" heard — Story stopped!`);
            stopStorytelling();
            break;
          }
        }
      };

      recognition.onerror = (event) => {
        console.warn('Recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setIsMicSupported(false);
          setMicActive(false);
        }
      };

      recognition.onend = () => {
        // Automatically restart mic if story is still playing
        if (isPlayingRef.current) {
          try {
            recognition.start();
          } catch (e) {
            setMicActive(false);
          }
        } else {
          setMicActive(false);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Failed to start SpeechRecognition:', err);
      setMicActive(false);
    }
  };

  // Stop Speech Recognition
  const stopMicListener = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setMicActive(false);
  };

  // Stop / Cancel Storytelling immediately
  const stopStorytelling = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setCurrentParagraphIndex(-1);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    stopMicListener();
  };

  // Speak a single paragraph, then sequentially continue
  const speakParagraph = (index) => {
    if (!isPlayingRef.current || index >= paragraphsRef.current.length) {
      stopStorytelling();
      return;
    }

    setCurrentParagraphIndex(index);
    const textToSpeak = paragraphsRef.current[index];

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = speechSpeed;
      utterance.pitch = 1.02; // Warm, soothing tone
      utterance.volume = 1.0;

      if (selectedVoiceName && availableVoices.length > 0) {
        const found = availableVoices.find(v => v.name === selectedVoiceName);
        if (found) utterance.voice = found;
      }

      utterance.onend = () => {
        if (isPlayingRef.current) {
          // Gentle grandma pause between paragraphs (600ms)
          setTimeout(() => {
            speakParagraph(index + 1);
          }, 600);
        }
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        if (isPlayingRef.current) {
          speakParagraph(index + 1);
        }
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  // Start storytelling
  const handleStartStorytelling = () => {
    if (isPlaying) {
      stopStorytelling();
      return;
    }

    if (!customText.trim()) return;

    setVoiceCommandDetected('');
    isPlayingRef.current = true;
    setIsPlaying(true);

    // 1. Activate continuous microphone listener for "stop" / "closed"
    startMicListener();

    // 2. Begin grandmotherly narrative narration from paragraph 0
    speakParagraph(0);
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '20px 20px 100px 20px' }}>
      {/* Back button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => {
            stopStorytelling();
            onBack();
          }}
          className="btn-secondary"
          style={{ fontSize: '0.88rem', padding: '8px 16px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Hub</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge-pill" style={{ 
            background: 'rgba(245, 158, 11, 0.15)', 
            color: '#f59e0b', 
            border: '1px solid rgba(245, 158, 11, 0.3)' 
          }}>
            <Heart size={14} color="#f59e0b" style={{ fill: '#f59e0b' }} />
            <span>Granny Voice Mode (English)</span>
          </span>
        </div>
      </div>

      {/* Main Storytelling Experience Card */}
      <div className="glass-panel" style={{
        padding: '28px',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        background: 'linear-gradient(135deg, rgba(20, 16, 28, 0.95), rgba(30, 22, 18, 0.92))',
        boxShadow: '0 16px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(245, 158, 11, 0.12)'
      }}>
        {/* Header Strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sparkles size={18} color="#f59e0b" />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                WILDER English Storyteller
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', margin: 0 }}>
              Grandmother's Bedtime Tales
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
              Upload any book copy or test our preloaded 1-page stories. WILDER narrates like a loving grandmother in warm English.
              <strong style={{ color: '#f59e0b' }}> Your microphone stays open</strong>—say <span style={{ color: '#fff', textDecoration: 'underline' }}>"STOP"</span> or <span style={{ color: '#fff', textDecoration: 'underline' }}>"CLOSED"</span> or tap the screen anytime to cancel.
            </p>
          </div>

          {/* Quick Upload Button */}
          <div>
            <label style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#f59e0b',
              fontWeight: 800,
              fontSize: '0.84rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              <Upload size={16} />
              <span>{uploadedFileName ? 'Uploaded: ' + uploadedFileName : 'Upload Book Copy (Page)'}</span>
              <input 
                type="file" 
                accept=".txt,.md,.pdf,.png,.jpg,.jpeg" 
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        {/* 1-Page Preloaded Test Stories Switcher */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>
            TEST 1-PAGE PRESETS (READY FOR INSTANT TESTING):
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {SAMPLE_STORIES.map((story, i) => (
              <button
                key={story.id}
                onClick={() => handleSelectStory(i)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  background: activeStoryIndex === i && !uploadedFileName 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(217, 119, 6, 0.25))' 
                    : 'rgba(255, 255, 255, 0.04)',
                  border: activeStoryIndex === i && !uploadedFileName 
                    ? '1px solid #f59e0b' 
                    : '1px solid var(--border-subtle)',
                  color: activeStoryIndex === i && !uploadedFileName ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <BookOpen size={15} color={activeStoryIndex === i && !uploadedFileName ? '#f59e0b' : 'var(--text-muted)'} />
                <span>{story.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Mic Voice Command & Interruption Status Banner */}
        <div style={{
          padding: '14px 18px',
          borderRadius: '14px',
          marginBottom: '22px',
          background: isPlaying 
            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.18), rgba(245, 158, 11, 0.15))' 
            : 'rgba(7, 11, 20, 0.65)',
          border: isPlaying 
            ? '1px solid rgba(239, 68, 68, 0.45)' 
            : '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: isPlaying ? '#ef4444' : 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: isPlaying ? '0 0 15px rgba(239, 68, 68, 0.6)' : 'none',
              animation: isPlaying ? 'pulse 1.5s infinite' : 'none'
            }}>
              {isPlaying ? <Mic size={20} /> : <MicOff size={18} color="var(--text-muted)" />}
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: isPlaying ? '#fff' : 'var(--text-muted)' }}>
                {isPlaying 
                  ? '🎙️ Microphone Live & Listening for Voice Commands' 
                  : 'Microphone Standby (Activates automatically when story starts)'}
              </div>
              <div style={{ fontSize: '0.74rem', color: isPlaying ? '#fca5a5' : 'var(--text-muted)' }}>
                {isPlaying 
                  ? 'Say "STOP" or "CLOSED" out loud, or tap the screen to instantly cancel storytelling.'
                  : (isMicSupported ? 'Speech recognition ready.' : 'Browser speech recognition not detected; click/tap cancel active.')}
              </div>
            </div>
          </div>

          {/* Voice Command Confirmation Alert */}
          {voiceCommandDetected && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(239, 68, 68, 0.25)',
              border: '1px solid #ef4444',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.76rem',
              fontWeight: 800
            }}>
              <CheckCircle2 size={14} color="#ef4444" />
              <span>{voiceCommandDetected}</span>
            </div>
          )}
        </div>

        {/* Narrative Display & Visual Reading Box */}
        <div 
          onClick={() => {
            if (isPlaying) {
              setVoiceCommandDetected('Mobile Screen Click/Tap Cancelled Story');
              stopStorytelling();
            }
          }}
          title={isPlaying ? 'Click / Tap anywhere on this story page to cancel' : ''}
          style={{
            background: 'rgba(12, 10, 16, 0.85)',
            border: isPlaying ? '2px solid rgba(245, 158, 11, 0.6)' : '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '16px',
            padding: '28px',
            position: 'relative',
            cursor: isPlaying ? 'pointer' : 'default',
            boxShadow: isPlaying ? '0 0 30px rgba(245, 158, 11, 0.15)' : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Mobile Tap Notice Overlay when playing */}
          {isPlaying && (
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              background: 'rgba(239, 68, 68, 0.9)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '5px 12px',
              borderRadius: '999px',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 10
            }}>
              <Square size={12} fill="#fff" />
              <span>TAP ANYWHERE TO CANCEL</span>
            </div>
          )}

          {/* Book Title & Page Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <FileText size={16} color="#f59e0b" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fef3c7', margin: 0 }}>
              {storyTitle}
            </h3>
          </div>

          {/* Paragraphs with Active Reading Highlight */}
          <div style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '10px' }}>
            {paragraphs.map((p, idx) => {
              const isCurrent = currentParagraphIndex === idx;
              return (
                <p 
                  key={idx}
                  style={{
                    fontSize: '1.02rem',
                    lineHeight: 1.8,
                    marginBottom: '18px',
                    color: isCurrent ? '#fff' : (isPlaying ? 'rgba(255, 255, 255, 0.5)' : '#e2e8f0'),
                    background: isCurrent ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
                    borderLeft: isCurrent ? '4px solid #f59e0b' : '4px solid transparent',
                    padding: isCurrent ? '10px 16px' : '0 16px',
                    borderRadius: '8px',
                    transition: 'all 0.25s ease',
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '0.01em'
                  }}
                >
                  {p}
                </p>
              );
            })}
          </div>
        </div>

        {/* Narrative & Audio Controls Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          {/* Main Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={handleStartStorytelling}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                borderRadius: '12px',
                background: isPlaying 
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                  : 'linear-gradient(135deg, #d97706, #f59e0b)',
                color: '#fff',
                fontWeight: 900,
                fontSize: '0.92rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: isPlaying 
                  ? '0 6px 20px rgba(239, 68, 68, 0.45)' 
                  : '0 6px 25px rgba(245, 158, 11, 0.45)'
              }}
            >
              {isPlaying ? (
                <>
                  <Square size={18} fill="#fff" />
                  <span>Stop Storytelling</span>
                </>
              ) : (
                <>
                  <Play size={18} fill="#fff" />
                  <span>Tell Me Like My Granny (Play)</span>
                </>
              )}
            </button>

            {isPlaying && (
              <button
                onClick={stopStorytelling}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  fontSize: '0.86rem',
                  fontWeight: 700
                }}
              >
                <VolumeX size={16} />
                <span>Cancel</span>
              </button>
            )}
          </div>

          {/* Speed & Voice Fine-tuning */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sliders size={15} color="#f59e0b" />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Pacing:</span>
              <button
                onClick={() => setSpeechSpeed(0.80)}
                style={{
                  background: speechSpeed === 0.80 ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: speechSpeed === 0.80 ? '#f59e0b' : 'var(--text-muted)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '0.72rem',
                  cursor: 'pointer'
                }}
              >
                Gentle (0.8x)
              </button>
              <button
                onClick={() => setSpeechSpeed(0.90)}
                style={{
                  background: speechSpeed === 0.90 ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: speechSpeed === 0.90 ? '#f59e0b' : 'var(--text-muted)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '0.72rem',
                  cursor: 'pointer'
                }}
              >
                Standard (0.9x)
              </button>
            </div>

            {/* Voice dropdown */}
            {availableVoices.length > 0 && (
              <select
                value={selectedVoiceName}
                onChange={(e) => setSelectedVoiceName(e.target.value)}
                style={{
                  background: 'rgba(7, 11, 20, 0.8)',
                  color: '#e2e8f0',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  fontSize: '0.74rem',
                  maxWidth: '180px'
                }}
              >
                {availableVoices.filter(v => v.lang.startsWith('en')).map(v => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Custom Edit Option */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
          <details>
            <summary style={{ fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600 }}>
              ✏️ Want to paste your own book text directly? Click here to edit
            </summary>
            <textarea
              rows={6}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste any book page, bedtime story, or chapter here..."
              style={{
                width: '100%',
                marginTop: '10px',
                background: 'rgba(7, 11, 20, 0.7)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '12px',
                color: '#fff',
                fontSize: '0.88rem',
                fontFamily: 'inherit',
                resize: 'vertical',
                outline: 'none'
              }}
            />
          </details>
        </div>
      </div>
    </div>
  );
}
