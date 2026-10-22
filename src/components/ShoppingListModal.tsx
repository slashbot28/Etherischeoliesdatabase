import React, { useState } from "react";
import { EssentialOil } from "../data";
import {
  ShoppingCart,
  Check,
  Copy,
  Printer,
  X,
  Plus,
  Trash2,
  Share2,
  ExternalLink,
  Droplets,
  PackageCheck,
  AlertCircle
} from "lucide-react";

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  oils: EssentialOil[];
  onUpdateStock: (id: string, newStock: EssentialOil["stock"]) => void;
}

export default function ShoppingListModal({
  isOpen,
  onClose,
  oils,
  onUpdateStock,
}: ShoppingListModalProps) {
  if (!isOpen) return null;

  // Filter criteria: Op, Bijna op, Niet in bezit
  const [filter, setFilter] = useState<"all" | "empty" | "low" | "not_owned">("all");
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  // Filter oils
  const neededOils = oils.filter((o) => {
    if (filter === "empty") return o.stock === "Op";
    if (filter === "low") return o.stock === "Bijna op";
    if (filter === "not_owned") return o.stock === "Niet in bezit";
    return o.stock === "Op" || o.stock === "Bijna op" || o.stock === "Niet in bezit";
  });

  const toggleCheck = (id: string) => {
    const next = new Set(checkedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCheckedIds(next);
  };

  const handleCopyWhatsApp = () => {
    const empty = oils.filter((o) => o.stock === "Op");
    const low = oils.filter((o) => o.stock === "Bijna op");
    const notOwned = oils.filter((o) => o.stock === "Niet in bezit");

    let text = "🛒 *Mijn Etherische Oliën Boodschappenlijst*\n";
    text += `Gegenereerd op ${new Date().toLocaleDateString("nl-NL")}\n\n`;

    if (empty.length > 0) {
      text += "🔴 *OP (Direct nodig):*\n";
      empty.forEach((o) => {
        text += `• ${o.name} (${o.brand || "Artisanaal"}) - ${o.volumeMl}ml\n`;
      });
      text += "\n";
    }

    if (low.length > 0) {
      text += "🟠 *BIJNA OP:*\n";
      low.forEach((o) => {
        text += `• ${o.name} (${o.brand || "Artisanaal"}) - ${o.volumeMl}ml\n`;
      });
      text += "\n";
    }

    if (notOwned.length > 0) {
      text += "⚪ *VERLANGLIJST (Nog niet in bezit):*\n";
      notOwned.forEach((o) => {
        text += `• ${o.name} - ${o.botanicalName}\n`;
      });
    }

    text += "\n🌿 Samengesteld via Etherische Oliën Studio";

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleMarkAsPurchased = (id: string) => {
    onUpdateStock(id, "Voldoende");
  };

  const emptyCount = oils.filter((o) => o.stock === "Op").length;
  const lowCount = oils.filter((o) => o.stock === "Bijna op").length;
  const notOwnedCount = oils.filter((o) => o.stock === "Niet in bezit").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel-elevated w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
              <ShoppingCart className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Slimme Boodschappenlijst &amp; Wishlist
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {neededOils.length} artikelen vereisen aandacht in je voorraad
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 sm:px-6 pt-3 pb-2 flex flex-wrap gap-2 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/30">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              filter === "all"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            Alles ({emptyCount + lowCount + notOwnedCount})
          </button>
          <button
            onClick={() => setFilter("empty")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === "empty"
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Op ({emptyCount})
          </button>
          <button
            onClick={() => setFilter("low")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === "low"
                ? "bg-amber-500 text-white shadow-xs"
                : "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Bijna op ({lowCount})
          </button>
          <button
            onClick={() => setFilter("not_owned")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === "not_owned"
                ? "bg-slate-700 text-white shadow-xs"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Niet in bezit ({notOwnedCount})
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-2.5">
          {neededOils.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-medium text-slate-800 dark:text-slate-200">
                Je voorraad is helemaal op orde!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Er zijn momenteel geen oliën in deze categorie die op zijn of aangeschaft moeten worden.
              </p>
            </div>
          ) : (
            neededOils.map((oil) => {
              const isChecked = checkedIds.has(oil.id);
              const badgeStyle = {
                Op: "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-900",
                "Bijna op": "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-900",
                "Niet in bezit": "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
                Voldoende: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300",
              }[oil.stock];

              return (
                <div
                  key={oil.id}
                  onClick={() => toggleCheck(oil.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60 line-through"
                      : "bg-white dark:bg-slate-800/80 border-slate-200/90 dark:border-slate-700/80 shadow-2xs hover:border-amber-300 dark:hover:border-amber-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                        isChecked
                          ? "bg-emerald-600 text-white"
                          : "border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-transparent hover:border-amber-500"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-slate-900 dark:text-slate-100">
                          {oil.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {oil.volumeMl}ml
                        </span>
                        <span className="text-xs">{oil.icon || "🌿"}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        {oil.botanicalName} · {oil.brand || "Artisanaal"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                      {oil.stock}
                    </span>
                    <button
                      title="Markeer als gekocht (zet op Voldoende)"
                      onClick={() => handleMarkAsPurchased(oil.id)}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                    >
                      ✓ Gekocht
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {checkedIds.size} van {neededOils.length} afgevinkt
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Lijst</span>
            </button>
            <button
              onClick={handleCopyWhatsApp}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Gekopieerd!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Kopieer voor WhatsApp</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
