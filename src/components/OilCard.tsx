import React from "react";
import { EssentialOil, getOilPhoto } from "../data";
import { Star, ArrowRight, Edit3, Trash2, Droplets } from "lucide-react";

interface OilCardProps {
  oil: EssentialOil;
  onEdit: (oil: EssentialOil) => void;
  onDelete: (id: string) => void;
  onRatingChange: (id: string, newRating: number) => void;
  onStockChange: (id: string, newStock: EssentialOil["stock"]) => void;
  onFocus?: (oil: EssentialOil) => void;
}

export default function OilCard({
  oil,
  onEdit,
  onDelete,
  onRatingChange,
  onStockChange,
  onFocus,
}: OilCardProps) {
  // Stock status styles with floating indicator
  const stockIndicator = {
    Voldoende: "bg-emerald-500",
    "Bijna op": "bg-amber-500",
    Op: "bg-rose-500",
    "Niet in bezit": "bg-slate-400",
  }[oil.stock] || "bg-amber-500";

  return (
    <div
      id={`oil-card-${oil.id}`}
      style={{
        borderColor: oil.colorHex,
        borderWidth: "2px",
        borderStyle: "solid",
        boxShadow: `0 12px 28px -10px ${oil.colorHex}35, 0 2px 8px -2px ${oil.colorHex}20`
      }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col h-full relative group transition-all duration-500 hover:scale-[1.015]"
    >
      {/* 🌸 Colored Top Accent Line matching the card border */}
      <div 
        style={{ backgroundColor: oil.colorHex }}
        className="h-1.5 w-full transition-all duration-300 group-hover:h-2 opacity-95"
      />

      {/* 🌿 Botanical & Essential Oil Visual Stage */}
      <div 
        onClick={() => onFocus?.(oil)}
        className="relative h-48 w-full overflow-hidden bg-slate-100 cursor-pointer"
      >
        <img
          src={getOilPhoto(oil)}
          alt={oil.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Soft atmospheric gradient for text readability and weightlessness */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent pointer-events-none" />

        {/* Floating status tag 1: Geurnoot (e.g. Basisnoot) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="glass-tag-floating text-[10px] tracking-[0.16em] uppercase font-mono font-medium text-slate-800 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <span 
              className="w-2 h-2 rounded-full inline-block shadow-xs" 
              style={{ backgroundColor: oil.colorHex }}
            />
            <span>{oil.noteType}noot</span>
          </span>
        </div>

        {/* Floating status tag 2: Voorraad Status (e.g. Voldoende) */}
        <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <select
              id={`stock-select-${oil.id}`}
              value={oil.stock}
              onChange={(e) => onStockChange(oil.id, e.target.value as EssentialOil["stock"])}
              className="glass-tag-floating text-[10px] tracking-wider font-mono font-medium text-slate-800 pl-4 pr-3 py-1 rounded-full cursor-pointer outline-none appearance-none hover:text-slate-950 transition-colors shadow-sm"
              title="Wijzig voorraadstatus"
            >
              <option value="Voldoende">Voldoende</option>
              <option value="Bijna op">Bijna op</option>
              <option value="Op">Op</option>
              <option value="Niet in bezit">Niet in bezit</option>
            </select>
            <span className={`w-1.5 h-1.5 rounded-full ${stockIndicator} absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none`} />
          </div>
        </div>

        {/* Category Pill Tag on bottom of image */}
        <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5">
          <span className="backdrop-blur-md bg-slate-950/65 border border-white/20 text-white text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-md shadow-xs flex items-center gap-1">
            <span>{oil.icon || "🌿"}</span>
            <span>{oil.category}</span>
          </span>
        </div>
      </div>

      {/* 🌿 Card Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Header: Brand, Volume, Names */}
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.18em] uppercase text-slate-500 mb-1.5">
            <span>{oil.brand || "Artisanaal"}</span>
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              <Droplets className="w-3 h-3 text-amber-600/80" strokeWidth={1.5} />
              {oil.volumeMl} ml
            </span>
          </div>

          {/* Product Name in refined elegant sans-serif */}
          <h3 
            onClick={() => onFocus?.(oil)}
            className="text-lg font-normal tracking-tight text-slate-900 group-hover:text-amber-950 transition-colors cursor-pointer"
          >
            {oil.name}
          </h3>

          {/* Botanical Latin Name */}
          <p className="text-xs text-slate-500 italic font-light tracking-wide mt-0.5">
            {oil.botanicalName}
          </p>
        </div>

        {/* Dutch Description & Discreet 'Lees meer' */}
        <div className="space-y-1.5">
          <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-2">
            {oil.description}
          </p>
          <button
            onClick={() => onFocus?.(oil)}
            className="group/link text-[11px] font-medium text-slate-500 hover:text-amber-700 inline-flex items-center gap-1 transition-colors pt-0.5"
          >
            <span>Lees meer</span>
            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" strokeWidth={1.4} />
          </button>
        </div>

        {/* Minimalist Floating Scent & Property Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {oil.properties.slice(0, 3).map((prop, i) => (
            <span
              key={i}
              className="text-[10px] font-mono text-slate-700 bg-white/70 border border-slate-200/80 px-2 py-0.5 rounded-full tracking-wide shadow-2xs"
            >
              ✦ {prop}
            </span>
          ))}
          {oil.properties.length > 3 && (
            <span className="text-[10px] font-mono text-slate-500 px-1 py-0.5">
              +{oil.properties.length - 3}
            </span>
          )}
        </div>

        {/* Footer: Rating Stars and Discreet Controls */}
        <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
          {/* Star rating with warm amber glow */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((starValue) => {
              const active = starValue <= oil.rating;
              return (
                <button
                  key={starValue}
                  id={`oil-${oil.id}-star-${starValue}`}
                  onClick={() => onRatingChange(oil.id, starValue)}
                  className="p-0.5 hover:scale-125 transition-transform"
                  title={`${starValue} sterren`}
                >
                  <Star
                    className={`w-3.5 h-3.5 transition-colors ${
                      active
                        ? "text-amber-500 fill-amber-400 drop-shadow-[0_1px_3px_rgba(245,158,11,0.4)]"
                        : "text-slate-300 hover:text-slate-400"
                    }`}
                    strokeWidth={1.2}
                  />
                </button>
              );
            })}
          </div>

          {/* Discreet Edit & Delete Controls */}
          <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
            <button
              id={`bt-edit-${oil.id}`}
              onClick={() => onEdit(oil)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white/70 transition-all"
              title="Bewerk specificaties"
            >
              <Edit3 className="w-3.5 h-3.5" strokeWidth={1.3} />
            </button>
            <button
              id={`bt-delete-${oil.id}`}
              onClick={() => onDelete(oil.id)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-white/70 transition-all"
              title="Verwijder"
            >
              <Trash2 className="w-3.5 h-3.5" strokeWidth={1.3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
