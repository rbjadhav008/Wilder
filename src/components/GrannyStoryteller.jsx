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
  Sliders,
  Search,
  Bookmark,
  Library,
  Loader2,
  Compass
} from 'lucide-react';
import { searchBookAgent } from '../services/api';

// Curated Classic Bedtime Vault for Instant (0.01s) Playback
const CLASSIC_VAULT = [
  {
    id: 'alice_wonderland',
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    genre: "Fantasy & Wonder",
    text: `Come sit close to grandma, my sweet child, and let me pull the warm blanket right over your shoulders. Take a deep, gentle breath, and let the busy day fade away...

Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do. Once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it. "And what is the use of a book," thought Alice, "without pictures or conversations?"

So she was considering in her own mind—as well as she could, for the hot day made her feel very sleepy and stupid—whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.

There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, "Oh dear! Oh dear! I shall be late!" But when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it!

Burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.

In another moment down went Alice after it, never once considering how in the world she was to get out again. The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.

Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next. Down, down, down. Would the fall never come to an end?

"Do not worry, my darling," grandma smiles softly, cupping your hands. "In the greatest adventures of life, the tumbling down is just the start of the magic. Close your eyes, and let us follow Alice down into the wonderland of dreams."`
  },
  {
    id: 'jungle_book',
    title: "The Jungle Book: Mowgli's Brothers",
    author: "Rudyard Kipling",
    genre: "Wild Adventure & Courage",
    text: `Oh, come here, my brave little one! Grandma has a wonderful tale of the whispering jungle for you tonight.

It was seven o'clock of a very warm evening in the Seeonee hills when Father Wolf woke up from his day's rest, scratched himself, yawned, and spread out his paws one after the other to get rid of the sleepy feeling in their tips. Mother Wolf lay with her big gray nose dropped across her four tumbling, squealing cubs, and the moon shone into the mouth of the cave where they all lived.

"Augrh!" said Father Wolf. "It is time to hunt again."

He was just going to spring down hill when a little shadow with a bushy tail crossed the threshold and whined: "Good luck go with you, O Chief of the Wolves. And good luck and strong white teeth go with noble children that they may never forget the hungry in this world."

It was the jackal, Tabaqui, the dish-licker. But deeper in the jungle, by the rushing river, a dry, angry, snarly whine arose—it was Shere Khan, the great tiger, hunting near the human village.

Presently, the bushes rustled slightly in the thicket, and Father Wolf dropped on his haunches, ready for his leap. Then, if you had been watching, you would have seen the most wonderful thing in the world: the wolf checked in mid-spring, landing softly right upon his feet!

"Look!" he whispered. "A man's cub. A human baby!"

Directly in front of him, holding on by a low branch, stood a naked brown baby who could just walk—as soft and as dimpled a little atom as ever came to a wolf's cave at night. He looked up into Father Wolf's fierce face, and laughed.

"Is that a man's cub?" said Mother Wolf. "I have never seen one. Bring it here."

Father Wolf's jaws closed on the child's back, and not a tooth even scratched the skin as he laid it down among the little cubs. "How little! How naked, and how bold!" Mother Wolf whispered softly, licking the little boy's cheek.

And that is how little Mowgli found a warm home among the wild wolves. Grandma knows that courage is not about how big you are—it is about having a gentle heart that knows no fear. Sleep peacefully now, my darling child.`
  },
  {
    id: 'panchatantra_tales',
    title: "Panchatantra: The Loyal Friend & Wise Heart",
    author: "Pandit Vishnu Sharma",
    genre: "Ancient Wisdom & Peace",
    text: `Come close, my sweetheart. Let grandma share an ancient secret from the timeless forests of India, where animals spoke with words of gold.

Long ago, beside the shimmering waters of the great river, there stood an enormous rose-apple tree. Its branches were heavy with sweet, ruby-red fruit, and in this tree lived a clever, gentle monkey named Kapi.

Every evening as the crimson sun dipped behind the forest trees, Kapi would pick the juiciest rose-apples and toss them down to his dear friend, a kind old crocodile who rested by the riverbank. They would talk for hours about the stars, the whispering wind, and the quiet harmony of the forest.

"You see, my child," grandma whispers gently, "true friendship is not measured by where we come from, but by the love and loyalty we give with an open heart. But in every life, there comes a moment when wisdom and courage are tested."

When the crocodile's wife wished to test their bond, the crocodile offered Kapi a ride across the deep waters. But halfway across the great river, the crocodile confessed his sorrow. Kapi's little chest fluttered, but he kept his mind as calm as a mountain lake.

"Oh, my dear brother," Kapi said with a gentle laugh, "why didn't you tell me sooner? We monkeys never carry our hearts inside our chests—we keep them safely tucked high in the branches of the rose-apple tree! Swim us back to shore, and I will gladly fetch it for your wife."

The crocodile swiftly turned back, and the moment his claws touched the sandy bank, Kapi leaped high into the safety of the tall green branches.

"Remember this, my darling," grandma smiles, smoothing your forehead. "When troubled waters rise around you, never let panic cloud your spirit. A calm heart and a clever mind will carry you safely through any storm in life. Now rest your eyes, and dream of sweet rose-apples under the golden moon."`
  }
];

