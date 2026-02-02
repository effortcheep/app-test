import React, { useState, useEffect, useRef } from 'react';
import { User, Character, ViewState, Topic } from './types';
import { DEFAULT_CHARACTERS, MOCK_TOPICS } from './constants';
import { initializeGemini, startChatSession } from './services/geminiService';

// Components
import AuthScreen from './components/AuthScreen';
import ChatSessionList from './components/ChatSessionList';
import CharacterList from './components/CharacterList';
import TopicList from './components/TopicList';
import ProfileScreen from './components/ProfileScreen';
import CharacterWizard from './components/CharacterWizard';
import ChatInterface from './components/ChatInterface';
import CharacterDetail from './components/CharacterDetail';
import TopicDetail from './components/TopicDetail';
import MoodJournal from './components/MoodJournal';
import SettingsScreen from './components/SettingsScreen';
import FavoritesScreen from './components/FavoritesScreen';
import { Icons } from './components/ui/Icon';

const BGM_URL = "https://cdn.pixabay.com/audio/2022/01/21/audio_31743c58bd.mp3";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('auth');
  const [characters, setCharacters] = useState<Character[]>(DEFAULT_CHARACTERS);
  
  // Selection States
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [editingCharacter, setEditingCharacter] = useState<Character | undefined>(undefined);
  
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  
  // Music State (Default Off)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Music with Web Audio API for filter
    const audio = new Audio(BGM_URL);
    audio.loop = true;
    audio.crossOrigin = "anonymous"; // Essential for Web Audio API CORS
    audioRef.current = audio;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        try {
            // Wait for metadata to be safer, though typically source creation is immediate
            audio.addEventListener('canplay', () => {
                // Check if source already created to prevent errors on re-renders/HMR
                // In a strict effect cleanup, this is fine, but double check logic
            });

            const source = ctx.createMediaElementSource(audio);
            
            // Create Low Pass Filter
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800; // 800Hz cutoff for Lo-Fi/Muffled sound
            filter.Q.value = 1;

            // Create Gain Node for Volume (MediaElementSource ignores audio.volume)
            const gainNode = ctx.createGain();
            gainNode.gain.value = 0.2; // 20% Volume

            // Connect graph: Source -> Filter -> Gain -> Destination
            source.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(ctx.destination);
            
        } catch (e) {
            console.warn("Web Audio API setup error (likely CORS or state):", e);
            // Fallback volume if Web Audio fails
            audio.volume = 0.2;
        }
    } else {
        audio.volume = 0.2;
    }

    const apiKey = process.env.API_KEY;
    if (apiKey) {
      initializeGemini(apiKey);
      setIsApiKeySet(true);
    } else {
        console.error("API_KEY is missing from environment variables.");
    }

    const storedUser = localStorage.getItem('healing_user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
        setView('chat_list'); 
    }
    
    const storedChars = localStorage.getItem('healing_chars');
    if (storedChars) {
        setCharacters(JSON.parse(storedChars));
    }
    
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        if (audioCtxRef.current) {
            audioCtxRef.current.close();
        }
    };
  }, []);

  useEffect(() => {
     if(characters.length > 0) {
         localStorage.setItem('healing_chars', JSON.stringify(characters));
     }
  }, [characters]);

  // Actions
  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('healing_user', JSON.stringify(newUser));
    setView('chat_list');
    
    // REMOVED: playMusic() - Default is now OFF
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('healing_user');
    setView('auth');
    pauseMusic(); // Stop music on logout
  };
  
  const playMusic = () => {
      if (!audioRef.current) return;
      
      // Resume context if suspended (browser autoplay policy)
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
      }

      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(err => console.log("Auto-play prevented:", err));
  };

  const pauseMusic = () => {
      if (!audioRef.current) return;
      audioRef.current.pause();
      setIsMusicPlaying(false);
  };
  
  const toggleMusic = () => {
      if (isMusicPlaying) {
          pauseMusic();
      } else {
          playMusic();
      }
  };

  const startChat = async (char: Character) => {
    if (!isApiKeySet) { alert("API Key Missing"); return; }
    setActiveCharacter(char);
    await startChatSession(char);
    setView('chat');
  };

  const handleSaveCharacter = (char: Character) => {
    if (editingCharacter) {
      setCharacters(prev => prev.map(c => c.id === char.id ? char : c));
    } else {
      setCharacters(prev => [...prev, char]);
    }
    setView('character_list'); // Go back to list after save
    setEditingCharacter(undefined);
  };

  const handleDeleteCharacter = (id: string) => {
      if (confirm("确认删除此伴侣数据？")) {
        setCharacters(prev => prev.filter(c => c.id !== id));
        if(view === 'character_detail') setView('character_list');
      }
  };

  // Helper for Bottom Nav Button
  const NavButton = ({ target, icon: Icon, label }: { target: ViewState, icon: any, label: string }) => {
      const isActive = view === target || 
          (target === 'chat_list' && view === 'chat') ||
          (target === 'character_list' && (view === 'character_detail' || view === 'character_wizard')) ||
          (target === 'topic_list' && view === 'topic_detail') ||
          (target === 'profile' && (view === 'mood_journal' || view === 'settings' || view === 'favorites'));
          
      return (
        <button 
            onClick={() => setView(target)} 
            className={`flex flex-col items-center group flex-1 ${isActive ? 'text-retro-orange' : 'text-retro-grey hover:text-retro-dark'}`}
        >
            <div className={`border-2 p-1 rounded-sm transition-all mb-1 ${isActive ? 'border-retro-orange bg-retro-orange/10 shadow-hard-sm' : 'border-transparent group-hover:border-retro-dark'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
        </button>
      )
  };

  const renderContent = () => {
    if (!user) return <AuthScreen onLogin={handleLogin} />;
    if (view === 'auth') return <AuthScreen onLogin={handleLogin} />;

    // Fullscreen Overlay Views (No Bottom Nav)
    if (view === 'chat') {
        if (!activeCharacter) { setView('chat_list'); return null; }
        return <ChatInterface character={activeCharacter} onBack={() => setView('chat_list')} userAvatar={user.avatar} />;
    }
    
    if (view === 'character_wizard') {
        return <CharacterWizard initialData={editingCharacter} onSave={handleSaveCharacter} onCancel={() => setView('character_list')} />;
    }

    if (view === 'character_detail') {
        if (!activeCharacter) return <div>No Character</div>;
        return (
            <CharacterDetail 
                character={activeCharacter} 
                onBack={() => setView('character_list')} 
                onStartChat={startChat}
                onEdit={(c) => { setEditingCharacter(c); setView('character_wizard'); }}
                onDelete={handleDeleteCharacter}
            />
        );
    }

    if (view === 'topic_detail') {
        if (!activeTopic) return <div>No Topic</div>;
        return (
            <TopicDetail 
                topic={activeTopic} 
                onBack={() => setView('topic_list')} 
                onStart={() => {
                    // Pick random character for topic chat or let user choose. For MVP, pick first.
                    startChat(characters[0]);
                }}
            />
        );
    }

    // No nav views
    if (view === 'mood_journal') {
        return <MoodJournal onBack={() => setView('profile')} />;
    }
    
    if (view === 'settings') {
        return (
            <SettingsScreen 
                onBack={() => setView('profile')} 
                user={user} 
                isMusicPlaying={isMusicPlaying}
                onToggleMusic={toggleMusic}
            />
        );
    }

    if (view === 'favorites') {
        return <FavoritesScreen onBack={() => setView('profile')} onSelect={(t) => { setActiveTopic(t); setView('topic_detail'); }} />;
    }

    // Tab Views (With Bottom Nav)
    let content = null;
    switch(view) {
        case 'chat_list':
            content = (
                <ChatSessionList 
                    characters={characters} // Mocking sessions with characters list for MVP
                    onSelectCharacter={startChat}
                    onNewChat={() => setView('character_list')}
                />
            );
            break;
        case 'character_list':
            content = (
                <CharacterList 
                    characters={characters} 
                    onSelectCharacter={(c) => { setActiveCharacter(c); setView('character_detail'); }}
                    onAddNew={() => { setEditingCharacter(undefined); setView('character_wizard'); }}
                    onEdit={(c) => { setEditingCharacter(c); setView('character_wizard'); }}
                    onDelete={handleDeleteCharacter}
                />
            );
            break;
        case 'topic_list':
            content = (
                <TopicListWrapper onSelect={(t: Topic) => { setActiveTopic(t); setView('topic_detail'); }} />
            );
            break;
        case 'profile':
            content = (
                <ProfileScreenWrapper 
                    user={user} 
                    onLogout={handleLogout} 
                    onOpenMood={() => setView('mood_journal')} 
                    onOpenSettings={() => setView('settings')} 
                    onOpenFavorites={() => setView('favorites')}
                />
            );
            break;
        default:
            content = <div>ERR: UNKNOWN_VIEW</div>;
    }

    return (
        <>
            <div className="h-full pb-20">{content}</div>
            <nav className="bg-retro-paper border-t-2 border-retro-dark flex justify-between py-3 pb-safe fixed bottom-0 w-full max-w-md z-30 shadow-[0_-4px_0_0_rgba(26,26,26,1)] px-2">
                <NavButton target="chat_list" icon={Icons.MessageCircle} label="对话" />
                <NavButton target="character_list" icon={Icons.Users} label="伙伴" />
                <NavButton target="topic_list" icon={Icons.BookOpen} label="话题" />
                <NavButton target="profile" icon={Icons.User} label="我的" />
            </nav>
        </>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-retro-cream font-mono flex flex-col items-center">
      {/* Mobile Shell: Use 100% dimensions but limit max-width for desktop compatibility */}
      <div className="w-full max-w-md h-full bg-retro-cream shadow-2xl relative flex flex-col overflow-hidden">
        <div className="scanlines absolute inset-0 z-50 pointer-events-none opacity-50"></div>
        {renderContent()}
      </div>
    </div>
  );
};

// Wrappers to adapt existing components to new navigation props without rewriting them entirely if they lacked props
const TopicListWrapper = ({ onSelect }: any) => {
    return <TopicList onSelect={onSelect} />;
};

const ProfileScreenWrapper = ({ user, onLogout, onOpenMood, onOpenSettings, onOpenFavorites }: any) => {
    return <ProfileScreen user={user} onLogout={onLogout} onOpenMood={onOpenMood} onOpenSettings={onOpenSettings} onOpenFavorites={onOpenFavorites} />;
};

export default App;