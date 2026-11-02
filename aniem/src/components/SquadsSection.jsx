import React, { useState } from "react";
import { Shield, Sparkles, Star, Award, CheckCircle } from "lucide-react";
import { BLACK_CLOVER_SQUADS } from "../data/blackCloverData";
import { magicSound } from "../utils/soundEffects";
import confetti from "canvas-confetti";

export default function SquadsSection() {
  const [pledgedSquad, setPledgedSquad] = useState(null);

  const handlePledge = (squad) => {
    setPledgedSquad(squad.id);
    magicSound.playGrimoireUnseal();

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: [squad.color, "#ffd700", "#ff2e88"]
      });
    } catch {}
  };

  return (
    <section id="squads" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#0d0f17]">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-[#ffd700]/40 text-[#ffd700] text-xs font-mono font-bold uppercase tracking-widest">
          <Award className="w-4 h-4 text-[#ffd700]" />
          <span>The Sovereign Knight Squads</span>
        </div>
        <h2 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
          CHOOSE YOUR SQUAD. SURPASS YOUR LIMITS.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
          From the chaotic headquarters of Yami's Black Bulls to the royal perfection of the Golden Dawn, pledge your allegiance to a magic order and fight for the Clover Kingdom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {BLACK_CLOVER_SQUADS.map((squad) => {
          const isPledged = pledgedSquad === squad.id;
          return (
            <div
              key={squad.id}
              className="group relative rounded-3xl p-6 bg-gradient-to-b from-[#181126]/80 via-[#0d0f17] to-black border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div
                className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full opacity-10 group-hover:opacity-30 transition-opacity blur-xl pointer-events-none"
                style={{ backgroundColor: squad.color }}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md font-bold"
                    style={{
                      backgroundColor: `${squad.color}20`,
                      color: squad.color,
                      border: `1px solid ${squad.color}40`
                    }}
                  >
                    {squad.ranking}
                  </span>
                  <div className="flex items-center gap-1 text-[#ffd700]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-mono font-bold">TOP SQUAD</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-['Cinzel'] font-bold text-xl text-white group-hover:text-amber-200 transition-colors">
                    {squad.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-['Rajdhani'] uppercase tracking-wider font-semibold">
                    {squad.japanese}
                  </p>
                </div>

                <div className="text-xs text-slate-300 font-mono">
                  CAPTAIN: <strong className="text-white">{squad.captain}</strong>
                </div>

                <p className="text-xs text-slate-300/90 leading-relaxed font-light">
                  {squad.description}
                </p>

                <blockquote
                  className="text-xs italic pl-3 border-l-2 py-1 text-slate-400"
                  style={{ borderColor: squad.color }}
                >
                  {squad.motto}
                </blockquote>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => handlePledge(squad)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 font-['Rajdhani'] ${
                    isPledged
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/40"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30"
                  }`}
                >
                  {isPledged ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-white" />
                      <span>Sworn to Squad</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      <span>Pledge Allegiance</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

