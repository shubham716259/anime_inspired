import React from "react";
import { ArrowUp, Sparkles, BookOpen } from "lucide-react";
import { magicSound } from "../utils/soundEffects";

export default function Footer() {
  const scrollToTop = () => {
    magicSound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#07090e] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff2e88] to-[#ffd700] p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0d0f17] rounded-[10px] flex items-center justify-center text-[#ff2e88] font-['Cinzel_Decorative'] font-black text-lg">
                  ♣
                </div>
              </div>
              <span className="font-['Cinzel'] font-black text-2xl tracking-widest text-white">
                BLACK CLOVER 3D
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light max-w-md">
              A comprehensive 3D interactive tribute to the world of Black Clover, celebrating the indomitable spirit of Asta, Yuno, Captain Yami, and the Magic Knights of the Clover Kingdom.
            </p>

            <blockquote className="p-3.5 rounded-xl bg-black/60 border-l-2 border-[#ff2e88] text-xs italic text-slate-300">
              “Surpass your limits right here, right now! The fifth leaf holds the devil, but your willpower commands fate.”
            </blockquote>
          </div>

          <div className="md:col-span-3 space-y-3 font-['Rajdhani'] uppercase tracking-wider text-xs">
            <h4 className="font-['Cinzel'] font-bold text-sm text-white">Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#hero" onClick={() => magicSound.playClick()} className="hover:text-[#ff2e88] transition-colors">• Character Showcase</a></li>
              <li><a href="#roster" onClick={() => magicSound.playClick()} className="hover:text-[#ff2e88] transition-colors">• 3D Grimoire Roster</a></li>
              <li><a href="#squads" onClick={() => magicSound.playClick()} className="hover:text-[#ff2e88] transition-colors">• Knight Squads</a></li>
              <li><a href="#arcs" onClick={() => magicSound.playClick()} className="hover:text-[#ff2e88] transition-colors">• Saga Timeline</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4 flex flex-col items-start md:items-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="px-5 py-2.5 rounded-xl bg-black/60 hover:bg-black/90 border border-white/10 hover:border-[#ff2e88]/50 text-xs font-bold font-['Rajdhani'] uppercase tracking-wider text-slate-200 transition-all flex items-center gap-2 group shadow-lg"
            >
              <span>Return To Summit</span>
              <ArrowUp className="w-4 h-4 text-[#ff2e88] group-hover:-translate-y-1 transition-transform" />
            </button>
            <div className="text-[11px] text-slate-500 font-mono text-left md:text-right">
              Powered by React 19, Three.js WebGL, and Web Audio API.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2026 Black Clover 3D Arcana. Fan tribute to Yūki Tabata's Black Clover.</p>
          <div className="flex items-center gap-2">
            <span>Never giving up is our magic</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff2e88]" />
          </div>
        </div>
      </div>
    </footer>
  );
}

