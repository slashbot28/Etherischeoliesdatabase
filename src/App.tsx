import { useState, useEffect, useMemo } from "react";
import {
  EssentialOil,
  INITIAL_OILS,
  CATEGORIES,
  NOTE_TYPES,
  STOCK_STATUSES,
  SUGGESTED_SYNERGIES,
  getOilPhoto,
} from "./data";
import QuickStats from "./components/QuickStats";
import OilCard from "./components/OilCard";
import OilModal from "./components/OilModal";
import SymptomFinder from "./components/SymptomFinder";
import SynergyBlends from "./components/SynergyBlends";
import {
  Search,
  Plus,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  Compass,
  LayoutGrid,
  ExternalLink,
  Download,
  X,
  Droplet,
  ShieldAlert,
} from "lucide-react";

export default function App() {
  // --- STATE CORE & PERSISTENCE ---
  const [oils, setOils] = useState<EssentialOil[]>([]);
  const [customBlends, setCustomBlends] = useState<typeof SUGGESTED_SYNERGIES>([]);
  const [activeTab, setActiveTab] = useState<"cabinet" | "symptoms" | "synergies">("cabinet");
  
  // Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOilToEdit, setSelectedOilToEdit] = useState<EssentialOil | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedNoteType, setSelectedNoteType] = useState<string>("All");
  const [selectedStock, setSelectedStock] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  // Selected single oil for the detail focus drawer/popover
  const [focusedOil, setFocusedOil] = useState<EssentialOil | null>(null);

  // Load state from localStorage on init
  useEffect(() => {
    const cachedOils = localStorage.getItem("essential_oils_db");
    const cachedBlends = localStorage.getItem("essential_custom_blends");

    if (cachedOils) {
      try {
        setOils(JSON.parse(cachedOils));
      } catch (e) {
        setOils(INITIAL_OILS);
      }
    } else {
      setOils(INITIAL_OILS);
    }

    if (cachedBlends) {
      try {
        setCustomBlends(JSON.parse(cachedBlends));
      } catch (e) {
        setCustomBlends([]);
      }
    }
  }, []);

  // Sync state helpers
  const saveOilsToStateAndCache = (newOils: EssentialOil[]) => {
    setOils(newOils);
    localStorage.setItem("essential_oils_db", JSON.stringify(newOils));
  };

  const saveBlendsToStateAndCache = (newBlends: typeof SUGGESTED_SYNERGIES) => {
    setCustomBlends(newBlends);
    localStorage.setItem("essential_custom_blends", JSON.stringify(newBlends));
  };

  // --- CRUD ACTIONS & HANDLERS ---
  const handleSaveOil = (savedOil: EssentialOil) => {
    const exists = oils.some((o) => o.id === savedOil.id);
    let updated: EssentialOil[];
    
    if (exists) {
      updated = oils.map((o) => (o.id === savedOil.id ? savedOil : o));
    } else {
      updated = [savedOil, ...oils];
    }
    
    saveOilsToStateAndCache(updated);
    setIsModalOpen(false);
    setSelectedOilToEdit(null);

    if (focusedOil && focusedOil.id === savedOil.id) {
      setFocusedOil(savedOil);
    }
  };

  const handleDeleteOil = (id: string) => {
    const oilToDelete = oils.find((o) => o.id === id);
    if (!oilToDelete) return;

    if (confirm(`Weet u zeker dat u "${oilToDelete.name}" wilt verwijderen uit uw database?`)) {
      const updated = oils.filter((o) => o.id !== id);
      saveOilsToStateAndCache(updated);
      
      if (focusedOil && focusedOil.id === id) {
        setFocusedOil(null);
      }
    }
  };

  const handleRatingChange = (id: string, newRating: number) => {
    const updated = oils.map((o) => (o.id === id ? { ...o, rating: newRating } : o));
    saveOilsToStateAndCache(updated);
  };

  const handleStockChange = (id: string, newStock: EssentialOil["stock"]) => {
    const updated = oils.map((o) => (o.id === id ? { ...o, stock: newStock } : o));
    saveOilsToStateAndCache(updated);
  };

  const handleSaveCustomBlend = (newBlend: typeof SUGGESTED_SYNERGIES[0]) => {
    const updated = [newBlend, ...customBlends];
    saveBlendsToStateAndCache(updated);
  };

  const handleDeleteCustomBlend = (name: string) => {
    if (confirm(`Wilt u het synergie recept "${name}" permanent wissen?`)) {
      const updated = customBlends.filter((b) => b.name !== name);
      saveBlendsToStateAndCache(updated);
    }
  };

  // Restore defaults
  const handleResetDatabase = () => {
    if (
      confirm(
        "Wilt u de database herstellen naar de standaard collectie? Hiermee worden uw eigen wijzigingen overschreven."
      )
    ) {
      localStorage.removeItem("essential_oils_db");
      localStorage.removeItem("essential_custom_blends");
      setOils(INITIAL_OILS);
      setCustomBlends([]);
      setFocusedOil(null);
      alert("Standaard database succesvol hersteld.");
    }
  };

  // Export current live database to CSV
  const handleDownloadCSV = () => {
    const headers = [
      'ID',
      'Naam',
      'Botanische Naam',
      'Categorie',
      'Aromaprofiel',
      'Eigenschappen',
      'Toepassingen',
      'Noottype',
      'Veiligheidsvoorschriften',
      'Beschrijving',
      'Beoordeling',
      'Voorraad',
      'Volume (ml)',
      'Merk',
      'Notities',
      'Kleur Hex',
      'Icoon',
      'Type'
    ];

    const escapeCSV = (val: any) => {
      if (val === undefined || val === null) return '';
      let str = '';
      if (Array.isArray(val)) {
        str = val.join(', ');
      } else {
        str = String(val);
      }
      str = str.replace(/"/g, '""');
      if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return `"${str}"`;
      }
      return str;
    };

    let csvContent = headers.join(',') + '\r\n';

    for (const oil of oils) {
      const row = [
        oil.id,
        oil.name,
        oil.botanicalName,
        oil.category,
        oil.aromaProfile,
        oil.properties,
        oil.applications,
        oil.noteType,
        oil.safetyPrecautions,
        oil.description,
        oil.rating,
        oil.stock,
        oil.volumeMl,
        oil.brand,
        oil.notes,
        oil.colorHex,
        oil.icon,
        oil.type
      ];
      csvContent += row.map(escapeCSV).join(',') + '\r\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "etherische_olien.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTriggerEdit = (oilToEdit: EssentialOil) => {
    setSelectedOilToEdit(oilToEdit);
    setIsModalOpen(true);
  };

  const handleTriggerAdd = () => {
    setSelectedOilToEdit(null);
    setIsModalOpen(true);
  };

  const handleSelectOilForFocussing = (oil: EssentialOil) => {
    setFocusedOil(oil);
    setActiveTab("cabinet");
    setTimeout(() => {
      document.getElementById("focused-oil-drawer")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // --- FILTER COMPUTATIONS ---
  const filteredOils = useMemo(() => {
    return oils.filter((oil) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        oil.name.toLowerCase().includes(searchLower) ||
        oil.botanicalName.toLowerCase().includes(searchLower) ||
        oil.category.toLowerCase().includes(searchLower) ||
        oil.brand.toLowerCase().includes(searchLower) ||
        oil.properties.some((p) => p.toLowerCase().includes(searchLower)) ||
        oil.aromaProfile.some((a) => a.toLowerCase().includes(searchLower));

      const matchesCategory = selectedCategory === "All" || oil.category === selectedCategory;
      const matchesNoteType = selectedNoteType === "All" || oil.noteType === selectedNoteType;
      const matchesStock = selectedStock === "All" || oil.stock === selectedStock;
      const matchesType = selectedType === "All" || oil.type === selectedType;

      return matchesSearch && matchesCategory && matchesNoteType && matchesStock && matchesType;
    });
  }, [oils, searchQuery, selectedCategory, selectedNoteType, selectedStock, selectedType]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedNoteType("All");
    setSelectedStock("All");
    setSelectedType("All");
  };

  return (
    <div className="min-h-screen text-slate-800 antialiased flex flex-col selection:bg-amber-500/20 selection:text-amber-950">
      
      {/* Delicate Metallic Top Horizon Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-400/40 via-white/80 to-transparent" />

      {/* 🌿 Main Top Floating Frosted Glass Header */}
      <header className="sticky top-0 z-40 glass-panel border-b border-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl glass-tag-floating flex items-center justify-center text-amber-700 shadow-xs relative">
              <span className="text-base select-none">✦</span>
              <div className="absolute inset-0 rounded-xl bg-amber-400/15 blur-xs pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-light tracking-[0.16em] uppercase text-slate-900">
                  Antigravity
                </h1>
                <span className="text-slate-300 font-extralight text-xs">/</span>
                <span className="text-xs sm:text-sm font-light text-slate-600 tracking-wide">
                  Etherische Oliën Studio
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 tracking-wider">
                Wetenschappelijke zuiverheid · Gewichtsloze botanische synthese
              </p>
            </div>
          </div>

          {/* Discreet Notion Reference Pill */}
          <div className="hidden lg:flex items-center gap-2 glass-tag-floating px-3 py-1.5 rounded-full text-slate-500 text-[11px] font-mono">
            <span>Notion Database Synchroon</span>
            <a
              href="https://app.notion.com/p/1d19a5d3691348d7833f9e57b5680791?v=ff5ff05aa73e4bc6a79878c121f30c71"
              target="_blank"
              rel="noreferrer"
              className="text-amber-700 hover:text-amber-800 transition-colors inline-flex items-center gap-1 font-medium"
            >
              <span>Bron</span>
              <ExternalLink className="w-3 h-3" strokeWidth={1.3} />
            </a>
          </div>

          {/* Action buttons with brushed metallic and amber glow finishes */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              id="btn-download-csv"
              onClick={handleDownloadCSV}
              className="btn-metallic px-3 py-2 rounded-xl text-xs font-mono text-slate-700 flex items-center gap-1.5"
              title="Exporteer naar .CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.3} />
              <span className="hidden sm:inline">Exporteer CSV</span>
            </button>
            <button
              id="btn-reset-db"
              onClick={handleResetDatabase}
              className="btn-metallic p-2 sm:px-3 rounded-xl text-xs font-mono text-slate-600 flex items-center gap-1.5"
              title="Herstel standaardwaarden"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.3} />
              <span className="hidden sm:inline">Herstel</span>
            </button>
            <button
              id="btn-add-oil"
              onClick={handleTriggerAdd}
              className="btn-amber-glow px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Nieuwe Olie</span>
            </button>
          </div>

        </div>
      </header>

      {/* Primary Navigation Tabs */}
      <div className="glass-panel border-b border-white/60 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1.5">
          
          <button
            id="tab-cabinet"
            onClick={() => setActiveTab("cabinet")}
            className={`flex items-center gap-2 py-2 px-4 text-xs font-medium rounded-xl transition-all ${
              activeTab === "cabinet"
                ? "glass-tag-floating text-slate-900 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>Collectie Grid ({filteredOils.length})</span>
          </button>

          <button
            id="tab-symptoms"
            onClick={() => setActiveTab("symptoms")}
            className={`flex items-center gap-2 py-2 px-4 text-xs font-medium rounded-xl transition-all ${
              activeTab === "symptoms"
                ? "glass-tag-floating text-slate-900 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
            }`}
          >
            <Compass className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>Symptoom Gids</span>
          </button>

          <button
            id="tab-synergies"
            onClick={() => setActiveTab("synergies")}
            className={`flex items-center gap-2 py-2 px-4 text-xs font-medium rounded-xl transition-all ${
              activeTab === "synergies"
                ? "glass-tag-floating text-slate-900 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>Synergie Studio</span>
          </button>

        </div>
      </div>

      {/* Main Content Stage with generous negative space */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Floating KPI Cards Banner */}
        <QuickStats oils={oils} />

        {/* Tab 1: Collection Grid */}
        {activeTab === "cabinet" && (
          <div className="space-y-6">
            
            {/* Quick Filter: Aroma Category Carousel */}
            <div className="glass-panel rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-medium text-slate-500 block">
                  ✦ Selecteer Aroma Spectrum
                </span>
                {selectedCategory !== "All" && (
                  <button 
                    onClick={() => setSelectedCategory("All")}
                    className="text-[10px] font-mono text-amber-700 hover:underline"
                  >
                    Reset spectrum
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === "All"
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white/60 text-slate-600 border-white/80 hover:bg-white/90"
                  }`}
                >
                  <span className="text-[11px]">✦</span>
                  <span>Alles tonen</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${selectedCategory === "All" ? "bg-white/20 text-white" : "bg-slate-200/60 text-slate-600"}`}>
                    {oils.length}
                  </span>
                </button>

                {[
                  { name: "Bloemen", icon: "🌸" },
                  { name: "Houtachtig", icon: "🌲" },
                  { name: "Specerijen", icon: "🌶️" },
                  { name: "Kruiden", icon: "🌿" },
                  { name: "Citrus", icon: "🍋" },
                  { name: "Muntachtig", icon: "🍃" },
                  { name: "Hars", icon: "🪵" },
                  { name: "Aards", icon: "⛰️" },
                  { name: "Medicinaal", icon: "🩺" },
                ].map((cat) => {
                  const count = oils.filter((o) => o.category.includes(cat.name)).length;
                  const isSelected = selectedCategory === cat.name;

                  return (
                    <button
                      type="button"
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-[0_2px_12px_rgba(217,119,6,0.2)]"
                          : "bg-white/60 text-slate-600 border-white/80 hover:bg-white/90"
                      }`}
                    >
                      <span className="text-[11px]">{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-slate-200/60 text-slate-600"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Section: Frosted Glass Dropdowns with Metallic Accents */}
            <div className="glass-panel rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/60 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.3} />
                  <span className="text-[10px] font-mono tracking-[0.2em] font-medium text-slate-500 uppercase">
                    Verfijnde Filtering & Zoeken
                  </span>
                </div>
                {(searchQuery || selectedCategory !== "All" || selectedNoteType !== "All" || selectedStock !== "All" || selectedType !== "All") && (
                  <button
                    id="btn-clear-filters"
                    onClick={clearAllFilters}
                    className="text-[11px] font-mono font-medium text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1"
                  >
                    <span>Wis alle filters</span>
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Discreet, intuitive search bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" strokeWidth={1.3} />
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Zoek op olienaam, botanische term, geurprofiel of werking (bv. 'Myrrh', 'Patchouli', 'kalmerend')..."
                  className="glass-dropdown w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl font-light text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Perfectly Aligned Frosted Glass Dropdowns Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                {/* Category Dropdown */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500 font-medium mb-1.5">
                    Aroma Categorie
                  </label>
                  <select
                    id="filter-category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="glass-dropdown w-full text-xs px-3 py-2 rounded-xl text-slate-700 font-normal outline-none cursor-pointer"
                  >
                    <option value="All">Alle categorieën ({CATEGORIES.length})</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Note Type Dropdown */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500 font-medium mb-1.5">
                    Geurnoot Matrix
                  </label>
                  <select
                    id="filter-notetype"
                    value={selectedNoteType}
                    onChange={(e) => setSelectedNoteType(e.target.value)}
                    className="glass-dropdown w-full text-xs px-3 py-2 rounded-xl text-slate-700 font-normal outline-none cursor-pointer"
                  >
                    <option value="All">Alle geurnoten (Top, Mid, Basis)</option>
                    {NOTE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}noot
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stock Level Dropdown */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500 font-medium mb-1.5">
                    Voorraad Status
                  </label>
                  <select
                    id="filter-stock"
                    value={selectedStock}
                    onChange={(e) => setSelectedStock(e.target.value)}
                    className="glass-dropdown w-full text-xs px-3 py-2 rounded-xl text-slate-700 font-normal outline-none cursor-pointer"
                  >
                    <option value="All">Alle voorraadniveaus</option>
                    {STOCK_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Synthesis Type Dropdown */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500 font-medium mb-1.5">
                    Zuiverheid & Herkomst
                  </label>
                  <select
                    id="filter-type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="glass-dropdown w-full text-xs px-3 py-2 rounded-xl text-slate-700 font-normal outline-none cursor-pointer"
                  >
                    <option value="All">Alle geurtypen (Natuurlijk & Synthetisch)</option>
                    <option value="Natuurlijk">🌿 Natuurlijke Essentie</option>
                    <option value="Synthetisch">🧪 Moleculaire Synthese</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Focused Detailed Drawer Panel */}
            {focusedOil && (
              <div
                id="focused-oil-drawer"
                style={{
                  borderColor: focusedOil.colorHex,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  boxShadow: `0 20px 48px -12px ${focusedOil.colorHex}35, 0 4px 12px ${focusedOil.colorHex}20`
                }}
                className="glass-panel-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-500"
              >
                <button
                  id="close-focus-panel"
                  onClick={() => setFocusedOil(null)}
                  className="absolute top-5 right-5 text-xs font-mono text-slate-500 hover:text-slate-900 glass-tag-floating px-3 py-1.5 rounded-full flex items-center gap-1 transition-all"
                >
                  <span>Sluit</span>
                  <X className="w-3.5 h-3.5" />
                </button>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Left: Matching Botanical Photo Presentation */}
                  <div className="w-full lg:w-72 flex-shrink-0 flex flex-col items-center">
                    <div 
                      style={{ borderColor: `${focusedOil.colorHex}60` }}
                      className="w-full h-64 rounded-2xl overflow-hidden relative border shadow-sm bg-slate-100"
                    >
                      <img
                        src={getOilPhoto(focusedOil)}
                        alt={focusedOil.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5">
                        <span>{focusedOil.icon || "🌿"}</span>
                        <span>{focusedOil.category}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2 w-full">
                      <button
                        id="focus-edit-btn"
                        onClick={() => handleTriggerEdit(focusedOil)}
                        className="btn-metallic flex-1 py-2 text-xs font-mono rounded-xl text-slate-700 font-medium"
                      >
                        Specificaties Aanpassen
                      </button>
                    </div>
                  </div>

                  {/* Right: Scientific Botanical & Therapeutic Details */}
                  <div className="flex-1 space-y-5">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-amber-700 mb-1">
                        <span>{focusedOil.category}</span>
                        <span>·</span>
                        <span>{focusedOil.brand || "Artisanaal"}</span>
                        <span>·</span>
                        <span>{focusedOil.noteType}noot</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-slate-900">
                        {focusedOil.name}
                      </h2>
                      <p className="text-sm text-slate-400 italic font-light tracking-wide mt-0.5">
                        {focusedOil.botanicalName}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 block font-medium">
                        Karakteristieken & Omschrijving:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed whitespace-pre-line">
                        {focusedOil.description}
                      </p>
                    </div>

                    {/* Applications & Properties */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 block font-medium">
                          Therapeutische Werking:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {focusedOil.properties.map((prop) => (
                            <span
                              key={prop}
                              className="text-[11px] font-mono text-slate-700 bg-white/70 border border-white/90 px-2.5 py-1 rounded-full shadow-2xs"
                            >
                              ✦ {prop}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 block font-medium">
                          Toepassingswijze:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {focusedOil.applications.map((app) => (
                            <span
                              key={app}
                              className="text-[11px] font-mono text-slate-700 bg-white/70 border border-white/90 px-2.5 py-1 rounded-full shadow-2xs"
                            >
                              💧 {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Safety advice */}
                    {focusedOil.safetyPrecautions.length > 0 && (
                      <div className="glass-panel p-3.5 rounded-xl space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-amber-800">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" strokeWidth={1.3} />
                          <span className="font-medium">Voorzorgsmaatregelen:</span>
                        </div>
                        <ul className="list-disc pl-5 text-[11px] text-slate-600 font-light space-y-0.5">
                          {focusedOil.safetyPrecautions.map((prec, i) => (
                            <li key={i}>{prec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Product Cards Grid: Myrrh, Patchouli, Wierook, Jasmijn */}
            {filteredOils.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
                {filteredOils.map((oil) => (
                  <OilCard
                    key={oil.id}
                    oil={oil}
                    onEdit={handleTriggerEdit}
                    onDelete={handleDeleteOil}
                    onRatingChange={handleRatingChange}
                    onStockChange={handleStockChange}
                    onFocus={handleSelectOilForFocussing}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-panel rounded-2xl p-16 text-center max-w-md mx-auto space-y-4">
                <span className="text-3xl text-slate-400 select-none">✦</span>
                <div className="space-y-1.5">
                  <h3 className="text-base font-light text-slate-900 tracking-wide">
                    Geen formules gevonden
                  </h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Geen etherische oliën voldoen aan de huidige filtercriteria. Probeer de filters aan te passen.
                  </p>
                </div>
                <button
                  id="btn-no-results-reset"
                  onClick={clearAllFilters}
                  className="btn-metallic text-xs font-mono px-5 py-2 rounded-xl text-slate-700"
                >
                  Herstel filters
                </button>
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Symptom Finder View */}
        {activeTab === "symptoms" && (
          <SymptomFinder oils={oils} onSelectOil={handleSelectOilForFocussing} />
        )}

        {/* Tab 3: Synergy Studio View */}
        {activeTab === "synergies" && (
          <SynergyBlends
            oils={oils}
            customBlends={customBlends}
            onSaveCustomBlend={handleSaveCustomBlend}
            onDeleteCustomBlend={handleDeleteCustomBlend}
          />
        )}

      </main>

      {/* 🔮 Antigravity Frosted Glass Footer */}
      <footer className="glass-panel border-t border-white/60 mt-20 py-8 text-xs font-light text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-600">✦</span>
            <p>© 2026 Antigravity Etherische Oliën Studio · Monochromatische precisie & natuurlijke diffusie</p>
          </div>
          <div className="flex gap-4 items-center font-mono text-[11px]">
            <span>Aromatherapie als holistisch welzijn</span>
            <span>·</span>
            <button
              onClick={handleResetDatabase}
              className="hover:text-amber-800 transition-colors underline"
            >
              Reset Collectie
            </button>
          </div>
        </div>
      </footer>

      {/* Add / Edit Overlay Form Modal */}
      {isModalOpen && (
        <OilModal
          oil={selectedOilToEdit}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveOil}
        />
      )}

    </div>
  );
}
