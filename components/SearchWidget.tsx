import React, { useState, useRef, useEffect } from 'react';
import { SearchEngine } from '../types';
import { SEARCH_ENGINES } from '../constants';
import { ChevronDown, Search } from 'lucide-react';

interface SearchWidgetProps {
  activeEngine: SearchEngine;
  onEngineChange: (engine: SearchEngine) => void;
}

const SearchWidget: React.FC<SearchWidgetProps> = ({ activeEngine, onEngineChange }) => {
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const url = activeEngine.searchUrl.replace('%s', encodeURIComponent(query));
    window.location.href = url;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div 
        className={`
          relative flex items-center bg-white rounded-2xl transition-all duration-300 ease-out
          ${isFocused 
            ? 'shadow-2xl shadow-indigo-200/50 ring-2 ring-indigo-100 transform -translate-y-1' 
            : 'shadow-lg shadow-slate-200/50'}
        `}
      >
        {/* Engine Selector */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-5 py-4 text-slate-600 hover:bg-slate-50 rounded-l-2xl border-r border-slate-100 transition-colors group"
          >
            <span className="text-indigo-600 group-hover:scale-110 transition-transform duration-200">{activeEngine.icon}</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
          </button>

          {/* Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-2xl shadow-slate-300/60 border border-slate-100 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-left z-[100]">
              {SEARCH_ENGINES.map((engine) => (
                <button
                  key={engine.id}
                  onClick={() => {
                    onEngineChange(engine);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors ${activeEngine.id === engine.id ? 'bg-indigo-50/60 text-indigo-700' : 'text-slate-600'}`}
                >
                  <div className={`${activeEngine.id === engine.id ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {engine.icon}
                  </div>
                  <span className="text-sm font-medium">{engine.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex-1 flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={activeEngine.placeholder}
            className="w-full px-4 py-4 bg-transparent outline-none text-lg text-slate-700 placeholder:text-slate-400"
            autoFocus
          />
          <button 
            type="submit"
            className={`p-5 transition-all duration-300 ${query ? 'text-indigo-600 scale-110' : 'text-slate-300 hover:text-indigo-400'}`}
          >
            <Search className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchWidget;