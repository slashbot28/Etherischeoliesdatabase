import React, { useState, useEffect, useMemo } from "react";
import {
  EssentialOil,
  POPULAR_ROOM_SPRAYS,
  RoomSprayRecipe,
  calculateRoomSpray,
  getOilFragrancePairings,
  getOilPhoto,
} from "../data";
import FragrancePyramid, { PyramidIngredient } from "./FragrancePyramid";
import PrintableLabelModal from "./PrintableLabelModal";
import { findOilSubstitutes } from "../utils/substitutionEngine";
import {
  SprayCan,
  Droplet,
  Sparkles,
  Info,
  Check,
  Copy,
  Printer,
  Trash2,
  BookmarkPlus,
  Compass,
  Sliders,
  ShieldAlert,
  ArrowRight,
  Flame,
  Search,
  CheckCircle2,
  RefreshCw,
  Plus,
  QrCode
} from "lucide-react";

interface RoomSprayStudioProps {
  oils: EssentialOil[];
  initialOil?: EssentialOil | null;
  onClearInitialOil?: () => void;
  onFocusOil?: (oil: EssentialOil) => void;
  customRecipes: RoomSprayRecipe[];
  onSaveCustomRecipe: (recipe: RoomSprayRecipe) => void;
  onDeleteCustomRecipe: (id: string) => void;
}

