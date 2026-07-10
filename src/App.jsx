import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import CategorySelector from './components/CategorySelector';
import PlaceCard from './components/PlaceCard';
import PlaceDetailModal from './components/PlaceDetailModal';
import SavedPlaces from './components/SavedPlaces';
import MoodsView from './components/MoodsView';
import SearchOverlay from './components/SearchOverlay';
import ProfileView from './components/ProfileView';
import SuratMapView from './components/SuratMapView';
import AdminDashboard from './components/AdminDashboard';
import { PLACES, CATEGORIES } from './data/places';

export default function App() {
  const [activeTab, setActiveTab] = useState('discover'); // discover, moods, saved, profile
  const [selectedCategory, setSelectedCategory] = useState(null); // category filter
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  
  // Load saved shortlist from localStorage (client-side persistence)
  const [savedPlaceIds, setSavedPlaceIds] = useState(() => {
    try {
      const val = localStorage.getItem('mojmaa_shortlist');
      return val ? JSON.parse(val) : [];
    } catch (e) {
      return [];
    }
  });

  const [viewMode, setViewMode] = useState('grid'); // grid or map

  // Hash Routing State
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHash = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const isAdminRoute = currentHash === '#/admin';

  // Admin access control states
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('mojmaa_admin_unlocked') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode === '1234') {
      setIsAdminUnlocked(true);
      try {
        sessionStorage.setItem('mojmaa_admin_unlocked', 'true');
      } catch (e) {}
    } else {
      setPasscodeError('Invalid Admin Key');
      setTimeout(() => setPasscodeError(''), 2500);
    }
  };

  // Load custom-added places, overrides for default places, and deleted place IDs
  const [placesList, setPlacesList] = useState(() => {
    try {
      const custom = localStorage.getItem('mojmaa_custom_places');
      const parsedCustom = custom ? JSON.parse(custom) : [];
      
      const deleted = localStorage.getItem('mojmaa_deleted_places');
      const parsedDeleted = deleted ? JSON.parse(deleted) : [];
      
      const edited = localStorage.getItem('mojmaa_edited_default_places');
      const parsedEdited = edited ? JSON.parse(edited) : [];
      
      // Map defaults, override with edits, exclude deleted ones
      const mappedDefault = PLACES.map(p => {
        const override = parsedEdited.find(e => e.id === p.id);
        return override ? override : p;
      }).filter(p => !parsedDeleted.includes(p.id));
      
      return [...mappedDefault, ...parsedCustom];
    } catch (e) {
      return PLACES;
    }
  });

  const handleAddPlace = (newPlace) => {
    setPlacesList(prev => [...prev, newPlace]);
    try {
      const custom = localStorage.getItem('mojmaa_custom_places');
      const parsedCustom = custom ? JSON.parse(custom) : [];
      localStorage.setItem('mojmaa_custom_places', JSON.stringify([...parsedCustom, newPlace]));
    } catch (e) {}
  };

  const handleEditPlace = (updatedPlace) => {
    setPlacesList(prev => prev.map(p => p.id === updatedPlace.id ? updatedPlace : p));
    try {
      const custom = localStorage.getItem('mojmaa_custom_places');
      const parsedCustom = custom ? JSON.parse(custom) : [];
      const isCustom = parsedCustom.some(p => p.id === updatedPlace.id);
      
      if (isCustom) {
        const updatedCustom = parsedCustom.map(p => p.id === updatedPlace.id ? updatedPlace : p);
        localStorage.setItem('mojmaa_custom_places', JSON.stringify(updatedCustom));
      } else {
        const editedDefault = localStorage.getItem('mojmaa_edited_default_places');
        const parsedEdited = editedDefault ? JSON.parse(editedDefault) : [];
        const filtered = parsedEdited.filter(e => e.id !== updatedPlace.id);
        localStorage.setItem('mojmaa_edited_default_places', JSON.stringify([...filtered, updatedPlace]));
      }
    } catch (e) {}
  };

  const handleDeletePlace = (placeId) => {
    setPlacesList(prev => prev.filter(p => p.id !== placeId));
    try {
      const custom = localStorage.getItem('mojmaa_custom_places');
      const parsedCustom = custom ? JSON.parse(custom) : [];
      const isCustom = parsedCustom.some(p => p.id === placeId);
      
      if (isCustom) {
        const updatedCustom = parsedCustom.filter(p => p.id !== placeId);
        localStorage.setItem('mojmaa_custom_places', JSON.stringify(updatedCustom));
      } else {
        const deleted = localStorage.getItem('mojmaa_deleted_places');
        const parsedDeleted = deleted ? JSON.parse(deleted) : [];
        if (!parsedDeleted.includes(placeId)) {
          localStorage.setItem('mojmaa_deleted_places', JSON.stringify([...parsedDeleted, placeId]));
        }
      }
    } catch (e) {}
  };

  // Sync with local storage on saved ID updates
  useEffect(() => {
    try {
      localStorage.setItem('mojmaa_shortlist', JSON.stringify(savedPlaceIds));
    } catch (e) {}
  }, [savedPlaceIds]);

  // Handle saved toggles with toast animation
  const handleToggleSave = (placeId) => {
    const placeObj = placesList.find(p => p.id === placeId);
    const name = placeObj ? placeObj.name : "Place";
    
    if (savedPlaceIds.includes(placeId)) {
      setSavedPlaceIds(savedPlaceIds.filter(id => id !== placeId));
      triggerToast(`Removed "${name}" from shortlist`);
    } else {
      setSavedPlaceIds([...savedPlaceIds, placeId]);
      triggerToast(`Added "${name}" to shortlist`);
    }
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Filtered places selector
  const filteredPlaces = useMemo(() => {
    return placesList.filter(place => {
      // Category filter
      if (selectedCategory && !place.categories.includes(selectedCategory)) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, placesList]);

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-body p-6 md:p-12 max-w-7xl mx-auto w-full justify-center">
        {!isAdminUnlocked ? (
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-surface-container-low border border-outline-variant/25 text-center space-y-6 shadow-xl animate-in zoom-in duration-300 my-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">lock</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-extrabold text-2xl text-on-surface">Console Locked</h3>
              <p className="text-secondary text-xs font-body">Enter credentials to unlock cafe catalog controls.</p>
            </div>
            <form onSubmit={handlePasscodeSubmit} className="space-y-4 font-body">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider pl-1">Admin Passcode</label>
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••"
                  className="w-full px-4 py-2.5 bg-surface-container border border-outline-variant/30 text-center text-lg tracking-widest text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent font-semibold"
                  autoFocus
                />
                {passcodeError && (
                  <span className="text-primary text-[10px] pl-1 font-semibold animate-bounce mt-1 block">{passcodeError}</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-container shadow-md shadow-primary/10 hover:shadow-lg transition-all active-scale"
              >
                Unlock Catalog Controls
              </button>
            </form>
            
            <button 
              onClick={() => window.location.hash = '#/'}
              className="text-xs text-secondary hover:text-primary font-semibold underline block mx-auto mt-2"
            >
              Exit to Main App
            </button>

            <div className="text-[10px] text-secondary border-t border-outline-variant/15 pt-4">
              <span>Default developer passkey is <b>1234</b>.</span>
            </div>
          </div>
        ) : (
          <AdminDashboard 
            places={placesList}
            onAddPlace={handleAddPlace}
            onEditPlace={handleEditPlace}
            onDeletePlace={handleDeletePlace}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      
      {/* Header/Navbar */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 pb-32 max-w-7xl mx-auto px-6 w-full">
        
        {activeTab === 'discover' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Hero Header & View Mode Toggle */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 mt-2">
              <h2 className="font-serif font-bold text-3xl md:text-5xl text-on-surface tracking-tight leading-tight max-w-xl">
                What kind of experience are you looking for?
              </h2>
              
              {/* View Mode Switcher */}
              <div className="inline-flex bg-surface-container rounded-full p-1 border border-outline-variant/10 self-start md:self-end">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active-scale ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-on-primary shadow-md' 
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">grid_view</span>
                  Grid
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active-scale ${
                    viewMode === 'map' 
                      ? 'bg-primary text-on-primary shadow-md' 
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">map</span>
                  Map View
                </button>
              </div>
            </section>

            {/* Categories Scroll */}
            <CategorySelector 
              activeCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {viewMode === 'grid' ? (
              <div className="space-y-4 pt-4 animate-in fade-in duration-300">
                <h3 className="font-serif font-bold text-lg text-secondary tracking-tight">
                  {selectedCategory 
                    ? `${CATEGORIES[selectedCategory]?.emoji || '✨'} Suggested for ${CATEGORIES[selectedCategory]?.label || 'You'}`
                    : "Today's Suggestions"
                  }
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {(selectedCategory ? filteredPlaces : placesList).slice(0, 3).map(place => (
                    <PlaceCard 
                      key={place.id}
                      place={place}
                      onSelect={setSelectedPlace}
                      isSaved={savedPlaceIds.includes(place.id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-4">
                <SuratMapView 
                  places={filteredPlaces}
                  onSelectPlace={setSelectedPlace}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'moods' && (
          <MoodsView 
            onSelectCategory={setSelectedCategory}
            onTabChange={setActiveTab}
          />
        )}

        {activeTab === 'saved' && (
          <SavedPlaces 
            savedIds={savedPlaceIds}
            allPlaces={placesList}
            onSelectPlace={setSelectedPlace}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView />
        )}

      </main>

      {/* Bottom Tab Navigation Bar */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Floating Save confirmation Toast */}
      <div 
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-on-surface text-background px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-2.5 transition-all duration-500 z-[100] font-body ${
          toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
        }`}
      >
        <span className="material-symbols-outlined text-primary-fixed">check_circle</span>
        <p className="font-semibold text-xs uppercase tracking-wider">{toastMessage}</p>
      </div>

      {/* Place Detail View overlay sheet */}
      {selectedPlace && (
        <PlaceDetailModal 
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          isSaved={savedPlaceIds.includes(selectedPlace.id)}
          onToggleSave={handleToggleSave}
          allPlaces={placesList}
          onSelectPlace={setSelectedPlace}
          activeCategory={selectedCategory}
        />
      )}

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        query={searchQuery}
        onSearchChange={setSearchQuery}
        allPlaces={placesList}
        onSelectPlace={setSelectedPlace}
      />

    </div>
  );
}
