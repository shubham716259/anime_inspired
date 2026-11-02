import React, { useState } from "react";
import BlackCloverHero from "./components/BlackCloverHero";
import BlackCloverRosterSection from "./components/BlackCloverRosterSection";
import CharacterDetailModal from "./components/CharacterDetailModal";
import SquadsSection from "./components/SquadsSection";
import StoryArcsTimeline from "./components/StoryArcsTimeline";
import AnimeDuelArenaModal from "./components/AnimeDuelArenaModal";
import Footer from "./components/Footer";
import { BLACK_CLOVER_CHARACTERS } from "./data/blackCloverData";

export default function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isArenaOpen, setIsArenaOpen] = useState(false);

  const handleOpenCharacter = (char) => {
    setSelectedCharacter(char);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0d0f17] text-slate-100 font-sans selection:bg-[#ff2e88] selection:text-white">
      {/* 1. HERO STREAMING SHOWCASE (MATCHING USER REFERENCE LAYOUT) */}
      <BlackCloverHero
        onOpenArena={() => setIsArenaOpen(true)}
        onSelectCharacter={handleOpenCharacter}
        characters={BLACK_CLOVER_CHARACTERS}
      />

      {/* 2. MAIN ENCYCLOPEDIA CONTENT */}
      <main className="space-y-20 sm:space-y-28">
        {/* Magic Knight Characters & 3D Grimoire Roster */}
        <BlackCloverRosterSection
          onSelectCharacter={handleOpenCharacter}
        />

        {/* The Sovereign Magic Squads */}
        <SquadsSection />

        {/* Chronological Black Clover Arc Timeline */}
        <StoryArcsTimeline />
      </main>

      {/* Footer */}
      <Footer />

      {/* 3D Character Story & Grimoire Detail Modal */}
      <CharacterDetailModal
        character={selectedCharacter}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Turn-Based 3D Anime Combat Arena */}
      <AnimeDuelArenaModal
        isOpen={isArenaOpen}
        onClose={() => setIsArenaOpen(false)}
      />
    </div>
  );
}
