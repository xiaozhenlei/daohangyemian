import React from 'react';
import { Bookmark } from '../types';
import { X, Plus } from 'lucide-react';

interface BookmarkGridProps {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
  onAddClick: () => void;
}

const BookmarkGrid: React.FC<BookmarkGridProps> = ({ bookmarks, onDelete, onAddClick }) => {
  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="group relative flex flex-col items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-100 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer z-10"
            onClick={() => window.location.href = bookmark.url}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(bookmark.id);
              }}
              className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100"
              title="Remove"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="w-14 h-14 mb-3 bg-slate-50 rounded-2xl p-3 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-300">
              <img
                src={getFavicon(bookmark.url)}
                alt={bookmark.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=?';
                }}
              />
            </div>
            
            <span className="text-sm font-medium text-slate-700 truncate w-full text-center px-2 group-hover:text-indigo-600 transition-colors">
              {bookmark.title}
            </span>
          </div>
        ))}

        {/* Add Button */}
        <button
          onClick={onAddClick}
          className="flex flex-col items-center justify-center p-4 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 hover:scale-[1.02] transition-all duration-300 group min-h-[120px]"
        >
          <div className="w-10 h-10 mb-2 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 group-hover:rotate-90 transition-all duration-300">
            <Plus className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
          </div>
          <span className="text-xs font-medium text-slate-500 group-hover:text-indigo-600">Add Shortcut</span>
        </button>
      </div>
    </div>
  );
};

export default BookmarkGrid;