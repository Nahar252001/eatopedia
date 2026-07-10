import React from 'react';

export default function ProfileView({ placesList = [], savedPlaceIds = [], onTabChange }) {
  // Calculate dynamic stats
  const savedCount = savedPlaceIds.length;
  const totalCount = placesList.length;

  const savedPlaces = placesList.filter(p => savedPlaceIds.includes(p.id));
  const uniqueAreas = new Set(savedPlaces.map(p => p.area));
  const areasCount = uniqueAreas.size;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-xl mx-auto">
      {/* User Bio Card */}
      <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-display font-bold text-2xl border-2 border-primary">
          E
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-on-surface">Eatopedia Insider</h3>
          <p className="text-secondary text-xs mt-0.5 font-body">Surat, India</p>
          <p className="text-on-surface-variant text-xs mt-2 italic font-body">"Seeking aesthetic corners and hyper-local fusion eats."</p>
        </div>
      </div>

      {/* User Stats Bento */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/10 text-center">
          <span className="font-display font-bold text-xl text-primary">{savedCount}</span>
          <p className="text-[10px] text-secondary uppercase tracking-wider mt-1 font-body">Saved</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/10 text-center">
          <span className="font-display font-bold text-xl text-primary">{totalCount}</span>
          <p className="text-[10px] text-secondary uppercase tracking-wider mt-1 font-body">Surat Cafés</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/10 text-center">
          <span className="font-display font-bold text-xl text-primary">{areasCount}</span>
          <p className="text-[10px] text-secondary uppercase tracking-wider mt-1 font-body">Areas Active</p>
        </div>
      </div>

      {/* Curated folders */}
      <div className="space-y-3">
        <h4 className="font-semibold text-xs uppercase tracking-wider text-secondary font-body">My Curations</h4>
        {savedCount > 0 ? (
          <div className="space-y-3">
            <div 
              onClick={() => onTabChange && onTabChange('saved')}
              className="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex justify-between items-center cursor-pointer"
            >
              <div>
                <h5 className="font-display font-bold text-sm text-on-surface">❤️ My Shortlist</h5>
                <p className="text-secondary text-[10px] mt-0.5 font-body">{savedCount} place{savedCount > 1 ? 's' : ''} saved by you</p>
              </div>
              <span className="material-symbols-outlined text-secondary">chevron_right</span>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-surface-container border border-dashed border-outline-variant/20 text-center">
            <span className="material-symbols-outlined text-secondary text-3xl">favorite_border</span>
            <p className="text-xs text-secondary mt-2 font-body">No curations yet. Bookmark your favorite cafés to start your collection.</p>
            <button 
              onClick={() => onTabChange && onTabChange('discover')}
              className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-full text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Discover Cafés
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
