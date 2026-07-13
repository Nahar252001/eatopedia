import React from 'react';

export default function Navbar({ activeTab, onTabChange, onOpenSearch }) {
  const tabs = [
    { id: 'discover', label: 'Discover', icon: 'explore' },
    { id: 'moods', label: 'Moods', icon: 'mood' },
    { id: 'saved', label: 'Saved', icon: 'bookmark' },
    { id: 'profile', label: 'Profile', icon: 'person' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-header flex justify-between items-center px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-8">
        <h1 
          className="font-display text-2xl font-extrabold text-primary tracking-tighter cursor-pointer" 
          onClick={() => {
            onTabChange('discover');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Pick My Cafe
        </h1>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-body">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all active-scale ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-secondary hover:bg-surface-container/50 hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[16px] ${activeTab === tab.id ? 'fill-icon' : ''}`}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenSearch}
          className="w-10 h-10 rounded-full flex items-center justify-center text-primary bg-surface-container-low hover:bg-surface-container-high active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">search</span>
        </button>
      </div>
    </header>
  );
}
