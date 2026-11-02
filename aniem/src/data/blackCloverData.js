export const BLACK_CLOVER_SQUADS = [
  {
    id: "black_bulls",
    name: "The Black Bulls",
    japanese: "黒の暴牛 (Kuro no Bōgyū)",
    captain: "Yami Sukehiro",
    badgeColor: "#ff2e88",
    color: "#ff2e88",
    crestGlow: "rgba(255, 46, 136, 0.4)",
    motto: "“Surpass your limits right here, right now!”",
    ranking: "Rising 2nd (Originally 9th / -50 Stars to +101 Stars)",
    description: "The most notorious, destructive, and ragtag squad in the Clover Kingdom, composed entirely of misfits, outcasts, and mages with bizarre magic affinities who thrive in chaos."
  },
  {
    id: "golden_dawn",
    name: "The Golden Dawn",
    japanese: "金色の夜明け (Konjiki no Yoake)",
    captain: "William Vangeance / Yuno (Vice Captain)",
    badgeColor: "#ffd700",
    color: "#ffd700",
    crestGlow: "rgba(255, 215, 0, 0.4)",
    motto: "“Order and glory illuminate the dawn of the kingdom.”",
    ranking: "1st Place Sovereign Squad",
    description: "The elite squad composed primarily of highborn nobles and generational prodigies blessed with immense natural mana reserves and rare affinities."
  },
  {
    id: "crimson_lion",
    name: "The Crimson Lion Kings",
    japanese: "紅蓮の獅子王 (Guren no Shishiō)",
    captain: "Fuegoleon Vermillion / Mereoleona Vermillion",
    badgeColor: "#ef4444",
    color: "#ef4444",
    crestGlow: "rgba(239, 68, 68, 0.4)",
    motto: "“To be defeated is not a shame; remaining down is the only true defeat!”",
    ranking: "3rd Place Sovereign Squad",
    description: "A martial assault squad renowned for pride, unyielding physical discipline, and overwhelming flame magic fueled by the Vermillion royal bloodline."
  },
  {
    id: "silver_eagles",
    name: "The Silver Eagles",
    japanese: "銀翼の大鷲 (Gin'yoku no Ōwashi)",
    captain: "Nozel Silva",
    badgeColor: "#06b6d4",
    color: "#06b6d4",
    crestGlow: "rgba(6, 182, 212, 0.4)",
    motto: "“Precision, dignity, and absolute royal majesty.”",
    ranking: "4th Place Sovereign Squad",
    description: "Headed by the royal House of Silva, the Silver Eagles fight with peerless aristocratic composure, utilizing dynamic fluid and metallic creation magic."
  }
];

