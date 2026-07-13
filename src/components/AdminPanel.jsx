import React, { useState } from 'react';

const AREAS = ["Vesu", "Piplod", "Adajan", "City Light", "Dumas Road"];
const CATEGORIES_CONFIG = {
  best_food: { label: "Best Food", emoji: "🍽️" },
  best_ambience: { label: "Best Ambience", emoji: "📸" },
  romantic: { label: "Romantic Date Spots", emoji: "💕" },
  friends_family: { label: "Hangout with Friends/Family", emoji: "👨‍👩‍👧" }
};
const AMENITIES_LIST = [
  { key: "wifi", label: "Fast Wi-Fi" },
  { key: "outlets", label: "Power Outlets" },
  { key: "pets", label: "Pet Friendly" },
  { key: "parking", label: "Free Parking" }
];

export default function AdminPanel({ onAddPlace, onClose }) {
  // Form states
  const [name, setName] = useState('');
  const [area, setArea] = useState('Vesu');
  const [address, setAddress] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [explanations, setExplanations] = useState({
    best_food: '',
    best_ambience: '',
    romantic: '',
    friends_family: ''
  });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [weekdaysHours, setWeekdaysHours] = useState('9:00 AM – 11:30 PM');
  const [weekendsHours, setWeekendsHours] = useState('8:30 AM – 12:00 AM');
  
  // 3 Dishes states
  const [dishes, setDishes] = useState([
    { name: '', tag: 'Signature', description: '', price: '' },
    { name: '', tag: 'Beverage', description: '', price: '' },
    { name: '', tag: 'Best Seller', description: '', price: '' }
  ]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!name.trim()) return alert("Please specify a cafe name.");
    if (!address.trim()) return alert("Please specify a street address.");
    if (selectedCategories.length === 0) return alert("Please check at least one vibe category.");
    
    const missingExpl = selectedCategories.some(cat => !explanations[cat].trim());
    if (missingExpl) return alert("Please fill out the AI explanation for all selected categories.");

    // Fallback photo
    const finalPhoto = photoUrl.trim() || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80";

    // Clean explanations
    const cleanExplanations = {};
    selectedCategories.forEach(cat => {
      cleanExplanations[cat] = explanations[cat].trim();
    });

    // Clean dishes (remove empty slots)
    const cleanDishes = dishes.filter(d => d.name.trim() && d.price.trim());

    const newPlace = {
      id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      area,
      address: address.trim(),
      photos: [finalPhoto],
      categories: selectedCategories,
      explanation_text: cleanExplanations,
      rating_count: 0,
      amenities: selectedAmenities,
      opening_hours: { weekdays: weekdaysHours.trim(), weekends: weekendsHours.trim() },
      must_try_dishes: cleanDishes,
      testimonial: { text: "Newly curated local neighborhood gem in Surat!", author: "Community Added" },
      map_photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpE_-qQIXe6oANyCvxFIdFq5BU9ipPkhJ48dqcs3HDdWGeYV6bElWpB5Jv4z4g7SY9A2Gl4OPQlesPuzkaLz4cwULgD57ppAeOv8swXwVVv2THMKGjVBvHLYJIsbZc75dV2ypnM2ypY5us1QDXT6jUTLdnbfAO2XBWSZfINzmwR7-7x4eSEZ-2Kft2o2-KkprVBDPIYZ3Kxyxo77Q9MFght2XCDXK6Qt4fVB0o0-3-EDFGZmUGoWKL"
    };

    onAddPlace(newPlace);
    alert(`"${name}" has been successfully added to Pick My Cafe discovery list!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-on-surface/50 backdrop-blur-sm p-0 sm:p-4">
      {/* Backdrop closing panel */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Form Container */}
      <div className="relative w-full max-w-2xl h-full sm:h-[92vh] bg-background rounded-none sm:rounded-3xl overflow-y-auto z-10 flex flex-col border border-outline-variant/20 shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Sticky Header */}
        <header className="sticky top-0 bg-background/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-outline-variant/20 z-20">
          <div>
            <h3 className="font-display font-extrabold text-xl text-primary tracking-tight">Add New Surat Cafe</h3>
            <p className="text-secondary text-xs font-body mt-0.5">Publish a spot to the local discover feed</p>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-primary active-scale transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </header>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-8 font-body text-sm">
          
          {/* Section 1: Basic Details */}
          <section className="space-y-4">
            <h4 className="font-display font-bold text-base text-on-surface border-b border-outline-variant/15 pb-1">Basic Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Cafe Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. NBC Cafe"
                  className="px-4 py-2.5 bg-surface-container border border-outline-variant/30 text-on-surface placeholder-secondary/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Neighborhood Area *</label>
                <select 
                  value={area} 
                  onChange={(e) => setArea(e.target.value)}
                  className="px-4 py-2.5 bg-surface-container border border-outline-variant/30 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm"
                >
                  {AREAS.map(ar => (
                    <option key={ar} value={ar}>{ar}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Street Address *</label>
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. GF, ICC Building, Vesu Main Road, Surat"
                  className="px-4 py-2.5 bg-surface-container border border-outline-variant/30 text-on-surface placeholder-secondary/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm"
                  required
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Photo Image URL</label>
                <input 
                  type="url" 
                  value={photoUrl} 
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="px-4 py-2.5 bg-surface-container border border-outline-variant/30 text-on-surface placeholder-secondary/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm"
                />
                <span className="text-[10px] text-secondary italic">Leave empty to use a high-quality default cafe photo.</span>
              </div>
            </div>
          </section>

          {/* Section 2: Mood Categories & Explanations */}
          <section className="space-y-4">
            <h4 className="font-display font-bold text-base text-on-surface border-b border-outline-variant/15 pb-1">Vibe Categories & Insider Insights</h4>
            <p className="text-xs text-secondary italic">Check all categories that describe this spot, and explain why.</p>
            
            <div className="space-y-4">
              {Object.entries(CATEGORIES_CONFIG).map(([key, config]) => {
                const isSelected = selectedCategories.includes(key);
                return (
                  <div key={key} className={`p-4 rounded-2xl border transition-colors ${
                    isSelected ? 'bg-surface-container border-primary/20' : 'bg-surface-container-low border-outline-variant/20'
                  }`}>
                    <label className="flex items-center gap-2.5 cursor-pointer font-bold text-on-surface">
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
                      <div className="mt-3 flex flex-col gap-1.5 animate-in fade-in duration-300">
                        <label className="text-xs font-semibold text-primary uppercase tracking-wider">Insider Explanation (Why it fits this Vibe) *</label>
                        <textarea
                          value={explanations[key]}
                          onChange={(e) => handleExplanationChange(key, e.target.value)}
                          placeholder={`Explain why this is a great match for "${config.label}" (e.g. cozy corners, signature dishes, rustic terracotta tiles)...`}
                          rows={3}
                          className="p-3 bg-background border border-outline-variant/30 text-on-surface placeholder-secondary/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs leading-relaxed"
                          required={isSelected}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Amenities & Operating Hours */}
          <section className="space-y-4">
            <h4 className="font-display font-bold text-base text-on-surface border-b border-outline-variant/15 pb-1">Amenities & Hours</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Amenities Available</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {AMENITIES_LIST.map(am => (
                    <label key={am.key} className="flex items-center gap-2 cursor-pointer text-xs font-medium text-on-surface-variant hover:text-on-surface">
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

              <div className="space-y-3.5">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Weekday Hours</label>
                  <input 
                    type="text"
                    value={weekdaysHours}
                    onChange={(e) => setWeekdaysHours(e.target.value)}
                    className="px-3.5 py-2 bg-surface-container border border-outline-variant/30 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Weekend Hours</label>
                  <input 
                    type="text"
                    value={weekendsHours}
                    onChange={(e) => setWeekendsHours(e.target.value)}
                    className="px-3.5 py-2 bg-surface-container border border-outline-variant/30 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Must-Try Eats (Menu Selection) */}
          <section className="space-y-4">
            <h4 className="font-display font-bold text-base text-on-surface border-b border-outline-variant/15 pb-1">Signature Must-Try Eats</h4>
            <p className="text-xs text-secondary italic">Define up to 3 signature dishes or drinks for this place.</p>
            
            <div className="space-y-5">
              {dishes.map((dish, i) => (
                <div key={i} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/15 space-y-3.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{i+1}</span>
                    <span className="font-bold text-xs text-on-surface uppercase tracking-wider">Signature Item #{i+1}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5 flex flex-col gap-1">
                      <input 
                        type="text"
                        value={dish.name}
                        onChange={(e) => handleDishChange(i, 'name', e.target.value)}
                        placeholder="Item name (e.g. Avocado Toast)"
                        className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface placeholder-secondary/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
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
                        className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface placeholder-secondary/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                      />
                    </div>
                    <div className="sm:col-span-12 flex flex-col gap-1">
                      <input 
                        type="text"
                        value={dish.description}
                        onChange={(e) => handleDishChange(i, 'description', e.target.value)}
                        placeholder="Short mouth-watering description (ingredients, cooking method, presentation)..."
                        className="px-3 py-2 bg-surface-container border border-outline-variant/35 text-on-surface placeholder-secondary/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Form Actions */}
          <div className="pt-6 border-t border-outline-variant/20 flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 bg-surface-container text-secondary font-semibold rounded-xl hover:bg-surface-container-high active-scale transition-colors text-center"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-primary text-on-primary font-semibold rounded-xl hover:bg-primary-container shadow-lg shadow-primary/10 hover:shadow-xl active-scale transition-all text-center"
            >
              Add Cafe
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
