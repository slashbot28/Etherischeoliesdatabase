import { EssentialOil } from "../data";
import { Package, Heart, AlertCircle, Layers } from "lucide-react";

interface QuickStatsProps {
  oils: EssentialOil[];
}

export default function QuickStats({ oils }: QuickStatsProps) {
  const totalInCabinet = oils.filter((o) => o.stock !== "Niet in bezit").length;
  const lowStock = oils.filter((o) => o.stock === "Bijna op").length;
  const outOfStock = oils.filter((o) => o.stock === "Op").length;
  const favorites = oils.filter((o) => o.rating === 5).length;

  // Distribution of note types
  const notesCount = oils.reduce(
    (acc, oil) => {
      if (oil.stock !== "Niet in bezit") {
        acc[oil.noteType] = (acc[oil.noteType] || 0) + 1;
      }
      return acc;
    },
    { Top: 0, Midden: 0, Basis: 0 } as Record<string, number>
  );

  const totalNotes = (notesCount.Top + notesCount.Midden + notesCount.Basis) || 1;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* KPI Card 1: In Collectie */}
      <div 
        id="stat-total" 
        className="glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group"
      >
        {/* Subtle diffused amber accent on hover */}
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-700 pointer-events-none" />
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-medium text-slate-500">
            In Collectie
          </span>
          <div className="w-8 h-8 rounded-xl glass-tag-floating flex items-center justify-center text-slate-700 group-hover:text-amber-700 transition-colors">
            <Package className="w-4 h-4" strokeWidth={1.3} />
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <p className="text-3xl sm:text-4xl font-extralight tracking-tight text-slate-900">
            {totalInCabinet}
          </p>
          <span className="text-[11px] font-mono text-slate-400">
            van {oils.length} formules
          </span>
        </div>
      </div>

      {/* KPI Card 2: Favorieten */}
      <div 
        id="stat-favorites" 
        className="glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-700 pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-medium text-slate-500">
            Top Keuzes
          </span>
          <div className="w-8 h-8 rounded-xl glass-tag-floating flex items-center justify-center text-slate-700 group-hover:text-amber-700 transition-colors">
            <Heart className="w-4 h-4" strokeWidth={1.3} />
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <p className="text-3xl sm:text-4xl font-extralight tracking-tight text-slate-900">
            {favorites}
          </p>
          <span className="text-[11px] font-mono text-amber-600 font-medium">
            ★ 5.0 waardering
          </span>
        </div>
      </div>

      {/* KPI Card 3: Voorraadstatus */}
      <div 
        id="stat-warnings" 
        className="glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-700 pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-medium text-slate-500">
            Voorraadpeil
          </span>
          <div className="w-8 h-8 rounded-xl glass-tag-floating flex items-center justify-center text-slate-700 group-hover:text-amber-700 transition-colors">
            <AlertCircle className="w-4 h-4" strokeWidth={1.3} />
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <p className="text-3xl sm:text-4xl font-extralight tracking-tight text-slate-900">
            {lowStock + outOfStock}
          </p>
          <span className="text-[11px] font-mono text-slate-400">
            {lowStock} laag · {outOfStock} op
          </span>
        </div>
      </div>

      {/* KPI Card 4: Geurnoot Harmonische Verdeling */}
      <div 
        id="stat-notes" 
        className="glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-700 pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-medium text-slate-500">
            Geurnoot Balans
          </span>
          <div className="w-8 h-8 rounded-xl glass-tag-floating flex items-center justify-center text-slate-700 group-hover:text-amber-700 transition-colors">
            <Layers className="w-4 h-4" strokeWidth={1.3} />
          </div>
        </div>

        {/* Minimalist proportional distribution bar */}
        <div className="space-y-2">
          <div className="h-1.5 w-full rounded-full bg-slate-200/70 overflow-hidden flex">
            <div 
              style={{ width: `${(notesCount.Top / totalNotes) * 100}%` }} 
              className="bg-amber-400 h-full transition-all duration-500" 
              title={`Top: ${notesCount.Top}`}
            />
            <div 
              style={{ width: `${(notesCount.Midden / totalNotes) * 100}%` }} 
              className="bg-slate-400 h-full transition-all duration-500" 
              title={`Midden: ${notesCount.Midden}`}
            />
            <div 
              style={{ width: `${(notesCount.Basis / totalNotes) * 100}%` }} 
              className="bg-slate-700 h-full transition-all duration-500" 
              title={`Basis: ${notesCount.Basis}`}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              <span>Top {notesCount.Top}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
              <span>Mid {notesCount.Midden}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700 inline-block" />
              <span>Base {notesCount.Basis}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
