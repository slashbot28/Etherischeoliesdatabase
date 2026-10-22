import React, { useState, useEffect } from "react";
import { EssentialOil, CATEGORIES, NOTE_TYPES, STOCK_STATUSES, ALL_AROMAS, ALL_PROPERTIES, ALL_APPLICATIONS } from "../data";
import { X, Check, Plus, Trash2 } from "lucide-react";

interface OilModalProps {
  oil: EssentialOil | null;
  onClose: () => void;
  onSave: (oil: EssentialOil) => void;
}

const PRESET_COLORS = [
  { value: "#fef3c7", label: "Amber Goud" },
  { value: "#e2e8f0", label: "Titanium Zilver" },
  { value: "#f1f5f9", label: "Helder Glas" },
  { value: "#e0e7ff", label: "Lavendel Indigo" },
  { value: "#dcfce7", label: "Botanisch Salie" },
  { value: "#ffedd5", label: "Warm Balsem" },
  { value: "#fae8ff", label: "Jasmijn Roze" },
  { value: "#ecfccb", label: "Bergamot Citrus" },
];

export default function OilModal({ oil, onClose, onSave }: OilModalProps) {
  const [name, setName] = useState("");
  const [botanicalName, setBotanicalName] = useState("");
  const [category, setCategory] = useState("Kruiden");
  const [aromaProfile, setAromaProfile] = useState<string[]>([]);
  const [properties, setProperties] = useState<string[]>([]);
  const [applications, setApplications] = useState<string[]>([]);
  const [noteType, setNoteType] = useState<"Top" | "Midden" | "Basis">("Midden");
  const [safetyPrecautions, setSafetyPrecautions] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const [stock, setStock] = useState<EssentialOil["stock"]>("Voldoende");
  const [volumeMl, setVolumeMl] = useState(10);
  const [brand, setBrand] = useState("");
  const [notes, setNotes] = useState("");
  const [colorHex, setColorHex] = useState("#fef3c7");
  const [icon, setIcon] = useState("🌿");
  const [type, setType] = useState<"Natuurlijk" | "Synthetisch">("Natuurlijk");
  const [photoUrl, setPhotoUrl] = useState("");
  const [customPrecaution, setCustomPrecaution] = useState("");

  useEffect(() => {
    if (oil) {
      setName(oil.name);
      setBotanicalName(oil.botanicalName);
      setCategory(oil.category);
      setAromaProfile(oil.aromaProfile || []);
      setProperties(oil.properties || []);
      setApplications(oil.applications || []);
      setNoteType(oil.noteType);
      setSafetyPrecautions(oil.safetyPrecautions || []);
      setDescription(oil.description);
      setRating(oil.rating);
      setStock(oil.stock);
      setVolumeMl(oil.volumeMl || 10);
      setBrand(oil.brand || "");
      setNotes(oil.notes || "");
      setColorHex(oil.colorHex || "#fef3c7");
      setIcon(oil.icon || "🌿");
      setType(oil.type || "Natuurlijk");
      setPhotoUrl(oil.photoUrl || "");
    } else {
      setName("");
      setBotanicalName("");
      setCategory("Kruiden");
      setAromaProfile([]);
      setProperties([]);
      setApplications([]);
      setNoteType("Midden");
      setSafetyPrecautions([]);
      setDescription("");
      setRating(5);
      setStock("Voldoende");
      setVolumeMl(10);
      setBrand("");
      setNotes("");
      setColorHex("#fef3c7");
      setIcon("🌿");
      setType("Natuurlijk");
      setPhotoUrl("");
    }
  }, [oil]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const savedOil: EssentialOil = {
      id: oil ? oil.id : Date.now().toString(),
      name: name.trim(),
      botanicalName: botanicalName.trim() || "Onbekende botanische naam",
      category,
      aromaProfile,
      properties,
      applications,
      noteType,
      safetyPrecautions: safetyPrecautions.length > 0 ? safetyPrecautions : ["Algemeen veilig in de diffuser"],
      description: description.trim() || "Geen beschrijving opgegeven.",
      rating,
      stock,
      volumeMl: Number(volumeMl) || 10,
      brand: brand.trim() || "Artisanaal",
      notes: notes.trim(),
      colorHex,
      icon: icon.trim() || "🌿",
      type,
      photoUrl: photoUrl.trim() || undefined,
    };

    onSave(savedOil);
  };

  const toggleAroma = (aroma: string) => {
    setAromaProfile((prev) =>
      prev.includes(aroma) ? prev.filter((a) => a !== aroma) : [...prev, aroma]
    );
  };

  const toggleProperty = (prop: string) => {
    setProperties((prev) =>
      prev.includes(prop) ? prev.filter((p) => p !== prop) : [...prev, prop]
    );
  };

  const toggleApplication = (app: string) => {
    setApplications((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  };

  const addPrecaution = () => {
    if (customPrecaution.trim()) {
      setSafetyPrecautions((prev) => [...prev, customPrecaution.trim()]);
      setCustomPrecaution("");
    }
  };

  const removePrecaution = (index: number) => {
    setSafetyPrecautions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel-elevated rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden my-8 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/60 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-amber-700 mb-0.5">
              Antigravity Studio Spec
            </div>
            <h2 className="text-xl font-light tracking-tight text-slate-900">
              {oil ? "Formule Specificaties Bewerken" : "Nieuwe Olie Toevoegen"}
            </h2>
          </div>
          <button
            id="modal-close"
            onClick={onClose}
            className="w-8 h-8 rounded-xl glass-tag-floating flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={1.3} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Section 1: Algemeen */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 border-b border-white/60 pb-1">
              Basisinformatie & Herkomst
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 glass-panel p-4 rounded-2xl">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  Geurbron Classificatie
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setType("Natuurlijk")}
                    className={`flex-1 text-xs py-2 px-3 rounded-xl border transition-all ${
                      type === "Natuurlijk"
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "glass-dropdown text-slate-600"
                    }`}
                  >
                    🌿 Natuurlijk
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("Synthetisch")}
                    className={`flex-1 text-xs py-2 px-3 rounded-xl border transition-all ${
                      type === "Synthetisch"
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "glass-dropdown text-slate-600"
                    }`}
                  >
                    🧪 Synthetisch
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  Icoon Embleem
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    id="input-oil-icon"
                    type="text"
                    required
                    maxLength={4}
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="glass-dropdown w-12 text-center text-base py-1.5 rounded-xl text-slate-800 outline-none"
                  />
                  <div className="flex gap-1 items-center overflow-x-auto py-1 max-w-[200px] scrollbar-none">
                    {["🌿", "🪵", "🌸", "🍋", "🍊", "🌲", "✨", "🌾"].map((em) => (
                      <button
                        type="button"
                        key={em}
                        onClick={() => setIcon(em)}
                        className={`text-sm p-1 rounded-lg hover:scale-115 transition-transform ${
                          icon === em ? "glass-tag-floating" : ""
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Photo URL */}
            <div className="glass-panel p-4 rounded-2xl space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Aangepaste Flesje Foto URL (Optioneel)
              </label>
              <input
                id="input-oil-photo"
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... (of laat leeg voor automatische lab glass vial)"
                className="glass-dropdown w-full text-xs px-3.5 py-2 rounded-xl text-slate-800 font-mono outline-none"
              />
              <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                ✦ <span className="font-medium text-slate-600">Automatische lab vial selectie:</span> Als dit leeg blijft, koppelt het systeem automatisch een high-key laboratoriumflesje in een diffuus lichtveld.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Productnaam (Nederlands) *
                </label>
                <input
                  id="input-oil-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Bijv. Myrrh, Patchouli, Wierook, Jasmijn"
                  className="glass-dropdown w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl text-slate-800 font-normal outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Botanische (Latijnse) Naam
                </label>
                <input
                  id="input-oil-botanical"
                  type="text"
                  value={botanicalName}
                  onChange={(e) => setBotanicalName(e.target.value)}
                  placeholder="Bijv. Commiphora myrrha, Boswellia carterii"
                  className="glass-dropdown w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl text-slate-800 font-light italic outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Categorie
                </label>
                <select
                  id="input-oil-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="glass-dropdown w-full text-xs px-3 py-2 rounded-xl text-slate-700 outline-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Geurnoot Type
                </label>
                <select
                  id="input-oil-notetype"
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value as "Top" | "Midden" | "Basis")}
                  className="glass-dropdown w-full text-xs px-3 py-2 rounded-xl text-slate-700 outline-none cursor-pointer"
                >
                  {NOTE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}noot
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Voorraad Status
                </label>
                <select
                  id="input-oil-stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value as EssentialOil["stock"])}
                  className="glass-dropdown w-full text-xs px-3 py-2 rounded-xl text-slate-700 outline-none cursor-pointer"
                >
                  {STOCK_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Merk / Destilleerder
                </label>
                <input
                  id="input-oil-brand"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Bijv. Oshadhi, Chi"
                  className="glass-dropdown w-full text-xs px-3.5 py-2 rounded-xl text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Inhoud (ml)
                </label>
                <input
                  id="input-oil-volume"
                  type="number"
                  min="1"
                  max="1000"
                  value={volumeMl}
                  onChange={(e) => setVolumeMl(Number(e.target.value))}
                  className="glass-dropdown w-full text-xs px-3.5 py-2 rounded-xl text-slate-800 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Aura Tint
                </label>
                <select
                  id="preset-colors-select"
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value)}
                  className="glass-dropdown w-full text-xs px-3 py-2 rounded-xl text-slate-700 outline-none cursor-pointer"
                >
                  {PRESET_COLORS.map((col) => (
                    <option key={col.value} value={col.value}>
                      {col.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Profiel en Eigenschappen */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 border-b border-white/60 pb-1">
              Geurprofiel & Moleculaire Eigenschappen
            </h3>

            {/* Aromas */}
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                Aromaprofiel (klik om te selecteren)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ALL_AROMAS.map((aroma) => {
                  const isSelected = aromaProfile.includes(aroma);
                  return (
                    <button
                      type="button"
                      id={`btn-aroma-${aroma}`}
                      key={aroma}
                      onClick={() => toggleAroma(aroma)}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                          : "glass-tag-floating text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {aroma}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Properties */}
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                Therapeutische Werking
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-2 glass-panel rounded-xl">
                {ALL_PROPERTIES.map((prop) => {
                  const isSelected = properties.includes(prop);
                  return (
                    <button
                      type="button"
                      id={`btn-prop-${prop}`}
                      key={prop}
                      onClick={() => toggleProperty(prop)}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                        isSelected
                          ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                          : "glass-dropdown text-slate-700"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />}
                      {prop}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Applications */}
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                Toepassingen
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ALL_APPLICATIONS.map((app) => {
                  const isSelected = applications.includes(app);
                  return (
                    <button
                      type="button"
                      id={`btn-app-${app}`}
                      key={app}
                      onClick={() => toggleApplication(app)}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                        isSelected
                          ? "bg-slate-800 text-white border-slate-800"
                          : "glass-tag-floating text-slate-700"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />}
                      {app}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Beschrijving & Veiligheid */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 border-b border-white/60 pb-1">
              Omschrijving & Veiligheid
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mb-1.5">
                Karakteristieken & Botanische Achtergrond
              </label>
              <textarea
                id="input-oil-desc"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Geef hier een omschrijving van de plantgeur, de herkomst, of de specifieke therapeuthische kracht..."
                className="glass-dropdown w-full text-sm sm:text-base p-3.5 rounded-xl text-slate-800 font-normal leading-relaxed outline-none"
              ></textarea>
            </div>

            {/* Safety List Adder */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Veiligheidsadviezen
              </label>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customPrecaution}
                  onChange={(e) => setCustomPrecaution(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addPrecaution();
                    }
                  }}
                  placeholder="Bijv. Fototoxisch: vermijd direct zonlicht na applicatie"
                  className="glass-dropdown w-full text-xs px-3.5 py-2 rounded-xl text-slate-800 outline-none"
                />
                <button
                  type="button"
                  id="btn-add-precaution"
                  onClick={addPrecaution}
                  className="btn-metallic px-3 py-2 text-xs font-mono rounded-xl text-slate-700 flex items-center gap-1 flex-shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={1.4} />
                  <span>Toevoegen</span>
                </button>
              </div>

              {safetyPrecautions.length > 0 && (
                <div className="glass-panel rounded-xl divide-y divide-white/60 overflow-hidden">
                  {safetyPrecautions.map((prec, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 px-3 text-xs font-light text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        {prec}
                      </span>
                      <button
                        type="button"
                        onClick={() => removePrecaution(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.3} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Persoonlijke Notities
                </label>
                <textarea
                  id="input-oil-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Bijv. 'Prachtige harmonie met wierook'..."
                  className="glass-dropdown w-full text-xs p-3 rounded-xl text-slate-800 font-light outline-none"
                ></textarea>
              </div>

              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Waardering
                </span>
                <div className="flex items-center gap-1.5 glass-panel rounded-xl p-3 h-[68px] justify-center">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      type="button"
                      id={`modal-rating-star-${starVal}`}
                      key={starVal}
                      onClick={() => setRating(starVal)}
                      className="p-1 hover:scale-120 transition-transform"
                    >
                      <span className={`text-xl ${starVal <= rating ? "text-amber-500" : "text-slate-300"}`}>
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    {rating}/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-5 border-t border-white/60 flex items-center justify-end gap-2.5">
          <button
            type="button"
            id="modal-cancel"
            onClick={onClose}
            className="btn-metallic px-4 py-2 text-xs font-mono rounded-xl text-slate-600"
          >
            Annuleren
          </button>
          <button
            type="button"
            id="modal-submit"
            onClick={handleSubmit}
            className="btn-amber-glow px-5 py-2 text-xs font-medium rounded-xl flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>Formule Opslaan</span>
          </button>
        </div>

      </div>
    </div>
  );
}
