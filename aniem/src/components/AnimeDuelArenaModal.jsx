import React, { useState } from "react";
import { X, Swords, Zap, Sparkles, Trophy } from "lucide-react";
import { magicSound } from "../utils/soundEffects";
import confetti from "canvas-confetti";

export default function AnimeDuelArenaModal({ isOpen, onClose }) {
  const [selectedFighter, setSelectedFighter] = useState("asta");
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [logs, setLogs] = useState([
    "Supreme Devil Lucifero descends upon the Clover Kingdom! Surpass your limits!"
  ]);
  const [turn, setTurn] = useState("player");
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);

  if (!isOpen) return null;

  const resetBattle = (fighter = selectedFighter) => {
    setSelectedFighter(fighter);
    setPlayerHp(100);
    setEnemyHp(100);
    setIsWon(false);
    setIsLost(false);
    setLogs([`Challenger switched to ${fighter === "asta" ? "Asta (Devil Union)" : fighter === "yuno" ? "Yuno (Saint Stage)" : "Captain Yami (Dimension Slash)"}! The mana pressure surges.`]);
  };

  const handleAction = (actionType) => {
    if (turn !== "player" || isWon || isLost) return;

    let damage = 0;
    let logMsg = "";

    if (actionType === "basic") {
      magicSound.playSwordSlash();
      damage = 18 + Math.floor(Math.random() * 8);
      logMsg = selectedFighter === "asta"
        ? `Asta swings the Demon-Slayer Sword! The massive blunt edge smashes Lucifero's gravity barrier for ${damage} damage!`
        : selectedFighter === "yuno"
        ? `Yuno launches 'Spirit of Zephyr' high-pressure gale blade for ${damage} damage!`
        : `Yami executes Dark-Cloaked Iai Katana draw for ${damage} damage!`;
    } else if (actionType === "heavy") {
      magicSound.playBeam();
      damage = 30 + Math.floor(Math.random() * 12);
      logMsg = selectedFighter === "asta"
        ? `Asta unleashes 'Black Divider'! The colossal blade expands into the sky, carving through devil flesh for ${damage} damage!`
        : selectedFighter === "yuno"
        ? `Yuno casts 'Star Magic: Quartile Hasta'! Concentrated starlight pierces Lucifero for ${damage} damage!`
        : `Yami fires 'Death Thrust'! Condensed darkness erases Lucifero's torso armor for ${damage} damage!`;
    } else if (actionType === "ultimate") {
      magicSound.playGrimoireUnseal();
      magicSound.playExplosion();
      damage = 48 + Math.floor(Math.random() * 16);
      logMsg = selectedFighter === "asta"
        ? `“MY MAGIC IS NEVER GIVING UP!” Asta activates Devil Union Zetten! A pure black void shockwave severs Lucifero's heart for ${damage} CRITICAL damage!`
        : selectedFighter === "yuno"
        ? `Yuno unleashes 'Spirit of Boreas Saint Stage'! Heavenly winds disintegrate the underworld miasma for ${damage} CRITICAL damage!`
        : `“SURPASS YOUR LIMITS RIGHT HERE, RIGHT NOW!” Yami unleashes Dimension Slash: Equinox for ${damage} CRITICAL damage!`;

      try {
        confetti({
          particleCount: 60,
          spread: 75,
          origin: { y: 0.5 },
          colors: ["#ff2e88", "#ffd700", "#ffffff"]
        });
      } catch {}
    }

    const nextEnemyHp = Math.max(0, enemyHp - damage);
    setEnemyHp(nextEnemyHp);
    setLogs((prev) => [logMsg, ...prev.slice(0, 5)]);

    if (nextEnemyHp <= 0) {
      setIsWon(true);
      magicSound.playGrimoireUnseal();
      try {
        confetti({
          particleCount: 130,
          spread: 100,
          origin: { y: 0.4 },
          colors: ["#ffd700", "#ff2e88", "#ffffff"]
        });
      } catch {}
      return;
    }

    setTurn("enemy");
    setTimeout(() => {
      magicSound.playExplosion();
      const enemyDmg = 14 + Math.floor(Math.random() * 12);
      const nextPlayerHp = Math.max(0, playerHp - enemyDmg);
      setPlayerHp(nextPlayerHp);
      setLogs((prev) => [
        `Supreme Devil Lucifero unleashes 'Gravity Singularity'! Heavy gravitational crush inflicts ${enemyDmg} damage!`,
        ...prev.slice(0, 5)
      ]);

      if (nextPlayerHp <= 0) {
        setIsLost(true);
      } else {
        setTurn("player");
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-br from-[#180d24] via-[#0d0f17] to-black border-2 border-[#ff2e88]/50 p-6 sm:p-8 shadow-[0_0_80px_rgba(255,46,136,0.4)] overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            magicSound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-pink-950 border border-[#ff2e88]/40 text-[11px] font-mono text-[#ff2e88] uppercase">
            <Swords className="w-3.5 h-3.5 text-[#ff2e88]" />
            <span>Colosseum of the Wizard King</span>
          </div>
          <h3 className="font-['Cinzel'] font-black text-2xl sm:text-3xl text-white">
            BLACK CLOVER 3D ARENA DUEL
          </h3>
          <p className="text-xs text-slate-400 font-light">
            Surpass your mortal limits against the Supreme Devil Lucifero.
          </p>
        </div>

        {/* Fighter Select */}
        <div className="flex justify-center gap-2 mb-6">
          {[
            { id: "asta", name: "Asta (Anti-Magic)", color: "#ff2e88" },
            { id: "yuno", name: "Yuno (Star & Wind)", color: "#ffd700" },
            { id: "yami", name: "Captain Yami (Dark Magic)", color: "#8b5cf6" }
          ].map((fighter) => (
            <button
              key={fighter.id}
              type="button"
              onClick={() => resetBattle(fighter.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-['Rajdhani'] uppercase tracking-wider transition-all ${
                selectedFighter === fighter.id
                  ? "text-white shadow-lg"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
              style={{
                backgroundColor: selectedFighter === fighter.id ? fighter.color : undefined
              }}
            >
              {fighter.name}
            </button>
          ))}
        </div>

        {/* HP Bars */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-black/60 border border-[#ff2e88]/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white capitalize font-['Rajdhani']">
                {selectedFighter} (You)
              </span>
              <span className="text-[#ff2e88] font-bold">{playerHp} / 100 HP</span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#ff2e88] to-purple-600 transition-all duration-300"
                style={{ width: `${playerHp}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-red-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white font-['Rajdhani']">Lucifero (Underworld King)</span>
              <span className="text-red-400 font-bold">{enemyHp} / 100 HP</span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-rose-700 transition-all duration-300"
                style={{ width: `${enemyHp}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions or Victory / Defeat */}
        {isWon ? (
          <div className="text-center py-6 space-y-3 bg-purple-950/40 rounded-2xl border border-[#ff2e88]/50">
            <Trophy className="w-12 h-12 text-[#ffd700] mx-auto animate-bounce" />
            <h4 className="font-['Cinzel'] font-black text-2xl text-white">
              VICTORY! LUCIFERO'S DEVIL HEART IS SEVERED!
            </h4>
            <p className="text-xs text-pink-200">
              “You surpassed your limits right here, right now!” — Captain Yami
            </p>
            <button
              type="button"
              onClick={() => resetBattle()}
              className="px-6 py-2 rounded-xl bg-[#ff2e88] text-white font-bold text-xs uppercase tracking-wider font-['Rajdhani']"
            >
              Surpass Limits Again
            </button>
          </div>
        ) : isLost ? (
          <div className="text-center py-6 space-y-3 bg-red-950/40 rounded-2xl border border-red-500/50">
            <h4 className="font-['Cinzel'] font-black text-2xl text-white">
              DEFEATED... BUT NEVER BROKEN!
            </h4>
            <p className="text-xs text-red-200">
              “Not yet... my magic is never giving up!”
            </p>
            <button
              type="button"
              onClick={() => resetBattle()}
              className="px-6 py-2 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider font-['Rajdhani']"
            >
              Stand Up Once More
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              type="button"
              disabled={turn !== "player"}
              onClick={() => handleAction("basic")}
              className="p-3.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/10 hover:border-white/30 text-white transition-all text-center flex flex-col items-center gap-1 active:scale-95 disabled:opacity-50"
            >
              <Swords className="w-5 h-5 text-[#ff2e88]" />
              <span className="font-bold text-xs font-['Rajdhani'] uppercase tracking-wider">Sword Strike</span>
              <span className="text-[10px] text-slate-400 font-mono">18 - 25 Dmg</span>
            </button>

            <button
              type="button"
              disabled={turn !== "player"}
              onClick={() => handleAction("heavy")}
              className="p-3.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/10 hover:border-white/30 text-white transition-all text-center flex flex-col items-center gap-1 active:scale-95 disabled:opacity-50"
            >
              <Zap className="w-5 h-5 text-[#ffd700]" />
              <span className="font-bold text-xs font-['Rajdhani'] uppercase tracking-wider">Grimoire Art</span>
              <span className="text-[10px] text-slate-400 font-mono">30 - 42 Dmg</span>
            </button>

            <button
              type="button"
              disabled={turn !== "player"}
              onClick={() => handleAction("ultimate")}
              className="p-3.5 rounded-xl bg-gradient-to-r from-[#ff2e88] to-purple-700 hover:from-pink-500 hover:to-purple-600 text-white transition-all text-center flex flex-col items-center gap-1 shadow-lg shadow-[#ff2e88]/40 active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5 text-[#ffd700] animate-spin" />
              <span className="font-bold text-xs font-['Rajdhani'] uppercase tracking-wider">Surpass Limits!</span>
              <span className="text-[10px] text-[#ffd700] font-mono">48 - 64 Dmg</span>
            </button>
          </div>
        )}

        {/* Combat Log */}
        <div className="p-3.5 rounded-2xl bg-black/70 border border-white/5 space-y-1 font-mono text-[11px] text-slate-400 max-h-24 overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className={i === 0 ? "text-[#ff2e88] font-bold" : ""}>
              • {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