export const BLACK_CLOVER_CHARACTERS = [
  {
    id: "asta",
    name: "Asta",
    japanese: "アスタ",
    title: "The Demon-Slaying Anti-Mage",
    squad: "The Black Bulls (Senior Vice-Captain)",
    origin: "Hage Village Orphanage, Forsaken Realm",
    grimoire: "Five-Leaf Clover Grimoire (Tarnished Black)",
    magicAffinity: "Anti-Magic (Pure Nullification)",
    devil: "Liebe (The Outcast Anti-Magic Devil)",
    quote: "“Even without magic, I will become the Wizard King! Never giving up is my magic!”",
    accentColor: "#ff2e88",
    themeKey: "void",
    avatar: "/black_asta_devil.jpg",
    bio: "Born completely devoid of mana in a kingdom where magic dictates birthright and human worth, Asta refused to succumb to despair. Through thousands of daily push-ups and punishing physical conditioning, he caught the attention of a rusted five-leaf clover grimoire harboring Liebe. Channeling pure Anti-Magic, Asta sprouts dark wings, manifests red-purple lightning, and wields colossal swords that sever, absorb, and negate any spell.",
    swords: [
      { name: "Demon-Slayer Sword", desc: "A massive slab of dark iron that bludgeons and cuts spells; can be ridden like a flying broom." },
      { name: "Demon-Dweller Sword", desc: "Absorbs ambient or allied elemental magic and releases it as powerful flying slashes." },
      { name: "Demon-Destroyer Sword", desc: "Possesses Causality Break, severing the cause-and-effect of ongoing spells, poison, and elf reincarnations." },
      { name: "Demon-Slasher Katana", desc: "Yami's katana infused with anti-magic; cuts only what Asta chooses to harm, leaving allies untouched." }
    ],
    moves: [
      { name: "Black Meteorite", type: "Mobility & Assault", desc: "Locks onto an enemy's mana signature and charges at supersonic speed with the Demon-Slayer Sword." },
      { name: "Black Divider", type: "Kinetic Expansion", desc: "Pumps anti-magic into the sword to extend its blade to the size of a skyscraper." },
      { name: "Devil Union Mode", type: "Full Manifestation", desc: "Merges with Liebe completely, manifesting four black wings, horns, and total spell nullification aura." },
      { name: "Anti-Magic Zetten", type: "Hino Country Secret Art", desc: "Compresses anti-magic into a single explosive shockwave that severs high-tier devils." }
    ],
    stats: {
      strength: 100,
      mana: 0,
      antiMagic: 100,
      tenacity: 100,
      speed: 97
    }
  },
  {
    id: "yuno",
    name: "Yuno Grinberryall",
    japanese: "ユノ・グリンベリィオール",
    title: "The Crowned Prince of the Sun & Stars",
    squad: "The Golden Dawn (Vice-Captain)",
    origin: "Hage Village Orphanage / Crown Prince of Spade Kingdom",
    grimoire: "Four-Leaf Clover Grimoire & Spade Star Grimoire",
    magicAffinity: "Wind Magic & Star Magic",
    spirit: "Sylph (The Wind Spirit)",
    quote: "“I won't let you get ahead of me, Asta. The one who becomes the Wizard King will be me.”",
    accentColor: "#ffd700",
    themeKey: "solar",
    avatar: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    bio: "Raised alongside Asta at the church in Hage, Yuno was blessed with extraordinary natural mana and selected by the legendary four-leaf clover grimoire. Later revealed to be the rightful Crown Prince of the Spade Kingdom, he awakened a second grimoire containing Star Magic. Pairing the Wind Spirit Sylph with his dual magic cores, Yuno reaches Saint Stage to combat ancient underworld rulers.",
    swords: [
      { name: "Spirit of Zephyr", desc: "A sword forged from dense swirling storm winds that disintegrates opposing magic." },
      { name: "Spirit of Boreas", desc: "A halberd of condensed atmospheric pressure with destructive kinetic shockwaves." },
      { name: "Star Conjuration: Quartile", desc: "Multiple luminous stellar nodes that fire piercing photon beams across the battlefield." }
    ],
    moves: [
      { name: "Spirit Dive (Saint Stage)", type: "Spirit Assimilation", desc: "Fuses with Sylph to achieve pure angelic armor capable of purifying devil hearts." },
      { name: "Star Magic: Conjunction", type: "Instantaneous Teleportation", desc: "Transports instantaneously between any placed stellar constellations." },
      { name: "Star Magic: Quartile Hasta", type: "Ultimate Celestial Beam", desc: "Fires a concentrated supernova beam that vaporizes supreme devils." }
    ],
    stats: {
      strength: 78,
      mana: 100,
      antiMagic: 20,
      tenacity: 94,
      speed: 99
    }
  },
  {
    id: "noelle",
    name: "Noelle Silva",
    japanese: "ノエル・シルヴァ",
    title: "The Sea Goddess of House Silva",
    squad: "The Black Bulls (Senior Knight)",
    origin: "Royal Capital, House Silva",
    grimoire: "Three-Leaf Clover Grimoire (Ocean Blue)",
    magicAffinity: "Water Creation Magic",
    spirit: "Undine (The Water Spirit - Temporary Partner)",
    quote: "“I am royalty! And as a member of the Black Bulls, I will protect everyone!”",
    accentColor: "#06b6d4",
    themeKey: "emerald",
    avatar: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    bio: "The youngest daughter of the royal House Silva, Noelle was ostracized by her siblings for her inability to control her colossal mana reserves. Welcomed warmly by Yami into the Black Bulls, she unlocked her latent potential in life-or-death battles. Channeling her late mother Acier's will, Noelle manifests the Saint Valkyrie Dress and commands the Sea Dragon's Roar.",
    swords: [
      { name: "Valkyrie Lance", desc: "A spiraling lance of compressed high-pressure water that pierces and glides through enemy magic." }
    ],
    moves: [
      { name: "Sea Dragon's Roar", type: "Colossal Offense", desc: "Unleashes a massive vortex dragon that devours and obliterates target defenses." },
      { name: "Valkyrie Dress", type: "Armor & High Mobility", desc: "Envelops Noelle in water armor with wings, allowing her to swim through mana zones at lightning speed." },
      { name: "Saint Valkyrie Armor", type: "Divine Stage", desc: "Undine-boosted form granting purifying holy water strikes that pierce devil cores." }
    ],
    stats: {
      strength: 74,
      mana: 99,
      antiMagic: 0,
      tenacity: 96,
      speed: 95
    }
  },
  {
    id: "yami",
    name: "Yami Sukehiro",
    japanese: "ヤミ・スケヒロ",
    title: "The Captain of the Black Bulls",
    squad: "The Black Bulls (Founding Captain)",
    origin: "Hino Country (The Land of the Sun)",
    grimoire: "Three-Leaf Clover Grimoire (Tattered Katana Sheath)",
    magicAffinity: "Dark Magic & Ki Sensory Art",
    quote: "“Surpass your limits right here, right now! If you die, I'll kill you!”",
    accentColor: "#8b5cf6",
    themeKey: "void",
    avatar: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    bio: "Shipwrecked in the Clover Kingdom as a foreign youth from the Land of the Sun, Yami was befriended by Julius Novachrono. As captain of the Black Bulls, his gruff demeanor masks deep affection for his squad. By channeling Dark Magic—one of the only affinities capable of affecting devils—through his katana and reading physical Ki, Yami can slice through spatial dimensions.",
    swords: [
      { name: "Infused Katana", desc: "A traditional Japanese blade reinforced with dark magic that absorbs and compresses light spells." }
    ],
    moves: [
      { name: "Dark Cloaked Dimension Slash: Equinox", type: "Spatial Severance", desc: "Slices clean through space, severing pocket dimensions, barriers, and massive demon bodies." },
      { name: "Death Thrust", type: "Point-Blank Blast", desc: "Condenses dark magic into an instantaneous palm thrust that vaporizes target torso sections." },
      { name: "Black Moon (Mana Zone)", type: "Absolute Defense", desc: "Creates a spherical gravitational void that erases all incoming enemy spells within range." }
    ],
    stats: {
      strength: 99,
      mana: 96,
      antiMagic: 35,
      tenacity: 100,
      speed: 94
    }
  },
  {
    id: "julius",
    name: "Julius Novachrono",
    japanese: "ユリウス・ノヴァクロノ",
    title: "The 28th Wizard King",
    squad: "Kingdom Sovereign Commander",
    origin: "Royal Capital of Sol-Clover",
    grimoire: "Coverless Grimoire (Infinite Floating Pages)",
    magicAffinity: "Time Magic",
    quote: "“Magic has no prejudice. People do. I want a world where everyone can smile together.”",
    accentColor: "#ffd700",
    themeKey: "solar",
    avatar: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    bio: "A magic fanatic with boundless curiosity, Julius ascended to the throne of Wizard King through sheer dedication to creating a meritocracy free of class discrimination. His coverless grimoire holds no end to pages, reflecting his ability to steal and store the time of his opponents. Later revealed to share a dual soul with the primordial villain Lucius Zogratis.",
    swords: [
      { name: "Chrono Orbs", desc: "Spherical time capsules that trap targets in suspended animation." }
    ],
    moves: [
      { name: "Chrono Stasis", type: "Time Suspension", desc: "Traps the target in a sphere of halted time, rendering them completely incapable of movement or spellcasting." },
      { name: "Chrono Anastasis", type: "Kingdom-Wide Reversion", desc: "Rewinds time across the entire capital to intercept millions of falling swords of light." },
      { name: "Time Steal", type: "Accelerated Aging", desc: "Siphons the target's lifespan to replenish his own stored time reserves." }
    ],
    stats: {
      strength: 70,
      mana: 100,
      antiMagic: 0,
      tenacity: 98,
      speed: 100
    }
  },
  {
    id: "mereoleona",
    name: "Mereoleona Vermillion",
    japanese: "メレオレオナ・ヴァーミリオン",
    title: "The Uncrowned Undefeated Lioness",
    squad: "Crimson Lion Kings / Royal Knights Captain",
    origin: "House Vermillion, Royal Realm",
    grimoire: "Three-Leaf Clover Grimoire (Blazing Flame)",
    magicAffinity: "Fire Magic & Mana Zone",
    quote: "“Don't you dare look away from the flame! Burn your fear and surpass yourself!”",
    accentColor: "#ef4444",
    themeKey: "crimson",
    avatar: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80",
    bio: "Known as the strongest combatant in the Clover Kingdom, Mereoleona abandoned noble highcourt politics to train in wild volcanos and frozen mountains. Her mastery of Mana Zone allows her to punch directly through enemy spells with bare fists. In the Spade Kingdom war, she transcends human limits, becoming pure living fire: Hellfire Incarnate.",
    swords: [
      { name: "Flame Fists", desc: "Fists enveloped in dense volcanic plasma that disintegrates magical constructs on contact." }
    ],
    moves: [
      { name: "Calidos Brachium Barrage", type: "Supersonic Pummeling", desc: "A relentless barrage of fiery punches launched from multiple angles using Mana Zone." },
      { name: "Hellfire Incarnate", type: "Elemental Transmutation", desc: "Transmutes her own body into living flame, rendering physical and magical damage completely moot." },
      { name: "Purgatory Flame Roar", type: "AoE Incineration", desc: "Incinerates an entire mountain area with pure volcanic heat." }
    ],
    stats: {
      strength: 99,
      mana: 99,
      antiMagic: 15,
      tenacity: 100,
      speed: 98
    }
  }
];

