import React, { useState, useEffect } from 'react';

const CATEGORIES_CONFIG = {
  best_food: { label: "Best Food", emoji: "🍽️" },
  best_ambience: { label: "Best Ambience", emoji: "📸" },
  romantic: { label: "Romantic Date Spots", emoji: "💕" }
};
export default function AdminDashboard({ places, onAddPlace, onEditPlace, onDeletePlace }) {
  const [subTab, setSubTab] = useState('list'); // list, onboard, locations, amenities
  const [editingPlace, setEditingPlace] = useState(null);

  // Locations State
  const [locations, setLocations] = useState(() => {
    try {
      const saved = localStorage.getItem('eatopedia_locations');
      return saved ? JSON.parse(saved) : ["Vesu", "Piplod", "Adajan", "City Light", "Dumas Road", "Katargam", "Ghod Dod Rd", "Pal"];
    } catch (e) {
      return ["Vesu", "Piplod", "Adajan", "City Light", "Dumas Road", "Katargam", "Ghod Dod Rd", "Pal"];
    }
  });

  // Amenities State
  const [amenitiesList, setAmenitiesList] = useState(() => {
    try {
      const saved = localStorage.getItem('eatopedia_amenities');
      return saved ? JSON.parse(saved) : [
        { key: "wifi", label: "Fast Wi-Fi", icon: "wifi" },
        { key: "outlets", label: "Power Outlets", icon: "electrical_services" },
        { key: "pets", label: "Pet Friendly", icon: "pets" },
        { key: "parking", label: "Free Parking", icon: "local_parking" }
      ];
    } catch (e) {
      return [
        { key: "wifi", label: "Fast Wi-Fi", icon: "wifi" },
        { key: "outlets", label: "Power Outlets", icon: "electrical_services" },
        { key: "pets", label: "Pet Friendly", icon: "pets" },
        { key: "parking", label: "Free Parking", icon: "local_parking" }
      ];
    }
  });

  // Form states
  const [name, setName] = useState('');
  const [area, setArea] = useState(() => {
    try {
      const saved = localStorage.getItem('eatopedia_locations');
      const locs = saved ? JSON.parse(saved) : ["Vesu", "Piplod", "Adajan", "City Light", "Dumas Road", "Katargam", "Ghod Dod Rd", "Pal"];
      return locs[0] || '';
    } catch (e) {
      return 'Vesu';
    }
  });
  const [address, setAddress] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [explanations, setExplanations] = useState({
    best_food: '',
    best_ambience: '',
    romantic: ''
  });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [weekdaysHours, setWeekdaysHours] = useState('9:00 AM – 11:30 PM');
  const [weekendsHours, setWeekendsHours] = useState('8:30 AM – 12:00 AM');
  const [dishes, setDishes] = useState([
    { name: '', tag: 'Signature', description: '', price: '' },
    { name: '', tag: 'Beverage', description: '', price: '' },
    { name: '', tag: 'Best Seller', description: '', price: '' }
  ]);

  // Locations management states
  const [newLocation, setNewLocation] = useState('');
  const [editingLocation, setEditingLocation] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  // Amenities management form states
  const [newAmenityLabel, setNewAmenityLabel] = useState('');
  const [newAmenityIcon, setNewAmenityIcon] = useState('');
  const [editingAmenityKey, setEditingAmenityKey] = useState(null);
  const [editAmenityLabel, setEditAmenityLabel] = useState('');
  const [editAmenityIcon, setEditAmenityIcon] = useState('');

  // Load editing values when editingPlace changes
  useEffect(() => {
    if (editingPlace) {
      setName(editingPlace.name);
      setArea(editingPlace.area);
      setAddress(editingPlace.address);
      setPhotoUrl(editingPlace.photos[0] || '');
      setSelectedCategories(editingPlace.categories || []);
      setExplanations({
        best_food: editingPlace.explanation_text?.best_food || '',
        best_ambience: editingPlace.explanation_text?.best_ambience || '',
        romantic: editingPlace.explanation_text?.romantic || ''
      });
      setSelectedAmenities(editingPlace.amenities || []);
      setWeekdaysHours(editingPlace.opening_hours?.weekdays || '9:00 AM – 11:30 PM');
      setWeekendsHours(editingPlace.opening_hours?.weekends || '8:30 AM – 12:00 AM');
      
      const defaultDishes = [
        { name: '', tag: 'Signature', description: '', price: '' },
        { name: '', tag: 'Beverage', description: '', price: '' },
        { name: '', tag: 'Best Seller', description: '', price: '' }
      ];
      
      if (editingPlace.must_try_dishes && editingPlace.must_try_dishes.length > 0) {
        editingPlace.must_try_dishes.forEach((d, index) => {
          if (index < 3) {
            defaultDishes[index] = { ...d };
          }
        });
      }
      setDishes(defaultDishes);
    } else {
      // Reset form
      setName('');
      setArea(locations[0] || '');
      setAddress('');
      setPhotoUrl('');
      setSelectedCategories([]);
      setExplanations({
        best_food: '',
        best_ambience: '',
        romantic: ''
      });
      setSelectedAmenities([]);
      setWeekdaysHours('9:00 AM – 11:30 PM');
      setWeekendsHours('8:30 AM – 12:00 AM');
      setDishes([
        { name: '', tag: 'Signature', description: '', price: '' },
        { name: '', tag: 'Beverage', description: '', price: '' },
        { name: '', tag: 'Best Seller', description: '', price: '' }
      ]);
    }
  }, [editingPlace, locations]);

  const handleCategoryToggle = (catKey) => {
    if (selectedCategories.includes(catKey)) {
      setSelectedCategories(selectedCategories.filter(k => k !== catKey));
    } else {
      setSelectedCategories([...selectedCategories, catKey]);
    }
  };

  const handleExplanationChange = (catKey, text) => {
    setExplanations({
      ...explanations,
      [catKey]: text
    });
  };

  const handleAmenityToggle = (amenityKey) => {
    if (selectedAmenities.includes(amenityKey)) {
      setSelectedAmenities(selectedAmenities.filter(k => k !== amenityKey));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityKey]);
    }
  };

  const handleDishChange = (index, field, value) => {
    const updatedDishes = [...dishes];
    updatedDishes[index][field] = value;
    setDishes(updatedDishes);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert("Unsupported file format! Please upload a PNG, JPG, JPEG, or WebP image.");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const max_width = 800; // Limit image width for clean bento card layouts
          let width = img.width;
          let height = img.height;
          
          if (width > max_width) {
            height = Math.round((height * max_width) / width);
            width = max_width;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality factor
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setPhotoUrl(compressedBase64);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Please specify a cafe name.");
    if (!address.trim()) return alert("Please specify an address.");
    if (selectedCategories.length === 0) return alert("Please select at least one Vibe category.");

    const missingExpl = selectedCategories.some(cat => !explanations[cat].trim());
    if (missingExpl) return alert("Please fill out the AI explanation for all selected categories.");

    const finalPhoto = photoUrl.trim();

    const cleanExplanations = {};
    selectedCategories.forEach(cat => {
      cleanExplanations[cat] = explanations[cat].trim();
    });

    const cleanDishes = dishes.filter(d => d.name.trim() && d.price.trim());

    if (editingPlace) {
      // Handle Edit Action
      const updatedPlace = {
        ...editingPlace,
        name: name.trim(),
        area,
        address: address.trim(),
        photos: finalPhoto ? [finalPhoto] : [],
        categories: selectedCategories,
        explanation_text: cleanExplanations,
        amenities: selectedAmenities,
        opening_hours: { weekdays: weekdaysHours.trim(), weekends: weekendsHours.trim() },
        must_try_dishes: cleanDishes
      };
      
      onEditPlace(updatedPlace);
      alert(`"${name}" has been successfully updated!`);
      setEditingPlace(null);
      setSubTab('list');
    } else {
      // Handle Onboard Action
      const newPlace = {
        id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`,
        name: name.trim(),
        area,
        address: address.trim(),
        photos: finalPhoto ? [finalPhoto] : [],
        categories: selectedCategories,
        explanation_text: cleanExplanations,
        rating_count: 0,
        amenities: selectedAmenities,
        opening_hours: { weekdays: weekdaysHours.trim(), weekends: weekendsHours.trim() },
        must_try_dishes: cleanDishes,
        testimonial: { text: "Newly curated neighborhood local gem!", author: "Community Added" },
        map_photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpE_-qQIXe6oANyCvxFIdFq5BU9ipPkhJ48dqcs3HDdWGeYV6bElWpB5Jv4z4g7SY9A2Gl4OPQlesPuzkaLz4cwULgD57ppAeOv8swXwVVv2THMKGjVBvHLYJIsbZc75dW2ypnM2ypY5us1QDXT6jUTLdnbfAO2XBWSZfINzmwR7-7x4eSEZ-2Kft2o2-KkprVBDPIYZ3Kxyxo77Q9MFght2XCDXK6Qt4fVB0o0-3-EDFGZmUGoWKL"
      };

      onAddPlace(newPlace);
      alert(`"${name}" has been successfully onboarded!`);
      setSubTab('list');
    }
  };

  const handleEditTrigger = (place) => {
    setEditingPlace(place);
    setSubTab('onboard');
  };

  const handleDeleteTrigger = (placeId, placeName) => {
    if (window.confirm(`Are you sure you want to delete and de-list "${placeName}"?`)) {
      onDeletePlace(placeId);
      alert(`"${placeName}" has been successfully de-listed!`);
    }
  };

  const handleAddLocation = (e) => {
    e.preventDefault();
    const trimmed = newLocation.trim();
    if (!trimmed) return alert("Please specify a location name.");
    
    if (locations.some(loc => loc.toLowerCase() === trimmed.toLowerCase())) {
      return alert(`"${trimmed}" already exists.`);
    }

    const updated = [...locations, trimmed];
    setLocations(updated);
    try {
      localStorage.setItem('eatopedia_locations', JSON.stringify(updated));
    } catch (err) {}
    setNewLocation('');
  };

  const handleStartRename = (loc) => {
    setEditingLocation(loc);
    setRenameValue(loc);
  };

  const handleSaveRename = (oldName) => {
    const trimmed = renameValue.trim();
    if (!trimmed) return alert("Please specify a location name.");
    
    if (trimmed !== oldName && locations.some(loc => loc.toLowerCase() === trimmed.toLowerCase())) {
      return alert(`"${trimmed}" already exists.`);
    }

    const updated = locations.map(loc => loc === oldName ? trimmed : loc);
    setLocations(updated);
    try {
      localStorage.setItem('eatopedia_locations', JSON.stringify(updated));
    } catch (err) {}

    // Cascade rename to all cafés
    places.forEach(place => {
      if (place.area === oldName) {
        onEditPlace({
          ...place,
          area: trimmed
        });
      }
    });

    setEditingLocation(null);
    setRenameValue('');
    alert(`Location renamed to "${trimmed}". All associated cafés have been updated!`);
  };

  const handleDeleteLocation = (locName) => {
    const cafeCount = places.filter(p => p.area === locName).length;
    let confirmMsg = `Are you sure you want to delete "${locName}"?`;
    if (cafeCount > 0) {
      confirmMsg += `\nWarning: ${cafeCount} café(s) are currently situated in this area. They will be reassigned.`;
    }

    if (window.confirm(confirmMsg)) {
      let remaining = locations.filter(loc => loc !== locName);
      if (remaining.length === 0) {
        remaining = ['Unassigned'];
      }
      setLocations(remaining);
      try {
        localStorage.setItem('eatopedia_locations', JSON.stringify(remaining));
      } catch (err) {}

      // Cascade delete: reassign cafés to next available area
      const fallbackArea = remaining[0];
      places.forEach(place => {
        if (place.area === locName) {
          onEditPlace({
            ...place,
            area: fallbackArea
          });
        }
      });

      alert(`"${locName}" has been deleted.`);
    }
  };

  const handleAddAmenity = (e) => {
    e.preventDefault();
    const labelTrimmed = newAmenityLabel.trim();
    const iconTrimmed = newAmenityIcon.trim();
    if (!labelTrimmed || !iconTrimmed) return alert("Please specify both label and icon.");

    const key = labelTrimmed.toLowerCase().replace(/[^a-z0-9]+/g, '_');

    if (amenitiesList.some(am => am.key === key)) {
      return alert(`An amenity with identifier "${key}" already exists.`);
    }

    const updated = [...amenitiesList, { key, label: labelTrimmed, icon: iconTrimmed }];
    setAmenitiesList(updated);
    try {
      localStorage.setItem('eatopedia_amenities', JSON.stringify(updated));
    } catch (err) {}

    setNewAmenityLabel('');
    setNewAmenityIcon('');
  };

  const handleStartAmenityEdit = (am) => {
    setEditingAmenityKey(am.key);
    setEditAmenityLabel(am.label);
    setEditAmenityIcon(am.icon);
  };

  const handleSaveAmenityEdit = (key) => {
    const labelTrimmed = editAmenityLabel.trim();
    const iconTrimmed = editAmenityIcon.trim();
    if (!labelTrimmed || !iconTrimmed) return alert("Please specify both label and icon.");

    const updated = amenitiesList.map(am => am.key === key ? { ...am, label: labelTrimmed, icon: iconTrimmed } : am);
    setAmenitiesList(updated);
    try {
      localStorage.setItem('eatopedia_amenities', JSON.stringify(updated));
    } catch (err) {}

    setEditingAmenityKey(null);
    alert(`Amenity "${labelTrimmed}" has been successfully updated!`);
  };

  const handleDeleteAmenity = (key, label) => {
    if (window.confirm(`Are you sure you want to delete the amenity "${label}"?`)) {
      const updated = amenitiesList.filter(am => am.key !== key);
      setAmenitiesList(updated);
      try {
        localStorage.setItem('eatopedia_amenities', JSON.stringify(updated));
      } catch (err) {}

      // Remove this amenity from all cafés' selection lists
      places.forEach(place => {
        if (place.amenities && place.amenities.includes(key)) {
          onEditPlace({
            ...place,
            amenities: place.amenities.filter(am => am !== key)
          });
        }
      });

      alert(`"${label}" has been deleted.`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-300">
      
      {/* Left Sidebar Nav */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-5 space-y-3 shadow-sm">
          <div className="space-y-1">
            <h2 className="font-display font-extrabold text-xl tracking-tight text-on-surface">Pick My Cafe</h2>
          </div>
          <div className="space-y-1 w-full">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block border-t border-outline-variant/15 pt-2">Admin Console</span>
            <p className="text-secondary text-[11px] leading-relaxed font-body pt-1">Onboard new discoveries, revise menu cards, or configure locations.</p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-2.5 shadow-sm flex flex-col gap-1">
          <button 
            type="button"
            onClick={() => { setSubTab('list'); setEditingPlace(null); }}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all active-scale justify-start ${
              subTab === 'list' 
                ? 'bg-primary text-on-primary shadow-sm' 
                : 'text-secondary hover:text-on-surface hover:bg-surface-container-high/40'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">list</span>
            <span>Active Catalogs</span>
            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
              subTab === 'list' ? 'bg-on-primary/15 text-on-primary' : 'bg-surface-container-high text-secondary'
            }`}>{places.length}</span>
          </button>
          
          <button 
            type="button"
            onClick={() => { setSubTab('onboard'); }}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all active-scale justify-start ${
              subTab === 'onboard' 
                ? 'bg-primary text-on-primary shadow-sm' 
                : 'text-secondary hover:text-on-surface hover:bg-surface-container-high/40'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{editingPlace ? 'edit' : 'add'}</span>
            <span>{editingPlace ? 'Revise Cafe' : 'Onboard Cafe'}</span>
          </button>

          <button 
            type="button"
            onClick={() => { setSubTab('locations'); setEditingPlace(null); }}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all active-scale justify-start ${
              subTab === 'locations' 
                ? 'bg-primary text-on-primary shadow-sm' 
                : 'text-secondary hover:text-on-surface hover:bg-surface-container-high/40'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <span>Area Configuration</span>
            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
              subTab === 'locations' ? 'bg-on-primary/15 text-on-primary' : 'bg-surface-container-high text-secondary'
            }`}>{locations.length}</span>
          </button>

          <button 
            type="button"
            onClick={() => { setSubTab('amenities'); setEditingPlace(null); }}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all active-scale justify-start ${
              subTab === 'amenities' 
                ? 'bg-primary text-on-primary shadow-sm' 
                : 'text-secondary hover:text-on-surface hover:bg-surface-container-high/40'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            <span>Manage Amenities</span>
            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
              subTab === 'amenities' ? 'bg-on-primary/15 text-on-primary' : 'bg-surface-container-high text-secondary'
            }`}>{amenitiesList.length}</span>
          </button>
        </nav>

        {/* Data Backup Card */}
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-5 space-y-3 shadow-sm">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-primary uppercase tracking-wider block">Deploy Permanently</span>
            <p className="text-secondary text-[10px] leading-relaxed font-body">
              Onboarded spots are stored in your local browser. Copy the database JSON and paste it to me in the chat to save them forever.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => {
              const exportData = {
                customPlaces: JSON.parse(localStorage.getItem('mojmaa_custom_places') || '[]'),
                editedDefaults: JSON.parse(localStorage.getItem('mojmaa_edited_default_places') || '[]'),
                deletedPlaces: JSON.parse(localStorage.getItem('mojmaa_deleted_places') || '[]'),
                locations: JSON.parse(localStorage.getItem('eatopedia_locations') || '[]'),
                amenities: JSON.parse(localStorage.getItem('eatopedia_amenities') || '[]')
              };
              navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
              alert("Database copied to clipboard! Paste this JSON to me in our chat to deploy it permanently.");
            }}
            className="w-full py-2 bg-secondary/10 hover:bg-secondary/20 text-on-surface hover:text-primary rounded-xl text-[10px] font-bold transition-all active-scale flex items-center justify-center gap-1.5 border border-outline-variant/25"
          >
            <span className="material-symbols-outlined text-[15px]">content_copy</span>
            <span>Copy Database JSON</span>
          </button>
        </div>

        {/* Exit Card */}
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-3 shadow-sm">
          <button 
            type="button"
            onClick={() => window.location.hash = '#/'}
            className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-on-primary rounded-2xl text-xs font-bold transition-all active-scale flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Exit to Main App</span>
          </button>
        </div>
      </aside>

      {/* Right Content Pane */}
      <div className="flex-1 min-w-0">

        {subTab === 'list' && (
        /* ACTIVE PLACES LIST VIEW */
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl overflow-hidden shadow-sm">
          
          {places.length === 0 ? (
            <div className="p-12 text-center text-secondary font-body space-y-2">
              <span className="material-symbols-outlined text-4xl text-primary/30">storefront</span>
              <p className="font-bold">No Cafes Registered</p>
              <p className="text-xs">Select the "Onboard Cafe" tab above to add the first neighborhood spot.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-body">
                <thead>
                  <tr className="bg-surface-container text-secondary font-bold uppercase tracking-wider text-[10px] border-b border-outline-variant/15">
                    <th className="p-4 pl-6">Cafe</th>
                    <th className="p-4">Neighborhood</th>
                    <th className="p-4">Vibe Categories</th>
                    <th className="p-4">Source</th>
                    <th className="p-4 text-right pr-6">Catalog Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {places.map(place => {
                    const isCustom = place.id.includes('-');
                    return (
                      <tr key={place.id} className="hover:bg-surface-container/30 transition-colors">
                        {/* Cafe thumbnail & Name */}
                        <td className="p-4 pl-6 flex items-center gap-3.5 min-w-[200px]">
                          <div className="w-11 h-11 rounded-lg overflow-hidden bg-surface-container flex items-center justify-center flex-shrink-0 text-secondary-container-highest">
                            {place.photos && place.photos.length > 0 ? (
                              <img src={place.photos[0]} alt={place.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-[18px]">storefront</span>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-on-surface text-sm block">{place.name}</span>
                            <span className="text-[10px] text-secondary-container-highest mt-0.5 block truncate max-w-[200px]">{place.address}</span>
                          </div>
                        </td>

                        {/* Neighborhood */}
                        <td className="p-4">
                          <span className="bg-surface-container-high text-on-surface font-semibold px-2.5 py-1 rounded-full">{place.area}</span>
                        </td>

                        {/* Moods tags */}
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {place.categories.map(cat => (
                              <span key={cat} title={CATEGORIES_CONFIG[cat]?.label} className="text-sm">
                                {CATEGORIES_CONFIG[cat]?.emoji}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Source details */}
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            isCustom 
                              ? 'bg-primary/10 text-primary border border-primary/20' 
                              : 'bg-secondary/15 text-secondary border border-outline-variant/10'
                          }`}>
                            {isCustom ? 'Custom Onboarded' : 'Original Catalog'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right pr-6 whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2.5">
                            <button 
                              onClick={() => handleEditTrigger(place)}
                              className="px-3.5 py-1.5 bg-background border border-outline-variant/30 text-secondary hover:text-primary rounded-xl font-bold transition-all active-scale"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteTrigger(place.id, place.name)}
                              className="px-3.5 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-on-primary rounded-xl font-bold transition-all active-scale"
                            >
                              Delete
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {subTab === 'onboard' && (
        /* ADD & ONBOARD FORM CARD VIEW */
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 shadow-sm max-w-3xl mx-auto">
          
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="font-display font-extrabold text-xl text-primary tracking-tight">
                {editingPlace ? `Revise "${editingPlace.name}"` : 'Onboard New Cafe'}
              </h3>
              <p className="text-secondary text-xs mt-0.5 font-body">
                {editingPlace ? 'Modify existing properties' : 'Submit a fresh dining location'}
              </p>
            </div>
            {editingPlace && (
              <button 
                onClick={() => setEditingPlace(null)}
                className="text-xs text-primary font-bold hover:underline"
              >
                Reset to Create Mode
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 font-body text-xs">
            
            {/* Section 1: Basic details */}
            <section className="space-y-3.5">
              <h4 className="font-display font-bold text-sm text-on-surface border-b border-outline-variant/15 pb-1">Basic Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-wider">Cafe Name *</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. The Terracotta Room"
                    className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-wider">Neighborhood *</label>
                  <select 
                    value={area} 
                    onChange={(e) => setArea(e.target.value)}
                    className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                  >
                    {locations.map(ar => (
                      <option key={ar} value={ar}>{ar}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-wider">Street Address *</label>
                  <input 
                    type="text" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="GF, Capital Galleria, Dumas Road, Surat"
                    className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                    required
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block">Cafe Photo</label>
                  {photoUrl ? (
                    /* Show preview if image is loaded (e.g. custom base64 or preloaded string) */
                    <div className="flex items-center gap-4 bg-surface-container border border-outline-variant/20 p-3 rounded-2xl animate-in zoom-in duration-300">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-high flex-shrink-0">
                        <img src={photoUrl} alt="Upload preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Photo Selected</span>
                        <span className="text-[9px] text-secondary block mt-0.5 truncate">Ready for catalog integration.</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setPhotoUrl('')}
                        className="px-3.5 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-on-primary rounded-xl font-bold transition-all active-scale text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    /* File input dropper box */
                    <div className="flex items-center justify-center w-full animate-in fade-in duration-300">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-outline-variant/30 border-dashed rounded-2xl cursor-pointer bg-surface-container hover:bg-surface-container-high transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <span className="material-symbols-outlined text-secondary text-[28px] mb-2">upload_file</span>
                          <p className="mb-1 text-xs font-semibold text-on-surface">Click to upload photo</p>
                          <p className="text-[9px] text-secondary">PNG, JPG, JPEG or WEBP (Max 1.5MB)</p>
                        </div>
                        <input 
                          type="file" 
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          onChange={handleFileChange}
                          className="hidden" 
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Section 2: Vibes & Explanations */}
            <section className="space-y-3.5">
              <h4 className="font-display font-bold text-sm text-on-surface border-b border-outline-variant/15 pb-1">Vibe Categories & Explanations *</h4>
              <p className="text-[10px] text-secondary italic">Select the category matches and write custom explanations.</p>
              
              <div className="space-y-3">
                {Object.entries(CATEGORIES_CONFIG).map(([key, config]) => {
                  const isSelected = selectedCategories.includes(key);
                  return (
                    <div key={key} className={`p-4 rounded-2xl border transition-colors ${
                      isSelected ? 'bg-surface-container/60 border-primary/20' : 'bg-surface-container-low border-outline-variant/20'
                    }`}>
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-on-surface">
                        <input 
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleCategoryToggle(key)}
                          className="w-4 h-4 text-primary bg-background border-outline-variant/30 rounded focus:ring-primary"
                        />
                        <span>{config.emoji}</span>
                        <span>{config.label}</span>
                      </label>

                      {isSelected && (
                        <div className="mt-3.5 flex flex-col gap-1 animate-in fade-in duration-300">
                          <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Insider description *</label>
                          <textarea
                            value={explanations[key]}
                            onChange={(e) => handleExplanationChange(key, e.target.value)}
                            placeholder={`Detail why this cafe fits "${config.label}" (e.g. ambient lighting, sound level, unique layout)...`}
                            rows={2}
                            className="p-2.5 bg-background border border-outline-variant/30 text-on-surface placeholder-secondary/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs leading-relaxed"
                            required={isSelected}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 3: Amenities & Hours */}
            <section className="space-y-3.5">
              <h4 className="font-display font-bold text-sm text-on-surface border-b border-outline-variant/15 pb-1">Amenities & Opening Hours</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block">Select Amenities</label>
                  <div className="grid grid-cols-2 gap-2">
                    {amenitiesList.map(am => (
                      <label key={am.key} className="flex items-center gap-1.5 cursor-pointer text-xs text-on-surface-variant hover:text-on-surface">
                        <input 
                          type="checkbox"
                          checked={selectedAmenities.includes(am.key)}
                          onChange={() => handleAmenityToggle(am.key)}
                          className="w-4 h-4 text-primary bg-background border-outline-variant/30 rounded focus:ring-primary"
                        />
                        {am.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider">Weekday Hours</label>
                    <input 
                      type="text"
                      value={weekdaysHours}
                      onChange={(e) => setWeekdaysHours(e.target.value)}
                      className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider">Weekend Hours</label>
                    <input 
                      type="text"
                      value={weekendsHours}
                      onChange={(e) => setWeekendsHours(e.target.value)}
                      className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* Section 4: Signature Eats */}
            <section className="space-y-3.5">
              <h4 className="font-display font-bold text-sm text-on-surface border-b border-outline-variant/15 pb-1">Signature "Must-Try Eats" Menu</h4>
              <p className="text-[10px] text-secondary italic">Define signature dishes to showcase on the details bento box.</p>
              
              <div className="space-y-4">
                {dishes.map((dish, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/15 space-y-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">{i+1}</span>
                      <span className="font-bold text-[10px] text-on-surface uppercase tracking-wider">Signature Item #{i+1}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-5 flex flex-col gap-1">
                        <input 
                          type="text"
                          value={dish.name}
                          onChange={(e) => handleDishChange(i, 'name', e.target.value)}
                          placeholder="Dish name (e.g. Avocado Toast)"
                          className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                        />
                      </div>
                      
                      <div className="sm:col-span-4 flex flex-col gap-1">
                        <select 
                          value={dish.tag}
                          onChange={(e) => handleDishChange(i, 'tag', e.target.value)}
                          className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                        >
                          <option value="Signature">Signature</option>
                          <option value="Fusion">Fusion</option>
                          <option value="Beverage">Beverage</option>
                          <option value="Dessert">Dessert</option>
                          <option value="Best Seller">Best Seller</option>
                          <option value="Healthy">Healthy</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3 flex flex-col gap-1">
                        <input 
                          type="text"
                          value={dish.price}
                          onChange={(e) => handleDishChange(i, 'price', e.target.value)}
                          placeholder="Price (e.g. ₹280)"
                          className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                        />
                      </div>

                      <div className="sm:col-span-12 flex flex-col gap-1">
                        <input 
                          type="text"
                          value={dish.description}
                          onChange={(e) => handleDishChange(i, 'description', e.target.value)}
                          placeholder="Short mouth-watering description..."
                          className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-outline-variant/20">
              <button 
                type="button" 
                onClick={() => { setSubTab('list'); setEditingPlace(null); }}
                className="flex-1 py-3 bg-surface-container text-secondary font-bold rounded-xl hover:bg-surface-container-high transition-colors text-center active-scale"
              >
                Cancel
              </button>
              
              <button 
                type="submit"
                className="flex-1 py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-container shadow-lg shadow-primary/10 hover:shadow-xl transition-all text-center active-scale"
              >
                {editingPlace ? 'Save Changes' : 'Onboard Cafe'}
              </button>
            </div>

          </form>

        </div>
      )}

      {subTab === 'locations' && (
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 shadow-sm max-w-2xl mx-auto space-y-6">
          <div>
            <h3 className="font-display font-extrabold text-xl text-primary tracking-tight">Manage Locations</h3>
            <p className="text-secondary text-xs mt-0.5 font-body">Create, rename, or delete local neighborhood locations. Renaming will automatically update all mapped cafés.</p>
          </div>

          {/* Add Location Form */}
          <form onSubmit={handleAddLocation} className="flex gap-2.5 items-end bg-surface-container/30 p-4 rounded-2xl border border-outline-variant/10">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-wider">New Location Name</label>
              <input 
                type="text" 
                value={newLocation} 
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="e.g. Ring Road"
                className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                required
              />
            </div>
            <button 
              type="submit"
              className="px-5 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold transition-all active-scale hover:bg-primary-container h-[34px]"
            >
              Add Area
            </button>
          </form>

          {/* Locations List */}
          <div className="border border-outline-variant/15 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs font-body">
              <thead>
                <tr className="bg-surface-container text-secondary font-bold uppercase tracking-wider text-[10px] border-b border-outline-variant/15">
                  <th className="p-4 pl-6">Location Area</th>
                  <th className="p-4">Active Cafés</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {locations.map(loc => {
                  const cafeCount = places.filter(p => p.area === loc).length;
                  const isEditing = editingLocation === loc;

                  return (
                    <tr key={loc} className="hover:bg-surface-container/30 transition-colors">
                      <td className="p-4 pl-6">
                        {isEditing ? (
                          <input 
                            type="text"
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            className="px-3 py-1 bg-surface-container border border-outline-variant/35 text-on-surface rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs w-full max-w-[200px]"
                            required
                          />
                        ) : (
                          <span className="font-bold text-on-surface text-sm">{loc}</span>
                        )}
                      </td>
                      <td className="p-4 text-secondary font-medium">
                        {cafeCount} café{cafeCount !== 1 ? 's' : ''}
                      </td>
                      <td className="p-4 text-right pr-6 whitespace-nowrap">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              type="button"
                              onClick={() => handleSaveRename(loc)}
                              className="px-3 py-1.5 bg-primary text-on-primary rounded-xl font-bold transition-all active-scale"
                            >
                              Save
                            </button>
                            <button 
                              type="button"
                              onClick={() => setEditingLocation(null)}
                              className="px-3 py-1.5 bg-surface-container text-secondary rounded-xl font-bold transition-all active-scale"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              type="button"
                              onClick={() => handleStartRename(loc)}
                              className="px-3 py-1.5 bg-background border border-outline-variant/30 text-secondary hover:text-primary rounded-xl font-bold transition-all active-scale"
                            >
                              Rename
                            </button>
                            <button 
                              type="button"
                              onClick={() => handleDeleteLocation(loc)}
                              className="px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-on-primary rounded-xl font-bold transition-all active-scale"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'amenities' && (
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 shadow-sm max-w-2xl mx-auto space-y-6">
          <div>
            <h3 className="font-display font-extrabold text-xl text-primary tracking-tight">Manage Amenities</h3>
            <p className="text-secondary text-xs mt-0.5 font-body">Create, configure, or delete café amenities. These will appear as selection choices when onboarding cafés.</p>
          </div>

          {/* Add Amenity Form */}
          <form onSubmit={handleAddAmenity} className="bg-surface-container/30 p-4 rounded-2xl border border-outline-variant/10 space-y-3.5">
            <h4 className="font-bold text-[10px] text-primary uppercase tracking-wider block">Add New Amenity</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider">Amenity Label *</label>
                <input 
                  type="text" 
                  value={newAmenityLabel} 
                  onChange={(e) => setNewAmenityLabel(e.target.value)}
                  placeholder="e.g. Live Music"
                  className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider">Material Icon Code *</label>
                <input 
                  type="text" 
                  value={newAmenityIcon} 
                  onChange={(e) => setNewAmenityIcon(e.target.value)}
                  placeholder="e.g. music_note, deck, child_care"
                  className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-2 bg-primary text-on-primary rounded-xl text-xs font-bold transition-all active-scale hover:bg-primary-container h-[34px]"
            >
              Add Amenity
            </button>
          </form>

          {/* Amenities List */}
          <div className="border border-outline-variant/15 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs font-body">
              <thead>
                <tr className="bg-surface-container text-secondary font-bold uppercase tracking-wider text-[10px] border-b border-outline-variant/15">
                  <th className="p-4 pl-6">Icon</th>
                  <th className="p-4">Amenity Name</th>
                  <th className="p-4">Key Identifier</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {amenitiesList.map(am => {
                  const isEditing = editingAmenityKey === am.key;

                  return (
                    <tr key={am.key} className="hover:bg-surface-container/30 transition-colors">
                      <td className="p-4 pl-6">
                        <span className="material-symbols-outlined text-[20px] text-secondary">{isEditing ? editAmenityIcon : am.icon}</span>
                      </td>
                      <td className="p-4">
                        {isEditing ? (
                          <div className="space-y-2">
                            <input 
                              type="text"
                              value={editAmenityLabel}
                              onChange={(e) => setEditAmenityLabel(e.target.value)}
                              className="px-3 py-1 bg-surface-container border border-outline-variant/35 text-on-surface rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs w-full max-w-[200px]"
                              required
                            />
                            <input 
                              type="text"
                              value={editAmenityIcon}
                              onChange={(e) => setEditAmenityIcon(e.target.value)}
                              className="px-3 py-1 bg-surface-container border border-outline-variant/35 text-on-surface rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs w-full max-w-[200px] block"
                              required
                            />
                          </div>
                        ) : (
                          <span className="font-bold text-on-surface text-sm">{am.label}</span>
                        )}
                      </td>
                      <td className="p-4 text-secondary font-mono text-[10px]">{am.key}</td>
                      <td className="p-4 text-right pr-6 whitespace-nowrap">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              type="button"
                              onClick={() => handleSaveAmenityEdit(am.key)}
                              className="px-3 py-1.5 bg-primary text-on-primary rounded-xl font-bold transition-all active-scale"
                            >
                              Save
                            </button>
                            <button 
                              type="button"
                              onClick={() => setEditingAmenityKey(null)}
                              className="px-3 py-1.5 bg-surface-container text-secondary rounded-xl font-bold transition-all active-scale"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              type="button"
                              onClick={() => handleStartAmenityEdit(am)}
                              className="px-3 py-1.5 bg-background border border-outline-variant/30 text-secondary hover:text-primary rounded-xl font-bold transition-all active-scale"
                            >
                              Edit
                            </button>
                            <button 
                              type="button"
                              onClick={() => handleDeleteAmenity(am.key, am.label)}
                              className="px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-on-primary rounded-xl font-bold transition-all active-scale"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
