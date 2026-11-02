import React from "react";
import { X, Sparkles, Swords, Zap, Shield, Flame, BookOpen, Volume2 } from "lucide-react";
import { magicSound } from "../utils/soundEffects";
import Grimoire3DViewer from "./Grimoire3DViewer";

export default function CharacterDetailModal({ character, isOpen, onClose }) {
  if (!isOpen || !character) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-gradient-to-br from-[#151024] via-[#0d0f17] to-black border-2 border-white/15 p-6 sm:p-8 shadow-[0_0_100px_rgba(255,46,136,0.3)] my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            magicSound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/10 text-white border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>{character.squad}</span>
            </div>
            <h2 className="font-['Cinzel'] font-black text-3xl sm:text-4xl text-white mt-2">
              {character.name} <span className="text-lg font-light text-slate-400 font-mono">({character.japanese})</span>
            </h2>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider font-['Rajdhani']" style={{ color: character.accentColor }}>
              {character.title} • {character.magicAffinity}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (character.id === "asta") magicSound.playSwordSlash();
              else if (character.id === "yuno") magicSound.playBeam();
              else if (character.id === "mereoleona") magicSound.playExplosion();
              else magicSound.playGrimoireUnseal();
            }}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-[#ffd700]" />
            <span>Audio Incantation</span>
          </button>
        </div>

        {/* Grid: 3D Grimoire Viewer on Left, Deep Character Story on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Real-Time 3D Grimoire Canvas */}
          <div className="lg:col-span-5 h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-white/10 relative">
            <Grimoire3DViewer
              activeTheme={character.themeKey}
            />
          </div>

          {/* Right Column: Deep Story & Grimoire Mechanics */}
          <div className="lg:col-span-7 space-y-5">
            {/* Character Quote */}
            <blockquote className="p-3.5 rounded-xl bg-black/60 border-l-4 text-sm italic text-slate-200" style={{ borderColor: character.accentColor }}>
              {character.quote}
            </blockquote>

            {/* Backstory & Biography */}
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ffd700] font-bold block">
                Chronicle & Origin
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {character.bio}
              </p>
            </div>

            {/* Grimoire & Weapons Arsenal */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff2e88] font-bold block">
                Grimoire: {character.grimoire}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {character.swords?.map((sword) => (
                  <div key={sword.name} className="p-2.5 rounded-xl bg-black/50 border border-white/5 space-y-0.5">
                    <span className="text-xs font-bold text-white font-['Rajdhani'] block">
                      {sword.name}
                    </span>
                    <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                      {sword.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Moves */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                Signature Spells & Ultimate Forms
              </span>
              <div className="space-y-2">
                {character.moves?.map((move) => (
                  <div key={move.name} className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white font-['Cinzel']">{move.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono">{move.type}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-light mt-0.5">{move.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Combat Stats */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                <span className="text-[10px] text-slate-400 font-mono block">STRENGTH</span>
                <span className="font-bold text-sm text-white font-mono">{character.stats.strength}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                <span className="text-[10px] text-slate-400 font-mono block">MANA</span>
                <span className="font-bold text-sm text-[#ffd700] font-mono">{character.stats.mana}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                <span className="text-[10px] text-slate-400 font-mono block">ANTI-MAGIC</span>
                <span className="font-bold text-sm text-[#ff2e88] font-mono">{character.stats.antiMagic}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                <span className="text-[10px] text-slate-400 font-mono block">SPEED</span>
                <span className="font-bold text-sm text-cyan-400 font-mono">{character.stats.speed}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

