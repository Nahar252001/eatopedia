import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES, AMENITIES_CONFIG } from '../data/places';
import ShareCardModal from './ShareCardModal';

export default function PlaceDetailModal({ place, onClose, isSaved, onToggleSave, allPlaces, onSelectPlace, activeCategory }) {
  const [activeTab, setActiveTab] = useState(place.categories[0]);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    setActiveTab(place.categories[0]);
  }, [place]);

  const recommendations = useMemo(() => {
    let filtered = allPlaces.filter(p => p.id !== place.id);
    
    if (activeCategory) {
      // Filter suggestions specifically by the active sorted category
      filtered = filtered.filter(p => p.categories.includes(activeCategory));
    } else {
      // Fallback: suggest cafes that share category tags with the current place
      filtered = filtered.filter(p => p.categories.some(c => place.categories.includes(c)));
    }
    
    return filtered.slice(0, 6);
  }, [place, allPlaces, activeCategory]);

  const getAmenityConfig = (amKey) => {
    try {
      const saved = localStorage.getItem('eatopedia_amenities');
      if (saved) {
        const list = JSON.parse(saved);
        const found = list.find(item => item.key === amKey);
        if (found) return found;
      }
    } catch (e) {}
    return AMENITIES_CONFIG[amKey];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center bg-on-surface/50 backdrop-blur-sm p-0 md:p-6 transition-all duration-300">
      {/* Backdrop click close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92dvh] md:max-h-[85vh] bg-background rounded-t-3xl md:rounded-3xl overflow-hidden editorial-shadow z-10 flex flex-col transition-all duration-500">
        
        {/* Header Controls */}
        <div className="sticky top-0 w-full z-30 bg-background/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-outline-variant/20">
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group"
          >
            <span className="material-symbols-outlined text-[22px] group-active:translate-x-[-2px] transition-transform">arrow_back</span>
            <span className="font-semibold text-xs uppercase tracking-wider">Back</span>
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied! Share it with a friend.");
              }}
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:bg-surface-container-high transition-colors"
              title="Share Place"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
            <button 
              onClick={() => onToggleSave(place.id)}
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:bg-surface-container-high transition-colors"
              title="Shortlist Place"
            >
              <span className={`material-symbols-outlined text-[20px] ${isSaved ? 'text-primary fill-icon' : ''}`}>
                favorite
              </span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Asymmetric Gallery Layout */}
          {place.photos && place.photos.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[280px] md:h-[400px] rounded-2xl overflow-hidden animate-in fade-in duration-300">
              {/* Main Photo Column */}
              <div className={`${place.photos.length === 1 ? 'md:col-span-12' : 'md:col-span-8'} h-full overflow-hidden relative`}>
                <img src={place.photos[0]} alt={place.name} className="w-full h-full object-cover" />
                {/* Google Maps shortcut icon in the photo bottom-right corner */}
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(place.name + " " + place.area + " Surat")}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 md:bottom-12 md:right-12 lg:bottom-20 lg:right-20 z-20 w-12 h-12 rounded-full bg-primary text-on-primary border border-outline-variant/15 flex items-center justify-center shadow-lg hover:bg-white hover:text-primary hover:scale-[1.1] active:scale-95 transition-all duration-300"
                  title="Directions on Google Maps"
                >
                  <span className="material-symbols-outlined text-[24px]">directions</span>
                </a>
              </div>

              {/* Secondary Photos Column */}
              {place.photos.length > 1 && (
                <div className="hidden md:flex md:col-span-4 flex-col gap-4 h-full">
                  {place.photos.length === 2 ? (
                    <div className="h-full overflow-hidden">
                      <img src={place.photos[1]} alt={place.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <>
                      <div className="h-1/2 overflow-hidden">
                        <img src={place.photos[1]} alt={place.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="h-1/2 overflow-hidden relative">
                        <img src={place.photos[2]} alt={place.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white text-xs font-semibold uppercase tracking-wider bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                            Curated Photos
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Title & Category Badges */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-primary tracking-tighter mb-2">
                {place.name}
              </h2>
              
              {/* Compact Opening Hours */}
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-on-surface-variant/85 mb-4 font-body">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
                  <span>Weekdays: {place.opening_hours.weekdays}</span>
                </div>
                <div className="hidden sm:block text-outline-variant">•</div>
                <div className="flex items-center gap-1.5">
                  <span>Weekends: {place.opening_hours.weekends}</span>
                </div>
                <div className="flex items-center gap-1.5 text-green-700 font-semibold ml-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Open Now
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {place.categories.map(cat => (
                  <span key={cat} className="bg-surface-container-high text-on-surface-variant font-semibold text-[11px] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 font-body">
                    <span>{CATEGORIES[cat]?.emoji}</span>
                    {CATEGORIES[cat]?.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button 
                onClick={() => onToggleSave(place.id)}
                className={`flex-1 md:flex-initial font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 active-scale font-body ${
                  isSaved 
                    ? 'bg-on-surface text-background' 
                    : 'bg-primary text-on-primary shadow-lg shadow-primary/10 hover:shadow-xl hover:scale-[1.02]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isSaved ? 'check' : 'bookmark'}
                </span>
                {isSaved ? 'Saved' : 'Add to Shortlist'}
              </button>

              <button 
                onClick={() => setShareOpen(true)}
                className="font-semibold text-xs uppercase tracking-widest px-6 py-4 rounded-full bg-surface-container text-secondary hover:text-primary active-scale font-body border border-outline-variant/15 flex items-center justify-center gap-2 transition-colors"
                title="Share Vibe Card"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span>Share Vibe</span>
              </button>
            </div>
          </section>

          <hr className="border-outline-variant/20" />

          {/* Bento Content Grid */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-6">
              
              {/* AI Insider Insights Bento */}
              <div className="p-6 rounded-2xl border border-outline-variant/25 bg-surface-container-low relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[80px] rounded-full"></div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined text-[16px] fill-icon">auto_awesome</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-on-surface">Pick My Cafe Insider Insights</h3>
                </div>

                {/* Tabs to show insights for other categories */}
                <div className="flex gap-2 mb-4 border-b border-outline-variant/20 pb-2 overflow-x-auto no-scrollbar">
                  {place.categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveTab(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all font-body ${
                        activeTab === cat
                          ? 'bg-primary text-on-primary'
                          : 'text-secondary hover:bg-surface-container'
                      }`}
                    >
                      {CATEGORIES[cat]?.label.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-xs text-primary uppercase tracking-wider mb-2 flex items-center gap-1 font-body">
                    <span>{CATEGORIES[activeTab]?.emoji}</span>
                    Why it fits "{CATEGORIES[activeTab]?.label}"
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                    {place.explanation_text[activeTab]}
                  </p>
                </div>
              </div>

              {/* Must-Try Eats Bento Card */}
              {place.must_try_dishes && place.must_try_dishes.length > 0 && (
                <div className="p-6 rounded-2xl border border-outline-variant/25 bg-surface-container-low relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                      <span className="material-symbols-outlined text-[16px] fill-icon">restaurant_menu</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-on-surface">Must-Try Eats</h3>
                  </div>
                  <div className="space-y-4">
                    {place.must_try_dishes.map((dish, i) => (
                      <div key={i} className="flex justify-between items-start gap-4 pb-3.5 border-b border-outline-variant/15 last:border-b-0 last:pb-0">
                        <div className="min-w-0">
                          <div className="flex items-center flex-wrap gap-2">
                            <span className="text-sm font-bold text-on-surface">{dish.name}</span>
                            <span className="text-[9px] font-bold tracking-widest uppercase bg-surface-container px-2.5 py-0.5 rounded-full text-secondary border border-outline-variant/10 font-body">
                              {dish.tag}
                            </span>
                          </div>
                          <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed font-body">
                            {dish.description}
                          </p>
                        </div>
                        <div className="text-sm font-bold text-primary font-body whitespace-nowrap">
                          {dish.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Vibe Description */}
              <article className="space-y-4">
                <h3 className="font-display font-bold text-xl text-on-surface">The Vibe</h3>
                <p className="text-on-surface-variant text-base leading-relaxed font-light font-body">
                  Born from a desire to blend traditional Surat warmth with modern lifestyle aesthetics, {place.name} is an intentionally curated space. Every piece of décor has a origin story—from the hand-woven screens to the custom clay tableware.
                </p>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                  Sourcing fresh seasonal ingredients locally, their menu updates every few months to keep the flavor profile exciting, clean, and authentic to modern Indian taste palettes.
                </p>
              </article>

              {/* Amenities Row */}
              <div className="pt-4 space-y-2.5">
                <h4 className="font-display font-bold text-base text-on-surface">Amenities</h4>
                <div className="flex items-center gap-3.5">
                  {place.amenities.map(am => {
                    const cfg = getAmenityConfig(am);
                    if (!cfg) return null;
                    return (
                      <div 
                        key={am} 
                        title={cfg.label}
                        className="w-11 h-11 rounded-full bg-surface-container border border-outline-variant/15 flex items-center justify-center text-secondary hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">{cfg.icon}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side: Map, Hours, Testimonial cards */}
            <div className="md:col-span-4 space-y-6">
              




              {/* Testimonial Quote */}
              {place.testimonial && (
                <div className="bg-secondary-container/20 p-5 rounded-2xl border border-secondary/10 text-center">
                  <p className="text-secondary text-xs italic leading-relaxed mb-3 font-body">
                    "{place.testimonial.text}"
                  </p>
                  <p className="font-semibold text-[10px] uppercase tracking-wider text-secondary font-body">
                    — {place.testimonial.author}
                  </p>
                </div>
              )}
            </div>
          </section>

          <hr className="border-outline-variant/20" />

          {/* Suggestions: You might also vibe with... */}
          <section className="space-y-4">
            <h3 className="font-display font-bold text-xl text-on-surface">You might also vibe with...</h3>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 -mx-6 px-6 scroll-smooth">
              {recommendations.map(p => (
                <div 
                  key={p.id} 
                  onClick={() => onSelectPlace(p)}
                  className="group cursor-pointer bg-surface-container/50 border border-outline-variant/15 p-3 rounded-2xl hover:bg-surface-container transition-all flex-shrink-0 w-[240px] sm:w-[280px] snap-start"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                    <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-2 right-2 bg-background/90 text-primary font-semibold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded font-body">
                      {p.area}
                    </div>
                  </div>
                  <h4 className="font-display font-semibold text-sm group-hover:text-primary transition-colors text-on-surface truncate">
                    {p.name}
                  </h4>
                  <p className="text-secondary text-[11px] mt-0.5 font-body">
                    Recommended for {CATEGORIES[p.categories[0]]?.label.split(' ')[0]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      {shareOpen && (
        <ShareCardModal 
          place={place}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
  );
}
