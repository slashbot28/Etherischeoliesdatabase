import { useState } from "react";
import { EssentialOil, SUGGESTED_SYNERGIES } from "../data";
import { Sparkles, Trash2, Droplet, AlertTriangle, BookOpen, Check, HelpCircle } from "lucide-react";

interface SynergyBlendsProps {
  oils: EssentialOil[];
  customBlends: typeof SUGGESTED_SYNERGIES;
  onSaveCustomBlend: (blend: typeof SUGGESTED_SYNERGIES[0]) => void;
  onDeleteCustomBlend: (name: string) => void;
}

export default function SynergyBlends({
  oils,
  customBlends,
  onSaveCustomBlend,
  onDeleteCustomBlend,
}: SynergyBlendsProps) {
  const [activeTab, setActiveTab] = useState<"presets" | "custom">("presets");

  // Custom Form states
  const [blendName, setBlendName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [instructions, setInstructions] = useState("");
  
  // Selected ingredients
  const [ingredients, setIngredients] = useState<{ id: string; drops: number }[]>([]);
  const [selectedOilId, setSelectedOilId] = useState("");
  const [dropsCount, setDropsCount] = useState(3);

  const handleAddIngredient = () => {
    if (!selectedOilId) return;
    
    const existing = ingredients.find((ing) => ing.id === selectedOilId);
    if (existing) {
      setIngredients((prev) =>
        prev.map((ing) =>
          ing.id === selectedOilId ? { ...ing, drops: ing.drops + dropsCount } : ing
        )
      );
    } else {
      setIngredients((prev) => [...prev, { id: selectedOilId, drops: dropsCount }]);
    }
    
    setSelectedOilId("");
    setDropsCount(3);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const activeOilsDetails = ingredients.map((ing) => {
    const oilObj = oils.find((o) => o.id === ing.id);
    return {
      ...ing,
      name: oilObj?.name || "Onbekende olie",
      noteType: oilObj?.noteType || "Midden",
      safety: oilObj?.safetyPrecautions || [],
      stock: oilObj?.stock || "Voldoende",
    };
  });

  const totalDrops = ingredients.reduce((sum, ing) => sum + ing.drops, 0);

  const noteBreakdown = activeOilsDetails.reduce(
    (acc, item) => {
      const percentage = totalDrops > 0 ? (item.drops / totalDrops) * 100 : 0;
      acc[item.noteType] = (acc[item.noteType] || 0) + percentage;
      return acc;
    },
    { Top: 0, Midden: 0, Basis: 0 } as Record<string, number>
  );

  const mixedWarnings: string[] = [];
  let isSensitizing = false;
  let matchesFototoxisch = false;
  let matchesPregnancy = false;

  activeOilsDetails.forEach((ing) => {
    ing.safety.forEach((prec) => {
      const p = prec.toLowerCase();
      if (p.includes("fototoxisch") || p.includes("zonlicht")) matchesFototoxisch = true;
      if (p.includes("zwanger") || p.includes("zwangerschap")) matchesPregnancy = true;
      if (p.includes("baby") || p.includes("kinderen")) isSensitizing = true;
    });
  });

  if (matchesFototoxisch) {
    mixedWarnings.push(
      "Fototoxisch risico: Dit mengsel bevat zonlicht-gevoelige bestanddelen. Vermijd direct zonlicht op de huid gedurende 12 tot 24 uur."
    );
  }
  if (matchesPregnancy) {
    mixedWarnings.push(
      "Zwangerschap: Bevat bestanddelen die worden ontraden tijdens zwangerschap."
    );
  }
  if (isSensitizing) {
    mixedWarnings.push(
      "Gevoeligheidsadvies: Bevat intense bestanddelen; buiten bereik van jonge kinderen houden en discreet vernevelen."
    );
  }

  const handleSaveBlend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blendName.trim() || ingredients.length === 0) return;

    const newBlend = {
      name: blendName.trim(),
      purpose: purpose.trim() || "Algemeen aromatische compositie.",
      recipe: ingredients.map((ing) => ({
        id: ing.id,
        drops: ing.drops,
        name: oils.find((o) => o.id === ing.id)?.name || "Onbekende olie",
      })),
      instructions: instructions.trim() || "Voeg toe aan koudwaterdiffuser.",
    };

    onSaveCustomBlend(newBlend);
    setBlendName("");
    setPurpose("");
    setInstructions("");
    setIngredients([]);
    setActiveTab("presets");
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-7">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-white/60 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl glass-tag-floating flex items-center justify-center text-amber-700">
            <Sparkles className="w-4 h-4" strokeWidth={1.3} />
          </div>
          <div>
            <h2 className="text-lg font-light tracking-tight text-slate-900">
              Synergie Studio
            </h2>
            <p className="text-xs font-light text-slate-500 mt-0.5">
              Harmonische diffusieformules en interactieve mengverhoudingen.
            </p>
          </div>
        </div>

        {/* Sub tab switcher */}
        <div className="flex glass-dropdown rounded-xl p-1 text-xs self-start sm:self-center">
          <button
            id="subtab-presets"
            onClick={() => setActiveTab("presets")}
            className={`px-3.5 py-1.5 rounded-lg transition-all font-mono text-[11px] cursor-pointer ${
              activeTab === "presets"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Aromatherapie Recepten ({SUGGESTED_SYNERGIES.length + customBlends.length})
          </button>
          <button
            id="subtab-custom"
            onClick={() => setActiveTab("custom")}
            className={`px-3.5 py-1.5 rounded-lg transition-all font-mono text-[11px] cursor-pointer ${
              activeTab === "custom"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Formuleer Studio ✦
          </button>
        </div>
      </div>

      {activeTab === "presets" ? (
        <div className="space-y-6">
          <div>
            <h3 className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase mb-4 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.3} />
              Geconsigneerde Aromatische Formules
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUGGESTED_SYNERGIES.map((syn, index) => {
                const missingOils = syn.recipe.filter(
                  (r) => !oils.some((o) => o.id === r.id && o.stock !== "Niet in bezit" && o.stock !== "Op")
                );
                const canMakeNow = missingOils.length === 0;

                return (
                  <div
                    id={`preset-recipe-${index}`}
                    key={index}
                    className="glass-card rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="font-normal text-slate-900 text-sm tracking-wide">
                          {syn.name}
                        </h4>
                        <span
                          className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            canMakeNow
                              ? "glass-tag-floating text-emerald-800"
                              : "bg-slate-200/50 text-slate-500"
                          }`}
                        >
                          {canMakeNow ? "Beschikbaar" : "Niet compleet"}
                        </span>
                      </div>

                      <p className="text-sm font-normal text-slate-700 leading-relaxed mb-4">
                        {syn.purpose}
                      </p>

                      {/* Ingredients */}
                      <div className="space-y-1.5 mb-4">
                        {syn.recipe.map((ing, i) => {
                          const actualOilInCabinet = oils.find((o) => o.id === ing.id);
                          const hasInKast = actualOilInCabinet && actualOilInCabinet.stock !== "Niet in bezit" && actualOilInCabinet.stock !== "Op";

                          return (
                            <div key={i} className="flex items-center justify-between text-xs font-light">
                              <span className="flex items-center gap-1.5">
                                <Droplet className="w-3 h-3 text-amber-600/70" strokeWidth={1.4} />
                                <span className={hasInKast ? "text-slate-800" : "text-slate-400 line-through"}>
                                  {ing.name}
                                </span>
                              </span>
                              <span className="text-[10px] font-mono text-slate-500 glass-tag-floating px-1.5 py-0.5 rounded">
                                {ing.drops} dr
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t border-slate-200/50 pt-3 text-[11px] text-slate-500 font-light italic space-y-1.5">
                      <p>“{syn.instructions}”</p>
                      {!canMakeNow && (
                        <p className="text-amber-700 not-italic font-mono text-[10px]">
                          ✦ Ontbrekend in collectie: {missingOils.map((m) => m.name).join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Recipes section */}
          {customBlends.length > 0 && (
            <div className="pt-4">
              <h3 className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase mb-4 flex items-center gap-1.5">
                ✦ Eigen Composities
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customBlends.map((syn, index) => {
                  return (
                    <div
                      id={`custom-recipe-${index}`}
                      key={index}
                      className="glass-card rounded-2xl p-5 flex flex-col justify-between relative"
                    >
                      <button
                        id={`del-blend-${index}`}
                        onClick={() => onDeleteCustomBlend(syn.name)}
                        className="absolute right-3 top-3 p-1 rounded-md text-slate-400 hover:text-rose-600 transition-colors"
                        title="Wis recept"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.3} />
                      </button>

                      <div>
                        <h4 className="font-normal text-slate-900 text-sm tracking-wide mb-1 pr-6">
                          {syn.name}
                        </h4>
                        <p className="text-sm font-normal text-slate-700 leading-relaxed mb-4">
                          {syn.purpose}
                        </p>

                        <div className="space-y-1.5 mb-4">
                          {syn.recipe.map((ing, i) => (
                            <div key={i} className="flex items-center justify-between text-xs font-light">
                              <span className="flex items-center gap-1.5">
                                <Droplet className="w-3 h-3 text-amber-600/70" strokeWidth={1.4} />
                                <span className="text-slate-800">{ing.name}</span>
                              </span>
                              <span className="text-[10px] font-mono text-slate-500 glass-tag-floating px-1.5 py-0.5 rounded">
                                {ing.drops} dr
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-200/50 pt-2.5 text-[11px] text-slate-500 font-light italic">
                        <p>“{syn.instructions}”</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Mixer Simulator */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.16em] text-slate-500 font-medium">
              Formule Compositie (Diffuser Simulator)
            </h3>

            <div className="glass-panel rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-6">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    Selecteer Olie
                  </label>
                  <select
                    id="select-ingredient"
                    value={selectedOilId}
                    onChange={(e) => setSelectedOilId(e.target.value)}
                    className="glass-dropdown w-full text-xs px-3 py-2 rounded-xl text-slate-700 font-light outline-none cursor-pointer"
                  >
                    <option value="">-- selecteer olie --</option>
                    {oils.map((o) => {
                      const isStockEmpty = o.stock === "Op" || o.stock === "Niet in bezit";
                      return (
                        <option key={o.id} value={o.id} disabled={isStockEmpty}>
                          {o.name} {isStockEmpty ? `(${o.stock})` : `[${o.noteType}noot]`}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    Druppels
                  </label>
                  <input
                    id="input-ingredient-drops"
                    type="number"
                    min="1"
                    max="30"
                    value={dropsCount}
                    onChange={(e) => setDropsCount(Math.max(1, Number(e.target.value)))}
                    className="glass-dropdown w-full text-xs px-3 py-2 rounded-xl text-slate-700 font-mono font-medium outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <button
                    type="button"
                    id="btn-add-ingredient"
                    onClick={handleAddIngredient}
                    disabled={!selectedOilId}
                    className="btn-metallic w-full py-2 text-xs font-mono rounded-xl text-slate-700 disabled:opacity-40"
                  >
                    + Toevoegen
                  </button>
                </div>
              </div>

              {ingredients.length > 0 ? (
                <div className="glass-panel rounded-xl divide-y divide-white/60 overflow-hidden">
                  {activeOilsDetails.map((ing) => (
                    <div key={ing.id} className="flex items-center justify-between p-3 px-4 hover:bg-white/40 transition-colors">
                      <div className="flex items-center gap-2">
                        <Droplet className="w-3.5 h-3.5 text-amber-600" strokeWidth={1.3} />
                        <div>
                          <span className="text-xs font-normal text-slate-800 block">
                            {ing.name}
                          </span>
                          <span className="text-[10px] uppercase font-mono text-slate-400">
                            {ing.noteType}noot · {ing.stock}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono glass-tag-floating px-2 py-0.5 rounded text-slate-700">
                          {ing.drops} dr
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(ing.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.3} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 font-light italic text-center py-6 border border-dashed border-white/80 rounded-xl">
                  Geen ingrediënten geselecteerd. Kies een formule hierboven.
                </p>
              )}
            </div>

            {/* Custom blend details fields Form */}
            <form onSubmit={handleSaveBlend} className="space-y-3 pt-2">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Compositie Naam
                </label>
                <input
                  id="input-blend-name"
                  type="text"
                  required
                  value={blendName}
                  onChange={(e) => setBlendName(e.target.value)}
                  placeholder="Bijv. Aurora Borealis, Diepe Focus, Aardende Warmte..."
                  className="glass-dropdown w-full text-xs px-3.5 py-2 rounded-xl text-slate-800 font-normal outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Therapeutisch Doel
                </label>
                <input
                  id="input-blend-purpose"
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Bijv. Kalmeert limbisch systeem, bevordert meditatieve verstilling..."
                  className="glass-dropdown w-full text-xs px-3.5 py-2 rounded-xl text-slate-800 font-light outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Toepassingsinstructie
                </label>
                <textarea
                  id="input-blend-instructions"
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Bijv. 4 druppels in de diffuser voor avondsessie..."
                  className="glass-dropdown w-full text-xs p-3 rounded-xl text-slate-800 font-light outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                id="btn-save-blend"
                disabled={ingredients.length === 0}
                className="btn-amber-glow w-full py-2.5 text-xs font-medium rounded-xl disabled:opacity-40"
              >
                ✦ Bewaar Compositie in Database
              </button>
            </form>
          </div>

          {/* Right: Diagnostics */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.16em] text-slate-500 font-medium">
              Moleculaire & Harmonische Analyse
            </h3>

            {/* Note balance */}
            <div className="glass-panel rounded-xl p-4 space-y-3">
              <span className="block text-[10px] font-mono tracking-wider uppercase text-slate-500 font-medium">
                Geurnoot Balans
              </span>

              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-600 font-light mb-1">
                    <span>Topnoot (Vluchtig)</span>
                    <span className="font-mono">{Math.round(noteBreakdown.Top)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                    <div style={{ width: `${Math.min(100, noteBreakdown.Top)}%` }} className="h-full bg-amber-400 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-600 font-light mb-1">
                    <span>Middennoot (Hart)</span>
                    <span className="font-mono">{Math.round(noteBreakdown.Midden)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                    <div style={{ width: `${Math.min(100, noteBreakdown.Midden)}%` }} className="h-full bg-slate-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-600 font-light mb-1">
                    <span>Basisnoot (Gronding)</span>
                    <span className="font-mono">{Math.round(noteBreakdown.Basis)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                    <div style={{ width: `${Math.min(100, noteBreakdown.Basis)}%` }} className="h-full bg-slate-800 rounded-full" />
                  </div>
                </div>
              </div>

              {totalDrops > 0 && (
                <div className="text-[10px] text-slate-500 font-light italic glass-panel p-2.5 rounded-lg leading-relaxed mt-2">
                  <span className="font-medium text-slate-700 not-italic block mb-0.5">Diagnose:</span>
                  {noteBreakdown.Top > 40
                    ? "Dominantie in Topnoten: levendige energie, maar snellere verdamping. Voeg een Basisnoot toe ter fixatie."
                    : noteBreakdown.Basis > 45
                    ? "Hoge Basisnoot dichtheid: zware aarding. Voeg een frisse Topnoot toe voor meer vibratie."
                    : "Uitstekend gewogen harmonische driehoek!"}
                </div>
              )}
            </div>

            {/* Safety analysis */}
            <div className="glass-panel rounded-xl p-4 space-y-2">
              <span className="block text-[10px] font-mono tracking-wider uppercase text-slate-500 font-medium mb-1">
                Veiligheidsanalyse
              </span>

              {mixedWarnings.length > 0 ? (
                <div className="space-y-1.5">
                  {mixedWarnings.map((warn, i) => (
                    <div key={i} className="flex gap-2 text-[11px] text-amber-900 bg-amber-500/10 border border-amber-400/20 p-2.5 rounded-lg">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={1.3} />
                      <span className="font-light">{warn}</span>
                    </div>
                  ))}
                </div>
              ) : ingredients.length > 0 ? (
                <div className="flex gap-2 text-[11px] text-emerald-900 bg-emerald-500/10 border border-emerald-400/20 p-2.5 rounded-lg font-light">
                  <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" strokeWidth={1.4} />
                  <span>Geen kritieke contra-indicaties gedetecteerd.</span>
                </div>
              ) : (
                <div className="flex gap-1.5 text-[11px] text-slate-400 p-2 text-center justify-center font-light italic">
                  <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.3} />
                  <span>Voeg oliën toe voor automatische detectie.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
