import React from 'react';
import { NavCategory } from '../types';
import { ExternalLink } from 'lucide-react';

interface CategoryGridProps {
  categories: NavCategory[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px bg-slate-200 flex-1"></div>
        <span className="text-slate-400 text-sm font-medium uppercase tracking-widest px-2">Discover</span>
        <div className="h-px bg-slate-200 flex-1"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-slate-100/50 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/20 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100/50">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="font-semibold text-slate-700">{category.title}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {category.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all duration-200"
                >
                  <img 
                    src={`https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=32`}
                    alt="" 
                    className="w-4 h-4 opacity-70"
                    onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                  />
                  <span className="truncate">{link.title}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;