export default function RoomSprayStudio({
  oils,
  initialOil,
  onClearInitialOil,
  onFocusOil,
  customRecipes,
  onSaveCustomRecipe,
  onDeleteCustomRecipe,
}: RoomSprayStudioProps) {
  // Navigation sub-views: "calculator" (Flesje Mixer), "recipes" (Populaire Recepten), "pairings" (Geurcombinaties per olie)
  const [activeSubTab, setActiveSubTab] = useState<"calculator" | "recipes" | "pairings">("calculator");

  // 1. Bottle size state (in ml)
  const [bottleSizeMl, setBottleSizeMl] = useState<number>(100);
  const [isCustomSize, setIsCustomSize] = useState<boolean>(false);
  const [customSizeInput, setCustomSizeInput] = useState<string>("100");

  // 2. Scent intensity
  const [intensity, setIntensity] = useState<"subtiel" | "gebalanceerd" | "krachtig">("gebalanceerd");

  // 3. Active formula in the mixer
  const [activeRecipeTitle, setActiveRecipeTitle] = useState<string>("Mijn Roomspray Formule");
  const [activeRecipeTargetRoom, setActiveRecipeTargetRoom] = useState<string>("Woonkamer & Slaapkamer");
  const [activeOils, setActiveOils] = useState<
    { id: string; name: string; ratio: number; noteType?: "Top" | "Midden" | "Basis" }[]
  >([
    { id: "nat-lavendel", name: "Lavendel (Bio)", ratio: 5, noteType: "Midden" },
    { id: "nat-cederhout", name: "Cederhout", ratio: 3, noteType: "Basis" },
    { id: "nat-sinaasappel", name: "Sinaasappel", ratio: 2, noteType: "Top" },
  ]);

  // Selected oil for the "Pairings Gids"
  const [selectedPairingOilId, setSelectedPairingOilId] = useState<string>(
    initialOil ? initialOil.id : oils[0]?.id || "nat-lavendel"
  );
  const [pairingSearchQuery, setPairingSearchQuery] = useState("");

  // Recipe filter category
  const [recipeCategoryFilter, setRecipeCategoryFilter] = useState<string>("Alle");
  const [onlyMakeableFilter, setOnlyMakeableFilter] = useState<boolean>(false);

  // Copy feedback
  const [copiedFeedback, setCopiedFeedback] = useState<boolean>(false);
  const [savedFeedback, setSavedFeedback] = useState<boolean>(false);
  const [isLabelModalOpen, setIsLabelModalOpen] = useState<boolean>(false);

  const handleReplaceIngredient = (oldOilId: string, newOilId: string) => {
    const newOil = oils.find((o) => o.id === newOilId);
    if (!newOil) return;
    setActiveOils((prev) =>
      prev.map((item) =>
        item.id === oldOilId
          ? { ...item, id: newOil.id, name: newOil.name, noteType: newOil.noteType }
          : item
      )
    );
  };

  // If initialOil changes, sync it
  useEffect(() => {
    if (initialOil) {
      setSelectedPairingOilId(initialOil.id);
      // Also automatically load a smart combination in the mixer with this oil
      const { pairings } = getOilFragrancePairings(initialOil, oils);
      const partner1 = pairings[0];
      const partner2 = pairings[1];

      const newBlend = [
        { id: initialOil.id, name: initialOil.name, ratio: 4, noteType: initialOil.noteType },
      ];
      if (partner1) {
        newBlend.push({ id: partner1.oilId, name: partner1.name, ratio: 3, noteType: partner1.noteType });
      }
      if (partner2) {
        newBlend.push({ id: partner2.oilId, name: partner2.name, ratio: 2, noteType: partner2.noteType });
      }

      setActiveOils(newBlend);
      setActiveRecipeTitle(`Roomspray met ${initialOil.name}`);
      setActiveSubTab("calculator");
      onClearInitialOil?.();
    }
  }, [initialOil, oils, onClearInitialOil]);

  // Bottle size handlers
  const handleSelectPresetSize = (ml: number) => {
    setBottleSizeMl(ml);
    setIsCustomSize(false);
    setCustomSizeInput(ml.toString());
  };

  const handleCustomSizeChange = (val: string) => {
    setCustomSizeInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setBottleSizeMl(num);
    }
  };

  // Calculation of ingredients
  const calculatedFormula = useMemo(() => {
    return calculateRoomSpray(bottleSizeMl, intensity, activeOils);
  }, [bottleSizeMl, intensity, activeOils]);

  // Manage oils in the calculator
  const handleAddOilToCalculator = (oilId: string) => {
    if (!oilId) return;
    const oilObj = oils.find((o) => o.id === oilId);
    if (!oilObj) return;

    if (activeOils.some((o) => o.id === oilId)) {
      // Increase ratio
      setActiveOils((prev) =>
        prev.map((o) => (o.id === oilId ? { ...o, ratio: o.ratio + 1 } : o))
      );
    } else {
      setActiveOils((prev) => [
        ...prev,
        { id: oilObj.id, name: oilObj.name, ratio: 2, noteType: oilObj.noteType },
      ]);
    }
  };

  const handleRemoveOilFromCalculator = (oilId: string) => {
    setActiveOils((prev) => prev.filter((o) => o.id !== oilId));
  };

  const handleUpdateOilRatio = (oilId: string, newRatio: number) => {
    const safeRatio = Math.max(1, newRatio);
    setActiveOils((prev) =>
      prev.map((o) => (o.id === oilId ? { ...o, ratio: safeRatio } : o))
    );
  };

  // Load a preset recipe directly into the calculator
  const handleLoadRecipe = (recipe: RoomSprayRecipe) => {
    setActiveRecipeTitle(recipe.name);
    setActiveRecipeTargetRoom(recipe.targetRoom);
    setActiveOils(
      recipe.ingredients.map((ing) => ({
        id: ing.oilId,
        name: ing.name,
        ratio: ing.ratio,
        noteType: ing.noteType,
      }))
    );
    setActiveSubTab("calculator");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Save current formula as custom recipe
  const handleSaveCurrentRecipe = () => {
    if (activeOils.length === 0) return;
    const newRecipe: RoomSprayRecipe = {
      id: `custom-roomspray-${Date.now()}`,
      name: activeRecipeTitle.trim() || "Mijn Unieke Roomspray",
      subtitle: `Zelfgemaakte roomspray compositie (${bottleSizeMl}ml)`,
      category: "Rust & Slaap",
      targetRoom: activeRecipeTargetRoom,
      description: `Persoonlijke formule met ${activeOils.map((o) => o.name).join(", ")}.`,
      mood: "Zelf gecreëerde huisparfum blend",
      usageTip: `Spray 2-3 maal in de ruimte en geniet van je eigen geurcreatie.`,
      icon: "🧪",
      bottleSizeMl,
      ingredients: activeOils.map((o) => ({
        oilId: o.id,
        name: o.name,
        ratio: o.ratio,
        noteType: o.noteType,
      })),
    };

    onSaveCustomRecipe(newRecipe);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  // Copy full recipe / label to clipboard
  const handleCopyRecipeToClipboard = () => {
    const oilListStr = calculatedFormula.ingredients
      .map((ing) => `• ${ing.name} (${ing.noteType || "Midden"}noot): ${ing.drops} druppels`)
      .join("\n");

    const text = `🧴 ROOMSPRAY RECEPT: ${activeRecipeTitle}
Flesgrootte: ${bottleSizeMl} ml (Intensiteit: ${intensity})
Geschikt voor: ${activeRecipeTargetRoom}
----------------------------------------
INGREDIËNTEN:
1. Alcohol (70%-96% of parfumeursalcohol): ${calculatedFormula.alcoholMl} ml (25%)
2. Gedestilleerd water: ${calculatedFormula.distilledWaterMl} ml (${calculatedFormula.distilledWaterPercent}%)
3. Etherische oliën (${calculatedFormula.totalOilDrops} druppels totaal):
${oilListStr}
----------------------------------------
BEREIDINGSWIJZE:
1. Giet eerst de ${calculatedFormula.alcoholMl} ml alcohol in het schone flesje.
2. Voeg de ${calculatedFormula.totalOilDrops} druppels etherische oliën toe aan de alcohol.
3. Zwenk 30 seconden rustig rond zodat de olie en alcohol homogeniseren.
4. Vul aan met de ${calculatedFormula.distilledWaterMl} ml gedestilleerd water tot 1 cm onder de hals.
5. Sluit af met de spraykop en schud kort voor elk gebruik!`;

    navigator.clipboard.writeText(text);
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2500);
  };

  // Pairings discovery data
  const currentPairingOil = oils.find((o) => o.id === selectedPairingOilId) || oils[0];
  const pairingData = useMemo(() => {
    if (!currentPairingOil) return { pairings: [], matchingRecipes: [], suggestedQuickBlends: [] };
    return getOilFragrancePairings(currentPairingOil, oils);
  }, [currentPairingOil, oils]);

  // Filtered recipes
  const allRecipes = useMemo(() => {
    return [...POPULAR_ROOM_SPRAYS, ...customRecipes];
  }, [customRecipes]);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((r) => {
      const matchesCat = recipeCategoryFilter === "Alle" || r.category === recipeCategoryFilter;
      if (!matchesCat) return false;

      if (onlyMakeableFilter) {
        // Must have all ingredients in stock
        const hasAll = r.ingredients.every((ing) =>
          oils.some((o) => o.id === ing.oilId && o.stock !== "Op" && o.stock !== "Niet in bezit")
        );
        if (!hasAll) return false;
      }
      return true;
    });
  }, [allRecipes, recipeCategoryFilter, onlyMakeableFilter, oils]);

  return (
    <div className="space-y-8">
      {/* 🧴 Top Frosted Hero Banner */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="glass-tag-floating text-[10px] font-mono tracking-[0.2em] text-amber-700 uppercase px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
                <SprayCan className="w-3.5 h-3.5" strokeWidth={1.5} />
                Roomspray Studio & Formuleer Maker
              </span>
              <span className="text-slate-300 font-extralight text-xs">/</span>
              <span className="text-xs font-mono text-slate-500">100% Natuurlijk Huisparfum</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-slate-900">
              Creëer Je Eigen Exclusieve Roomsprays
            </h2>
            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              Kies je flesgrootte, ontdek welke etherische oliën perfect met elkaar harmoniseren en bereken exact
              de benodigde hoeveelheid <strong className="text-slate-800 font-medium">alcohol</strong>,{" "}
              <strong className="text-slate-800 font-medium">gedestilleerd water</strong> en{" "}
              <strong className="text-slate-800 font-medium">etherische olie druppels</strong>.
            </p>
          </div>

          {/* Navigation Pill Buttons */}
          <div className="flex flex-wrap glass-dropdown rounded-2xl p-1.5 gap-1 self-stretch sm:self-auto">
            <button
              onClick={() => setActiveSubTab("calculator")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                activeSubTab === "calculator"
                  ? "bg-slate-900 text-white shadow-xs font-medium"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Flesje Calculator</span>
            </button>

            <button
              onClick={() => setActiveSubTab("recipes")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                activeSubTab === "recipes"
                  ? "bg-slate-900 text-white shadow-xs font-medium"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Populaire Recepten ({POPULAR_ROOM_SPRAYS.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab("pairings")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                activeSubTab === "pairings"
                  ? "bg-slate-900 text-white shadow-xs font-medium"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <Compass className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Geurcombinaties per Olie</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: INTERACTIVE BOTTLE MIXER & INGREDIENT CALCULATOR
         ========================================================================= */}
      {activeSubTab === "calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bottle Configurator & Oil Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Bottle Size (Flesgrootte Keuze) */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-800 flex items-center justify-center text-xs font-mono font-bold">
                    1
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 tracking-wide">
                    Kies de Grootte van je Sprayflesje
                  </h3>
                </div>
                <span className="text-xs font-mono text-amber-700 font-medium">
                  {bottleSizeMl} ml geselecteerd
                </span>
              </div>

              {/* Standard preset bottle sizes */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { ml: 30, label: "30 ml", desc: "Kussen / Tas" },
                  { ml: 50, label: "50 ml", desc: "Handzaam" },
                  { ml: 100, label: "100 ml", desc: "★ Meest Populair" },
                  { ml: 150, label: "150 ml", desc: "Middelgroot" },
                  { ml: 200, label: "200 ml", desc: "Salon / Ruim" },
                ].map((item) => {
                  const isSelected = !isCustomSize && bottleSizeMl === item.ml;
                  return (
                    <button
                      key={item.ml}
                      type="button"
                      onClick={() => handleSelectPresetSize(item.ml)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-md"
                          : "bg-white/70 text-slate-700 border-white/90 hover:bg-white"
                      }`}
                    >
                      <span className="text-sm font-mono font-semibold block">{item.label}</span>
                      <span className={`text-[10px] mt-1 block ${isSelected ? "text-amber-300" : "text-slate-500"}`}>
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom size input option */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsCustomSize(!isCustomSize)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    isCustomSize
                      ? "bg-amber-600 text-white border-amber-600 font-medium"
                      : "bg-white/60 text-slate-600 border-white hover:bg-white"
                  }`}
                >
                  ✦ Aangepast volume (bv. 60ml, 250ml)
                </button>

                {isCustomSize && (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      value={customSizeInput}
                      onChange={(e) => handleCustomSizeChange(e.target.value)}
                      placeholder="ml"
                      className="glass-dropdown text-xs font-mono w-24 px-3 py-1.5 rounded-lg outline-none font-medium text-slate-800"
                    />
                    <span className="text-xs font-mono text-slate-500">milliliter</span>
                  </div>
                )}
              </div>

              {/* Geurconcentratie / Intensiteit Selector */}
              <div className="pt-3 border-t border-white/50">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2 font-medium">
                  Gewenste Geurintensiteit:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: "subtiel", label: "Subtiel (1.5%)", note: "Zacht voor slaap & linnen" },
                    { id: "gebalanceerd", label: "Gebalanceerd (2.5%)", note: "★ Aanbevolen voor huiskamers" },
                    { id: "krachtig", label: "Krachtig (3.5%)", note: "Intens tegen geurtjes" },
                  ].map((lvl) => {
                    const isSelected = intensity === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setIntensity(lvl.id as any)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-700 text-white border-amber-700 shadow-xs"
                            : "bg-white/60 text-slate-700 border-white hover:bg-white/90"
                        }`}
                      >
                        <span className="text-xs font-medium block">{lvl.label}</span>
                        <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-amber-100" : "text-slate-500"}`}>
                          {lvl.note}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 2: Formulate Oils Blend */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-800 flex items-center justify-center text-xs font-mono font-bold">
                    2
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 tracking-wide">
                    Stel je Etherische Oliën Compositie Samen
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {calculatedFormula.totalOilDrops} druppels totaal
                </span>
              </div>

              {/* Title and Room Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    Naam van je Roomspray
                  </label>
                  <input
                    type="text"
                    value={activeRecipeTitle}
                    onChange={(e) => setActiveRecipeTitle(e.target.value)}
                    className="glass-dropdown w-full text-xs px-3.5 py-2 rounded-xl text-slate-800 font-medium outline-none"
                    placeholder="Bv. Zen Woonkamer Mist, Frisse Ochtend..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    Bestemde Ruimte / Doel
                  </label>
                  <input
                    type="text"
                    value={activeRecipeTargetRoom}
                    onChange={(e) => setActiveRecipeTargetRoom(e.target.value)}
                    className="glass-dropdown w-full text-xs px-3.5 py-2 rounded-xl text-slate-700 font-normal outline-none"
                    placeholder="Bv. Slaapkamer, Inkomhal, Badkamer..."
                  />
                </div>
              </div>

              {/* Add oil dropdown */}
              <div className="pt-2">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1 font-medium">
                  + Voeg een Olie toe uit je Collectie:
                </label>
                <div className="flex gap-2">
                  <select
                    id="add-oil-to-mixer"
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddOilToCalculator(e.target.value);
                        e.target.value = "";
                      }
                    }}
                    defaultValue=""
                    className="glass-dropdown flex-1 text-xs px-3.5 py-2 rounded-xl text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="" disabled>
                      -- Kies een olie om toe te voegen --
                    </option>
                    {oils.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.name} [{o.noteType}noot] · {o.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* List of active oils in the formula with calculated drops */}
              <div className="space-y-2 pt-2">
                {calculatedFormula.ingredients.map((ing) => {
                  const oilObj = oils.find((o) => o.id === ing.oilId);
                  const isOutOfStock = oilObj?.stock === "Op" || oilObj?.stock === "Niet in bezit";

                  return (
                    <div
                      key={ing.oilId}
                      className="glass-card rounded-xl p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-800 text-xs font-mono font-medium">
                          {ing.noteType?.[0] || "M"}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-900">{ing.name}</span>
                            <span className="text-[10px] font-mono text-slate-500 glass-tag-floating px-1.5 py-0.2 rounded">
                              {ing.noteType}noot
                            </span>
                            {isOutOfStock && (
                              <span className="text-[9px] font-mono text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                                (Niet op voorraad)
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Verhouding aandeel: {ing.ratio}x
                          </span>
                        </div>
                      </div>

                      {/* Ratio stepper & calculated drops pill */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto">
                        <div className="flex items-center gap-1.5 glass-tag-floating px-2 py-1 rounded-lg">
                          <button
                            type="button"
                            onClick={() => handleUpdateOilRatio(ing.oilId, ing.ratio - 1)}
                            className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-200 text-xs font-bold text-slate-600"
                            title="Minder van deze geur"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono font-semibold px-1 text-slate-800">
                            {ing.ratio}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateOilRatio(ing.oilId, ing.ratio + 1)}
                            className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-200 text-xs font-bold text-slate-600"
                            title="Meer van deze geur"
                          >
                            +
                          </button>
                        </div>

                        {/* Calculated Drops Badge */}
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100/80 border border-amber-300/80 px-2.5 py-1 rounded-lg inline-block">
                            {ing.drops} druppels
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveOilFromCalculator(ing.oilId)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="Verwijder olie"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Substitution suggestion when out of stock */}
                      {isOutOfStock && oilObj && (
                        (() => {
                          const subs = findOilSubstitutes(oilObj, oils);
                          if (subs.length === 0) return null;
                          const best = subs[0];
                          return (
                            <div className="w-full mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-800 text-[11px] flex items-center justify-between gap-2 bg-amber-50/70 dark:bg-amber-950/40 p-2.5 rounded-xl">
                              <span className="text-amber-900 dark:text-amber-200 font-normal">
                                💡 Alternatief: <strong>{best.oil.name}</strong> ({best.matchReasons[0]})
                              </span>
                              <button
                                type="button"
                                onClick={() => handleReplaceIngredient(ing.oilId, best.oil.id)}
                                className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[10px] shrink-0 shadow-2xs transition-colors"
                              >
                                Gebruik {best.oil.name}
                              </button>
                            </div>
                          );
                        })()
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action buttons: Save, Print Label with QR, and Copy */}
              <div className="pt-3 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveCurrentRecipe}
                  className="btn-amber-glow px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>{savedFeedback ? "✓ Opgeslagen!" : "Opslaan in Mijn Recepten"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLabelModalOpen(true)}
                  className="btn-metallic px-4 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 cursor-pointer shadow-xs border-emerald-400/40"
                >
                  <QrCode className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Print Flesetiket (met QR-code)</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyRecipeToClipboard}
                  className="btn-metallic px-3.5 py-2 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedFeedback ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Recept Gekopieerd!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Kopieer Recept &amp; Etiket</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Complete Scientific Ingredients Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Master Ingredient Formula Card for the exact bottle size */}
            <div className="glass-panel-elevated rounded-3xl p-6 sm:p-7 space-y-5 border-2 border-amber-500/30 shadow-xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-700 font-bold flex items-center gap-1.5">
                    <FlaskConicalIcon className="w-3.5 h-3.5" />
                    Exacte Receptuur & Ingrediënten
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Flesje: {bottleSizeMl} ml
                  </span>
                </div>
                <h3 className="text-xl font-normal text-slate-900 tracking-tight mt-1">
                  {activeRecipeTitle}
                </h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Bestemd voor: {activeRecipeTargetRoom}
                </p>
              </div>

              {/* Visual Flask Fill Gauge */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>Vloeistof Verdeling in Flesje</span>
                  <span>100% vulling ({bottleSizeMl} ml)</span>
                </div>
                <div className="h-4 w-full bg-slate-200/80 rounded-full overflow-hidden flex shadow-inner">
                  {/* Distilled water slice */}
                  <div
                    style={{ width: `${calculatedFormula.distilledWaterPercent}%` }}
                    className="h-full bg-sky-400 hover:opacity-90 transition-all"
                    title={`Gedestilleerd Water: ${calculatedFormula.distilledWaterMl} ml`}
                  />
                  {/* Alcohol slice */}
                  <div
                    style={{ width: `${calculatedFormula.alcoholPercent}%` }}
                    className="h-full bg-indigo-400 hover:opacity-90 transition-all"
                    title={`Alcohol: ${calculatedFormula.alcoholMl} ml`}
                  />
                  {/* Essential Oils slice */}
                  <div
                    style={{ width: `${calculatedFormula.totalOilPercent}%` }}
                    className="h-full bg-amber-500 hover:opacity-90 transition-all"
                    title={`Etherische Oliën: ${calculatedFormula.totalOilDrops} druppels (~${calculatedFormula.totalOilMl} ml)`}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-400 pt-0.5">
                  <span className="text-sky-700">💧 Gedestilleerd Water ({calculatedFormula.distilledWaterPercent}%)</span>
                  <span className="text-indigo-700">🧪 Alcohol ({calculatedFormula.alcoholPercent}%)</span>
                  <span className="text-amber-800">🌿 Oliën ({calculatedFormula.totalOilPercent}%)</span>
                </div>
              </div>

              {/* Exact Ingredients Detailed Cards */}
              <div className="space-y-3 pt-2">
                
                {/* 1. ALCOHOL */}
                <div className="glass-card rounded-2xl p-4 space-y-1.5 border-l-4 border-l-indigo-500">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      🧪 Alcohol (70% - 96% of Parfumeursalcohol)
                    </span>
                    <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">
                      {calculatedFormula.alcoholMl} ml
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    <strong className="font-medium text-slate-700">Waarom nodig:</strong> Etherische oliën lossen niet op in puur water. De alcohol fungeert als <em>emulgator</em> (oplosmiddel), conserveert de roomspray tegen schimmels/bacteriën en zorgt dat de spray razendsnel verdampt zonder natte vlekken op meubels of kussens.
                  </p>
                </div>

                {/* 2. GEDESTILLEERD WATER */}
                <div className="glass-card rounded-2xl p-4 space-y-1.5 border-l-4 border-l-sky-500">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      💧 Gedestilleerd Water
                    </span>
                    <span className="text-sm font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-lg border border-sky-200">
                      {calculatedFormula.distilledWaterMl} ml
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    <strong className="font-medium text-slate-700">Waarom nodig:</strong> Gewoon leidingwater bevat kalk en mineralen die het fijne verstuiverpompje verstoppen en kringen kunnen achterlaten. Gedestilleerd water (of goed afgekoeld gekookt water) garandeert een kristalheldere, lang houdbare nevel.
                  </p>
                </div>

                {/* 3. ETHERISCHE OLIËN */}
                <div className="glass-card rounded-2xl p-4 space-y-2.5 border-l-4 border-l-amber-500">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      🌿 Etherische Oliën Blend ({calculatedFormula.totalOilPercent}%)
                    </span>
                    <span className="text-sm font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                      {calculatedFormula.totalOilDrops} druppels
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs">
                    {calculatedFormula.ingredients.map((ing) => (
                      <div key={ing.oilId} className="py-1.5 flex items-center justify-between">
                        <span className="text-slate-800 font-medium">
                          • {ing.name} <span className="text-slate-400 font-normal font-mono text-[10px]">({ing.noteType}noot)</span>
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          {ing.drops} dr
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono text-right pt-0.5">
                    ≈ {calculatedFormula.totalOilMl} ml pure botanische geuressentie
                  </div>
                </div>

              </div>

              {/* Interactive Fragrance Pyramid & Note Balance */}
              <FragrancePyramid
                title="Geurpiramide & Verdamping"
                ingredients={calculatedFormula.ingredients.map((ing) => ({
                  name: ing.name,
                  noteType: (ing.noteType as "Top" | "Midden" | "Basis") || "Midden",
                  drops: ing.drops,
                }))}
              />

              {/* Step-by-Step Preparation Guide */}
              <div className="glass-panel p-4 rounded-2xl space-y-2.5 text-xs text-slate-700">
                <span className="font-semibold uppercase tracking-wider text-[10px] font-mono text-slate-900 block">
                  ✦ Stap-voor-Stap Bereidingswijze:
                </span>
                <ol className="list-decimal pl-4 space-y-1.5 font-normal leading-relaxed text-slate-600">
                  <li>
                    Schenk eerst de <strong className="text-slate-800 font-semibold">{calculatedFormula.alcoholMl} ml alcohol</strong> in het schone sprayflesje.
                  </li>
                  <li>
                    Druppel de <strong className="text-slate-800 font-semibold">{calculatedFormula.totalOilDrops} druppels etherische oliën</strong> direct in de alcohol. Zwenk het flesje 30 seconden rustig rond zodat de oliemoleculen volledig oplossen.
                  </li>
                  <li>
                    Vul aan met de <strong className="text-slate-800 font-semibold">{calculatedFormula.distilledWaterMl} ml gedestilleerd water</strong> tot circa 1 cm onder de flessenhals.
                  </li>
                  <li>
                    Draai het spraypompje stevig vast. Schud altijd kort voor gebruik en vernevel 2-3 keer in de gewenste ruimte!
                  </li>
                </ol>
              </div>

              {/* Storage & Safety tips */}
              <div className="text-[11px] text-slate-500 font-light space-y-1 pt-1">
                <p className="flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Bewaartip:</strong> Gebruik bij voorkeur een donker amberkleurig glazen flesje. Dit beschermt de etherische oliën tegen UV-straling en oxidatie (minstens 6 maanden houdbaar).</span>
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: POPULAIRE ROOMSPRAY GEURCOMBINATIES BIBLIOTHEEK
         ========================================================================= */}
      {activeSubTab === "recipes" && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium mr-1">
                Filter op Ambiance:
              </span>
              {[
                "Alle",
                "Rust & Slaap",
                "Focus & Werk",
                "Fris & Zuiverend",
                "Gezellig & Warm",
                "Luxe & Hotel",
                "Bloemig & Sensueel",
                "Spa & Wellness",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setRecipeCategoryFilter(cat)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                    recipeCategoryFilter === cat
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs font-medium"
                      : "bg-white/60 text-slate-600 border-white/80 hover:bg-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <label className="flex items-center gap-2 text-xs font-mono text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyMakeableFilter}
                  onChange={(e) => setOnlyMakeableFilter(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                />
                <span>Toon alleen wat ik nu kan maken</span>
              </label>
            </div>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => {
              // Check availability
              const missingOils = recipe.ingredients.filter(
                (r) => !oils.some((o) => o.id === r.oilId && o.stock !== "Op" && o.stock !== "Niet in bezit")
              );
              const canMakeNow = missingOils.length === 0;

              return (
                <div
                  key={recipe.id}
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{recipe.icon || "✨"}</span>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-semibold block">
                            {recipe.category}
                          </span>
                          <h4 className="text-base font-semibold text-slate-900 leading-snug">
                            {recipe.name}
                          </h4>
                        </div>
                      </div>

                      <span
                        className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${
                          canMakeNow
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {canMakeNow ? "✓ Direct Maakbaar" : "Olie ontbreekt"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 italic font-medium">
                      "{recipe.subtitle}"
                    </p>

                    <p className="text-xs text-slate-700 font-normal leading-relaxed line-clamp-3">
                      {recipe.description}
                    </p>

                    <div className="glass-tag-floating px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-600 flex items-center gap-1.5">
                      <span>Ruimte:</span>
                      <strong className="text-slate-800">{recipe.targetRoom}</strong>
                    </div>

                    {/* Ingredients with Drops preview based on standard 100ml */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-medium">
                        Geursamenstelling (verhoudingen):
                      </span>
                      <div className="space-y-1">
                        {recipe.ingredients.map((ing, i) => {
                          const matchingOil = oils.find((o) => o.id === ing.oilId);
                          const hasStock = matchingOil && matchingOil.stock !== "Op" && matchingOil.stock !== "Niet in bezit";

                          return (
                            <div key={i} className="flex items-center justify-between text-xs">
                              <span className="flex items-center gap-1.5">
                                <Droplet className="w-3 h-3 text-amber-600" />
                                <span className={hasStock ? "text-slate-800 font-medium" : "text-slate-400 line-through"}>
                                  {ing.name}
                                </span>
                              </span>
                              <span className="text-[10px] font-mono text-slate-500 glass-tag-floating px-1.5 py-0.2 rounded">
                                {ing.ratio} deel · {ing.noteType}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tip */}
                    <p className="text-[11px] text-slate-500 font-light italic bg-amber-500/5 p-2.5 rounded-xl border border-amber-500/10">
                      💡 {recipe.usageTip}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/50 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleLoadRecipe(recipe)}
                      className="btn-amber-glow w-full py-2.5 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Meng in Flesje Calculator ({bottleSizeMl}ml)</span>
                    </button>

                    {/* Custom recipe delete button */}
                    {recipe.id.startsWith("custom-roomspray-") && (
                      <button
                        type="button"
                        onClick={() => onDeleteCustomRecipe(recipe.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Wis dit recept"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: GEURCOMBINATIES PER OLIE (ONTDEK PARTNERS VOOR ELKE OLIE)
         ========================================================================= */}
      {activeSubTab === "pairings" && currentPairingOil && (
        <div className="space-y-8">
          
          {/* Top selector for choosing ANY oil in the app */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-700 font-bold block">
                  Geurharmonie Matrix
                </span>
                <h3 className="text-base font-medium text-slate-900 mt-0.5">
                  Selecteer een Olie om te Zien Waar Het Goed Mee Combineert
                </h3>
              </div>

              {/* Dropdown selector */}
              <div className="w-full sm:w-72">
                <select
                  id="select-pairing-focus-oil"
                  value={selectedPairingOilId}
                  onChange={(e) => setSelectedPairingOilId(e.target.value)}
                  className="glass-dropdown w-full text-xs font-medium px-3.5 py-2 rounded-xl text-slate-800 outline-none cursor-pointer"
                >
                  {oils.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} ({o.category} · {o.noteType}noot)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active Oil Spotlight and its Curated Combinations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Spotlight Oil Card (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div
                style={{
                  borderColor: currentPairingOil.colorHex,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  boxShadow: `0 16px 36px -10px ${currentPairingOil.colorHex}40`,
                }}
                className="glass-panel rounded-3xl overflow-hidden p-6 space-y-4"
              >
                <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                  <img
                    src={getOilPhoto(currentPairingOil)}
                    alt={currentPairingOil.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-2.5 left-2.5 glass-tag-floating px-2 py-0.5 rounded-full text-[10px] font-mono uppercase text-slate-800">
                    {currentPairingOil.noteType}noot
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-slate-950/70 backdrop-blur-md px-2 py-0.5 rounded text-white text-[10px] font-mono">
                    {currentPairingOil.category}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-light text-slate-900 tracking-tight">
                    {currentPairingOil.name}
                  </h3>
                  <p className="text-xs text-slate-500 italic mt-0.5">
                    {currentPairingOil.botanicalName}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 font-normal">
                  <span className="font-semibold text-slate-900 block text-[11px] uppercase tracking-wider font-mono">
                    Geurprofiel:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPairingOil.aromaProfile.map((ar) => (
                      <span key={ar} className="glass-tag-floating px-2 py-0.5 rounded text-[10px] font-mono">
                        {ar}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {currentPairingOil.description}
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddOilToCalculator(currentPairingOil.id);
                      setActiveSubTab("calculator");
                    }}
                    className="btn-amber-glow w-full py-2.5 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Meng Roomspray met {currentPairingOil.name}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Perfect Pairing Partners & Why they work (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/60 pb-3">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      ✦ Ideale Geurpartners voor {currentPairingOil.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      Deze oliën vullen {currentPairingOil.name} perfect aan in top-, midden- of basisnoot.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-amber-700 font-medium">
                    {pairingData.pairings.length} combinaties
                  </span>
                </div>

                {/* Pairing Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pairingData.pairings.map((pair) => {
                    const fullOil = oils.find((o) => o.id === pair.oilId);
                    const isInMixer = activeOils.some((o) => o.id === pair.oilId);

                    return (
                      <div
                        key={pair.oilId}
                        className="glass-card rounded-2xl p-4 flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                              {pair.harmonyType}
                            </span>
                            <span className="text-[10px] font-mono glass-tag-floating px-2 py-0.5 rounded-full">
                              {pair.noteType}noot
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            {fullOil && (
                              <img
                                src={getOilPhoto(fullOil)}
                                alt={pair.name}
                                className="w-10 h-10 rounded-xl object-cover border border-white/80 shadow-xs"
                              />
                            )}
                            <div>
                              <h5 className="text-sm font-semibold text-slate-900">{pair.name}</h5>
                              <span className="text-[10px] text-slate-500 font-mono">{pair.category}</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 font-normal leading-relaxed bg-white/60 p-2.5 rounded-xl border border-white/80">
                            {pair.reason}
                          </p>
                        </div>

                        <div className="pt-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              handleAddOilToCalculator(currentPairingOil.id);
                              handleAddOilToCalculator(pair.oilId);
                              setActiveSubTab("calculator");
                            }}
                            className="btn-metallic flex-1 py-1.5 text-xs font-mono text-slate-700 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Sliders className="w-3 h-3 text-slate-500" />
                            <span>Meng Duet in Calculator</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Suggested Quick Blends with this oil */}
              {pairingData.suggestedQuickBlends.length > 0 && (
                <div className="glass-panel rounded-2xl p-6 space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-white/60 pb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>Kant-en-Klare Receptideeën met {currentPairingOil.name}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pairingData.suggestedQuickBlends.map((blend, idx) => (
                      <div key={idx} className="glass-card rounded-2xl p-4 flex flex-col justify-between space-y-3">
                        <div>
                          <h5 className="text-sm font-medium text-slate-900">{blend.name}</h5>
                          <p className="text-xs text-slate-500 font-light mt-0.5">{blend.description}</p>
                          
                          <div className="mt-3 space-y-1">
                            {blend.oils.map((o, i) => (
                              <div key={i} className="flex justify-between text-xs font-light">
                                <span className="text-slate-800">• {o.name}</span>
                                <span className="font-mono text-slate-500">{o.dropsRatio} delen</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            // Find corresponding oil IDs
                            const newActive = blend.oils.map((o) => {
                              const found = oils.find(
                                (item) => item.name.toLowerCase().includes(o.name.toLowerCase()) || o.name.toLowerCase().includes(item.name.toLowerCase())
                              );
                              return {
                                id: found?.id || "nat-lavendel",
                                name: found?.name || o.name,
                                ratio: o.dropsRatio,
                                noteType: found?.noteType || "Midden",
                              };
                            });
                            setActiveRecipeTitle(blend.name);
                            setActiveOils(newActive);
                            setActiveSubTab("calculator");
                          }}
                          className="btn-amber-glow w-full py-2 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Laad in Flesje Mixer</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching pre-made popular recipes featuring this oil */}
              {pairingData.matchingRecipes.length > 0 && (
                <div className="glass-panel rounded-2xl p-6 space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-white/60 pb-3 flex items-center gap-2">
                    <SprayCan className="w-4 h-4 text-amber-700" />
                    <span>Populaire Roomspray Formules met {currentPairingOil.name}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pairingData.matchingRecipes.map((rec) => (
                      <div key={rec.id} className="glass-card rounded-2xl p-4 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{rec.icon}</span>
                            <h5 className="text-sm font-semibold text-slate-900">{rec.name}</h5>
                          </div>
                          <p className="text-xs text-slate-600 font-normal mt-1">{rec.description}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleLoadRecipe(rec)}
                          className="btn-amber-glow w-full py-2 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Laad Recept ({bottleSizeMl}ml)</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {/* Printable Label & QR Code Modal */}
      <PrintableLabelModal
        isOpen={isLabelModalOpen}
        onClose={() => setIsLabelModalOpen(false)}
        recipeTitle={activeRecipeTitle}
        bottleSizeMl={bottleSizeMl}
        targetRoom={activeRecipeTargetRoom}
        ingredients={calculatedFormula.ingredients}
        alcoholMl={calculatedFormula.alcoholMl}
        waterMl={calculatedFormula.distilledWaterMl}
      />

    </div>
  );
}

function FlaskConicalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16h10" />
    </svg>
  );
}

