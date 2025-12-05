import React, { useState, useEffect } from 'react';
import { SearchEngine, Bookmark } from './types';
import { SEARCH_ENGINES, DEFAULT_BOOKMARKS, NAV_CATEGORIES } from './constants';
import SearchWidget from './components/SearchWidget';
import BookmarkGrid from './components/BookmarkGrid';
import CategoryGrid from './components/CategoryGrid';
import SettingsModal from './components/SettingsModal';
import { Settings } from 'lucide-react';

const App: React.FC = () => {
  // State initialization with LocalStorage persistence
  const [activeEngine, setActiveEngine] = useState<SearchEngine>(() => {
    const saved = localStorage.getItem('zen_active_engine');
    if (saved) {
      const found = SEARCH_ENGINES.find(e => e.id === saved);
      if (found) return found;
    }
    return SEARCH_ENGINES[0];
  });

  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('zen_bookmarks');
    try {
      return saved ? JSON.parse(saved) : DEFAULT_BOOKMARKS;
    } catch {
      return DEFAULT_BOOKMARKS;
    }
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // To trigger initial animations only once
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('zen_active_engine', activeEngine.id);
  }, [activeEngine]);

  useEffect(() => {
    localStorage.setItem('zen_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    // Initial set
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    return () => clearInterval(timer);
  }, []);

  // Handlers
  const handleImportBookmarks = (imported: Bookmark[]) => {
    setBookmarks(prev => {
      const existingUrls = new Set(prev.map(b => b.url));
      const newUnique = imported.filter(b => !existingUrls.has(b.url));
      return [...prev, ...newUnique];
    });
  };

  const handleAddManual = (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setBookmarks(prev => [...prev, newBookmark]);
  };

  const handleDeleteBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-50/50 via-white to-slate-100 relative overflow-x-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-200/20 blur-[120px] rounded-full pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/20 blur-[120px] rounded-full pointer-events-none animate-pulse duration-[8000ms]" />

      {/* Header / Settings Trigger */}
      <div className="w-full max-w-6xl p-6 flex justify-end absolute top-0 z-10">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white/60 rounded-full transition-all hover:rotate-90 duration-500"
          title="Settings & Import"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center pt-20 pb-10 z-10 px-4">
        
        {/* Clock */}
        <div className={`mb-12 text-center select-none ${mounted ? 'animate-enter' : 'opacity-0'}`}>
          <h1 className="text-7xl md:text-8xl font-bold text-slate-800 tracking-tight font-[Inter] drop-shadow-sm">
            {currentTime}
          </h1>
          <p className="text-slate-500 mt-3 font-light text-lg">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Search - Added 'relative z-50' to fix overlap issue */}
        <div className={`w-full mb-12 relative z-50 ${mounted ? 'animate-enter delay-100' : 'opacity-0'}`}>
          <SearchWidget 
            activeEngine={activeEngine} 
            onEngineChange={setActiveEngine} 
          />
        </div>

        {/* User Bookmarks - 'relative z-10' keeps it below search */}
        <div className={`w-full relative z-10 ${mounted ? 'animate-enter delay-200' : 'opacity-0'}`}>
          <BookmarkGrid 
            bookmarks={bookmarks} 
            onDelete={handleDeleteBookmark}
            onAddClick={() => setIsSettingsOpen(true)}
          />
        </div>
        
        {/* Navigation Categories */}
        <div className={`w-full mt-4 relative z-0 ${mounted ? 'animate-enter delay-300' : 'opacity-0'}`}>
           <CategoryGrid categories={NAV_CATEGORIES} />
        </div>

      </main>

      {/* Footer */}
      <footer className={`w-full p-6 text-center text-slate-400 text-sm font-light ${mounted ? 'animate-enter delay-500' : 'opacity-0'}`}>
        © {new Date().getFullYear()} ZenNav. Focus on what matters.
      </footer>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onImport={handleImportBookmarks}
        onAddManual={handleAddManual}
      />
    </div>
  );
};

export default App;