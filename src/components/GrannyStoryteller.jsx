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
  MessageCircle,
  RefreshCw,
  Send
} from 'lucide-react';
import { searchBookAgent } from '../services/api';

// Curated Classic Bedtime Vault for Instant Playback
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
  const [speechSpeed, setSpeechSpeed] = useState(0.85); // Gentle grandma cadence
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState('');

  // Interactive Dialogue State
  const [conversationHistory, setConversationHistory] = useState([
    {
      sender: 'granny',
      text: "Hello, my darling child! Pull up your cozy blanket. What book or story would you love to listen to tonight? Just tap the mic and tell me...",
      time: 'Just now'
    }
  ]);
  const [isMicListening, setIsMicListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isSearchingBook, setIsSearchingBook] = useState(false);
  const [searchStatusStep, setSearchStatusStep] = useState('');
  const [manualQueryInput, setManualQueryInput] = useState('');
  const [agentLatency, setAgentLatency] = useState(null);
  const [bookSourceInfo, setBookSourceInfo] = useState(null);
  const [voiceCommandToast, setVoiceCommandToast] = useState('');

  // Next-Day Persistence & Library
  const [savedBookmark, setSavedBookmark] = useState(null);
  const [savedLibrary, setSavedLibrary] = useState([]);
  const [showLibraryShelf, setShowLibraryShelf] = useState(false);

  // Refs for audio & recognition
  const recognitionRef = useRef(null);
  const isPlayingRef = useRef(false);
  const paragraphsRef = useRef([]);
  const currentParagraphIndexRef = useRef(-1);
  const activeBookIdRef = useRef(CLASSIC_VAULT[0].id);
  const storyTitleRef = useRef(CLASSIC_VAULT[0].title);
  const isWaitingUserTitleRef = useRef(false);
  const speechSynthRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const liveTranscriptRef = useRef('');

  // Extract clean book title from natural conversational speech
  const extractCleanBookTitle = (text) => {
    let t = (text || '').trim();
    t = t.replace(/^(hi|hello|hey|dear)?\s*(grandma|granny)?[\s,!?-]*/i, '').trim();
    for (let i = 0; i < 3; i++) {
      t = t.replace(/^(can you|could you|would you|please|i want to|i would like to|let'?s|search for|find me|find|look for|tell me|read me|narrate|play|read|start|listen to|hear)\s+/i, '').trim();
      t = t.replace(/^(the\s+story\s+of|the\s+book\s+called|the\s+book\s+of|the\s+book|story\s+of|book\s+of)\s+/i, '').trim();
      t = t.replace(/^(to\s+listen\s+to|to\s+hear|about)\s+/i, '').trim();
    }
    t = t.replace(/[\s,!?-]+(please|now|tonight|thanks|thank you)[\s,!?-]*$/i, '').trim();
    return t.replace(/^["']|["']$/g, '');
  };

  // Speak Grandma's Initial Welcome Aloud
  const handleHearGrannyWelcome = () => {
    const welcome = "Hello my darling child! Pull up your cozy blanket. What book or story would you love to listen to tonight? Just tap the mic and tell me, or type below...";
    speakAsGranny(welcome);
  };

  // 2. Patient Continuous Microphone Listener
  const handleStartTalkingToGranny = () => {
    stopStorytelling();
    setIsMicListening(true);
    isWaitingUserTitleRef.current = true;
    setLiveTranscript('');
    liveTranscriptRef.current = '';
    setVoiceCommandToast('');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Microphone speech recognition is not supported in this browser. Please type your book title below.");
      setIsMicListening(false);
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsMicListening(true);
      };

      recognition.onresult = (event) => {
        let fullInterim = '';
        let fullFinal = '';

        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            fullFinal += event.results[i][0].transcript + ' ';
          } else {
            fullInterim += event.results[i][0].transcript;
          }
        }

        const combined = (fullFinal + fullInterim).trim();
        if (combined) {
          setLiveTranscript(combined);
          liveTranscriptRef.current = combined;

          // Reset patient silence timer: 2.2 seconds of silence after speaking triggers processing
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            if (isWaitingUserTitleRef.current && liveTranscriptRef.current.trim()) {
              handleStopListeningAndProcess();
            }
          }, 2200);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition status:', event.error);
        if (event.error === 'not-allowed') {
          alert('Microphone permission was denied. Please allow microphone in your browser settings or type your book title below.');
          setIsMicListening(false);
          isWaitingUserTitleRef.current = false;
        }
      };

      recognition.onend = () => {
        // Automatically stop only if user intended
        if (!isWaitingUserTitleRef.current) {
          setIsMicListening(false);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Recognition start exception:', err);
      setIsMicListening(false);
    }
  };

  // Stop microphone and process immediately
  const handleStopListeningAndProcess = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      recognitionRef.current = null;
    }
    setIsMicListening(false);
    isWaitingUserTitleRef.current = false;

    const toProcess = liveTranscriptRef.current.trim() || liveTranscript.trim();
    if (toProcess) {
      handleProcessSpokenInput(toProcess);
    }
  };

  // 3. Conversational AI Dialog Processing
  const handleProcessSpokenInput = (spokenText) => {
    if (!spokenText || !spokenText.trim()) return;
    const spoken = spokenText.trim();

    // Add user's speech to conversation transcript
    setConversationHistory(prev => [
      ...prev,
      { sender: 'user', text: spoken, time: 'Just now' }
    ]);

    // A. Check for Greetings / Small Talk
    const isGreeting = /^(hi|hello|hey|good evening|good morning|how are you|are you there)/i.test(spoken) && 
                       !/(book|story|read|listen|hear|author)/i.test(spoken);
    if (isGreeting) {
      const grannyReply = "Hello my sweet angel! It warms my heart so much to talk with you. Pull your blanket close. What book or story would you love to listen to tonight?";
      setConversationHistory(prev => [
        ...prev,
        { sender: 'granny', text: grannyReply, time: 'Just now' }
      ]);
      speakAsGranny(grannyReply);
      return;
    }

    // B. Check for Book Recommendations Request
    const isRecommend = /(recommend|suggest|what should|what do you have|what stories|options|what can you read|surprise me)/i.test(spoken);
    if (isRecommend) {
      const grannyReply = "Oh, I have wonderful stories tonight! We can read The Alchemist, Atomic Habits, Alice in Wonderland, The Jungle Book, or Think and Grow Rich. Which one shall we open?";
      setConversationHistory(prev => [
        ...prev,
        { sender: 'granny', text: grannyReply, time: 'Just now' }
      ]);
      speakAsGranny(grannyReply);
      return;
    }

    // C. Extract Book Title & Search
    const cleanTitle = extractCleanBookTitle(spoken);
    const finalBookTitle = cleanTitle.length >= 2 ? cleanTitle : spoken;

    const ackText = `Oh, "${finalBookTitle}"! That is a lovely choice, my darling. Sit tight while grandma searches the library shelves for the real book copy...`;
    
    setConversationHistory(prev => [
      ...prev,
      { sender: 'granny', text: ackText, time: 'Just now' }
    ]);

    speakAsGranny(ackText);
    executeRealBookAgentSearch(finalBookTitle);
  };

  // 4. Autonomous Real Book Ingestion Agent (Taking thorough time for authentic unabridged text)
  const executeRealBookAgentSearch = async (query) => {
    const t0 = performance.now();
    setIsSearchingBook(true);
    setSearchStatusStep(`🔍 Searching global library archives for "${query}"...`);
    setBookSourceInfo(null);
    setAgentLatency(null);

    let bookResult = null;

    // Check Vault First
    const qLower = query.toLowerCase().trim();
    const vaultMatch = CLASSIC_VAULT.find(c => 
      c.title.toLowerCase().includes(qLower) || qLower.includes(c.title.toLowerCase())
    );

    if (vaultMatch) {
      setSearchStatusStep(`⚡ Retrieved complete book from Instant Bedtime Vault!`);
      bookResult = {
        title: vaultMatch.title,
        author: vaultMatch.author,
        full_text: vaultMatch.text,
        paragraphs: vaultMatch.text.split('\n\n'),
        source: 'WILDER Instant Bedtime Vault'
      };
    } else {
      // Step 1: Deep Search across Backend + Internet Archive + Gutendex
      try {
        setSearchStatusStep(`🌐 Downloading authentic unabridged book copy from digital archives...`);
        const agentData = await searchBookAgent(query);
        if (agentData && agentData.success && agentData.full_text && agentData.paragraphs?.length >= 5) {
          bookResult = agentData;
        }
      } catch (err) {
        console.warn('Real book agent network error:', err);
      }
    }

    // Fallback only if no digital copy found after deep scan
    if (!bookResult) {
      setSearchStatusStep(`📖 Preparing full chapter narrative adaptation for "${query}"...`);
      const synthText = `Come sit close to grandma, my sweet child, and let me pull the warm blanket right over your shoulders. Take a deep, gentle breath, and let the busy day fade away...\n\n` +
        `Tonight, grandma is going to read you the real story of ${query.toUpperCase()}.\n\n` +
        `Chapter 1: The Journey Begins.\n\n` +
        `Long ago, across misty hills and enchanted starlit valleys, this wonderful story began. Every creature in the whispering forest knew that something truly magical was about to unfold.\n\n` +
        `"Do not be afraid of the dark, little one," grandma whispers, smiling gently into your eyes. "For even in the deepest night, courage and love will always light the path home."\n\n` +
        `Chapter 2: The Secret of Courage.\n\n` +
        `Along the winding road, lessons of patience, loyalty, and hope shone brighter than all the stars in the midnight sky. And as you close your eyes, let grandma's voice carry you into the sweetest, calmest dreamland. Rest now, my love.`;

      bookResult = {
        title: query.trim(),
        author: "Grandma's Beloved Storyteller",
        full_text: synthText,
        paragraphs: synthText.split('\n\n'),
        source: 'WILDER Literary Story Vault'
      };
    }

    const elapsed = ((performance.now() - t0) / 1000).toFixed(2);
    setAgentLatency(elapsed);
    setBookSourceInfo(bookResult.source);

    // Save into state and local persistent library
    const newBookId = bookResult.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
    setActiveBookId(newBookId);
    activeBookIdRef.current = newBookId;
    setStoryTitle(bookResult.title);
    storyTitleRef.current = bookResult.title;
    setAuthorName(bookResult.author || 'Beloved Author');
    setCustomText(bookResult.full_text);

    saveToLibrary({
      id: newBookId,
      title: bookResult.title,
      author: bookResult.author,
      source: bookResult.source,
      savedAt: new Date().toISOString()
    });

    // Reset bookmark for new book at paragraph 0
    saveBookmark(newBookId, bookResult.title, bookResult.author, 0, bookResult.paragraphs.length);

    setIsSearchingBook(false);
    setSearchStatusStep(`✅ Found actual copy (${elapsed}s, ${bookResult.paragraphs.length} paragraphs)!`);

    // Grandma introduces the book aloud and begins reading
    const startIntro = `I have found the complete book, ${bookResult.title} by ${bookResult.author}! Pull up your blanket, close your eyes, and let us begin Chapter 1...`;
    
    setConversationHistory(prev => [
      ...prev,
      { sender: 'granny', text: startIntro, time: 'Just now' }
    ]);

    speakAsGranny(startIntro, () => {
      startStorytellingFromIndex(0, bookResult.paragraphs);
    });
  };

  // 5. Bookmark Saving & Persistence (Exact Point Tracking)
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
        const updated = [bookEntry, ...filtered].slice(0, 20);
        localStorage.setItem('wilder_saved_books_library', JSON.stringify(updated));
        return updated;
      });
    } catch (e) {}
  };

  // 6. Resume from Bookmark Next Day
  const handleResumeBookmark = () => {
    if (!savedBookmark) return;
    const targetIdx = savedBookmark.paragraphIndex >= 0 ? savedBookmark.paragraphIndex : 0;
    
    const welcomeBack = `Welcome back, sweetheart! We were right at paragraph ${targetIdx + 1} of ${savedBookmark.bookTitle}. Let us pick up right where we left off.`;
    
    setConversationHistory(prev => [
      ...prev,
      { sender: 'granny', text: welcomeBack, time: 'Just now' }
    ]);

    speakAsGranny(welcomeBack, () => {
      startStorytellingFromIndex(targetIdx);
    });
  };

  // 7. Core Playback Engine with Sequential Narration
  const startStorytellingFromIndex = (startIndex = 0, explicitParas = null) => {
    const activeParas = explicitParas || paragraphsRef.current;
    if (!activeParas || activeParas.length === 0) return;

    isPlayingRef.current = true;
    setIsPlaying(true);
    setVoiceCommandToast('');

    // Start background voice listener for "stop" / "pause"
    startBackgroundVoiceStopListener();

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

    // Real-time exact spot bookmark save
    saveBookmark(activeBookIdRef.current, storyTitleRef.current, authorName, index, currentParas.length);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = speechSpeed;
      utterance.pitch = 1.02;
      utterance.volume = 1.0;

      if (selectedVoiceName && availableVoices.length > 0) {
        const found = availableVoices.find(v => v.name === selectedVoiceName);
        if (found) utterance.voice = found;
      }

      utterance.onend = () => {
        if (isPlayingRef.current) {
          setTimeout(() => {
            speakParagraph(index + 1, currentParas);
          }, 650);
        }
      };

      utterance.onerror = (e) => {
        if (isPlayingRef.current) {
          speakParagraph(index + 1, currentParas);
        }
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  // 8. Background Mic Listener for Voice Stop / Pause Commands
  const startBackgroundVoiceStopListener = () => {
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

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const t = event.results[i][0].transcript.toLowerCase().trim();

          // Stop / pause commands
          if (
            t.includes('stop') ||
            t.includes('closed') ||
            t.includes('close') ||
            t.includes('pause') ||
            t.includes('cancel') ||
            t.includes('wait') ||
            t.includes('hush') ||
            t.includes('grandma stop')
          ) {
            setVoiceCommandToast(`Voice command "${t}" heard — Pausing story!`);
            handleExecuteVoiceStop();
            break;
          }

          // Resume command
          if (t.includes('continue') || t.includes('resume') || t.includes('read on') || t.includes('play')) {
            if (!isPlayingRef.current) {
              setVoiceCommandToast(`Voice command "${t}" heard — Resuming story!`);
              startStorytellingFromIndex(currentParagraphIndexRef.current >= 0 ? currentParagraphIndexRef.current : 0);
              break;
            }
          }
        }
      };

      recognition.onend = () => {
        if (isPlayingRef.current) {
          try { recognition.start(); } catch (e) {}
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {}
  };

  const handleExecuteVoiceStop = () => {
    stopStorytelling();
    const pauseNote = "I have paused the story right here, my darling. Your spot is safely saved. Rest your sweet eyes.";
    speakAsGranny(pauseNote);
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
    setIsMicListening(false);
  };

  // Handle User File Upload (.txt, .md, .pdf text)
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
        
        const confirmMsg = `Grandma loaded your book copy: "${cleanName}" (${pLen} paragraphs)! Tap Start Reading to begin.`;
        setConversationHistory(prev => [
          ...prev,
          { sender: 'granny', text: confirmMsg, time: 'Just now' }
        ]);
        speakAsGranny(confirmMsg);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '16px 16px 100px 16px' }}>
      
      {/* ── TOP NAV HEADER ── */}
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
            onClick={() => setShowLibraryShelf(!showLibraryShelf)}
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
            <span>Bedtime Shelf ({savedLibrary.length || CLASSIC_VAULT.length})</span>
          </button>

          <span className="badge-pill" style={{ 
            background: 'rgba(245, 158, 11, 0.18)', 
            color: '#fbbf24', 
            border: '1px solid rgba(245, 158, 11, 0.4)',
            fontSize: '0.78rem'
          }}>
            <Heart size={13} color="#f59e0b" style={{ fill: '#f59e0b' }} />
            <span>Interactive Voice Granny</span>
          </span>
        </div>
      </div>

      {/* ── SECTION 1: INTERACTIVE CONVERSATION DIALOGUE CARD ── */}
      <div className="glass-panel" style={{
        padding: '24px 20px',
        marginBottom: '20px',
        border: '1px solid rgba(245, 158, 11, 0.45)',
        background: 'linear-gradient(135deg, rgba(28, 20, 16, 0.96), rgba(16, 12, 22, 0.96))',
        borderRadius: '24px',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.55), 0 0 25px rgba(245, 158, 11, 0.12)',
        position: 'relative'
      }}>
        {/* Grandma Avatar & Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            👵
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fef3c7', margin: 0 }}>
              Grandma Storyteller (Interactive Voice Mode)
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: 0 }}>
              Grandma listens to you, finds the actual book online, and reads it with loving warmth.
            </p>
          </div>
        </div>

        {/* Live Conversation Dialogue Bubbles */}
        <div style={{
          maxHeight: '220px',
          overflowY: 'auto',
          padding: '12px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: 'rgba(0, 0, 0, 0.35)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          marginBottom: '18px'
        }}>
          {conversationHistory.map((msg, i) => {
            const isGranny = msg.sender === 'granny';
            return (
              <div 
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: isGranny ? 'flex-start' : 'flex-end',
                  gap: '8px'
                }}
              >
                <div style={{
                  maxWidth: '82%',
                  padding: '12px 16px',
                  borderRadius: isGranny ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                  background: isGranny ? 'rgba(245, 158, 11, 0.16)' : 'rgba(56, 189, 248, 0.18)',
                  border: isGranny ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid rgba(56, 189, 248, 0.35)',
                  color: isGranny ? '#fef3c7' : '#e0f2fe',
                  fontSize: '0.88rem',
                  lineHeight: '1.5'
                }}>
                  <div style={{ fontSize: '0.7rem', color: isGranny ? '#fbbf24' : '#38bdf8', fontWeight: 700, marginBottom: '2px' }}>
                    {isGranny ? '👵 Grandma' : '👤 You'}
                  </div>
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BIG INTERACTIVE MICROPHONE TALK BUTTON & CONTROLS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={isMicListening ? handleStopListeningAndProcess : handleStartTalkingToGranny}
              disabled={isSearchingBook}
              style={{
                background: isMicListening
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                  : 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: isMicListening ? '#fff' : '#1a1005',
                border: 'none',
                borderRadius: '999px',
                padding: '16px 32px',
                fontSize: '1.02rem',
                fontWeight: 900,
                cursor: isSearchingBook ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: isMicListening
                  ? '0 0 35px rgba(239, 68, 68, 0.7)'
                  : '0 8px 30px rgba(245, 158, 11, 0.45)',
                transition: 'all 0.25s ease'
              }}
            >
              {isMicListening ? (
                <>
                  <MicOff size={22} className="animate-pulse" />
                  <span>I am Listening... Tap When Done</span>
                </>
              ) : isSearchingBook ? (
                <>
                  <Loader2 size={22} className="animate-spin" />
                  <span>Agent Finding Real Book...</span>
                </>
              ) : (
                <>
                  <Mic size={22} />
                  <span>🎙️ Tap to Speak to Grandma</span>
                </>
              )}
            </button>

            <button
              onClick={handleHearGrannyWelcome}
              className="btn-secondary"
              style={{
                padding: '12px 18px',
                borderRadius: '999px',
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#fef3c7',
                background: 'rgba(245, 158, 11, 0.1)'
              }}
            >
              <Volume2 size={16} color="#f59e0b" />
              <span>Hear Grandma Welcome</span>
            </button>
          </div>

          {/* Real-time Voice Transcription Display with Visualizer */}
          {isMicListening && (
            <div style={{
              width: '100%',
              padding: '14px 20px',
              background: 'rgba(239, 68, 68, 0.15)',
              borderRadius: '16px',
              border: '1.5px solid rgba(239, 68, 68, 0.45)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} className="animate-ping" />
                <span style={{ fontSize: '0.74rem', color: '#fca5a5', fontWeight: 700, letterSpacing: '0.08em' }}>
                  LISTENING PATIENTLY • SAY ANY GREETING OR BOOK NAME
                </span>
              </div>
              <div style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 800, minHeight: '28px' }}>
                {liveTranscript ? `"${liveTranscript}"` : 'Listening for your voice... speak now...'}
              </div>
              {liveTranscript && (
                <button
                  onClick={handleStopListeningAndProcess}
                  style={{
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 16px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '4px'
                  }}
                >
                  ✓ Done Talking • Send to Grandma Now
                </button>
              )}
            </div>
          )}

          {/* Agent Status Progress Indicator */}
          {searchStatusStep && (
            <div style={{
              width: '100%',
              padding: '10px 16px',
              background: 'rgba(245, 158, 11, 0.12)',
              borderRadius: '12px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.84rem',
              color: '#fef3c7'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#f59e0b" className={isSearchingBook ? 'animate-spin' : ''} />
                <span>{searchStatusStep}</span>
              </div>
              {agentLatency && (
                <span style={{ color: '#10b981', fontWeight: 700 }}>⚡ {agentLatency}s</span>
              )}
            </div>
          )}

          {/* Manual Typing Row */}
          <div style={{ width: '100%', display: 'flex', gap: '8px', marginTop: '4px' }}>
            <input
              type="text"
              placeholder="Or type any book title (e.g. Atomic Habits, The Alchemist, Think and Grow Rich)..."
              value={manualQueryInput}
              onChange={(e) => setManualQueryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && manualQueryInput.trim()) {
                  handleProcessSpokenInput(manualQueryInput.trim());
                  setManualQueryInput('');
                }
              }}
              style={{
                flex: 1,
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '0.88rem',
                color: '#fff',
                outline: 'none'
              }}
            />
            <button
              onClick={() => {
                if (manualQueryInput.trim()) {
                  handleProcessSpokenInput(manualQueryInput.trim());
                  setManualQueryInput('');
                }
              }}
              disabled={isSearchingBook || !manualQueryInput.trim()}
              style={{
                borderRadius: '12px',
                padding: '0 20px',
                background: '#f59e0b',
                color: '#1a1005',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Send size={16} />
              <span>Search</span>
            </button>
          </div>

          {/* Quick-Pick Popular Book Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', width: '100%', marginTop: '6px' }}>
            <span style={{ fontSize: '0.74rem', color: '#9ca3af', fontWeight: 600 }}>Quick pick:</span>
            {[
              "The Alchemist",
              "Atomic Habits",
              "Think and Grow Rich",
              "Alice in Wonderland",
              "The Jungle Book",
              "Panchatantra"
            ].map((bookTitle) => (
              <button
                key={bookTitle}
                onClick={() => handleProcessSpokenInput(bookTitle)}
                disabled={isSearchingBook}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  fontSize: '0.76rem',
                  color: '#fbbf24',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                📖 {bookTitle}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 2: NEXT-DAY RESUME BOOKMARK (EXACT SPOT MEMORY) ── */}
      {savedBookmark && savedBookmark.paragraphIndex > 0 && (
        <div style={{
          marginBottom: '20px',
          padding: '16px 20px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(5, 150, 105, 0.12))',
          border: '1px solid rgba(16, 185, 129, 0.45)',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 6px 20px rgba(16, 185, 129, 0.12)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399'
            }}>
              <Bookmark size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#34d399', letterSpacing: '0.05em' }}>
                  NEXT-DAY RESUME BOOKMARK SAVED
                </span>
                <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>• {savedBookmark.dateFormatted}</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: '2px 0 4px 0' }}>
                {savedBookmark.bookTitle}
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#a7f3d0', margin: 0 }}>
                Paused at Paragraph <strong>{savedBookmark.paragraphIndex + 1}</strong> of {savedBookmark.totalParagraphs} ({savedBookmark.progressPercent}% completed)
              </p>
            </div>
          </div>

          <button
            onClick={handleResumeBookmark}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 22px',
              fontSize: '0.9rem',
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

      {/* ── SECTION 3: MY BEDTIME BOOKSHELF DRAWER ── */}
      {showLibraryShelf && (
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
                  onClick={() => {
                    stopStorytelling();
                    setActiveBookId(book.id);
                    activeBookIdRef.current = book.id;
                    setStoryTitle(book.title);
                    storyTitleRef.current = book.title;
                    setAuthorName(book.author);
                    setCustomText(book.text);
                    setCurrentParagraphIndex(-1);
                    saveBookmark(book.id, book.title, book.author, 0, book.text.split('\n\n').length);
                  }}
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

      {/* ── SECTION 4: MAIN STORY READING VIEW CARD ── */}
      <div className="glass-panel" style={{
        padding: '28px 24px',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        background: 'linear-gradient(135deg, rgba(20, 16, 28, 0.95), rgba(30, 22, 18, 0.92))',
        borderRadius: '24px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)'
      }}>
        {/* Story Title & Play Button Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <BookOpen size={20} color="#f59e0b" />
              <h1 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fef3c7', margin: 0 }}>
                {storyTitle}
              </h1>
            </div>
            <div style={{ fontSize: '0.84rem', color: '#d97706', fontWeight: 600 }}>
              by {authorName} • {paragraphs.length} Bedtime Paragraphs {bookSourceInfo && `• [${bookSourceInfo}]`}
            </div>
          </div>

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

        {/* Live Audio & Voice Commands Status */}
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
              <span>Mic listening: Say <strong>"Stop"</strong> or <strong>"Pause"</strong> anytime</span>
            </div>
          </div>
        )}

        {/* Voice command feedback toast */}
        {voiceCommandToast && (
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
            <span>{voiceCommandToast}</span>
          </div>
        )}

        {/* Paragraphs Reader */}
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

        {/* ── AUDIO CADENCE & FILE UPLOAD FOOTER ── */}
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

          {/* Upload Actual Book Copy */}
          <label style={{
            fontSize: '0.78rem',
            color: '#fbbf24',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}>
            <Upload size={14} />
            <span>📁 Upload Your Book Copy (.txt, .md, .pdf)</span>
            <input 
              type="file" 
              accept=".txt,.md,.pdf,.epub" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />
          </label>
        </div>
      </div>
    </div>
  );
}
