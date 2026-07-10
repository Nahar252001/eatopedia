import React, { useState, useMemo } from 'react';

const REGION_CENTERS = {
  "Adajan": { x: 30, y: 25, label: "Adajan", desc: "Riverfront Workspaces" },
  "Piplod": { x: 45, y: 55, label: "Piplod", desc: "Lively Hangouts" },
  "Vesu": { x: 70, y: 72, label: "Vesu", desc: "Trendy Cafes & Eateries" },
  "City Light": { x: 74, y: 40, label: "City Light", desc: "Urban Fusion hubs" },
  "Dumas Road": { x: 22, y: 78, label: "Dumas Road", desc: "Tropical Green Escapes" }
};

export default function SuratMapView({ places, onSelectPlace }) {
  const [activePin, setActivePin] = useState(null);

  // Compute positions of pins deterministically based on place.id
  const plottedPins = useMemo(() => {
    return places.map(place => {
      const center = REGION_CENTERS[place.area] || { x: 50, y: 50 };
      
      // Calculate a deterministic offset from the area center using a simple hash of the place id
      let hash = 0;
      const str = place.id || "";
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      
      // Offsets range between -8% and +8%
      const offsetX = (hash % 16) - 8;
      const offsetY = (((hash >> 4) % 16) - 8);

      return {
        ...place,
        x: Math.max(10, Math.min(90, center.x + offsetX)),
        y: Math.max(10, Math.min(90, center.y + offsetY))
      };
    });
  }, [places]);

  return (
    <div className="relative w-full aspect-[4/3] max-w-4xl mx-auto bg-surface-container-low border border-outline-variant/20 rounded-3xl overflow-hidden shadow-sm animate-in fade-in duration-500">
      
      {/* Background Stylized SVG Map */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none select-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grids for design appeal */}
        <defs>
          <pattern id="map-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(104, 92, 85, 0.03)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#map-grid)" />

        {/* Tapi River Path (Splits Adajan from Vesu/Piplod) */}
        <path 
          d="M -10,15 C 20,20 40,15 50,30 C 60,45 55,60 80,68 C 95,72 105,70 110,75 L 110,-10 L -10,-10 Z" 
          fill="rgba(110, 168, 192, 0.08)"
        />
        <path 
          d="M -10,15 C 20,20 40,15 50,30 C 60,45 55,60 80,68 C 95,72 105,70 110,75" 
          fill="none" 
          stroke="rgba(110, 168, 192, 0.2)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </svg>

      {/* Region Area Labels */}
      {Object.entries(REGION_CENTERS).map(([key, center]) => (
        <div 
          key={key} 
          style={{ left: `${center.x}%`, top: `${center.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center opacity-40 select-none"
        >
          <span className="font-serif font-extrabold text-sm sm:text-lg text-secondary tracking-widest uppercase block">{center.label}</span>
          <span className="text-[8px] sm:text-[9px] font-body text-secondary-container-highest tracking-normal hidden sm:block">{center.desc}</span>
        </div>
      ))}

      {/* plotted pins */}
      {plottedPins.map(place => {
        const isActive = activePin?.id === place.id;
        return (
          <button
            key={place.id}
            style={{ left: `${place.x}%`, top: `${place.y}%` }}
            onClick={() => setActivePin(isActive ? null : place)}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
          >
            {/* Glowing ring */}
            <div className={`absolute -inset-2.5 rounded-full bg-primary/20 blur-sm scale-75 group-hover:scale-100 transition-all duration-300 ${
              isActive ? 'scale-110 opacity-100' : 'opacity-0'
            }`}></div>
            
            {/* Main pin dot */}
            <div className={`relative w-6 h-6 rounded-full border border-background flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 ${
              isActive ? 'bg-primary text-on-primary scale-115' : 'bg-surface-container-high text-secondary hover:text-primary'
            }`}>
              <span className="material-symbols-outlined text-[14px] fill-icon">local_cafe</span>
            </div>

            {/* Tiny tooltip indicator */}
            <div className="absolute top-7 left-1/2 -translate-x-1/2 bg-on-surface/90 backdrop-blur-sm text-background text-[8px] uppercase tracking-wider px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-body">
              {place.name}
            </div>
          </button>
        );
      })}

      {/* Floating Active Cafe Card Overlay */}
      {activePin && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[320px] bg-background border border-outline-variant/35 p-3 rounded-2xl shadow-xl flex gap-3.5 z-30 animate-in slide-in-from-bottom duration-300 font-body">
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
            <img src={activePin.photos[0]} alt={activePin.name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase tracking-wider text-primary font-bold">{activePin.area}</span>
                <button 
                  onClick={() => setActivePin(null)}
                  className="w-5 h-5 rounded-full hover:bg-surface-container flex items-center justify-center text-secondary-container-highest"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
              <h4 className="font-serif font-bold text-sm text-on-surface truncate mt-0.5">{activePin.name}</h4>
              <p className="text-[10px] text-on-surface-variant line-clamp-1 mt-1 leading-relaxed">
                {Object.values(activePin.explanation_text)[0]}
              </p>
            </div>
            <button
              onClick={() => onSelectPlace(activePin)}
              className="w-full py-1.5 bg-primary text-on-primary rounded-lg text-[10px] uppercase font-bold tracking-widest text-center hover:bg-primary-container transition-colors active-scale mt-1.5"
            >
              Open Insider Info
            </button>
          </div>
        </div>
      )}

      {/* Legend Map Helper */}
      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border border-outline-variant/15 px-3 py-1.5 rounded-full pointer-events-none select-none text-[9px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary"></span>
        <span>Interactive Map of Surat</span>
      </div>

    </div>
  );
}