export default function GrannyStoryteller({ onBack }) {
  // Story & Book State
  const [storyTitle, setStoryTitle] = useState(CLASSIC_VAULT[0].title);
  const [authorName, setAuthorName] = useState(CLASSIC_VAULT[0].author);
  const [customText, setCustomText] = useState(CLASSIC_VAULT[0].text);
  const [activeBookId, setActiveBookId] = useState(CLASSIC_VAULT[0].id);

  // Playback & Voice State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(-1);
  const [speechSpeed, setSpeechSpeed] = useState(0.85); // Warm grandma cadence
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState('');

  // Voice Interaction & Search Agent State
  const [isVoiceAsking, setIsVoiceAsking] = useState(false);
  const [isSearchingBook, setIsSearchingBook] = useState(false);
  const [searchStatusStep, setSearchStatusStep] = useState('');
  const [voiceQueryTranscript, setVoiceQueryTranscript] = useState('');
  const [searchQueryInput, setSearchQueryInput] = useState('');
  const [agentLatency, setAgentLatency] = useState(null);
  const [voiceCommandFeedback, setVoiceCommandFeedback] = useState('');
  const [micActive, setMicActive] = useState(false);
  const [isMicSupported, setIsMicSupported] = useState(true);

  // Persistence & Library Bookmarks
  const [savedBookmark, setSavedBookmark] = useState(null);
  const [savedLibrary, setSavedLibrary] = useState([]);
  const [showLibraryDrawer, setShowLibraryDrawer] = useState(false);

  // References
  const recognitionRef = useRef(null);
  const isPlayingRef = useRef(false);
  const paragraphsRef = useRef([]);
  const currentParagraphIndexRef = useRef(-1);
  const activeBookIdRef = useRef(CLASSIC_VAULT[0].id);
  const storyTitleRef = useRef(CLASSIC_VAULT[0].title);

  // Split story text into clean paragraphs
  const paragraphs = customText.split('\n\n').filter(p => p.trim().length > 0);
  paragraphsRef.current = paragraphs;

  // 1. Initialize Voices & Load Saved Bookmark
  useEffect(() => {
    function loadVoices() {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);

        // Auto-select preferred soothing English maternal voice
        const englishVoices = voices.filter(v => v.lang.startsWith('en'));
        const preferred = englishVoices.find(v => 
          /natural|female|libby|samantha|victoria|karen|moira|grandma|fiona|george|serena/i.test(v.name)
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

    // Load saved bookmark from localStorage (for Next-Day Resume)
    try {
      const storedBm = localStorage.getItem('wilder_granny_bookmark');
      if (storedBm) {
        const parsed = jsonSafeParse(storedBm);
        if (parsed && parsed.bookTitle) {
          setSavedBookmark(parsed);
        }
      }

      // Load saved library shelf
      const storedLib = localStorage.getItem('wilder_saved_books_library');
      if (storedLib) {
        const parsedLib = jsonSafeParse(storedLib);
        if (Array.isArray(parsedLib) && parsedLib.length > 0) {
          setSavedLibrary(parsedLib);
        }
      }
    } catch (e) {
      console.warn('Failed to load bookmark storage:', e);
    }

    return () => {
      stopStorytelling();
    };
  }, []);

  function jsonSafeParse(str) {
    try { return JSON.parse(str); } catch { return null; }
  }

  // 2. Ask User via Voice: "What do you want to listen to?"
  const handleAskUserVoicePrompt = () => {
    stopStorytelling();
    setIsVoiceAsking(true);
    setVoiceQueryTranscript('');
    setSearchStatusStep('Grandma is listening to your wish...');

    const promptText = "Hello my sweet child! What book or story would you like to listen to tonight? Tell me the title, and grandma will find it for you.";

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(promptText);
      utterance.rate = 0.88;
      utterance.pitch = 1.05;

      if (selectedVoiceName && availableVoices.length > 0) {
        const found = availableVoices.find(v => v.name === selectedVoiceName);
        if (found) utterance.voice = found;
      }

      utterance.onend = () => {
        // Once Grandma finishes asking, open the microphone immediately
        startBookTitleListener();
      };

      utterance.onerror = () => {
        startBookTitleListener();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      startBookTitleListener();
    }
  };

  // 3. Speech Recognition to capture book title
  const startBookTitleListener = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSearchStatusStep('Microphone unavailable. Please type your book title below.');
      setIsVoiceAsking(false);
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setMicActive(true);
        setSearchStatusStep('🎙️ Listening... Tell me any book title (e.g. Alice in Wonderland, The Jungle Book, Panchatantra, Harry Potter)');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceQueryTranscript(transcript);

        if (event.results[0].isFinal) {
          setSearchStatusStep(`Found title: "${transcript}". Searching agent active...`);
          recognition.stop();
          setMicActive(false);
          setIsVoiceAsking(false);
          // Trigger autonomous agent search immediately
          executeBookAgentSearch(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Title listener error:', event.error);
        setMicActive(false);
        setIsVoiceAsking(false);
        setSearchStatusStep('Could not hear clearly. Feel free to type the title or pick a classic below.');
      };

      recognition.onend = () => {
        setMicActive(false);
        setIsVoiceAsking(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('SpeechRecognition failed:', err);
      setMicActive(false);
      setIsVoiceAsking(false);
    }
  };

  // 4. Autonomous Agent: Searches web, downloads, stores, and starts playback in < 10 seconds!
  const executeBookAgentSearch = async (query) => {
    if (!query || !query.trim()) return;

    const t0 = performance.now();
    setIsSearchingBook(true);
    setSearchStatusStep(`⚡ Searching online libraries & archives for "${query}"...`);
    setAgentLatency(null);

    // Step A: Fast client check in Classic Vault (Instant 0.01s)
    const qLower = query.toLowerCase().trim();
    const localMatch = CLASSIC_VAULT.find(c => 
      c.title.toLowerCase().includes(qLower) || qLower.includes(c.title.toLowerCase())
    );

    let bookResult = null;

    if (localMatch) {
      setSearchStatusStep(`✨ Retrieved from Instant Bedtime Vault in 0.05s! Starting story...`);
      bookResult = {
        title: localMatch.title,
        author: localMatch.author,
        full_text: localMatch.text,
        paragraphs: localMatch.text.split('\n\n'),
        source: 'WILDER Instant Bedtime Vault'
      };
    } else {
      // Step B: Call Backend Autonomous Book Agent (< 3s)
      try {
        setSearchStatusStep(`🌐 Downloading book text from Project Gutenberg & Global Archives...`);
        const agentData = await searchBookAgent(query);
        if (agentData && agentData.success && agentData.full_text) {
          bookResult = agentData;
        }
      } catch (err) {
        console.warn('Backend book agent failed, falling back:', err);
      }
    }

    // Step C: If still not found, synthesize a rich bedtime adaptation
    if (!bookResult) {
      setSearchStatusStep(`📖 Preparing grandmotherly story adaptation for "${query}"...`);
      const synthText = `Come sit close to grandma, my sweet child, and let me pull the warm blanket right over your shoulders. Take a deep, gentle breath, and let the busy day fade away...\n\n` +
        `Tonight, I am going to tell you the legendary tale of ${query}.\n\n` +
        `Long ago, across misty hills and enchanted starlit valleys, this wonderful story began. Every creature in the whispering forest knew that something truly magical was about to unfold.\n\n` +
        `"Do not be afraid of the dark, little one," grandma whispers, smiling gently into your eyes. "For even in the deepest night, courage and love will always light the path home."\n\n` +
        `And as the golden stars twinkle high in the velvet sky, let your eyes close, and let grandma carry you into the sweetest, calmest dreamland. Rest now, my love.`;

      bookResult = {
        title: query.trim(),
        author: "Grandma's Beloved Tale",
        full_text: synthText,
        paragraphs: synthText.split('\n\n'),
        source: 'WILDER AI Bedtime Synthesizer'
      };
    }

    const elapsed = ((performance.now() - t0) / 1000).toFixed(2);
    setAgentLatency(elapsed);

    // Step D: Store in State and Local Library (Persistent Storage)
    const newBookId = bookResult.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
    setActiveBookId(newBookId);
    activeBookIdRef.current = newBookId;
    setStoryTitle(bookResult.title);
    storyTitleRef.current = bookResult.title;
    setAuthorName(bookResult.author || 'Beloved Author');
    setCustomText(bookResult.full_text);

    // Save into permanent Book Library shelf
    const bookEntry = {
      id: newBookId,
      title: bookResult.title,
      author: bookResult.author,
      source: bookResult.source,
      savedAt: new Date().toISOString()
    };
    saveToLibrary(bookEntry);

    // Save fresh bookmark starting at paragraph 0
    saveBookmark(newBookId, bookResult.title, bookResult.author, 0, bookResult.paragraphs.length);

    setIsSearchingBook(false);
    setSearchStatusStep(`✅ Story ready (${elapsed}s)! Grandma is reading now...`);

    // Step E: Start Reading IMMEDIATELY (Achieves < 10 second total time!)
    setTimeout(() => {
      startStorytellingFromIndex(0, bookResult.paragraphs);
    }, 400);
  };

  // 5. Bookmark Saving & Persistence
  const saveBookmark = (bookId, title, author, pIndex, totalParas) => {
    const total = totalParas || paragraphsRef.current.length || 1;
    const pct = Math.min(100, Math.round(((pIndex + 1) / total) * 100));
    const bm = {
      bookId,
      bookTitle: title,
      author: author || authorName,
      paragraphIndex: pIndex,
      totalParagraphs: total,
      progressPercent: pct,
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    setSavedBookmark(bm);
    try {
      localStorage.setItem('wilder_granny_bookmark', JSON.stringify(bm));
    } catch (e) {}
  };

  const saveToLibrary = (bookEntry) => {
    try {
      setSavedLibrary(prev => {
        const filtered = prev.filter(b => b.id !== bookEntry.id);
        const updated = [bookEntry, ...filtered].slice(0, 20); // Keep top 20
        localStorage.setItem('wilder_saved_books_library', JSON.stringify(updated));
        return updated;
      });
    } catch (e) {}
  };

  // 6. Resume Storytelling from Saved Bookmark
  const handleResumeSavedBookmark = () => {
    if (!savedBookmark) return;

    // Check if bookmark matches current book or find in vault/cache
    const targetIdx = savedBookmark.paragraphIndex >= 0 ? savedBookmark.paragraphIndex : 0;
    
    // Announce grandma welcome
    const welcomeText = `Welcome back, sweetheart! We were right at paragraph ${targetIdx + 1} of ${savedBookmark.bookTitle}. Let us pick up right where we left off.`;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(welcomeText);
      utt.rate = speechSpeed;
      if (selectedVoiceName && availableVoices.length > 0) {
        const found = availableVoices.find(v => v.name === selectedVoiceName);
        if (found) utt.voice = found;
      }
      utt.onend = () => {
        startStorytellingFromIndex(targetIdx);
      };
      window.speechSynthesis.speak(utt);
    } else {
      startStorytellingFromIndex(targetIdx);
    }
  };

  // 7. Core Playback Engine with Sequential Narration
  const startStorytellingFromIndex = (startIndex = 0, explicitParas = null) => {
    const activeParas = explicitParas || paragraphsRef.current;
    if (!activeParas || activeParas.length === 0) return;

    isPlayingRef.current = true;
    setIsPlaying(true);
    setVoiceCommandFeedback('');

    // Start background continuous microphone for hands-free "stop" / "close"
    startContinuousMicListener();

    // Begin speaking from specified paragraph index
    speakParagraph(startIndex, activeParas);
  };

  const speakParagraph = (index, activeParas = null) => {
    const currentParas = activeParas || paragraphsRef.current;

    if (!isPlayingRef.current || index >= currentParas.length) {
      stopStorytelling();
      return;
    }

    setCurrentParagraphIndex(index);
    currentParagraphIndexRef.current = index;
    const textToSpeak = currentParas[index];

    // Update real-time bookmark at every paragraph transition
    saveBookmark(activeBookIdRef.current, storyTitleRef.current, authorName, index, currentParas.length);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = speechSpeed;
      utterance.pitch = 1.02; // Warm, loving grandmotherly pitch
      utterance.volume = 1.0;

      if (selectedVoiceName && availableVoices.length > 0) {
        const found = availableVoices.find(v => v.name === selectedVoiceName);
        if (found) utterance.voice = found;
      }

      utterance.onend = () => {
        if (isPlayingRef.current) {
          // Gentle breathing pause between paragraphs (650ms)
          setTimeout(() => {
            speakParagraph(index + 1, currentParas);
          }, 650);
        }
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        if (isPlayingRef.current) {
          speakParagraph(index + 1, currentParas);
        }
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  // 8. Continuous Microphone Listener for Voice Control ("Stop", "Closed", "Pause")
  const startContinuousMicListener = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

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

          // Voice Commands: "stop", "closed", "close", "pause", "cancel", "hush", "sleep", "shut"
          if (
            transcript.includes('stop') ||
            transcript.includes('closed') ||
            transcript.includes('close') ||
            transcript.includes('pause') ||
            transcript.includes('cancel') ||
            transcript.includes('hush') ||
            transcript.includes('sleep')
          ) {
            setVoiceCommandFeedback(`Voice Command "${transcript}" detected — Story paused!`);
            handleVoiceStop();
            break;
          }
        }
      };

      recognition.onerror = () => {
        setMicActive(false);
      };

      recognition.onend = () => {
        if (isPlayingRef.current) {
          try { recognition.start(); } catch (e) { setMicActive(false); }
        } else {
          setMicActive(false);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      setMicActive(false);
    }
  };

  const handleVoiceStop = () => {
    const savedIdx = currentParagraphIndexRef.current >= 0 ? currentParagraphIndexRef.current : 0;
    stopStorytelling();

    // Warm confirmation: "Grandma has saved your exact spot"
    const confirmText = "Rest your eyes now, darling. Grandma has saved your exact spot. Sweet dreams, and we will continue tomorrow.";
    if ('speechSynthesis' in window) {
      const utt = new SpeechSynthesisUtterance(confirmText);
      utt.rate = 0.9;
      if (selectedVoiceName && availableVoices.length > 0) {
        const found = availableVoices.find(v => v.name === selectedVoiceName);
        if (found) utt.voice = found;
      }
      window.speechSynthesis.speak(utt);
    }
  };

  const stopStorytelling = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (e) {}
      recognitionRef.current = null;
    }
    setMicActive(false);
  };

  // Switch to a selected book from Classic Vault or Library
  const handleSelectVaultBook = (book) => {
    stopStorytelling();
    setActiveBookId(book.id);
    activeBookIdRef.current = book.id;
    setStoryTitle(book.title);
    storyTitleRef.current = book.title;
    setAuthorName(book.author);
    setCustomText(book.text || book.full_text);
    setCurrentParagraphIndex(-1);

    // Check if we have bookmark for this specific book
    if (savedBookmark && savedBookmark.bookId === book.id) {
      // Keep existing bookmark
    } else {
      saveBookmark(book.id, book.title, book.author, 0, (book.text || book.full_text).split('\n\n').length);
    }
  };

  // Handle Manual File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    stopStorytelling();
    const cleanName = file.name.replace(/\.[^/.]+$/, '');
    setStoryTitle(cleanName);
    storyTitleRef.current = cleanName;
    setAuthorName("Uploaded Book Copy");

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setCustomText(content);
        const pLen = content.split('\n\n').length;
        saveBookmark(cleanName, cleanName, "Uploaded Copy", 0, pLen);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '16px 16px 100px 16px' }}>
      
      {/* ── HEADER NAVIGATION ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <button 
          onClick={() => {
            stopStorytelling();
            onBack();
          }}
          className="btn-secondary"
          style={{ fontSize: '0.85rem', padding: '7px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Hub</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowLibraryDrawer(!showLibraryDrawer)}
            style={{
              background: 'rgba(245, 158, 11, 0.12)',
              color: '#f59e0b',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Library size={14} />
            <span>My Book Shelf ({savedLibrary.length || CLASSIC_VAULT.length})</span>
          </button>

          <span className="badge-pill" style={{ 
            background: 'rgba(245, 158, 11, 0.18)', 
            color: '#fbbf24', 
            border: '1px solid rgba(245, 158, 11, 0.4)',
            fontSize: '0.78rem'
          }}>
            <Heart size={13} color="#f59e0b" style={{ fill: '#f59e0b' }} />
            <span>Granny Voice Mode (English)</span>
          </span>
        </div>
      </div>

      {/* ── SECTION 1: VOICE-FIRST STORY REQUEST HERO (THE 10-SECOND AGENT) ── */}
      <div className="glass-panel" style={{
        padding: '24px 20px',
        marginBottom: '20px',
        border: '1px solid rgba(245, 158, 11, 0.5)',
        background: 'linear-gradient(135deg, rgba(30, 22, 18, 0.95), rgba(18, 14, 24, 0.95))',
        borderRadius: '20px',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(245, 158, 11, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Warm Candlelight Glow */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sparkles size={18} color="#f59e0b" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fef3c7', margin: 0 }}>
                Grandma's 10-Second Voice Book Agent
              </h2>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#d1d5db', margin: 0, maxWidth: '620px', lineHeight: 1.5 }}>
              Tap the button below. Grandma will ask what you wish to hear. Just speak the title of <strong style={{ color: '#fbbf24' }}>any book or story</strong>—our autonomous agent will find it, download it, and start telling it in under 10 seconds!
            </p>
          </div>

          {/* Quick Stats Badge */}
          {agentLatency && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '12px',
              padding: '6px 12px',
              textAlign: 'right'
            }}>
              <div style={{ fontSize: '0.7rem', color: '#6ee7b7', fontWeight: 600 }}>AGENT SPEED</div>
              <div style={{ fontSize: '1rem', color: '#10b981', fontWeight: 800 }}>⚡ {agentLatency}s</div>
            </div>
          )}
        </div>

        {/* ── BIG VOICE TRIGGER BUTTON ── */}
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleAskUserVoicePrompt}
            disabled={isSearchingBook}
            style={{
              background: isVoiceAsking || micActive 
                ? 'linear-gradient(135deg, #ef4444, #f97316)' 
                : 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#1a1005',
              border: 'none',
              borderRadius: '14px',
              padding: '14px 24px',
              fontSize: '0.96rem',
              fontWeight: 800,
              cursor: isSearchingBook ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: isVoiceAsking || micActive
                ? '0 0 25px rgba(239, 68, 68, 0.65)'
                : '0 8px 24px rgba(245, 158, 11, 0.4)',
              transition: 'all 0.25s ease'
            }}
          >
            {isVoiceAsking || micActive ? (
              <>
                <Mic size={20} className="animate-pulse" />
                <span>Listening for Your Book Title...</span>
              </>
            ) : isSearchingBook ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Agent Searching Web...</span>
              </>
            ) : (
              <>
                <Mic size={20} />
                <span>🎙️ Ask Me What to Listen To (Voice Agent)</span>
              </>
            )}
          </button>

          {/* Fallback Text Input for Silent Night Mode */}
          <div style={{ flex: 1, minWidth: '260px', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Or type any book (e.g. Alice in Wonderland, The Alchemist)..."
              value={searchQueryInput}
              onChange={(e) => setSearchQueryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQueryInput.trim()) {
                  executeBookAgentSearch(searchQueryInput);
                }
              }}
              style={{
                flex: 1,
                background: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '12px 14px',
                fontSize: '0.85rem',
                color: '#fff',
                outline: 'none'
              }}
            />
            <button
              onClick={() => {
                if (searchQueryInput.trim()) executeBookAgentSearch(searchQueryInput);
              }}
              disabled={isSearchingBook || !searchQueryInput.trim()}
              className="btn-primary"
              style={{
                borderRadius: '12px',
                padding: '0 16px',
                background: 'rgba(245, 158, 11, 0.85)',
                color: '#1a1005',
                fontWeight: 700
              }}
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Live Agent Status & Transcript Feedback */}
        {(searchStatusStep || voiceQueryTranscript) && (
          <div style={{
            marginTop: '14px',
            padding: '10px 14px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Sparkles size={15} color="#fbbf24" />
            <span style={{ fontSize: '0.84rem', color: '#fde68a' }}>
              {searchStatusStep}
            </span>
            {voiceQueryTranscript && (
              <span style={{ fontSize: '0.84rem', color: '#93c5fd', fontWeight: 600 }}>
                "{voiceQueryTranscript}"
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── SECTION 2: NEXT-DAY RESUME BOOKMARK (EXACT SPOT MEMORY) ── */}
      {savedBookmark && savedBookmark.paragraphIndex > 0 && (
        <div style={{
          marginBottom: '20px',
          padding: '16px 20px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))',
          border: '1px solid rgba(16, 185, 129, 0.45)',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 6px 20px rgba(16, 185, 129, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399'
            }}>
              <Bookmark size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399', letterSpacing: '0.05em' }}>
                  NEXT-DAY RESUME BOOKMARK SAVED
                </span>
                <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>• {savedBookmark.dateFormatted}</span>
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: '2px 0 4px 0' }}>
                {savedBookmark.bookTitle}
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#a7f3d0', margin: 0 }}>
                Paused at Paragraph <strong>{savedBookmark.paragraphIndex + 1}</strong> of {savedBookmark.totalParagraphs} ({savedBookmark.progressPercent}% completed)
              </p>
            </div>
          </div>

          <button
            onClick={handleResumeSavedBookmark}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '10px 20px',
              fontSize: '0.88rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
            }}
          >
            <Play size={16} style={{ fill: '#fff' }} />
            <span>Resume from Exact Word ↗</span>
          </button>
        </div>
      )}

      {/* ── SECTION 3: MY BOOK LIBRARY DRAWER (SHELF OF DOWNLOADED BOOKS) ── */}
      {showLibraryDrawer && (
        <div className="glass-panel" style={{
          marginBottom: '20px',
          padding: '20px',
          borderRadius: '18px',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          background: 'rgba(20, 16, 28, 0.98)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fbbf24', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} />
              <span>Bedtime Story Shelf & Classics</span>
            </h3>
            <span style={{ fontSize: '0.76rem', color: '#9ca3af' }}>Select any book to start reading instantly</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
            {CLASSIC_VAULT.map((book) => {
              const isSelected = activeBookId === book.id;
              return (
                <div
                  key={book.id}
                  onClick={() => handleSelectVaultBook(book)}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    background: isSelected ? 'rgba(245, 158, 11, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700 }}>{book.genre}</div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff', margin: '4px 0' }}>{book.title}</h4>
                  <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>by {book.author}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── SECTION 4: MAIN STORY READING CARD ── */}
      <div className="glass-panel" style={{
        padding: '28px 24px',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        background: 'linear-gradient(135deg, rgba(20, 16, 28, 0.95), rgba(30, 22, 18, 0.92))',
        borderRadius: '24px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)'
      }}>
        {/* Story Title & Audio Playing Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <BookOpen size={20} color="#f59e0b" />
              <h1 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fef3c7', margin: 0 }}>
                {storyTitle}
              </h1>
            </div>
            <div style={{ fontSize: '0.84rem', color: '#d97706', fontWeight: 600 }}>
              by {authorName} • {paragraphs.length} Bedtime Paragraphs
            </div>
          </div>

          {/* Quick Play/Stop Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => {
                if (isPlaying) {
                  stopStorytelling();
                } else {
                  startStorytellingFromIndex(currentParagraphIndex >= 0 ? currentParagraphIndex : 0);
                }
              }}
              style={{
                background: isPlaying 
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                  : 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#fff',
                border: 'none',
                borderRadius: '14px',
                padding: '12px 24px',
                fontSize: '0.94rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isPlaying ? '0 6px 20px rgba(239, 68, 68, 0.4)' : '0 6px 20px rgba(245, 158, 11, 0.35)'
              }}
            >
              {isPlaying ? (
                <>
                  <Square size={16} style={{ fill: '#fff' }} />
                  <span>Stop Story (Save Spot)</span>
                </>
              ) : (
                <>
                  <Play size={16} style={{ fill: '#fff' }} />
                  <span>{currentParagraphIndex > 0 ? `Continue (Para ${currentParagraphIndex + 1})` : 'Start Reading'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Voice Status Indicator & Mobile Stop Warning */}
        {isPlaying && (
          <div style={{
            padding: '10px 16px',
            marginBottom: '20px',
            background: 'rgba(245, 158, 11, 0.14)',
            borderRadius: '12px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px #10b981'
              }} className="animate-pulse" />
              <span style={{ fontSize: '0.84rem', color: '#fef3c7', fontWeight: 600 }}>
                Grandma is speaking... Paragraph {currentParagraphIndex + 1} of {paragraphs.length}
              </span>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mic size={14} />
              <span>Mic open: Say <strong>"Stop"</strong> or <strong>"Closed"</strong> to pause anytime</span>
            </div>
          </div>
        )}

        {/* Voice command feedback toast */}
        {voiceCommandFeedback && (
          <div style={{
            padding: '8px 14px',
            marginBottom: '16px',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '10px',
            fontSize: '0.82rem',
            color: '#fca5a5',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{voiceCommandFeedback}</span>
          </div>
        )}

        {/* ── PARAGRAPH READER VIEW ── */}
        <div style={{
          maxHeight: '440px',
          overflowY: 'auto',
          paddingRight: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {paragraphs.map((p, idx) => {
            const isCurrent = currentParagraphIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => {
                  stopStorytelling();
                  startStorytellingFromIndex(idx);
                }}
                style={{
                  padding: '16px 18px',
                  borderRadius: '16px',
                  background: isCurrent 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(217, 119, 6, 0.12))' 
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isCurrent 
                    ? '1.5px solid rgba(245, 158, 11, 0.7)' 
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  boxShadow: isCurrent ? '0 0 25px rgba(245, 158, 11, 0.18)' : 'none',
                  fontSize: '1.02rem',
                  lineHeight: '1.85',
                  color: isCurrent ? '#fef3c7' : '#d1d5db',
                  fontFamily: 'Georgia, serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                {isCurrent && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    color: '#f59e0b',
                    fontWeight: 800
                  }}>
                    <Volume2 size={14} className="animate-pulse" />
                    <span>READING NOW</span>
                  </div>
                )}
                <span style={{ 
                  display: 'inline-block', 
                  width: '26px', 
                  fontSize: '0.72rem', 
                  color: isCurrent ? '#fbbf24' : '#6b7280',
                  fontWeight: 700 
                }}>
                  {idx + 1}.
                </span>
                {p}
              </div>
            );
          })}
        </div>

        {/* ── AUDIO CONTROLS & CUSTOMIZATION ── */}
        <div style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Speed Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600 }}>Grandma Cadence:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[0.75, 0.85, 0.95].map(spd => (
                <button
                  key={spd}
                  onClick={() => setSpeechSpeed(spd)}
                  style={{
                    background: speechSpeed === spd ? '#f59e0b' : 'rgba(255, 255, 255, 0.08)',
                    color: speechSpeed === spd ? '#1a1005' : '#d1d5db',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '5px 10px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {spd === 0.75 ? 'Sleepy (0.75x)' : spd === 0.85 ? 'Gentle (0.85x)' : 'Normal (0.95x)'}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Selector */}
          {availableVoices.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Voice:</span>
              <select
                value={selectedVoiceName}
                onChange={(e) => setSelectedVoiceName(e.target.value)}
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#fbbf24',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  fontSize: '0.78rem',
                  maxWidth: '180px',
                  outline: 'none'
                }}
              >
                {availableVoices
                  .filter(v => v.lang.startsWith('en'))
                  .map(v => (
                    <option key={v.name} value={v.name}>
                      {v.name.slice(0, 24)}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Optional manual upload button */}
          <label style={{
            fontSize: '0.78rem',
            color: '#9ca3af',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Upload size={14} />
            <span>Upload Custom Book (.txt)</span>
            <input 
              type="file" 
              accept=".txt,.md,.pdf" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />
          </label>
        </div>
      </div>
    </div>
  );
}
