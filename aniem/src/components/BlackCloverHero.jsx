import React, { useState } from "react";
import { Play, Swords, Star, ChevronLeft, ChevronRight, Sparkles, Search, Bell, User, X } from "lucide-react";
import { magicSound } from "../utils/soundEffects";

export default function BlackCloverHero({ onOpenArena, onSelectCharacter, characters }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const slides = [
    {
      id: "black-asta",
      badge: "#1 Most Popular Anime Arc",
      title: "BLACK CLOVER: DEVIL UNION",
      characterName: "Asta • Black Anti-Magic Mode",
      squad: "The Black Bulls (Vice Captain)",
      rating: "5.0",
      reviews: "324K Ratings",
      heroImage: "/black_asta_devil.jpg",
      characterId: "asta",
      synopsis:
        "Born completely devoid of mana in a realm where magic defines human worth, Asta refused to bow to despair. Through punishing physical conditioning, he earned a rusted five-leaf clover grimoire harboring an outcast devil. Channeling pure Anti-Magic, Asta sprouts black demon wings, manifests red-purple lightning, and wields colossal swords that sever and nullify any spell.",
    },
    {
      id: "key-visual",
      badge: "#1 Sovereign Knight Order",
      title: "MAGIC KNIGHTS OF CLOVER",
      characterName: "The Nine Sovereign Knight Squads",
      squad: "The Clover Kingdom Defense",
      rating: "4.9",
      reviews: "298K Ratings",
      heroImage: "/black_clover_key_visual.webp",
      characterId: "yuno",
      synopsis:
        "Divided into nine competing Magic Knight squads under Wizard King Julius Novachrono, the mages of the Clover Kingdom clash against cataclysmic invasions. Led by Captain Yami's legendary decree 'Surpass your limits right here, right now,' the Black Bulls and Golden Dawn fight side by side to defend humanity.",
    },
    {
      id: "aethel-mage",
      badge: "#1 The Summit Awakening",
      title: "AETHEL: THE ZERO MANA SAGA",
      characterName: "The Young Mage on the Windswept Cliff",
      squad: "The Ash Wardens",
      rating: "4.8",
      reviews: "182K Ratings",
      heroImage: "/anime_hero_mage_cliff.jpg",
      characterId: "asta",
      synopsis:
        "High on the windswept precipice overlooking the glowing crystalline spires of the kingdom, a determined young mage unseals the ancient brass-bound grimoire. As vivid emerald-green and radiant solar-gold spell rings erupt into the sunset clouds, he swears an indomitable oath to rewrite destiny.",
    }
  ];

  const active = slides[currentSlide];

  const nextSlide = () => {
    magicSound.playClick();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    magicSound.playClick();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen bg-[#0d0f17] text-white overflow-hidden flex flex-col justify-between select-none">
      {/* 1. TOP NAVBAR (MATCHING WATCH.TO) */}
      <header className="relative z-30 w-full px-6 py-5 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md">
        <nav className="flex items-center gap-6 text-sm font-semibold text-slate-300 font-['Rajdhani']">
          <a href="#hero" onClick={() => magicSound.playClick()} className="text-white hover:text-lime-400 transition-colors">
            Most Popular
          </a>
          <a href="#roster" onClick={() => magicSound.playClick()} className="hover:text-lime-400 transition-colors hidden sm:inline">
            All Characters
          </a>
          <a href="#squads" onClick={() => magicSound.playClick()} className="hover:text-lime-400 transition-colors hidden md:inline">
            Magic Squads
          </a>
          <a href="#arcs" onClick={() => magicSound.playClick()} className="hover:text-lime-400 transition-colors hidden lg:inline">
            Story Timeline
          </a>
        </nav>

        {/* Center Stylized Brand */}
        <div className="flex items-center gap-1.5 cursor-pointer">
          <span className="font-['Cinzel_Decorative'] font-black text-2xl tracking-wider text-lime-400 drop-shadow-[0_0_15px_#a3e635]">
            CLOVER
          </span>
          <span className="font-mono text-xs font-bold text-slate-400">.to</span>
        </div>

        {/* Right Search, Notification & Login */}
        <div className="flex items-center gap-4 text-slate-300">
          {searchOpen ? (
            <div className="flex items-center bg-slate-900 border border-lime-400/50 rounded-full px-3 py-1 animate-fadeIn">
              <Search className="w-3.5 h-3.5 text-lime-400 mr-2" />
              <input
                type="text"
                placeholder="Search Asta, Yami..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none w-36 sm:w-48 font-['Rajdhani']"
                autoFocus
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                magicSound.playClick();
                setSearchOpen(true);
              }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Search className="w-4 h-4 text-slate-300" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              magicSound.playGrimoireUnseal();
              if (onOpenArena) onOpenArena();
            }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-lime-400 animate-ping" />
          </button>

          <button
            type="button"
            onClick={() => {
              const char = characters.find((c) => c.id === active.characterId) || characters[0];
              onSelectCharacter(char);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-xs font-bold font-['Rajdhani'] tracking-wider text-white"
          >
            <User className="w-3.5 h-3.5 text-lime-400" />
            <span className="hidden sm:inline">Grimoire ID</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN CINEMATIC HERO SPOTLIGHT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow">
        {/* Left Side: Character & Story Information */}
        <div className="lg:col-span-6 space-y-5 z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-lime-400/20 border border-lime-400/50 text-lime-400 text-xs font-black uppercase tracking-widest font-mono shadow-[0_0_15px_rgba(163,230,53,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-lime-300 animate-spin" />
            <span>{active.badge}</span>
          </div>

          <h1 className="font-['Cinzel'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            {active.title}
          </h1>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 font-['Rajdhani'] uppercase tracking-wider">
            <span>{active.characterName}</span>
            <span>•</span>
            <span className="text-slate-400">{active.squad}</span>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-xl line-clamp-4 sm:line-clamp-none">
            {active.synopsis}
          </p>

          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400">
              <strong className="text-white font-bold">{active.rating}</strong> ({active.reviews})
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              type="button"
              onClick={() => {
                magicSound.playGrimoireUnseal();
                const char = characters.find((c) => c.id === active.characterId) || characters[0];
                onSelectCharacter(char);
              }}
              className="px-8 py-3.5 rounded-full bg-lime-400 hover:bg-lime-300 text-slate-950 font-black text-sm tracking-wider uppercase flex items-center gap-2.5 shadow-[0_0_30px_rgba(163,230,53,0.6)] hover:shadow-[0_0_45px_rgba(163,230,53,0.9)] transition-all duration-300 hover:scale-105 active:scale-95 font-['Rajdhani']"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Inspect 3D Story</span>
            </button>

            <button
              type="button"
              onClick={() => {
                magicSound.playSwordSlash();
                if (onOpenArena) onOpenArena();
              }}
              className="px-7 py-3.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/50 text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2.5 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 font-['Rajdhani']"
            >
              <Swords className="w-4 h-4 text-lime-400" />
              <span>Arena Clash</span>
            </button>
          </div>
        </div>

        {/* Right Side: High-Resolution Artwork & Overlapping Thumbnails */}
        <div className="lg:col-span-6 relative flex flex-col justify-end min-h-[380px] sm:min-h-[480px] lg:min-h-[580px]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            <img
              src={active.heroImage}
              alt={active.title}
              className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f17] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Overlapping Preview Thumbnail Cards (From user reference image) */}
          <div className="relative z-20 p-4 sm:p-6 flex items-center justify-end gap-3 sm:gap-4">
            {slides.map((slide, idx) => {
              const isSelected = currentSlide === idx;
              return (
                <div
                  key={slide.id}
                  onClick={() => {
                    magicSound.playClick();
                    setCurrentSlide(idx);
                  }}
                  className={`relative w-28 sm:w-40 h-20 sm:h-24 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 shadow-2xl group ${
                    isSelected
                      ? "border-lime-400 scale-105 shadow-[0_0_25px_rgba(163,230,53,0.5)] ring-2 ring-lime-400/40"
                      : "border-white/20 opacity-70 hover:opacity-100 hover:border-white/50"
                  }`}
                >
                  <img
                    src={slide.heroImage}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-1.5 inset-x-2 text-[10px] font-bold text-white truncate font-['Rajdhani'] uppercase tracking-wider">
                    {slide.characterName.split("•")[0]}
                  </div>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM CAROUSEL CONTROLLER BAR */}
      <div className="relative z-30 w-full px-6 sm:px-8 py-5 border-t border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            onClick={() => magicSound.playGrimoireUnseal()}
            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-lime-400 to-amber-500 p-[1.5px] cursor-pointer hover:scale-110 active:scale-95 transition-transform shadow-[0_0_20px_rgba(163,230,53,0.4)]"
          >
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-lime-400 animate-pulse" />
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] font-mono uppercase tracking-widest text-lime-400 font-bold block">
              Familiar Spirit
            </span>
            <span className="text-xs text-slate-300 font-['Rajdhani'] font-bold">
              Secre (Nero) Anti-Bird
            </span>
          </div>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-white/20 hover:border-lime-400 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-95 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="w-24 sm:w-44 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-lime-400 transition-all duration-500 shadow-[0_0_10px_#a3e635]"
              style={{
                width: `${((currentSlide + 1) / slides.length) * 100}%`
              }}
            />
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-white/20 hover:border-lime-400 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-95 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Counter: 01, 02, 03 */}
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-2xl sm:text-3xl font-black text-lime-400 drop-shadow-[0_0_15px_#a3e635]">
            0{currentSlide + 1}
          </span>
          <span className="text-xs text-slate-500 font-bold">
            / 0{slides.length}
          </span>
        </div>
      </div>
    </section>
  );
}

