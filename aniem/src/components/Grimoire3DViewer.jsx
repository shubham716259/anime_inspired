import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, BookOpen, RotateCw, Wand2, Shield, Flame, Zap } from "lucide-react";
import { magicSound } from "../utils/soundEffects";

const THEMES = {
  void: {
    name: "Five-Leaf Clover Grimoire",
    character: "Asta",
    color: "#ff2e88",
    lightColor: 0xff2e88,
    emissive: 0x9333ea,
    edgeGlow: 0xff2e88,
    coverColor: 0x090a10,
    goldColor: 0xff2e88,
    subText: "Affinity: Anti-Magic & Liebe Devil Soul",
    particles: 0xff2e88,
    ashColor: 0x6b21a8
  },
  solar: {
    name: "Four-Leaf & Spade Star Grimoire",
    character: "Yuno Grinberryall",
    color: "#ffd700",
    lightColor: 0xffd700,
    emissive: 0xd97706,
    edgeGlow: 0xffd700,
    coverColor: 0x16130a,
    goldColor: 0xffd700,
    subText: "Affinity: Wind & Star Magic (Saint Stage)",
    particles: 0xffe066,
    ashColor: 0xb45309
  },
  crimson: {
    name: "Vermillion Dragon Grimoire",
    character: "Mereoleona & Fuegoleon",
    color: "#ef4444",
    lightColor: 0xef4444,
    emissive: 0x991b1b,
    edgeGlow: 0xf87171,
    coverColor: 0x180909,
    goldColor: 0xfca5a5,
    subText: "Affinity: Hellfire Incarnate & Salamander",
    particles: 0xff4d4d,
    ashColor: 0x7f1d1d
  },
  emerald: {
    name: "House Silva Ocean Grimoire",
    character: "Noelle Silva",
    color: "#06b6d4",
    lightColor: 0x06b6d4,
    emissive: 0x0284c7,
    edgeGlow: 0x38bdf8,
    coverColor: 0x081824,
    goldColor: 0x7dd3fc,
    subText: "Affinity: Sea Dragon & Saint Valkyrie",
    particles: 0x38bdf8,
    ashColor: 0x0369a1
  }
};

