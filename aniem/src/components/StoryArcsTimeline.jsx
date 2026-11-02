import React from "react";
import { BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import { BLACK_CLOVER_ARCS } from "../data/blackCloverData";
import { magicSound } from "../utils/soundEffects";

export default function StoryArcsTimeline() {
  return (
    <section id="arcs" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#0d0f17]">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold uppercase tracking-widest">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>The Chronicle of the Wizard King</span>
        </div>
        <h2 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
          BLACK CLOVER SAGA TIMELINE
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
          From the rural church of Hage to the cataclysmic battle against the underworld devils, trace the complete chronological journey of Asta and the Magic Knights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {BLACK_CLOVER_ARCS.map((arc, idx) => (
          <div
            key={arc.title}
            onMouseEnter={() => magicSound.playPageRustle()}
            className="p-6 rounded-3xl bg-gradient-to-b from-[#181126] via-[#0d0f17] to-black border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black text-[#ffd700] px-2.5 py-1 rounded bg-[#ffd700]/10 border border-[#ffd700]/30">
                ARC 0{idx + 1}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {arc.episodes}
              </span>
            </div>

            <h3 className="font-['Cinzel'] font-bold text-lg text-white">
              {arc.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {arc.summary}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

