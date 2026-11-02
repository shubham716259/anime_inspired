import React, { useState } from "react";
import { Users, Sparkles, Swords, BookOpen, Star, Shield, Flame, Zap } from "lucide-react";
import { BLACK_CLOVER_CHARACTERS, BLACK_CLOVER_SQUADS } from "../data/blackCloverData";
import { magicSound } from "../utils/soundEffects";

export default function BlackCloverRosterSection({ onSelectCharacter }) {
  const [selectedSquad, setSelectedSquad] = useState("all");

  const filteredCharacters = selectedSquad === "all"
    ? BLACK_CLOVER_CHARACTERS
    : BLACK_CLOVER_CHARACTERS.filter((c) => {
        if (selectedSquad === "black_bulls") return c.squad.includes("Black Bulls");
        if (selectedSquad === "golden_dawn") return c.squad.includes("Golden Dawn");
        if (selectedSquad === "crimson_lion") return c.squad.includes("Crimson Lion");
        if (selectedSquad === "silver_eagles") return c.squad.includes("Silver Eagles");
        return true;
      });

  return (
    <section id="roster" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#0d0f17]">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-950/60 border border-[#ff2e88]/40 text-[#ff2e88] text-xs font-mono font-bold uppercase tracking-widest">
          <Users className="w-4 h-4 text-[#ff2e88]" />
          <span>Magic Knights of the Clover Kingdom</span>
        </div>
        <h2 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
          CHARACTER CHRONICLES & 3D GRIMOIRES
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
          Explore the complete stories, grimoires, affinities, and combat metrics of every iconic mage from the Black Bulls, Golden Dawn, and the sovereign squads.
        </p>

        {/* Squad Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => {
              magicSound.playClick();
              setSelectedSquad("all");
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-['Rajdhani'] ${
              selectedSquad === "all"
                ? "bg-white text-black shadow-lg"
                : "bg-black/60 text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            All Mages ({BLACK_CLOVER_CHARACTERS.length})
          </button>
          {BLACK_CLOVER_SQUADS.map((squad) => (
            <button
              key={squad.id}
              type="button"
              onClick={() => {
                magicSound.playClick();
                setSelectedSquad(squad.id);
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-['Rajdhani'] ${
                selectedSquad === squad.id
                  ? "text-white shadow-lg"
                  : "bg-black/60 text-slate-400 hover:text-white border border-white/5"
              }`}
              style={{
                backgroundColor: selectedSquad === squad.id ? squad.color : undefined
              }}
            >
              {squad.name}
            </button>
          ))}
        </div>
      </div>

      {/* Character Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredCharacters.map((character) => (
          <div
            key={character.id}
            onMouseEnter={() => magicSound.playPageRustle()}
            className="group relative rounded-3xl p-6 bg-gradient-to-b from-[#181126]/90 via-[#0d0f17] to-black border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between overflow-hidden shadow-2xl"
          >
            {/* Background Aura */}
            <div
              className="absolute -right-10 -top-10 w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
              style={{ backgroundColor: character.accentColor }}
            />

            <div className="relative z-10 space-y-4">
              {/* Squad Tag & Affinity */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md font-bold bg-white/5 border border-white/10 text-slate-300">
                  {character.squad.split("(")[0]}
                </span>
                <span className="text-xs font-bold font-mono" style={{ color: character.accentColor }}>
                  {character.magicAffinity.split("(")[0]}
                </span>
              </div>

              {/* Character Header */}
              <div>
                <h3 className="font-['Cinzel'] font-black text-2xl text-white group-hover:text-pink-300 transition-colors">
                  {character.name}
                </h3>
                <p className="text-xs font-semibold text-slate-400 font-['Rajdhani'] uppercase tracking-wider">
                  {character.title}
                </p>
              </div>

              {/* Character Quote */}
              <blockquote className="p-3 rounded-xl bg-black/60 border-l-2 text-xs italic text-slate-300" style={{ borderColor: character.accentColor }}>
                {character.quote}
              </blockquote>

              {/* Brief Excerpt */}
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-light">
                {character.bio}
              </p>

              {/* Grimoire Tag */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2 text-xs font-mono text-slate-300">
                <BookOpen className="w-4 h-4 text-[#ffd700]" />
                <span className="truncate">{character.grimoire}</span>
              </div>

              {/* Quick Stat Bar */}
              <div className="space-y-1.5 pt-2 text-[11px] font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>COMBAT POWER</span>
                  <span className="text-white font-bold">{character.stats.strength}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${character.stats.strength}%`,
                      backgroundColor: character.accentColor
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Inspect Button */}
            <div className="relative z-10 mt-6 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  magicSound.playGrimoireUnseal();
                  onSelectCharacter(character);
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 font-['Rajdhani'] bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/30 hover:scale-[1.02] active:scale-95 shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>Inspect 3D Grimoire & Story</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

