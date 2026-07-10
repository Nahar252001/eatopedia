import React from 'react';

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-safe pt-2 bg-background/85 backdrop-blur-xl border-t border-outline-variant/10 md:hidden">
      <button 
        onClick={() => { onTabChange('discover'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center justify-center p-2 rounded-full transition-all active-scale ${
          activeTab === 'discover' 
            ? 'text-primary scale-[1.05] font-semibold' 
            : 'text-secondary hover:bg-secondary-container/20'
        }`}
      >
        <span className={`material-symbols-outlined text-[24px] ${activeTab === 'discover' ? 'fill-icon' : ''}`}>explore</span>
        <span className="text-[10px] uppercase tracking-wider mt-0.5 font-body">Discover</span>
      </button>

      <button 
        onClick={() => onTabChange('moods')}
        className={`flex flex-col items-center justify-center p-2 rounded-full transition-all active-scale ${
          activeTab === 'moods' 
            ? 'text-primary scale-[1.05] font-semibold' 
            : 'text-secondary hover:bg-secondary-container/20'
        }`}
      >
        <span className={`material-symbols-outlined text-[24px] ${activeTab === 'moods' ? 'fill-icon' : ''}`}>mood</span>
        <span className="text-[10px] uppercase tracking-wider mt-0.5 font-body">Moods</span>
      </button>

      <button 
        onClick={() => onTabChange('saved')}
        className={`flex flex-col items-center justify-center p-2 rounded-full transition-all active-scale ${
          activeTab === 'saved' 
            ? 'text-primary scale-[1.05] font-semibold' 
            : 'text-secondary hover:bg-secondary-container/20'
        }`}
      >
        <span className={`material-symbols-outlined text-[24px] ${activeTab === 'saved' ? 'fill-icon' : ''}`}>bookmark</span>
        <span className="text-[10px] uppercase tracking-wider mt-0.5 font-body">Saved</span>
      </button>

      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center p-2 rounded-full transition-all active-scale ${
          activeTab === 'profile' 
            ? 'text-primary scale-[1.05] font-semibold' 
            : 'text-secondary hover:bg-secondary-container/20'
        }`}
      >
        <span className={`material-symbols-outlined text-[24px] ${activeTab === 'profile' ? 'fill-icon' : ''}`}>person</span>
        <span className="text-[10px] uppercase tracking-wider mt-0.5 font-body">Profile</span>
      </button>
    </nav>
  );
}