export default function Grimoire3DViewer({
  activeTheme = "void",
  onThemeChange,
  reducedMotion = false
}) {
  const mountRef = useRef(null);
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hovered, setHovered] = useState(false);

  const sceneRef = useRef(null);
  const bookGroupRef = useRef(null);
  const frontCoverPivotRef = useRef(null);
  const coverMeshRef = useRef(null);
  const pagesMeshRef = useRef(null);
  const emblemMeshRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ashParticlesRef = useRef(null);
  const emberParticlesRef = useRef(null);
  const pointLightRef = useRef(null);

  const themeRef = useRef(activeTheme);
  const unsealedRef = useRef(isUnsealed);
  const autoRotateRef = useRef(autoRotate);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    themeRef.current = activeTheme;
    updateSceneTheme(activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    unsealedRef.current = isUnsealed;
  }, [isUnsealed]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  const updateSceneTheme = (themeKey) => {
    const t = THEMES[themeKey] || THEMES.void;
    if (pointLightRef.current) pointLightRef.current.color.setHex(t.lightColor);
    if (coverMeshRef.current) {
      coverMeshRef.current.material.color.setHex(t.coverColor);
      coverMeshRef.current.material.emissive.setHex(t.emissive);
    }
    if (emblemMeshRef.current) {
      emblemMeshRef.current.material.color.setHex(t.goldColor);
      emblemMeshRef.current.material.emissive.setHex(t.lightColor);
    }
    if (ring1Ref.current) ring1Ref.current.material.color.setHex(t.goldColor);
    if (ring2Ref.current) ring2Ref.current.material.color.setHex(t.lightColor);
    if (emberParticlesRef.current) emberParticlesRef.current.material.color.setHex(t.particles);
    if (ashParticlesRef.current) ashParticlesRef.current.material.color.setHex(t.ashColor);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0d0f17, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 6.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x1a1d2e, 1.4);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0xff2e88, 2.5);
    rimLight.position.set(-6, 6, -5);
    scene.add(rimLight);

    const keyLight = new THREE.DirectionalLight(0xffd700, 2.0);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const currentTheme = THEMES[themeRef.current] || THEMES.void;
    const pointLight = new THREE.PointLight(currentTheme.lightColor, 3.5, 12);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // Master Grimoire Group
    const bookGroup = new THREE.Group();
    scene.add(bookGroup);
    bookGroupRef.current = bookGroup;

    const bookWidth = 2.5;
    const bookHeight = 3.4;
    const bookThickness = 0.62;

    // Pages
    const pagesGeo = new THREE.BoxGeometry(bookWidth * 0.94, bookHeight * 0.95, bookThickness * 0.82);
    const pagesMat = new THREE.MeshStandardMaterial({
      color: 0xded1b5,
      roughness: 0.8,
      metalness: 0.15,
      emissive: 0x22170d,
      emissiveIntensity: 0.2
    });
    const pagesMesh = new THREE.Mesh(pagesGeo, pagesMat);
    pagesMesh.position.set(0.08, 0, 0);
    bookGroup.add(pagesMesh);
    pagesMeshRef.current = pagesMesh;

    // Back Cover & Spine
    const coverMat = new THREE.MeshStandardMaterial({
      color: currentTheme.coverColor,
      roughness: 0.5,
      metalness: 0.45,
      emissive: currentTheme.emissive,
      emissiveIntensity: 0.35
    });

    const backCover = new THREE.Mesh(
      new THREE.BoxGeometry(bookWidth, bookHeight, 0.08),
      coverMat
    );
    backCover.position.set(0, 0, -bookThickness / 2);
    bookGroup.add(backCover);

    const spineGeo = new THREE.CylinderGeometry(bookThickness / 2, bookThickness / 2, bookHeight, 20, 1, false, 0, Math.PI);
    const spine = new THREE.Mesh(spineGeo, coverMat);
    spine.rotation.z = Math.PI / 2;
    spine.rotation.y = -Math.PI / 2;
    spine.position.set(-bookWidth / 2, 0, 0);
    bookGroup.add(spine);

    // Front Cover & Animated Hinge
    const frontCoverPivot = new THREE.Group();
    frontCoverPivot.position.set(-bookWidth / 2, 0, bookThickness / 2);
    bookGroup.add(frontCoverPivot);
    frontCoverPivotRef.current = frontCoverPivot;

    const frontCoverMesh = new THREE.Mesh(
      new THREE.BoxGeometry(bookWidth, bookHeight, 0.08),
      coverMat
    );
    frontCoverMesh.position.set(bookWidth / 2, 0, 0);
    frontCoverPivot.add(frontCoverMesh);
    coverMeshRef.current = frontCoverMesh;

    // Metallic Ornate Corner Brackets
    const cornerMat = new THREE.MeshStandardMaterial({
      color: currentTheme.goldColor,
      metalness: 0.9,
      roughness: 0.2,
      emissive: currentTheme.edgeGlow,
      emissiveIntensity: 0.5
    });

    const cornerOffsets = [
      [-bookWidth * 0.42, bookHeight * 0.42],
      [bookWidth * 0.42, bookHeight * 0.42],
      [-bookWidth * 0.42, -bookHeight * 0.42],
      [bookWidth * 0.42, -bookHeight * 0.42]
    ];
    cornerOffsets.forEach(([cx, cy]) => {
      const cornerGeo = new THREE.BoxGeometry(0.35, 0.35, 0.1);
      const corner = new THREE.Mesh(cornerGeo, cornerMat);
      corner.position.set(bookWidth / 2 + cx, cy, 0.05);
      corner.rotation.z = Math.PI / 4;
      frontCoverPivot.add(corner);
    });

    // 5-Leaf / 6-Pointed Arcane Clover Emblem
    const starShape = new THREE.Shape();
    const points = 5;
    const outerRadius = 0.55;
    const innerRadius = 0.24;
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const starExtrudeSettings = { depth: 0.06, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
    const starGeo = new THREE.ExtrudeGeometry(starShape, starExtrudeSettings);
    const emblem = new THREE.Mesh(starGeo, cornerMat);
    emblem.position.set(bookWidth / 2, 0, 0.05);
    frontCoverPivot.add(emblem);
    emblemMeshRef.current = emblem;

    // Orbiting Gyroscope Magic Rings
    const ring1Geo = new THREE.TorusGeometry(2.4, 0.03, 16, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: currentTheme.goldColor,
      wireframe: true,
      emissive: currentTheme.lightColor,
      emissiveIntensity: 0.9
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    scene.add(ring1);
    ring1Ref.current = ring1;

    const ring2Geo = new THREE.TorusGeometry(2.8, 0.02, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: currentTheme.lightColor,
      wireframe: true,
      emissive: currentTheme.lightColor,
      emissiveIntensity: 0.7
    });
    const ring2 = new THREE.Mesh(ring2Geo, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);
    ring2Ref.current = ring2;

    // Volumetric Ash Particles
    const ashCount = reducedMotion ? 70 : 220;
    const ashGeo = new THREE.BufferGeometry();
    const ashPositions = new Float32Array(ashCount * 3);
    const ashVelocities = [];

    for (let i = 0; i < ashCount; i++) {
      ashPositions[i * 3] = (Math.random() - 0.5) * 8;
      ashPositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      ashPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      ashVelocities.push({
        x: (Math.random() - 0.5) * 0.005,
        y: 0.006 + Math.random() * 0.012,
        z: (Math.random() - 0.5) * 0.005
      });
    }
    ashGeo.setAttribute("position", new THREE.BufferAttribute(ashPositions, 3));
    const ashMat = new THREE.PointsMaterial({
      size: 0.08,
      color: currentTheme.ashColor,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const ashSystem = new THREE.Points(ashGeo, ashMat);
    scene.add(ashSystem);
    ashParticlesRef.current = ashSystem;

    // Glowing Mana Embers Vortex
    const emberCount = reducedMotion ? 90 : 300;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities = [];

    for (let i = 0; i < emberCount; i++) {
      const radius = 1.3 + Math.random() * 3.2;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5;
      emberPositions[i * 3] = Math.cos(angle) * radius;
      emberPositions[i * 3 + 1] = y;
      emberPositions[i * 3 + 2] = Math.sin(angle) * radius;

      emberVelocities.push({
        radius,
        angle,
        speed: 0.006 + Math.random() * 0.014,
        yVel: 0.008 + Math.random() * 0.016
      });
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      size: 0.055,
      color: currentTheme.particles,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const emberSystem = new THREE.Points(emberGeo, emberMat);
    scene.add(emberSystem);
    emberParticlesRef.current = emberSystem;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePosRef.current.targetX = normX;
      mousePosRef.current.targetY = normY;
      mouse.x = normX;
      mouse.y = normY;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([frontCoverMesh, pagesMesh, backCover]);
      if (intersects.length > 0) {
        if (!hovered) magicSound.playPageRustle();
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleCanvasClick = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([frontCoverMesh, pagesMesh, backCover]);
      if (intersects.length > 0) {
        toggleUnseal();
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("click", handleCanvasClick);

    let clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.05;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.05;

      const floatY = Math.sin(time * 1.6) * 0.12;
      bookGroup.position.y = floatY;

      if (!reducedMotion) {
        const targetRotY = autoRotateRef.current
          ? time * 0.35 + mousePosRef.current.x * 0.65
          : mousePosRef.current.x * 0.85;
        const targetRotX = mousePosRef.current.y * -0.55 + 0.08;

        bookGroup.rotation.y += (targetRotY - bookGroup.rotation.y) * 0.06;
        bookGroup.rotation.x += (targetRotX - bookGroup.rotation.x) * 0.06;
        bookGroup.rotation.z = Math.sin(time * 1.1) * 0.04;
      }

      const targetCoverAngle = unsealedRef.current ? -Math.PI * 0.58 : 0;
      frontCoverPivot.rotation.y += (targetCoverAngle - frontCoverPivot.rotation.y) * 0.1;

      if (emblemMeshRef.current) {
        emblemMeshRef.current.material.emissiveIntensity = 0.4 + Math.sin(time * 4) * 0.3;
      }

      if (ring1Ref.current && ring2Ref.current) {
        ring1.rotation.y = time * 0.55;
        ring1.rotation.z = time * 0.28;
        ring2.rotation.x = time * -0.38;
        ring2.rotation.y = time * 0.45;
        ring1.position.y = floatY;
        ring2.position.y = floatY;
      }

      if (ashParticlesRef.current && !reducedMotion) {
        const ashPos = ashGeo.attributes.position;
        for (let i = 0; i < ashCount; i++) {
          const v = ashVelocities[i];
          ashPositions[i * 3] += v.x;
          ashPositions[i * 3 + 1] += v.y;
          ashPositions[i * 3 + 2] += v.z;
          if (ashPositions[i * 3 + 1] > 3.5) {
            ashPositions[i * 3 + 1] = -3.5;
            ashPositions[i * 3] = (Math.random() - 0.5) * 8;
          }
        }
        ashPos.needsUpdate = true;
      }

      if (emberParticlesRef.current && !reducedMotion) {
        const emberPos = emberGeo.attributes.position;
        for (let i = 0; i < emberCount; i++) {
          const v = emberVelocities[i];
          v.angle += v.speed;
          emberPositions[i * 3] = Math.cos(v.angle) * v.radius;
          emberPositions[i * 3 + 2] = Math.sin(v.angle) * v.radius;
          emberPositions[i * 3 + 1] += v.yVel;
          if (emberPositions[i * 3 + 1] > 2.7) {
            emberPositions[i * 3 + 1] = -2.7;
          }
        }
        emberPos.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("click", handleCanvasClick);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const toggleUnseal = () => {
    const next = !isUnsealed;
    setIsUnsealed(next);
    if (next) magicSound.playGrimoireUnseal();
    else magicSound.playSwordSlash();
  };

  const currentThemeData = THEMES[activeTheme] || THEMES.void;

  return (
    <div className="relative w-full h-full min-h-[460px] flex items-center justify-center select-none overflow-hidden rounded-3xl border border-white/10 bg-radial from-[#131124] via-[#0d0f17] to-[#08090f] shadow-[0_0_80px_rgba(0,0,0,0.95)]">
      <div
        className="absolute inset-0 pointer-events-none opacity-25 blur-3xl transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentThemeData.color} 0%, transparent 70%)`
        }}
      />

      <div
        ref={mountRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300 ${
          hovered ? "scale-[1.01]" : "scale-100"
        }`}
        title="Click to Unseal Grimoire, drag to orbit in 3D"
      />

      {/* Top Left Status Badge */}
      <div className="absolute top-5 left-5 z-20 flex flex-col gap-1">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d0f17]/90 backdrop-blur-md border border-white/10 text-xs shadow-lg">
          <span
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: currentThemeData.color }}
          />
          <span className="font-bold tracking-wider text-slate-100 uppercase font-['Rajdhani']">
            {currentThemeData.name}
          </span>
        </div>
        <span className="text-[11px] text-slate-400 px-1 font-mono">
          {currentThemeData.subText}
        </span>
      </div>

      {/* Bottom Switcher & Action Controls */}
      <div className="absolute bottom-5 inset-x-5 z-20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10">
          {Object.entries(THEMES).map(([key, item]) => {
            const isActive = activeTheme === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  magicSound.playClick();
                  if (onThemeChange) onThemeChange(key);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-['Rajdhani'] ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                style={{
                  backgroundColor: isActive ? item.color : "transparent"
                }}
              >
                {item.character.split(" ")[0]}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleUnseal}
            className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xl font-['Rajdhani'] ${
              isUnsealed
                ? "bg-pink-600 text-white shadow-pink-600/50 scale-105"
                : "bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isUnsealed ? "Reseal" : "Unseal Grimoire"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              magicSound.playClick();
              setAutoRotate(!autoRotate);
            }}
            className={`p-2 rounded-xl border text-xs ${
              autoRotate
                ? "bg-pink-500/20 border-pink-500/50 text-pink-300"
                : "bg-black/60 border-white/10 text-slate-400"
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-[spin_4s_linear_infinite]" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

