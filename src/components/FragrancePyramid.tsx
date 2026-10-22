import React from "react";
import { Sparkles, Info, ShieldCheck, Flame, Feather, Compass } from "lucide-react";

export interface PyramidIngredient {
  name: string;
  noteType: "Top" | "Midden" | "Basis";
  drops: number;
}

interface FragrancePyramidProps {
  ingredients: PyramidIngredient[];
  title?: string;
  compact?: boolean;
}

export default function FragrancePyramid({
  ingredients,
  title = "Geurpiramide & Parfum-Balans",
  compact = false,
}: FragrancePyramidProps) {
  const topDrops = ingredients
    .filter((i) => i.noteType === "Top")
    .reduce((sum, i) => sum + (Number(i.drops) || 0), 0);
  const midDrops = ingredients
    .filter((i) => i.noteType === "Midden")
    .reduce((sum, i) => sum + (Number(i.drops) || 0), 0);
  const baseDrops = ingredients
    .filter((i) => i.noteType === "Basis")
    .reduce((sum, i) => sum + (Number(i.drops) || 0), 0);

  const totalDrops = topDrops + midDrops + baseDrops;

  const topPct = totalDrops > 0 ? Math.round((topDrops / totalDrops) * 100) : 0;
  const midPct = totalDrops > 0 ? Math.round((midDrops / totalDrops) * 100) : 0;
  const basePct = totalDrops > 0 ? Math.round((baseDrops / totalDrops) * 100) : 0;

  // Evaluation & advice
  let advice = "Voeg ingrediënten toe om de geurbalans te berekenen.";
  let badgeColor = "text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-300";

  if (totalDrops > 0) {
    if (baseDrops === 0) {
      advice = "⏳ Geen basisnoot aanwezig: De geur zal snel vervliegen. Voeg 1-2 druppels cederhout, wierook of patchouli toe om de geur urenlang vast te houden.";
      badgeColor = "text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    } else if (topDrops === 0) {
      advice = "🍃 Geen topnoot: De geur mist een frisse eerste indruk bij het vernevelen. Voeg wat citrus (sinaasappel, bergamot) of munt toe.";
      badgeColor = "text-sky-700 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800";
    } else if (topPct >= 15 && topPct <= 40 && midPct >= 35 && midPct <= 65 && basePct >= 15 && basePct <= 35) {
      advice = "✨ Uitstekende harmonie! Voldoet aan de klassieke Franse parfumverhouding (sprankelende top, rijk bloemig/kruidig hart en zachte aardse fixatie).";
      badgeColor = "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
    } else if (basePct > 45) {
      advice = "🪵 Warme, zware compositie: Zeer diepe, rustgevende geur die erg lang blijft hangen. Perfect voor de avond of herfst/winter.";
      badgeColor = "text-amber-800 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    } else if (topPct > 55) {
      advice = "⚡ Extra fris & verkwikkend: Ideaal om snel muffe luchtjes te verdrijven, maar vervliegt vlotter.";
      badgeColor = "text-teal-800 bg-teal-50 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800";
    } else {
      advice = "🌸 Aangenaam gebalanceerde samenstelling.";
      badgeColor = "text-indigo-700 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";
    }
  }

  const topItems = ingredients.filter((i) => i.noteType === "Top");
  const midItems = ingredients.filter((i) => i.noteType === "Midden");
  const baseItems = ingredients.filter((i) => i.noteType === "Basis");

  return (
    <div className={`glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 ${compact ? "text-xs" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-500 to-rose-400 inline-block shadow-xs" />
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
            {title}
          </h4>
        </div>
        <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {totalDrops} {totalDrops === 1 ? "druppel" : "druppels"} totaal
        </span>
      </div>

      {/* Visual Tiered Pyramid */}
      <div className="space-y-2.5 pt-1">
        {/* Tier 1: Topnoten (Head) */}
        <div className="rounded-xl p-3 bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-amber-500/10 border border-amber-300/40 dark:border-amber-500/20 transition-all hover:border-amber-400/60">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <span>🍋</span>
              <span>Topnoot (Vluchtig · 15-30m)</span>
            </span>
            <span className="font-mono font-bold text-amber-800 dark:text-amber-300">
              {topPct}% <span className="font-normal text-[11px] text-slate-500 dark:text-slate-400">({topDrops} dr)</span>
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-amber-100 dark:bg-amber-950/50 rounded-full overflow-hidden mb-1.5">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${topPct}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1 text-[11px] text-slate-600 dark:text-slate-400">
            {topItems.length > 0 ? (
              topItems.map((i, idx) => (
                <span key={idx} className="bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-md font-mono text-[10.5px] border border-amber-200/50 dark:border-amber-900/40">
                  {i.name} ({i.drops}d)
                </span>
              ))
            ) : (
              <span className="italic text-slate-400 dark:text-slate-500 text-[11px]">Geen topnoot geselecteerd</span>
            )}
          </div>
        </div>

        {/* Tier 2: Middennoten (Heart) */}
        <div className="rounded-xl p-3 bg-gradient-to-r from-rose-500/10 via-pink-400/15 to-rose-500/10 border border-rose-300/40 dark:border-rose-500/20 transition-all hover:border-rose-400/60">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
              <span>🌸</span>
              <span>Hartnoot (Karakter · 2-4 uur)</span>
            </span>
            <span className="font-mono font-bold text-rose-800 dark:text-rose-300">
              {midPct}% <span className="font-normal text-[11px] text-slate-500 dark:text-slate-400">({midDrops} dr)</span>
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-rose-100 dark:bg-rose-950/50 rounded-full overflow-hidden mb-1.5">
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${midPct}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1 text-[11px] text-slate-600 dark:text-slate-400">
            {midItems.length > 0 ? (
              midItems.map((i, idx) => (
                <span key={idx} className="bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-md font-mono text-[10.5px] border border-rose-200/50 dark:border-rose-900/40">
                  {i.name} ({i.drops}d)
                </span>
              ))
            ) : (
              <span className="italic text-slate-400 dark:text-slate-500 text-[11px]">Geen hartnoot geselecteerd</span>
            )}
          </div>
        </div>

        {/* Tier 3: Basisnoten (Base / Fixateur) */}
        <div className="rounded-xl p-3 bg-gradient-to-r from-emerald-600/10 via-teal-500/15 to-emerald-600/10 border border-emerald-300/40 dark:border-emerald-500/20 transition-all hover:border-emerald-400/60">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
              <span>🪵</span>
              <span>Basisnoot (Fixateur & Diepte · 4-8+ uur)</span>
            </span>
            <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300">
              {basePct}% <span className="font-normal text-[11px] text-slate-500 dark:text-slate-400">({baseDrops} dr)</span>
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-emerald-100 dark:bg-emerald-950/50 rounded-full overflow-hidden mb-1.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
              style={{ width: `${basePct}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1 text-[11px] text-slate-600 dark:text-slate-400">
            {baseItems.length > 0 ? (
              baseItems.map((i, idx) => (
                <span key={idx} className="bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-md font-mono text-[10.5px] border border-emerald-200/50 dark:border-emerald-900/40">
                  {i.name} ({i.drops}d)
                </span>
              ))
            ) : (
              <span className="italic text-slate-400 dark:text-slate-500 text-[11px]">Geen basisnoot / fixateur geselecteerd</span>
            )}
          </div>
        </div>
      </div>

      {/* Advisory feedback pill */}
      <div className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${badgeColor}`}>
        <Sparkles className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.75} />
        <p className="flex-1 font-normal">{advice}</p>
      </div>
    </div>
  );
}
