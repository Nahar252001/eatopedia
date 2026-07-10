import React, { useMemo } from 'react';
import { CATEGORIES } from '../data/places';

export default function SavedPlaces({ savedIds, allPlaces, onSelectPlace, onToggleSave }) {
  const savedList = useMemo(() => {
    return allPlaces.filter(p => savedIds.includes(p.id));
  }, [savedIds, allPlaces]);

  if (savedList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4 animate-in fade-in duration-300">
        <span className="material-symbols-outlined text-[64px] text-secondary/35 mb-4">bookmark_border</span>
        <h3 className="font-display font-bold text-xl text-on-surface mb-2">No vibes saved yet</h3>
        <p className="text-secondary text-sm max-w-sm leading-relaxed font-body">
          Found a spot that fits your mood? Tap the bookmark icon to start building your shortlist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="font-display font-bold text-xl text-on-surface">
          Your Shortlist ({savedList.length})
        </h3>
        <p className="text-xs text-secondary italic font-body">Saved on your device</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedList.map(place => (
          <div 
            key={place.id}
            onClick={() => onSelectPlace(place)}
            className="flex items-center gap-4 bg-surface-container-low border border-outline-variant/20 p-3 rounded-2xl cursor-pointer hover:bg-surface-container transition-all group"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high flex items-center justify-center">
              {place.photos && place.photos.length > 0 ? (
                <img src={place.photos[0]} alt={place.name} className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-secondary/40 text-[24px]">storefront</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] uppercase font-semibold tracking-wider text-secondary font-body">
                {place.area}
              </span>
              <h4 className="font-display font-bold text-base text-on-surface truncate group-hover:text-primary transition-colors">
                {place.name}
              </h4>
              <p className="text-secondary text-xs truncate mt-0.5 font-body">
                Fits {place.categories.map(c => CATEGORIES[c]?.label.split(' ')[0]).join(', ')}
              </p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(place.id);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] fill-icon">delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
