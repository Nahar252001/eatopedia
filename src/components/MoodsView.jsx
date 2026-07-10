import React from 'react';
import { CATEGORIES, PLACES } from '../data/places';

export default function MoodsView({ onSelectCategory, onTabChange }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h2 className="font-display font-bold text-2xl text-on-surface">Pick your Vibe</h2>
        <p className="text-secondary text-sm font-body">Where do you want to go today based on the occasion?</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(CATEGORIES).map(([key, value]) => {
          const count = PLACES.filter(p => p.categories.includes(key)).length;
          return (
            <div 
              key={key}
              onClick={() => {
                onSelectCategory(key);
                onTabChange('discover');
              }}
              className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 hover:border-primary/30 hover:bg-surface-container cursor-pointer transition-all active-scale group relative overflow-hidden"
            >
              <div className="absolute right-[-10px] bottom-[-10px] text-7xl opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300">
                {value.emoji}
              </div>
              <div className="text-3xl mb-3">{value.emoji}</div>
              <h3 className="font-display font-bold text-lg text-on-surface mb-1 group-hover:text-primary transition-colors">
                {value.label}
              </h3>
              <p className="text-secondary text-xs font-body">
                Explore {count} curated places in Surat
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
