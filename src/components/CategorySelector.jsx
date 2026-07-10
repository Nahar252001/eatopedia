import React from 'react';
import { CATEGORIES } from '../data/places';

export default function CategorySelector({ activeCategory, onSelectCategory }) {
  return (
    <div className="relative mb-6">
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 -mx-6 px-6 scroll-smooth">
        {Object.entries(CATEGORIES).map(([key, value]) => {
          const isActive = activeCategory === key;
          return (
            <button
              key={key}
              onClick={() => onSelectCategory(isActive ? null : key)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-semibold text-sm active-scale transition-all duration-300 ${
                isActive
                  ? "bg-primary text-on-primary shadow-md shadow-primary/20 scale-[1.02]"
                  : "bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="mr-1.5">{value.emoji}</span>
              {value.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
