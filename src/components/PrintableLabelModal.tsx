import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Printer, X, Download, QrCode, Sparkles, Check } from "lucide-react";

interface PrintableLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeTitle: string;
  bottleSizeMl: number;
  targetRoom: string;
  ingredients: { name: string; drops: number; noteType?: string }[];
  alcoholMl: number;
  waterMl: number;
}

export default function PrintableLabelModal({
  isOpen,
  onClose,
  recipeTitle,
  bottleSizeMl,
  targetRoom,
  ingredients,
  alcoholMl,
  waterMl,
}: PrintableLabelModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [labelTheme, setLabelTheme] = useState<"botanical" | "vintage" | "modern">("botanical");
  const [copiedLink, setCopiedLink] = useState(false);

  // Generate deep-link URL that re-opens this exact recipe
  const recipeDataParam = encodeURIComponent(
    JSON.stringify({
      title: recipeTitle,
      size: bottleSizeMl,
      room: targetRoom,
      ings: ingredients.map((i) => ({ name: i.name, drops: i.drops, noteType: i.noteType })),
    })
  );

  const shareUrl = `https://etherischeoliesdatabase.web.app/?tab=roomsprays&recipeData=${recipeDataParam}`;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(shareUrl, {
        width: 180,
        margin: 1,
        color: {
          dark: "#0f172a",
          light: "#ffffff00",
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error("QR Code generation error:", err));
    }
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel-elevated w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <QrCode className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Printklaar Flesetiket &amp; QR-Code
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Scanbaar etiket voor sprayflesje van {bottleSizeMl} ml
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

        {/* Style selector */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">Etiket Thema:</span>
          <div className="flex gap-1.5">
            {[
              { id: "botanical", label: "🌿 Botanisch" },
              { id: "vintage", label: "🏺 Apotheker" },
              { id: "modern", label: "✨ Minimal" },
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => setLabelTheme(theme.id as any)}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  labelTheme === theme.id
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>

        {/* Label Preview Stage */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-100/70 dark:bg-slate-950/60">
          
          {/* THE PRINTABLE LABEL CONTAINER */}
          <div
            id="printable-bottle-label"
            className={`w-full max-w-sm rounded-2xl p-5 sm:p-6 transition-all shadow-md relative overflow-hidden ${
              labelTheme === "botanical"
                ? "bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-50 text-emerald-950 border-2 border-emerald-800/40"
                : labelTheme === "vintage"
                ? "bg-amber-50/90 text-amber-950 border-2 border-amber-900/40 font-serif"
                : "bg-white text-slate-900 border-2 border-slate-900 font-sans"
            }`}
          >
            {/* Decorative corners */}
            <div className="border border-current/20 p-4 rounded-xl flex flex-col justify-between space-y-4">
              
              {/* Header */}
              <div className="text-center border-b border-current/15 pb-2.5">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase opacity-70 block mb-0.5">
                  Artisanal Aromatherapy
                </span>
                <h2 className="text-lg font-bold tracking-tight uppercase leading-snug">
                  {recipeTitle || "Botanical Roomspray"}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-1 text-[11px] font-mono opacity-80">
                  <span>{targetRoom}</span>
                  <span>•</span>
                  <span className="font-bold">{bottleSizeMl} ML</span>
                </div>
              </div>

              {/* Formula & QR Row */}
              <div className="flex items-center justify-between gap-3 pt-1">
                {/* Ingredients list */}
                <div className="flex-1 text-[11px] space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider opacity-60 block font-bold">
                    Receptuur (druppels):
                  </span>
                  {ingredients.slice(0, 5).map((ing, i) => (
                    <div key={i} className="flex justify-between items-center text-[10.5px]">
                      <span className="font-medium truncate mr-1.5">• {ing.name}</span>
                      <span className="font-mono font-bold opacity-80 shrink-0">{ing.drops}d</span>
                    </div>
                  ))}
                  <div className="pt-1 text-[9.5px] opacity-70 font-mono">
                    Basis: {alcoholMl}ml alc. / {waterMl}ml aqua
                  </div>
                </div>

                {/* QR Code Container */}
                <div className="flex flex-col items-center shrink-0 text-center pl-2 border-l border-current/15">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="Navul QR Code"
                      className="w-20 h-20 bg-white p-1 rounded-lg shadow-2xs border border-current/20"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-slate-200 animate-pulse rounded-lg" />
                  )}
                  <span className="text-[8px] font-mono mt-1 opacity-70 max-w-[80px] leading-tight">
                    Scan voor recept
                  </span>
                </div>
              </div>

              {/* Label Footer */}
              <div className="border-t border-current/15 pt-2 text-center text-[9px] font-mono opacity-65 flex items-center justify-between">
                <span>100% PUUR BOTANISCH</span>
                <span>SCHUDDEN VOOR GEBRUIK</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center max-w-xs">
            Tip: Plak dit etiket op je sprayflesje. Iedereen met een smartphone kan de QR-code scannen om direct het navulrecept te openen!
          </p>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-950/30">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <QrCode className="w-3.5 h-3.5" />}
            <span>{copiedLink ? "Link Gekopieerd!" : "Kopieer QR-Link"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 transition-all flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Etiket</span>
          </button>
        </div>
      </div>
    </div>
  );
}
