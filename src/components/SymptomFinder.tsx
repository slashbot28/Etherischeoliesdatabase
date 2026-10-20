import { useState } from "react";
import { EssentialOil, SYMPTOMS_MAP } from "../data";
import { Compass, Sparkles, AlertTriangle, ArrowRight } from "lucide-react";

interface SymptomFinderProps {
  oils: EssentialOil[];
  onSelectOil: (oil: EssentialOil) => void;
}

export default function SymptomFinder({ oils, onSelectOil }: SymptomFinderProps) {
  const [selectedSymptom, setSelectedSymptom] = useState<typeof SYMPTOMS_MAP[0] | null>(null);

  // Find oils matching properties in current symptom mapping
  const getMatchingOils = (symptom: typeof SYMPTOMS_MAP[0]) => {
    return oils.filter((oil) => {
      const matchesProperty = oil.properties.some((prop) =>
        symptom.matchingProperties.includes(prop)
      );
      return matchesProperty;
    });
  };

  const matchingOilsList = selectedSymptom ? getMatchingOils(selectedSymptom) : [];

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-7">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/60 pb-5">
        <div className="w-9 h-9 rounded-xl glass-tag-floating flex items-center justify-center text-amber-700">
          <Compass className="w-4 h-4" strokeWidth={1.3} />
        </div>
        <div>
          <h2 className="text-lg font-light tracking-tight text-slate-900">
            Symptoom & Doelgerichte Gids
          </h2>
          <p className="text-xs font-light text-slate-500 mt-0.5">
            Selecteer een therapeutische intentie om de corresponderende botanische moleculen te lokaliseren.
          </p>
        </div>
      </div>

      {/* Grid of therapeutic objectives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SYMPTOMS_MAP.map((sym) => {
          const count = getMatchingOils(sym).length;
          const isSelected = selectedSymptom?.name === sym.name;

          return (
            <button
              type="button"
              id={`symptom-card-${sym.name.replace(/\s+/g, "-")}`}
              key={sym.name}
              onClick={() => setSelectedSymptom(isSelected ? null : sym)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-[0_8px_24px_rgba(217,119,6,0.2)] -translate-y-0.5"
                  : "glass-card hover:-translate-y-0.5 text-slate-800"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`text-sm font-normal tracking-wide ${isSelected ? "text-white" : "text-slate-900"}`}>
                  {sym.name}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isSelected ? "bg-white/20 text-white" : "glass-tag-floating text-slate-600 font-medium"
                }`}>
                  {count} {count === 1 ? "olie" : "oliën"}
                </span>
              </div>
              <p className={`text-xs font-light leading-relaxed line-clamp-2 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                {sym.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Results panel when selected */}
      {selectedSymptom ? (
        <div className="glass-panel-elevated rounded-2xl p-6 space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" strokeWidth={1.3} />
            <h3 className="text-xs font-mono tracking-[0.16em] uppercase font-medium text-slate-800">
              Gekoppelde Formules voor "{selectedSymptom.name}"
            </h3>
          </div>

          {matchingOilsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchingOilsList.map((oil) => {
                return (
                  <div
                    id={`symptom-result-${oil.id}`}
                    key={oil.id}
                    className="glass-card rounded-xl p-4 relative group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-normal text-slate-900 flex items-center gap-1.5">
                          <span>{oil.name}</span>
                          <span className="text-[11px] text-slate-400 italic font-light">
                            ({oil.botanicalName})
                          </span>
                        </h4>
                        
                        {/* Matching properties chips */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {oil.properties
                            .filter((p) => selectedSymptom.matchingProperties.includes(p))
                            .map((p, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono bg-amber-500/10 text-amber-900 border border-amber-400/20 px-2 py-0.5 rounded-full"
                              >
                                ✦ {p}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Stock Badge */}
                      <span className="glass-tag-floating text-[10px] font-mono text-slate-700 px-2 py-0.5 rounded-full">
                        {oil.stock}
                      </span>
                    </div>

                    {oil.safetyPrecautions && oil.safetyPrecautions.length > 0 && (
                      <div className="mt-3 text-[10px] text-slate-600 bg-white/40 p-2 rounded-lg border border-white/80 leading-normal flex items-start gap-1.5">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0 text-amber-600 mt-0.5" strokeWidth={1.3} />
                        <span className="font-light">{oil.safetyPrecautions[0]}</span>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between border-t border-slate-200/50 pt-2.5">
                      <span className="text-[10px] font-mono text-slate-400">
                        {oil.noteType}noot · {oil.brand || "Collectie"}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectOil(oil)}
                        className="text-xs text-slate-600 hover:text-amber-800 font-medium inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Focus detail</span>
                        <ArrowRight className="w-3 h-3" strokeWidth={1.3} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-6 glass-panel rounded-xl text-slate-500 text-xs font-light">
              Geen oliën in uw huidige collectie matchen direct met de eigenschappen van {selectedSymptom.name}.
            </div>
          )}

          {/* Golden tips */}
          <div className="glass-panel p-4 rounded-xl text-xs space-y-1 text-slate-700 border border-amber-300/40">
            <span className="font-mono text-[10px] uppercase tracking-wider text-amber-800 font-medium flex items-center gap-1.5">
              ✦ Synergetisch Formuleringsinzicht:
            </span>
            <p className="font-light leading-relaxed">
              Voor {selectedSymptom.name} creëert u maximale harmonie door een <span className="font-medium">Topnoot</span> (vluchtige prikkel), een <span className="font-medium">Middennoot</span> (therapeutisch hart) en een <span className="font-medium">Basisnoot</span> (stabiliserende gronding) te combineren.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center p-10 glass-panel rounded-2xl text-slate-400 text-xs font-light space-y-2">
          <p className="text-2xl select-none">✦</p>
          <p>Selecteer hierboven een therapeutische intentie om de moleculaire compositie te verkennen.</p>
        </div>
      )}
    </div>
  );
}
