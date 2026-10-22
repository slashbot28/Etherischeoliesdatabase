import { useState, useEffect, useMemo } from "react";
import {
  EssentialOil,
  INITIAL_OILS,
  CATEGORIES,
  NOTE_TYPES,
  STOCK_STATUSES,
  SUGGESTED_SYNERGIES,
  POPULAR_ROOM_SPRAYS,
  RoomSprayRecipe,
  getOilPhoto,
  getOilFragrancePairings,
} from "./data";
import QuickStats from "./components/QuickStats";
import OilCard from "./components/OilCard";
import OilModal from "./components/OilModal";
import SymptomFinder from "./components/SymptomFinder";
import SynergyBlends from "./components/SynergyBlends";
import RoomSprayStudio from "./components/RoomSprayStudio";
import ShoppingListModal from "./components/ShoppingListModal";
import {
  auth,
  loginWithGoogle,
  logoutFirebase,
  onAuthStatusChange,
  syncUserDataToCloud,
  fetchUserCloudData,
} from "./services/firebase";
import { User } from "firebase/auth";
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
  SprayCan,
  ArrowRight,
  Sun,
  Moon,
  ShoppingCart,
  Cloud,
  Smartphone,
  LogOut,
  Check,
} from "lucide-react";

export default function App() {
  // --- STATE CORE & PERSISTENCE ---
  const [oils, setOils] = useState<EssentialOil[]>([]);
  const [customBlends, setCustomBlends] = useState<typeof SUGGESTED_SYNERGIES>([]);
  const [customRoomSprays, setCustomRoomSprays] = useState<RoomSprayRecipe[]>([]);
  const [roomsprayFocusOil, setRoomsprayFocusOil] = useState<EssentialOil | null>(null);
  const [activeTab, setActiveTab] = useState<"cabinet" | "symptoms" | "synergies" | "roomsprays">("cabinet");
  
  // Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOilToEdit, setSelectedOilToEdit] = useState<EssentialOil | null>(null);

  // Shopping List Modal
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);

  // Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // PWA Install prompt
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  // Firebase Auth & Cloud Sync
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced" | "error">("idle");

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedNoteType, setSelectedNoteType] = useState<string>("All");
  const [selectedStock, setSelectedStock] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  // Selected single oil for the detail focus drawer/popover
  const [focusedOil, setFocusedOil] = useState<EssentialOil | null>(null);

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Listen for PWA beforeinstallprompt
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Listen for Firebase Auth changes & load user cloud data
  useEffect(() => {
    const unsubscribe = onAuthStatusChange(async (user) => {
      setCurrentUser(user);
      if (user) {
        setSyncStatus("syncing");
        const cloudData = await fetchUserCloudData(user.uid);
        if (cloudData) {
          if (cloudData.oils && cloudData.oils.length > 0) {
            setOils(cloudData.oils);
            localStorage.setItem("essential_oils_db", JSON.stringify(cloudData.oils));
          }
          if (cloudData.customBlends) {
            setCustomBlends(cloudData.customBlends);
            localStorage.setItem("essential_custom_blends", JSON.stringify(cloudData.customBlends));
          }
          if (cloudData.customRoomSprays) {
            setCustomRoomSprays(cloudData.customRoomSprays);
            localStorage.setItem("essential_custom_roomsprays", JSON.stringify(cloudData.customRoomSprays));
          }
          setSyncStatus("synced");
        } else {
          // First time cloud user: upload local data
          await syncUserDataToCloud(user.uid, {
            oils: JSON.parse(localStorage.getItem("essential_oils_db") || "[]"),
            customBlends: JSON.parse(localStorage.getItem("essential_custom_blends") || "[]"),
            customRoomSprays: JSON.parse(localStorage.getItem("essential_custom_roomsprays") || "[]"),
          });
          setSyncStatus("synced");
        }
      } else {
        setSyncStatus("idle");
      }
    });
    return () => unsubscribe();
  }, []);

  // Check URL parameters for QR-code deep-linking or tab selection
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam === "roomsprays" || tabParam === "synergies" || tabParam === "symptoms" || tabParam === "cabinet") {
      setActiveTab(tabParam as any);
    }
  }, []);

  // Load state from localStorage on init
  useEffect(() => {
    const cachedOils = localStorage.getItem("essential_oils_db");
    const cachedBlends = localStorage.getItem("essential_custom_blends");
    const cachedRoomSprays = localStorage.getItem("essential_custom_roomsprays");

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

    if (cachedRoomSprays) {
      try {
        setCustomRoomSprays(JSON.parse(cachedRoomSprays));
      } catch (e) {
        setCustomRoomSprays([]);
      }
    }
  }, []);

  // Cloud sync & auth actions
  const handleLogin = async () => {
    try {
      setSyncStatus("syncing");
      await loginWithGoogle();
    } catch (err) {
      console.error("Login mislukt:", err);
      setSyncStatus("error");
    }
  };

  const handleLogout = async () => {
    await logoutFirebase();
    setCurrentUser(null);
    setSyncStatus("idle");
  };

  const handleCloudSyncNow = async () => {
    if (!currentUser) return;
    setSyncStatus("syncing");
    const success = await syncUserDataToCloud(currentUser.uid, {
      oils,
      customBlends,
      customRoomSprays,
    });
    setSyncStatus(success ? "synced" : "error");
    setTimeout(() => {
      if (success) setSyncStatus("idle");
    }, 2500);
  };

  const handleInstallPWA = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  // Sync state helpers
  const saveOilsToStateAndCache = (newOils: EssentialOil[]) => {
    setOils(newOils);
    localStorage.setItem("essential_oils_db", JSON.stringify(newOils));
    if (currentUser) {
      syncUserDataToCloud(currentUser.uid, { oils: newOils });
    }
  };

  const saveBlendsToStateAndCache = (newBlends: typeof SUGGESTED_SYNERGIES) => {
    setCustomBlends(newBlends);
    localStorage.setItem("essential_custom_blends", JSON.stringify(newBlends));
    if (currentUser) {
      syncUserDataToCloud(currentUser.uid, { customBlends: newBlends });
    }
  };

  const saveRoomSpraysToStateAndCache = (newSprays: RoomSprayRecipe[]) => {
    setCustomRoomSprays(newSprays);
    localStorage.setItem("essential_custom_roomsprays", JSON.stringify(newSprays));
    if (currentUser) {
      syncUserDataToCloud(currentUser.uid, { customRoomSprays: newSprays });
    }
  };

  const handleSaveCustomRoomSpray = (newSpray: RoomSprayRecipe) => {
    const updated = [newSpray, ...customRoomSprays];
    saveRoomSpraysToStateAndCache(updated);
  };

  const handleDeleteCustomRoomSpray = (id: string) => {
    if (confirm("Wilt u dit roomspray recept permanent wissen?")) {
      const updated = customRoomSprays.filter((s) => s.id !== id);
      saveRoomSpraysToStateAndCache(updated);
    }
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
      localStorage.removeItem("essential_custom_roomsprays");
      setOils(INITIAL_OILS);
      setCustomBlends([]);
      setCustomRoomSprays([]);
      setRoomsprayFocusOil(null);
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

          {/* Action buttons: Dark Mode, Cloud Sync, Shopping List, PWA Install, Export & Add */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            
            {/* 1. Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn-metallic p-2 rounded-xl text-amber-600 dark:text-amber-400 cursor-pointer transition-colors shadow-2xs"
              title={darkMode ? "Lichte zen-modus activeren" : "Wellness / Donkere modus activeren"}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* 2. PWA Install Button (conditional) */}
            {installPrompt && (
              <button
                onClick={handleInstallPWA}
                className="btn-metallic px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-700 dark:text-emerald-400 border-emerald-400/40 flex items-center gap-1.5 cursor-pointer shadow-2xs animate-pulse"
                title="Installeer app op je homescreen"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Installeer</span>
              </button>
            )}

            {/* 3. Cloud Sync / Google Login */}
            {currentUser ? (
              <div className="flex items-center gap-1 bg-white/60 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <button
                  onClick={handleCloudSyncNow}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
                  title={`Ingelogd als ${currentUser.email} · Klik om direct te synchroniseren`}
                >
                  <Cloud className={`w-3.5 h-3.5 ${syncStatus === "syncing" ? "animate-spin text-amber-500" : ""}`} />
                  <span className="hidden xl:inline text-[11px]">
                    {syncStatus === "syncing" ? "Syncen..." : "Gesynchroniseerd"}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                  title="Uitloggen uit Google Cloud Sync"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="btn-metallic px-3 py-1.5 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Inloggen met Google voor Cloud Synchronisatie over al je apparaten"
              >
                <Cloud className="w-3.5 h-3.5 text-sky-500" />
                <span className="hidden md:inline">Cloud Sync</span>
              </button>
            )}

            {/* 4. Smart Shopping List */}
            <button
              id="btn-shopping-list"
              onClick={() => setIsShoppingListOpen(true)}
              className="btn-metallic px-3 py-1.5 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-200 flex items-center gap-1.5 relative cursor-pointer shadow-2xs"
              title="Open Slimme Boodschappenlijst"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden md:inline">Boodschappen</span>
              {(() => {
                const count = oils.filter((o) => o.stock === "Op" || o.stock === "Bijna op" || o.stock === "Niet in bezit").length;
                return count > 0 ? (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500 text-white">
                    {count}
                  </span>
                ) : null;
              })()}
            </button>

            {/* 5. CSV Export */}
            <button
              id="btn-download-csv"
              onClick={handleDownloadCSV}
              className="btn-metallic p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              title="Exporteer naar .CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.3} />
              <span className="hidden lg:inline">CSV</span>
            </button>

            {/* 6. Reset Database */}
            <button
              id="btn-reset-db"
              onClick={handleResetDatabase}
              className="btn-metallic p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1.5"
              title="Herstel standaardwaarden"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.3} />
            </button>

            {/* 7. New Oil */}
            <button
              id="btn-add-oil"
              onClick={handleTriggerAdd}
              className="btn-amber-glow px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Nieuw</span>
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

          <button
            id="tab-roomsprays"
            onClick={() => setActiveTab("roomsprays")}
            className={`flex items-center gap-2 py-2 px-4 text-xs font-medium rounded-xl transition-all ${
              activeTab === "roomsprays"
                ? "glass-tag-floating text-slate-900 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
            }`}
          >
            <SprayCan className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>Roomspray Studio</span>
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
                      <p className="text-base text-slate-500 italic font-normal tracking-wide mt-1">
                        {focusedOil.botanicalName}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-[0.16em] text-slate-600 block font-semibold">
                        Karakteristieken & Omschrijving:
                      </span>
                      <p className="text-base text-slate-800 font-normal leading-relaxed whitespace-pre-line">
                        {focusedOil.description}
                      </p>
                    </div>

                    {/* Applications & Properties */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <span className="text-xs font-mono uppercase tracking-[0.16em] text-slate-600 block font-semibold">
                          Therapeutische Werking:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {focusedOil.properties.map((prop) => (
                            <span
                              key={prop}
                              className="text-xs font-mono text-slate-800 bg-white/80 border border-slate-200/90 px-3 py-1 rounded-full shadow-2xs font-medium"
                            >
                              ✦ {prop}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-mono uppercase tracking-[0.16em] text-slate-600 block font-semibold">
                          Toepassingswijze:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {focusedOil.applications.map((app) => (
                            <span
                              key={app}
                              className="text-xs font-mono text-slate-800 bg-white/80 border border-slate-200/90 px-3 py-1 rounded-full shadow-2xs font-medium"
                            >
                              💧 {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Safety advice */}
                    {focusedOil.safetyPrecautions.length > 0 && (
                      <div className="glass-panel p-4 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-sm font-mono text-amber-900">
                          <ShieldAlert className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
                          <span className="font-semibold uppercase tracking-wider text-xs">Voorzorgsmaatregelen:</span>
                        </div>
                        <ul className="list-disc pl-5 text-sm text-slate-700 font-normal space-y-1 leading-relaxed">
                          {focusedOil.safetyPrecautions.map((prec, i) => (
                            <li key={i}>{prec}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 🧴 Roomspray & Geurcombinaties Showcase */}
                    {(() => {
                      const oilPairings = getOilFragrancePairings(focusedOil, oils);
                      return (
                        <div className="glass-panel p-5 rounded-2xl space-y-4 border border-amber-500/20 bg-amber-500/5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
                            <div className="flex items-center gap-2">
                              <SprayCan className="w-4 h-4 text-amber-700" strokeWidth={1.5} />
                              <span className="font-semibold uppercase tracking-wider text-xs font-mono text-slate-900">
                                Roomspray Geurcombinaties met {focusedOil.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setRoomsprayFocusOil(focusedOil);
                                setActiveTab("roomsprays");
                              }}
                              className="btn-amber-glow px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                            >
                              <span>🧴 Maak Roomspray in Studio</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 block font-medium">
                              Harmonieert uitstekend met:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {oilPairings.pairings.slice(0, 4).map((p) => (
                                <div key={p.oilId} className="bg-white/70 p-2.5 rounded-xl border border-white/80 text-xs">
                                  <div className="flex items-center justify-between">
                                    <strong className="text-slate-900 font-medium">{p.name}</strong>
                                    <span className="text-[10px] font-mono text-slate-500 glass-tag-floating px-1.5 rounded">{p.noteType}noot</span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 font-light mt-1 leading-snug">{p.reason}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {oilPairings.matchingRecipes.length > 0 && (
                            <div className="pt-1">
                              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 block font-medium mb-1.5">
                                Populaire Roomsprays met deze olie:
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {oilPairings.matchingRecipes.map((rec) => (
                                  <button
                                    key={rec.id}
                                    type="button"
                                    onClick={() => {
                                      setRoomsprayFocusOil(focusedOil);
                                      setActiveTab("roomsprays");
                                    }}
                                    className="text-xs font-mono bg-white/80 hover:bg-white text-slate-800 border border-slate-200/90 px-3 py-1 rounded-full shadow-2xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                                  >
                                    <span>{rec.icon}</span>
                                    <span>{rec.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
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
                    onMakeRoomSpray={(oil) => {
                      setRoomsprayFocusOil(oil);
                      setActiveTab("roomsprays");
                    }}
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

        {/* Tab 4: Roomspray Studio View */}
        {activeTab === "roomsprays" && (
          <RoomSprayStudio
            oils={oils}
            initialOil={roomsprayFocusOil}
            onClearInitialOil={() => setRoomsprayFocusOil(null)}
            onFocusOil={handleSelectOilForFocussing}
            customRecipes={customRoomSprays}
            onSaveCustomRecipe={handleSaveCustomRoomSpray}
            onDeleteCustomRecipe={handleDeleteCustomRoomSpray}
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

      {/* Smart Shopping List & Wishlist Modal */}
      <ShoppingListModal
        isOpen={isShoppingListOpen}
        onClose={() => setIsShoppingListOpen(false)}
        oils={oils}
        onUpdateStock={(id, newStock) => handleStockChange(id, newStock)}
      />

    </div>
  );
}
