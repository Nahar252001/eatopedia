import React, { useState } from 'react';

export default function ShareCardModal({ place, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    try {
      const shareUrl = `${window.location.origin}/?place=${place.id}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy link. Please screenshot this card to share!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/65 backdrop-blur-md p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Share Card Container */}
      <div className="relative z-10 w-full max-w-[360px] flex flex-col items-center gap-4 py-4 animate-in zoom-in duration-300">
        
        {/* The 9:16 Aspect Ratio Poster Card */}
        <div className="relative w-full aspect-[9/16] bg-[#f5f3ef] border border-outline-variant/30 rounded-[32px] overflow-hidden shadow-2xl flex flex-col justify-between p-6">
          
          {/* Card Background Image with Rich Dark Gradient */}
          <div className="absolute inset-0 z-0">
            <img src={place.photos[0]} alt={place.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20"></div>
          </div>

          {/* Top Row: Watermark & Area */}
          <header className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[9px] font-bold text-white uppercase tracking-wider font-body">Eatopedia Curated</span>
            </div>
            <div className="bg-primary text-on-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm font-body">
              {place.area}, Surat
            </div>
          </header>

          {/* Bottom Details (Stacked) */}
          <footer className="relative z-10 space-y-4">
            
            {/* Vibe Tags */}
            <div className="flex flex-wrap gap-1.5">
              {place.categories.map(cat => {
                const map = {
                  best_food: { label: "Foodie", emoji: "🍽️" },
                  best_ambience: { label: "Aesthetic", emoji: "📸" },
                  romantic: { label: "Date Spot", emoji: "💕" },
                  friends_family: { label: "Hangout", emoji: "👨‍👩‍👧" }
                };
                return (
                  <span key={cat} className="bg-white/15 backdrop-blur-md text-white text-[8px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/5 font-body">
                    {map[cat]?.emoji} {map[cat]?.label}
                  </span>
                );
              })}
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h3 className="font-serif font-extrabold text-2xl text-white tracking-tight leading-none">
                {place.name}
              </h3>
              <p className="text-white/70 text-[10px] uppercase tracking-widest font-body">
                VIBE DISCOVERY SHEET
              </p>
            </div>

            {/* Divider */}
            <hr className="border-white/15" />

            {/* Testimonial snippet */}
            <div className="bg-black/35 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 text-center space-y-1">
              <p className="text-white/85 text-[10.5px] italic leading-relaxed font-body">
                "{place.testimonial.text}"
              </p>
              <p className="text-[8px] uppercase tracking-widest text-primary font-bold font-body">
                — {place.testimonial.author}
              </p>
            </div>

            {/* Watermark Footer */}
            <div className="pt-2 text-center">
              <p className="text-white/40 text-[9px] tracking-widest uppercase font-body">
                eatopedia.in • scan to discover
              </p>
            </div>

          </footer>

        </div>

        {/* Share Action Triggers */}
        <div className="w-full flex flex-col gap-2 relative z-10">
          <button 
            onClick={handleCopyLink}
            className="w-full py-3 bg-background text-primary border border-primary/20 font-semibold rounded-2xl hover:bg-surface-container active-scale transition-all flex items-center justify-center gap-2 font-body text-xs"
          >
            <span className="material-symbols-outlined text-[16px]">{copied ? 'done' : 'link'}</span>
            {copied ? 'Share Link Copied!' : 'Copy Share Link'}
          </button>
          
          <button 
            onClick={onClose}
            className="w-full py-3 bg-on-surface text-background font-semibold rounded-2xl hover:opacity-90 active-scale transition-all font-body text-xs text-center"
          >
            Close Card
          </button>

          {/* Social tips */}
          <div className="text-center text-white/75 text-[10px] mt-1 flex items-center justify-center gap-1.5 font-body">
            <span className="material-symbols-outlined text-[14px]">photo_camera</span>
            <span>Tip: Take a screenshot to post directly on Instagram Stories!</span>
          </div>
        </div>

      </div>
    </div>
  );
}