export const BLACK_CLOVER_ARCS = [
  {
    title: "Magic Knights Entrance Arc",
    episodes: "Episodes 1 - 19",
    summary: "Asta and Yuno leave Hage Village to participate in the Magic Knights Exam. Yuno is selected by the Golden Dawn while Asta is recruited into the misfit Black Bulls by Yami."
  },
  {
    title: "Eye of the Midnight Sun Arc",
    episodes: "Episodes 20 - 75",
    summary: "Terrorists led by Patri assault the Royal Capital. The Magic Knights unite to defend the kingdom, revealing ancient elven hatred and forbidden reincarnation magic."
  },
  {
    title: "Royal Knights & Elf Reincarnation Arc",
    episodes: "Episodes 76 - 129",
    summary: "The Wizard King selects the Royal Knights to raid the Midnight Sun base. Reincarnated elves claim knight bodies until Asta's Demon-Destroyer sword and Lumiere restore balance."
  },
  {
    title: "Heart Kingdom & Spade Kingdom Raid",
    episodes: "Episodes 130 - 170+ / Manga",
    summary: "Asta trains in True Magic and Devil Union to invade the Spade Kingdom. The Magic Knights confront the Dark Triad (Dante, Vanica, Zenon) and the supreme devil Lucifero."
  }
];

