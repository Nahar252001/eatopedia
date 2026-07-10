import React, { useMemo } from 'react';
import { CATEGORIES } from '../data/places';

export default function SearchOverlay({ isOpen, onClose, query, onSearchChange, allPlaces, onSelectPlace }) {
  if (!isOpen) return null;

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allPlaces.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.area.toLowerCase().includes(q) ||
      p.categories.some(cat => CATEGORIES[cat]?.label.toLowerCase().includes(q))
    );
  }, [query, allPlaces]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-in fade-in duration-300">
      {/* Header with Search Input */}
      <div className="sticky top-0 bg-background px-6 py-4 flex items-center gap-4 border-b border-outline-variant/20">
        <button onClick={onClose} className="material-symbols-outlined text-secondary hover:text-primary transition-colors active-scale">
          arrow_back
        </button>
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
            search
          </span>
          <input 
            type="text" 
            value={query}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="What vibe are you searching for today?"
            className="w-full pl-11 pr-10 py-3 bg-surface-container border border-outline-variant/30 text-on-surface placeholder-secondary/60 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-body"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => onSearchChange('')}
              className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors text-[20px]"
            >
              close
            </button>
          )}
        </div>
      </div>

      {/* Suggested lists or Results */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {!query.trim() ? (
          <div className="space-y-4">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-secondary font-body">Suggested Areas</h3>
            <div className="flex flex-wrap gap-2">
              {["Vesu", "Piplod", "Adajan", "City Light", "Dumas Road"].map(area => (
                <button 
                  key={area}
                  onClick={() => onSearchChange(area)}
                  className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-semibold transition-colors font-body"
                >
                  📍 {area}
                </button>
              ))}
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-secondary font-body">Search Results ({results.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map(place => (
                <div 
                  key={place.id}
                  onClick={() => {
                    onSelectPlace(place);
                    onClose();
                  }}
                  className="flex items-center gap-4 bg-surface-container-low border border-outline-variant/15 p-3 rounded-2xl cursor-pointer hover:bg-surface-container transition-all group"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high flex items-center justify-center">
                    {place.photos && place.photos.length > 0 ? (
                      <img src={place.photos[0]} alt={place.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-secondary/40 text-[20px]">storefront</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-semibold tracking-wider text-secondary font-body">{place.area}</span>
                    <h4 className="font-display font-bold text-sm text-on-surface truncate group-hover:text-primary transition-colors">{place.name}</h4>
                    <p className="text-secondary text-[11px] truncate mt-0.5 font-body">
                      {place.categories.map(c => CATEGORIES[c]?.label.split(' ')[0]).join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-[48px] text-secondary/40 mb-3">search_off</span>
            <p className="text-on-surface font-semibold text-base font-body">No matches found for "{query}"</p>
            <p className="text-secondary text-xs mt-1 font-body">Try typing another area name or cafe vibe.</p>
          </div>
        )}
      </div>
    </div>
  );
}
