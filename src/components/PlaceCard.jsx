import React from 'react';

export default function PlaceCard({ place, onSelect, isSaved, onToggleSave }) {
  return (
    <div 
      onClick={() => onSelect(place)}
      className="group relative overflow-hidden rounded-2xl bg-surface-container-low border border-outline-variant/15 transition-all duration-500 hover:translate-y-[-4px] cursor-pointer"
    >
      <div className="relative overflow-hidden w-full aspect-[3/4]">
        {/* Deep overlay gradient for text contrast */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-on-surface/85 via-on-surface/20 to-transparent opacity-85"></div>
        {place.photos && place.photos.length > 0 ? (
          <img 
            src={place.photos[0]} 
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high transition-colors group-hover:bg-surface-container-highest"></div>
        )}
        
        {/* Save button overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(place.id);
          }}
          className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary hover:bg-background active:scale-90 transition-all"
        >
          <span className={`material-symbols-outlined text-[18px] ${isSaved ? 'text-primary fill-icon' : ''}`}>
            favorite
          </span>
        </button>

        {/* Text Details overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white font-body">
          <div className="text-sm font-bold tracking-tight mb-1 group-hover:text-primary-fixed-dim transition-colors truncate">
            {place.name}
          </div>
          <div className="text-xs text-white/90">
            {place.area}, Surat
          </div>
        </div>
      </div>
    </div>
  );
}
