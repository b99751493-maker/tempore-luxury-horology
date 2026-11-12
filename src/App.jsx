import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  RotateCcw,
  Layers,
  ShieldCheck,
  Compass,
  Clock,
  Sparkles,
  Check,
  ArrowUpRight,
  Sliders,
  BookOpen,
  Award,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Globe,
  Play,
  Pause
} from 'lucide-react';

// --- COLOR TOKENS ---
const PALETTE = {
  burgundy: '#481C29',
  champagne: '#D2B47C',
  ivory: '#F3EBDD',
  bronze: '#96744D',
  espresso: '#241A17',
  softGold: '#B99A63',
};

// --- DATA ---
const COLLECTION_WATCHES = [
  {
    id: 'calibre-01',
    name: 'Souverain Tourbillon I',
    category: 'Grand Complication',
    calibre: 'Calibre TP-01 Hand-Wound',
    powerReserve: '120 Hours',
    caseMaterial: '18k Rose Gold',
    diameter: '40.5 mm',
    waterResistance: '30m / 3 ATM',
    price: 68500,
    dialAccent: '#481C29',
    caseAccent: '#D2B47C',
    strapAccent: '#241A17',
    description:
      'An architectural celebration of gravitational equilibrium. Featuring an open-worked 60-second flying tourbillon cage and grand feu burgundy enamel dial.',
  },
  {
    id: 'calibre-02',
    name: 'Chronomètre Céleste',
    category: 'Classic Mechanical',
    calibre: 'Calibre TP-04 Automatic',
    powerReserve: '72 Hours',
    caseMaterial: '950 Platinum',
    diameter: '39.0 mm',
    waterResistance: '50m / 5 ATM',
    price: 44000,
    dialAccent: '#F3EBDD',
    caseAccent: '#E2E4E8',
    strapAccent: '#481C29',
    description:
      'Pure Geneva minimalism rendered in brushed platinum and warm ivory guilloché. Engineered with a micro-rotor in 22k solid gold.',
  },
  {
    id: 'calibre-03',
    name: 'Aurelia Squelette',
    category: 'Skeleton',
    calibre: 'Calibre TP-09 Openworked',
    powerReserve: '84 Hours',
    caseMaterial: '18k Champagne Gold',
    diameter: '41.0 mm',
    waterResistance: '30m / 3 ATM',
    price: 59000,
    dialAccent: '#241A17',
    caseAccent: '#B99A63',
    strapAccent: '#5C3A21',
    description:
      'Over 140 hours of hand-bevelling reveal the hypnotic dance of the gear train, twin mainspring barrels, and free-sprung balance wheel.',
  },
  {
    id: 'calibre-04',
    name: 'Héritage 1894 Régulateur',
    category: 'Vintage Tribute',
    calibre: 'Calibre TP-12 Manual',
    powerReserve: '96 Hours',
    caseMaterial: 'Antique Bronze & Gold',
    diameter: '38.5 mm',
    waterResistance: '30m / 3 ATM',
    price: 38500,
    dialAccent: '#2E181E',
    caseAccent: '#96744D',
    strapAccent: '#241A17',
    description:
      'Inspired by our founding observatory pocket chronometers. Separate hour, minute, and seconds displays prevent visual overlap during precision timing.',
  },
];

const MOVEMENT_COMPONENTS = [
  {
    id: 'mainspring',
    name: 'Twin Mainspring Barrel',
    frequency: '120-Hour Energy Reserve',
    purpose: 'Energy Storage & Constant Torque',
    detail:
      'Coiled inside two series-coupled brass barrels, a 65-centimeter Nivaflex alloy ribbon stores mechanical tension when wound, releasing steady torque across five full days.',
    specs: ['Nivaflex NM Alloy', 'Series-Coupled Barrels', '650mm Ribbon Length'],
  },
  {
    id: 'geartrain',
    name: 'Gold-Plated Gear Train',
    frequency: '1:3,600 Ratio Transmission',
    purpose: 'Torque Multiplication & Division',
    detail:
      'Center, third, and fourth wheels crafted from hardened beryllium bronze with circular graining transmit power from the barrel to the escapement with minimal friction.',
    specs: ['Epicycloidal Tooth Profile', 'Ruby Pivot Jewels', 'Hand-Beveled Spokes'],
  },
  {
    id: 'escapement',
    name: 'Swiss Lever Escapement',
    frequency: '28,800 Vibrations / Hour',
    purpose: 'Impulse Regulation & Metering',
    detail:
      'The acoustic heart of TEMPORE. Synthetic ruby pallet stones lock and release the 20-tooth escape wheel eight times per second, producing the signature mechanical heartbeat.',
    specs: ['Synthetic Ruby Pallets', 'Skeletonized Escape Wheel', '4 Hz Acoustic Cadence'],
  },
  {
    id: 'balance',
    name: 'Free-Sprung Balance Wheel',
    frequency: '4 Hz / 2.5 µs Isochronism',
    purpose: 'Chronometric Timekeeping Oscillator',
    detail:
      'Equipped with four solid gold inertia weights and a Breguet overcoil hairspring, oscillating with unwavering amplitude regardless of temperature or wrist orientation.',
    specs: ['Breguet Overcoil Hairspring', 'Variable Inertia Weights', 'Shock-Absorbed Pivots'],
  },
];

const TIMELINE_EVENTS = [
  {
    year: '1894',
    title: 'The Geneva Observatory Atelier',
    subtitle: 'Founding of Maison TEMPORE',
    text: 'Master horologist Henri-Laurent Vaucher establishes an independent chronometry workshop on Rue du Rhône, crafting pocket regulators for maritime navigators and astronomical observatories.',
  },
  {
    year: '1928',
    title: 'First Wrist-Worn Tourbillon',
    subtitle: 'Miniaturizing Gravitational Precision',
    text: 'TEMPORE reduces the rotating escapement carriage to under 0.32 grams, winning consecutive Neuchâtel Observatory precision trials.',
  },
  {
    year: '1967',
    title: 'The Calibre TP-01 Architecture',
    subtitle: 'Sculptural Bridges & Burgundy Enamel',
    text: 'Introducing our signature hand-chamfered solid gold bridges paired with deep grand feu burgundy dials fired at 820°C.',
  },
  {
    year: '2026',
    title: 'Modern Haute Horlogerie',
    subtitle: '180 Artisans, 450 Timepieces Annually',
    text: 'Every component—from hairspring alloys to hand-stitched alligator straps—is conceived, machined, and finished under one roof in Geneva.',
  },
];

const EDITORIAL_ARTICLES = [
  {
    id: 'art-1',
    tag: 'PHILOSOPHY',
    readTime: '6 MIN READ',
    title: 'The Architecture of Patience: Why 400 Hours Define a Single Case',
    excerpt:
      'In an era obsessed with instantaneous digital metrics, mechanical horology treats time as a tactile sculpture.',
    fullText: [
      'True luxury cannot be accelerated. Inside the TEMPORE Geneva workshops, a single watch case undergoes 68 distinct milling, annealing, and hand-polishing operations before it ever meets its movement.',
      'Our anglage artisans spend weeks beveling internal bridge angles with gentian wood stems and diamond paste—creating mirror-bright chamfers that catch light from angles invisible to the casual observer.',
      'This devotion to unseen perfection is the soul of TEMPORE: a timepiece engineered not for a season, but for generations of custodians.',
    ],
  },
  {
    id: 'art-2',
    tag: 'METALLURGY',
    readTime: '5 MIN READ',
    title: 'Alchemy in Champagne Gold & Grand Feu Enamel',
    excerpt:
      'How proprietary 18k gold alloys and seven-layer kiln firing create warmth that never fades.',
    fullText: [
      'Standard rose gold leans overly copper; yellow gold can appear stark. TEMPORE’s proprietary 18k Champagne Gold balances fine gold with palladium and trace silver for an enduring, warm lustre.',
      'Paired with our signature Burgundy Grand Feu enamel—crushed mineral oxides sifted onto guilloché gold plates and fired seven times at 820°C—each dial possesses subtle chromatic depth impossible to replicate by lacquer.',
    ],
  },
  {
    id: 'art-3',
    tag: 'CHRONOMETRY',
    readTime: '7 MIN READ',
    title: '28,800 Heartbeats: Inside the Free-Sprung Balance',
    excerpt:
      'Exploring isochronism, Breguet overcoils, and the acoustic signature of mechanical equilibrium.',
    fullText: [
      'Every second, the balance wheel of a TEMPORE calibre completes four full oscillations—eight crisp ticks of the Swiss lever escapement.',
      'By eliminating traditional regulator pins in favor of micro-machined gold inertia screws along the balance rim, our master watchmakers achieve superior chronometric stability across five positions and extreme thermal shifts.',
    ],
  },
];

// --- PROCEDURAL 3D WATCH BUILDER ---
function buildProceduralWatch(THREE, options = {}) {
  const {
    caseHex = 0xd2b47c,
    dialHex = 0x481c29,
    strapHex = 0x241a17,
    detailed = true,
  } = options;

  const root = new THREE.Group();

  const goldMat = new THREE.MeshStandardMaterial({
    color: caseHex,
    metalness: 0.92,
    roughness: 0.18,
  });

  const brushedGoldMat = new THREE.MeshStandardMaterial({
    color: caseHex,
    metalness: 0.88,
    roughness: 0.34,
  });

  const bronzeGearMat = new THREE.MeshStandardMaterial({
    color: 0xb99a63,
    metalness: 0.9,
    roughness: 0.22,
  });

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xd8dce3,
    metalness: 0.95,
    roughness: 0.15,
  });

  const rubyMat = new THREE.MeshStandardMaterial({
    color: 0x9b1138,
    metalness: 0.2,
    roughness: 0.1,
    emissive: 0x3b0514,
    emissiveIntensity: 0.5,
  });

  const dialMat = new THREE.MeshStandardMaterial({
    color: dialHex,
    metalness: 0.35,
    roughness: 0.38,
  });

  const strapMat = new THREE.MeshStandardMaterial({
    color: strapHex,
    metalness: 0.08,
    roughness: 0.72,
  });

  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.04,
    transmission: 0.86,
    transparent: true,
    opacity: 0.34,
    ior: 1.77,
    thickness: 0.25,
  });

  // 1. Caseback Group
  const caseBackGroup = new THREE.Group();
  const caseBackRing = new THREE.Mesh(
    new THREE.CylinderGeometry(1.78, 1.72, 0.18, 64),
    brushedGoldMat
  );
  caseBackRing.rotation.x = Math.PI / 2;
  caseBackGroup.add(caseBackRing);

  const exhibitionGlass = new THREE.Mesh(
    new THREE.CylinderGeometry(1.38, 1.38, 0.05, 48),
    crystalMat
  );
  exhibitionGlass.rotation.x = Math.PI / 2;
  exhibitionGlass.position.z = -0.08;
  caseBackGroup.add(exhibitionGlass);
  caseBackGroup.position.z = -0.34;
  root.add(caseBackGroup);

  // 2. Main Case & Lugs + Straps Group
  const caseBodyGroup = new THREE.Group();
  const middleCase = new THREE.Mesh(
    new THREE.CylinderGeometry(1.85, 1.85, 0.44, 64, 1, true),
    goldMat
  );
  middleCase.rotation.x = Math.PI / 2;
  caseBodyGroup.add(middleCase);

  const innerCaseWall = new THREE.Mesh(
    new THREE.CylinderGeometry(1.66, 1.66, 0.44, 64, 1, true),
    brushedGoldMat
  );
  innerCaseWall.rotation.x = Math.PI / 2;
  caseBodyGroup.add(innerCaseWall);

  // Lugs (4)
  const lugPositions = [
    [-1.12, 1.98, 0.12],
    [1.12, 1.98, -0.12],
    [-1.12, -1.98, -0.12],
    [1.12, -1.98, 0.12],
  ];
  lugPositions.forEach(([lx, ly, rz]) => {
    const lug = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.78, 0.32), goldMat);
    lug.position.set(lx, ly, -0.04);
    lug.rotation.z = rz;
    caseBodyGroup.add(lug);
  });

  // Crown at 3 o'clock
  const crownGroup = new THREE.Group();
  const crownTube = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 0.22, 24),
    brushedGoldMat
  );
  crownTube.rotation.z = Math.PI / 2;
  crownGroup.add(crownTube);

  const crownHead = new THREE.Mesh(
    new THREE.CylinderGeometry(0.26, 0.24, 0.24, 28),
    goldMat
  );
  crownHead.rotation.z = Math.PI / 2;
  crownHead.position.x = 0.16;
  crownGroup.add(crownHead);
  crownGroup.position.set(1.94, 0, 0);
  caseBodyGroup.add(crownGroup);

  // Leather Straps (Top & Bottom)
  const topStrap = new THREE.Mesh(new THREE.BoxGeometry(1.76, 1.9, 0.16), strapMat);
  topStrap.position.set(0, 2.72, -0.18);
  topStrap.rotation.x = 0.18;
  caseBodyGroup.add(topStrap);

  const bottomStrap = new THREE.Mesh(new THREE.BoxGeometry(1.76, 1.9, 0.16), strapMat);
  bottomStrap.position.set(0, -2.72, -0.18);
  bottomStrap.rotation.x = -0.18;
  caseBodyGroup.add(bottomStrap);

  root.add(caseBodyGroup);

  // 3. Internal Mechanical Movement Group
  const movementGroup = new THREE.Group();
  const mainplate = new THREE.Mesh(
    new THREE.CylinderGeometry(1.62, 1.62, 0.12, 64),
    brushedGoldMat
  );
  mainplate.rotation.x = Math.PI / 2;
  movementGroup.add(mainplate);

  // Helper to create toothed gear
  const createGear = (radius, teeth, thickness, mat, hasSpokes = true) => {
    const g = new THREE.Group();
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 0.86, radius * 0.12, 12, 36),
      mat
    );
    g.add(rim);

    if (hasSpokes) {
      for (let i = 0; i < 5; i++) {
        const spoke = new THREE.Mesh(
          new THREE.BoxGeometry(radius * 1.65, radius * 0.1, thickness * 0.7),
          mat
        );
        spoke.rotation.z = (i * Math.PI) / 5;
        g.add(spoke);
      }
    } else {
      const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 0.86, radius * 0.86, thickness, 32),
        mat
      );
      disc.rotation.x = Math.PI / 2;
      g.add(disc);
    }

    const toothCount = detailed ? teeth : Math.max(12, Math.floor(teeth * 0.65));
    for (let i = 0; i < toothCount; i++) {
      const angle = (i / toothCount) * Math.PI * 2;
      const tooth = new THREE.Mesh(
        new THREE.BoxGeometry(radius * 0.11, radius * 0.18, thickness),
        mat
      );
      tooth.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      tooth.rotation.z = angle + Math.PI / 2;
      g.add(tooth);
    }

    const jewel = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.16, radius * 0.16, thickness * 1.4, 16),
      rubyMat
    );
    jewel.rotation.x = Math.PI / 2;
    g.add(jewel);

    return g;
  };

  // Mainspring Barrel (Upper Left)
  const barrelGear = createGear(0.62, 32, 0.14, bronzeGearMat, false);
  barrelGear.position.set(-0.55, 0.56, 0.12);
  movementGroup.add(barrelGear);

  // Center Wheel
  const centerGear = createGear(0.52, 28, 0.1, goldMat, true);
  centerGear.position.set(0, 0, 0.16);
  movementGroup.add(centerGear);

  // Third & Fourth Wheels
  const thirdGear = createGear(0.4, 24, 0.09, bronzeGearMat, true);
  thirdGear.position.set(0.66, 0.34, 0.14);
  movementGroup.add(thirdGear);

  const fourthGear = createGear(0.34, 22, 0.09, steelMat, true);
  fourthGear.position.set(0.62, -0.45, 0.16);
  movementGroup.add(fourthGear);

  // Balance Wheel Assembly (6 o'clock)
  const balanceWheel = new THREE.Group();
  const balRim = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.045, 14, 40), goldMat);
  balanceWheel.add(balRim);
  const balArm = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.05, 0.04), goldMat);
  balanceWheel.add(balArm);
  const hairspring = new THREE.Mesh(
    new THREE.TorusGeometry(0.22, 0.015, 10, 32),
    steelMat
  );
  hairspring.position.z = 0.03;
  balanceWheel.add(hairspring);
  const balJewel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16),
    rubyMat
  );
  balJewel.rotation.x = Math.PI / 2;
  balanceWheel.add(balJewel);
  balanceWheel.position.set(-0.18, -0.76, 0.22);
  movementGroup.add(balanceWheel);

  // Decorative Bridges
  const topBridge = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.34, 0.06), steelMat);
  topBridge.position.set(-0.1, 0.54, 0.24);
  topBridge.rotation.z = -0.35;
  movementGroup.add(topBridge);

  const balanceBridge = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.2, 0.06), goldMat);
  balanceBridge.position.set(-0.18, -0.76, 0.3);
  movementGroup.add(balanceBridge);

  root.add(movementGroup);

  // 4. Dial & Hands Group
  const dialGroup = new THREE.Group();
  const dialDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(1.62, 1.62, 0.06, 64),
    dialMat
  );
  dialDisc.rotation.x = Math.PI / 2;
  dialGroup.add(dialDisc);

  // Open heart aperture ring at 6 o'clock
  const tourbillonRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.42, 0.035, 14, 40),
    goldMat
  );
  tourbillonRing.position.set(-0.18, -0.76, 0.045);
  dialGroup.add(tourbillonRing);

  // 12 Applied Gold Hour Markers
  for (let i = 0; i < 12; i++) {
    if (i === 6) continue;
    const angle = (i / 12) * Math.PI * 2;
    const isCardinal = i % 3 === 0;
    const marker = new THREE.Mesh(
      new THREE.BoxGeometry(isCardinal ? 0.09 : 0.05, isCardinal ? 0.28 : 0.2, 0.04),
      goldMat
    );
    const dist = 1.34;
    marker.position.set(Math.sin(angle) * dist, Math.cos(angle) * dist, 0.045);
    marker.rotation.z = -angle;
    dialGroup.add(marker);
  }

  // Dauphine Hour & Minute Hands
  const hourHand = new THREE.Group();
  const hourMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.85, 0.03), goldMat);
  hourMesh.position.y = 0.32;
  hourHand.add(hourMesh);
  hourHand.position.z = 0.09;
  hourHand.rotation.z = 0.85;
  dialGroup.add(hourHand);

  const minuteHand = new THREE.Group();
  const minMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.24, 0.03), goldMat);
  minMesh.position.y = 0.48;
  minuteHand.add(minMesh);
  minuteHand.position.z = 0.13;
  minuteHand.rotation.z = -0.65;
  dialGroup.add(minuteHand);

  const centerPin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.1, 20),
    goldMat
  );
  centerPin.rotation.x = Math.PI / 2;
  centerPin.position.z = 0.14;
  dialGroup.add(centerPin);

  dialGroup.position.z = 0.26;
  root.add(dialGroup);

  // 5. Bezel Group
  const bezelGroup = new THREE.Group();
  const bezelRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.74, 0.13, 24, 64),
    goldMat
  );
  bezelGroup.add(bezelRing);
  bezelGroup.position.z = 0.42;
  root.add(bezelGroup);

  // 6. Domed Sapphire Crystal Group
  const crystalGroup = new THREE.Group();
  const sapphireLens = new THREE.Mesh(
    new THREE.CylinderGeometry(1.66, 1.68, 0.08, 64),
    crystalMat
  );
  sapphireLens.rotation.x = Math.PI / 2;
  crystalGroup.add(sapphireLens);
  crystalGroup.position.z = 0.5;
  root.add(crystalGroup);

  return {
    root,
    parts: {
      caseBackGroup,
      caseBodyGroup,
      movementGroup,
      dialGroup,
      bezelGroup,
      crystalGroup,
      gears: {
        barrelGear,
        centerGear,
        thirdGear,
        fourthGear,
        balanceWheel,
        hourHand,
        minuteHand,
      },
    },
    materials: {
      goldMat,
      brushedGoldMat,
      dialMat,
      strapMat,
    },
  };
}

// --- HERO 3D CANVAS COMPONENT ---
function HeroWatchCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.1, 8.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xf3ebdd, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffe7bd, 2.8);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd2b47c, 1.8);
    rimLight.position.set(-6, -3, 4);
    scene.add(rimLight);

    const burgundyFill = new THREE.PointLight(0x9b2c4b, 2.2, 15);
    burgundyFill.position.set(-3, 2, 3);
    scene.add(burgundyFill);

    const watch = buildProceduralWatch(THREE, {
      caseHex: 0xd2b47c,
      dialHex: 0x481c29,
      strapHex: 0x241a17,
      detailed: true,
    });
    watch.root.rotation.set(-0.18, -0.35, 0.08);
    scene.add(watch.root);

    // Subtle Floating Champagne Gold Dust
    const particleCount = 65;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 9;
      pPos[i + 1] = (Math.random() - 0.5) * 9;
      pPos[i + 2] = (Math.random() - 0.5) * 5;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xd2b47c,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Gentle float & pointer parallax
      watch.root.position.y = Math.sin(t * 1.1) * 0.1;
      const targetRotY = -0.32 + Math.sin(t * 0.45) * 0.18 + mouseX * 0.35;
      const targetRotX = -0.15 + Math.cos(t * 0.35) * 0.08 - mouseY * 0.25;
      watch.root.rotation.y += (targetRotY - watch.root.rotation.y) * 0.05;
      watch.root.rotation.x += (targetRotX - watch.root.rotation.x) * 0.05;

      // Mechanical gear cadence
      watch.parts.gears.balanceWheel.rotation.z = Math.sin(t * 16) * 0.65;
      watch.parts.gears.fourthGear.rotation.z = -t * 0.7;
      watch.parts.gears.thirdGear.rotation.z = t * 0.35;
      watch.parts.gears.centerGear.rotation.z = -t * 0.15;
      watch.parts.gears.barrelGear.rotation.z = t * 0.08;
      watch.parts.gears.minuteHand.rotation.z = -0.65 - t * 0.02;

      particles.rotation.y = t * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[420px] md:min-h-[580px]" />;
}

// --- 5-STAGE SCROLL-DRIVEN 3D WATCH EXPERIENCE ---
const SCROLL_STAGES = [
  {
    stage: 'STAGE 01',
    title: 'Complete Architecture',
    subtitle: '40.5mm 18k Champagne Gold Case',
    description:
      'Every exterior contour is hand-finished in Geneva. Domed anti-reflective sapphire crystal seals a grand feu burgundy enamel dial framed by applied solid gold indices.',
    specs: ['3 ATM Water Resistance', 'Anti-Reflective Sapphire', 'Hand-Chamfered Lugs'],
  },
  {
    stage: 'STAGE 02',
    title: 'The Watch Opens',
    subtitle: 'Sapphire, Bezel & Dial Separation',
    description:
      'Lifting the sapphire crystal and fluted bezel unveils the dial architecture—exposing the aperture into our signature open-worked balance bridge.',
    specs: ['0.9mm Domed Crystal', '3-Part Case Construction', 'Grand Feu Enamel Plate'],
  },
  {
    stage: 'STAGE 03',
    title: 'The Internal Mechanism',
    subtitle: 'Calibre TP-01 Mechanical Heart',
    description:
      'Beneath the dial lies a symphony of 248 hand-finished parts: twin mainspring barrels driving a gold-plated gear train toward a 4 Hz free-sprung balance wheel.',
    specs: ['28,800 vph (4 Hz)', '120-Hour Power Reserve', '33 Synthetic Ruby Jewels'],
  },
  {
    stage: 'STAGE 04',
    title: 'Exploded Horizon',
    subtitle: 'Interactive Spatial Inspection',
    description:
      'All six primary sub-assemblies suspend in calibrated space. Drag directly on the watch to inspect the geometry from any angle, or reset your viewpoint.',
    specs: ['Drag to Orbit 360°', '6 Isolated Sub-Assemblies', 'Cotes de Genève Bridges'],
  },
  {
    stage: 'STAGE 05',
    title: 'Thousands of Movements. One Perfect Moment.',
    subtitle: 'Precision Reassembly',
    description:
      'Each bridge, gear, and sapphire seal returns to micron-level alignment—restoring silent, enduring chronometric harmony.',
    specs: ['±1 Sec/Day Chronometry', 'Individually Numbered', 'Lifetime Geneva Warranty'],
  },
];

function ScrollExperienceSection() {
  const sectionRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [forceAssembled, setForceAssembled] = useState(false);

  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const userYawRef = useRef(0);
  const userPitchRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const forceAssembledRef = useRef(false);

  useEffect(() => {
    forceAssembledRef.current = forceAssembled;
  }, [forceAssembled]);

  // Native smooth scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const raw = Math.max(0, Math.min(1, scrolled / totalScrollable));
      targetProgressRef.current = raw;
      setScrollProgress(raw);

      const stageIdx = Math.min(4, Math.floor(raw * 5));
      setActiveStage(stageIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js Scene for Pinned 5-Stage Experience
  useEffect(() => {
    const container = canvasWrapRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xf3ebdd, 0.75));
    const keyLight = new THREE.DirectionalLight(0xffe9c4, 3.0);
    keyLight.position.set(6, 7, 8);
    scene.add(keyLight);

    const warmRim = new THREE.DirectionalLight(0xd2b47c, 2.0);
    warmRim.position.set(-6, -4, 5);
    scene.add(warmRim);

    const burgundyAccent = new THREE.PointLight(0x8c223f, 2.5, 16);
    burgundyAccent.position.set(3, -3, 4);
    scene.add(burgundyAccent);

    const watch = buildProceduralWatch(THREE, {
      caseHex: 0xd2b47c,
      dialHex: 0x481c29,
      strapHex: 0x241a17,
      detailed: !isMobile,
    });
    scene.add(watch.root);

    // Pointer Drag Orbit Controls
    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      userYawRef.current += dx * 0.008;
      userPitchRef.current = Math.max(
        -0.85,
        Math.min(0.85, userPitchRef.current + dy * 0.008)
      );
    };
    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    const smoothStep = (edge0, edge1, x) => {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    };

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const targetP = forceAssembledRef.current ? 0 : targetProgressRef.current;
      smoothProgressRef.current += (targetP - smoothProgressRef.current) * 0.08;
      const p = smoothProgressRef.current;

      // Stage progression envelopes
      // 0.0 - 0.2: Stage 1 (Complete)
      // 0.2 - 0.4: Stage 2 (Opening)
      // 0.4 - 0.6: Stage 3 (Movement reveal)
      // 0.6 - 0.8: Stage 4 (Full Exploded)
      // 0.8 - 1.0: Stage 5 (Reassembly)
      const openFactor =
        smoothStep(0.16, 0.36, p) * (1 - smoothStep(0.8, 0.96, p));
      const movementFactor =
        smoothStep(0.36, 0.56, p) * (1 - smoothStep(0.78, 0.94, p));
      const explodeFactor =
        smoothStep(0.56, 0.74, p) * (1 - smoothStep(0.78, 0.92, p));

      // Component Z-axis displacements
      const crystalZ = 0.5 + openFactor * 1.15 + explodeFactor * 1.35;
      const bezelZ = 0.42 + openFactor * 0.72 + explodeFactor * 0.85;
      const dialZ = 0.26 + openFactor * 0.28 + explodeFactor * 0.35;
      const movementZ = 0 + movementFactor * 0.12;
      const caseBodyZ = 0 - movementFactor * 0.35 - explodeFactor * 0.45;
      const caseBackZ = -0.34 - movementFactor * 0.75 - explodeFactor * 0.95;

      watch.parts.crystalGroup.position.z = crystalZ;
      watch.parts.bezelGroup.position.z = bezelZ;
      watch.parts.dialGroup.position.z = dialZ;
      watch.parts.movementGroup.position.z = movementZ;
      watch.parts.caseBodyGroup.position.z = caseBodyZ;
      watch.parts.caseBackGroup.position.z = caseBackZ;

      // Subtle lateral shift of dial during Stage 3 so movement is crystal clear
      watch.parts.dialGroup.position.y = movementFactor * 0.55 - explodeFactor * 0.55;
      watch.parts.dialGroup.rotation.x = -movementFactor * 0.22 + explodeFactor * 0.22;

      // Overall Watch Orientation
      const scrollYaw =
        Math.sin(p * Math.PI * 2) * 0.55 + explodeFactor * 0.65;
      const scrollPitch =
        -0.12 + openFactor * 0.22 - explodeFactor * 0.18;

      watch.root.rotation.y = scrollYaw + userYawRef.current + Math.sin(t * 0.4) * 0.05;
      watch.root.rotation.x = scrollPitch + userPitchRef.current;

      // Camera pullback on Stage 4 & Stage 5
      const targetCamZ = 8.4 + explodeFactor * 1.6 + smoothStep(0.82, 1.0, p) * 0.7;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;

      // Coherent Mechanical Gear Rotation
      watch.parts.gears.balanceWheel.rotation.z = Math.sin(t * 16) * 0.7;
      watch.parts.gears.fourthGear.rotation.z = -t * 0.85;
      watch.parts.gears.thirdGear.rotation.z = t * 0.42;
      watch.parts.gears.centerGear.rotation.z = -t * 0.21;
      watch.parts.gears.barrelGear.rotation.z = t * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(domElem)) {
        container.removeChild(domElem);
      }
    };
  }, []);

  const handleResetView = () => {
    userYawRef.current = 0;
    userPitchRef.current = 0;
    setForceAssembled(false);
  };

  const currentInfo = SCROLL_STAGES[activeStage];

  return (
    <section
      id="craftsmanship-3d"
      ref={sectionRef}
      className="relative h-[420vh] bg-gradient-to-b from-[#241A17] via-[#2F161E] to-[#241A17]"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-20 px-6 md:px-14 lg:px-20">
        {/* Top Progress Header */}
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20 pt-2">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#D2B47C]">
              Interactive Horological Deconstruction
            </p>
            <div className="flex items-center gap-2 mt-2">
              {SCROLL_STAGES.map((s, idx) => (
                <div
                  key={s.stage}
                  className={`h-[2px] transition-all duration-500 ${
                    idx <= activeStage ? 'w-10 bg-[#D2B47C]' : 'w-5 bg-[#F3EBDD]/20'
                  }`}
                />
              ))}
              <span className="text-xs text-[#F3EBDD]/60 ml-2 font-mono">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>

          {/* Interactive View Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetView}
              className="px-3.5 py-2 border border-[#D2B47C]/35 bg-[#241A17]/80 hover:border-[#D2B47C] text-xs tracking-[0.18em] uppercase text-[#F3EBDD] flex items-center gap-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D2B47C]" />
              Reset View
            </button>
            <button
              onClick={() => setForceAssembled((prev) => !prev)}
              className={`px-3.5 py-2 border text-xs tracking-[0.18em] uppercase flex items-center gap-2 transition ${
                forceAssembled
                  ? 'border-[#D2B47C] bg-[#D2B47C] text-[#241A17] font-medium'
                  : 'border-[#D2B47C]/35 bg-[#241A17]/80 hover:border-[#D2B47C] text-[#F3EBDD]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {forceAssembled ? 'Resume Scroll' : 'Assembled View'}
            </button>
          </div>
        </div>

        {/* Center Grid: 3D Watch + Narrative Card */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-6 my-auto z-10">
          {/* Narrative Info */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentInfo.stage}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="bg-[#241A17]/85 backdrop-blur-md border border-[#D2B47C]/25 p-6 md:p-8"
              >
                <div className="flex items-center justify-between border-b border-[#D2B47C]/20 pb-3 mb-4">
                  <span className="text-xs tracking-[0.28em] uppercase text-[#D2B47C] font-medium">
                    {currentInfo.stage}
                  </span>
                  <span className="text-xs text-[#F3EBDD]/50">Calibre TP-01</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-[#F3EBDD] leading-tight mb-2">
                  {currentInfo.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B99A63] mb-4">
                  {currentInfo.subtitle}
                </p>
                <p className="text-sm md:text-base text-[#F3EBDD]/80 leading-relaxed mb-6">
                  {currentInfo.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-[#F3EBDD]/10">
                  {currentInfo.specs.map((spec) => (
                    <div
                      key={spec}
                      className="text-[11px] tracking-wider uppercase text-[#D2B47C] bg-[#481C29]/40 px-2.5 py-2 border border-[#D2B47C]/15"
                    >
                      {spec}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3D Canvas Viewport */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative h-[320px] sm:h-[400px] lg:h-[540px] cursor-grab active:cursor-grabbing">
            <div ref={canvasWrapRef} className="w-full h-full" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none text-[10px] tracking-[0.25em] uppercase text-[#F3EBDD]/45">
              Scroll to Deconstruct • Drag to Rotate
            </div>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center text-[11px] tracking-[0.22em] uppercase text-[#F3EBDD]/45 z-20">
          <span>Geneva Manufacture</span>
          <span>Keep Scrolling to Explore All 5 Stages</span>
        </div>
      </div>
    </section>
  );
}

// --- BESPOKE VECTOR DIAL VISUALIZATION FOR COLLECTION & CONFIGURATOR ---
function WatchDialIllustration({
  caseColor = '#D2B47C',
  dialColor = '#481C29',
  strapColor = '#241A17',
  openHeart = true,
  size = 240,
}) {
  return (
    <svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 240 324"
      className="drop-shadow-[0_22px_28px_rgba(0,0,0,0.65)] select-none"
    >
      <defs>
        <linearGradient id={`goldGrad-${caseColor}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5E1B5" />
          <stop offset="45%" stopColor={caseColor} />
          <stop offset="100%" stopColor="#7A5B36" />
        </linearGradient>
        <radialGradient id={`dialGrad-${dialColor}`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={dialColor} />
          <stop offset="100%" stopColor="#170E10" />
        </radialGradient>
      </defs>

      {/* Top & Bottom Leather Straps */}
      <path d="M84 14 L156 14 L162 86 L78 86 Z" fill={strapColor} />
      <path d="M78 238 L162 238 L156 310 L84 310 Z" fill={strapColor} />
      {/* Subtle Strap Stitching */}
      <line x1="90" y1="18" x2="85" y2="82" stroke="#D2B47C" strokeOpacity="0.3" strokeDasharray="3 3" />
      <line x1="150" y1="18" x2="155" y2="82" stroke="#D2B47C" strokeOpacity="0.3" strokeDasharray="3 3" />
      <line x1="85" y1="242" x2="90" y2="306" stroke="#D2B47C" strokeOpacity="0.3" strokeDasharray="3 3" />
      <line x1="155" y1="242" x2="150" y2="306" stroke="#D2B47C" strokeOpacity="0.3" strokeDasharray="3 3" />

      {/* Lugs */}
      <path d="M68 76 L84 64 L88 96 L64 108 Z" fill={`url(#goldGrad-${caseColor})`} />
      <path d="M172 76 L156 64 L152 96 L176 108 Z" fill={`url(#goldGrad-${caseColor})`} />
      <path d="M68 248 L84 260 L88 228 L64 216 Z" fill={`url(#goldGrad-${caseColor})`} />
      <path d="M172 248 L156 260 L152 228 L176 216 Z" fill={`url(#goldGrad-${caseColor})`} />

      {/* Crown */}
      <rect x="196" y="150" width="12" height="24" rx="2" fill={`url(#goldGrad-${caseColor})`} />

      {/* Outer Case & Bezel */}
      <circle cx="120" cy="162" r="78" fill={`url(#goldGrad-${caseColor})`} />
      <circle cx="120" cy="162" r="71" fill="#1B1210" />
      <circle cx="120" cy="162" r="68" fill={`url(#dialGrad-${dialColor})`} />

      {/* Minute Track */}
      <circle
        cx="120"
        cy="162"
        r="62"
        fill="none"
        stroke="#D2B47C"
        strokeOpacity="0.35"
        strokeWidth="0.8"
        strokeDasharray="1.5 4.98"
      />

      {/* Hour Indices */}
      {Array.from({ length: 12 }).map((_, i) => {
        if (openHeart && i === 6) return null;
        const angle = i * 30;
        const isMain = i % 3 === 0;
        return (
          <g key={i} transform={`rotate(${angle} 120 162)`}>
            <rect
              x={isMain ? 118.2 : 119}
              y="102"
              width={isMain ? 3.6 : 2}
              height={isMain ? 11 : 8}
              fill={`url(#goldGrad-${caseColor})`}
            />
          </g>
        );
      })}

      {/* Brand Signature */}
      <text
        x="120"
        y="134"
        textAnchor="middle"
        fill="#F3EBDD"
        fontSize="7"
        letterSpacing="3"
        fontFamily="Cormorant Garamond, serif"
      >
        TEMPORE
      </text>
      <text
        x="120"
        y="141"
        textAnchor="middle"
        fill="#D2B47C"
        fontSize="4"
        letterSpacing="2"
      >
        GENÈVE
      </text>

      {/* Open Heart / Tourbillon Aperture */}
      {openHeart && (
        <g transform="translate(120, 198)">
          <circle r="16" fill="#18100E" stroke={`url(#goldGrad-${caseColor})`} strokeWidth="1.8" />
          <circle r="11" fill="none" stroke="#B99A63" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="-13" y1="0" x2="13" y2="0" stroke={`url(#goldGrad-${caseColor})`} strokeWidth="1.5" />
          <circle r="2.5" fill="#9B1138" />
        </g>
      )}

      {/* Dauphine Hands */}
      <g transform="rotate(-48 120 162)">
        <polygon points="120,124 123,162 120,168 117,162" fill={`url(#goldGrad-${caseColor})`} />
      </g>
      <g transform="rotate(62 120 162)">
        <polygon points="120,108 122.4,162 120,170 117.6,162" fill="#F3EBDD" />
      </g>
      <circle cx="120" cy="162" r="3.5" fill={`url(#goldGrad-${caseColor})`} />
    </svg>
  );
}

// --- MAIN APPLICATION ---
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(MOVEMENT_COMPONENTS[0]);
  const [isMovementPlaying, setIsMovementPlaying] = useState(true);
  const [activeArticle, setActiveArticle] = useState(null);

  // Shopping Bag State
  const [bagOpen, setBagOpen] = useState(false);
  const [bagItems, setBagItems] = useState([
    {
      id: 'calibre-01',
      name: 'Souverain Tourbillon I',
      subtitle: '18k Rose Gold • Burgundy Enamel',
      price: 68500,
      qty: 1,
    },
  ]);

  // Configurator State
  const [configCase, setConfigCase] = useState({
    name: '18k Champagne Gold',
    hex: '#D2B47C',
    delta: 0,
  });
  const [configDial, setConfigDial] = useState({
    name: 'Grand Feu Burgundy',
    hex: '#481C29',
    delta: 0,
  });
  const [configStrap, setConfigStrap] = useState({
    name: 'Espresso Alligator',
    hex: '#241A17',
    delta: 0,
  });
  const [configOpenHeart, setConfigOpenHeart] = useState(true);

  // Contact / Salon Form State
  const [salonEmail, setSalonEmail] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const addToBag = (item) => {
    setBagItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setBagOpen(true);
    showToast(`Added "${item.name}" to your Private Acquisition Bag.`);
  };

  const removeFromBag = (id) => {
    setBagItems((prev) => prev.filter((i) => i.id !== id));
  };

  const totalBagCount = bagItems.reduce((acc, i) => acc + i.qty, 0);
  const totalBagValue = bagItems.reduce((acc, i) => acc + i.price * i.qty, 0);

  const customWatchPrice =
    46000 + configCase.delta + configDial.delta + configStrap.delta + (configOpenHeart ? 4500 : 0);

  return (
    <div className="min-h-screen bg-[#241A17] text-[#F3EBDD] selection:bg-[#D2B47C] selection:text-[#241A17]">
      {/* Custom Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-6 right-6 z-50 bg-[#481C29] border border-[#D2B47C] text-[#F3EBDD] px-5 py-3.5 shadow-2xl flex items-center gap-3 max-w-md"
          >
            <Sparkles className="w-4 h-4 text-[#D2B47C] shrink-0" />
            <span className="text-xs tracking-wide">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVBAR --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#241A17]/95 backdrop-blur-md border-b border-[#D2B47C]/20 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#home" className="flex flex-col group">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.28em] text-[#F3EBDD] font-semibold">
              TEMPORE
            </span>
            <span className="text-[9px] tracking-[0.42em] text-[#D2B47C] uppercase -mt-1">
              Genève • 1894
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-9 text-xs tracking-[0.22em] uppercase">
            <a href="#home" className="hover:text-[#D2B47C] transition">
              Home
            </a>
            <a href="#collection" className="hover:text-[#D2B47C] transition">
              Collection
            </a>
            <a href="#craftsmanship-3d" className="hover:text-[#D2B47C] transition">
              Craftsmanship
            </a>
            <a href="#story" className="hover:text-[#D2B47C] transition">
              Our Story
            </a>
            <a href="#configurator" className="hover:text-[#D2B47C] transition">
              Atelier Bespoke
            </a>
            <a href="#contact" className="hover:text-[#D2B47C] transition">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setBagOpen(true)}
              aria-label="Open Acquisition Bag"
              className="relative p-2 text-[#F3EBDD] hover:text-[#D2B47C] transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalBagCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#D2B47C] text-[#241A17] text-[10px] font-bold flex items-center justify-center">
                  {totalBagCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle Navigation"
              className="lg:hidden p-2 text-[#F3EBDD] hover:text-[#D2B47C]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#241A17] border-b border-[#D2B47C]/25 px-6 py-6 flex flex-col gap-4 text-xs tracking-[0.24em] uppercase"
            >
              {[
                ['Home', '#home'],
                ['Collection', '#collection'],
                ['Craftsmanship', '#craftsmanship-3d'],
                ['Our Story', '#story'],
                ['Atelier Bespoke', '#configurator'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-[#F3EBDD]/10 hover:text-[#D2B47C]"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO SECTION --- */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[radial-gradient(circle_at_72%_45%,#481C29_0%,#241A17_65%)]"
      >
        {/* Subtle Architectural Hairline Ring */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="pointer-events-none absolute right-[8%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-[#D2B47C]"
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
          {/* Left Typography */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="lg:col-span-6 z-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[1px] bg-[#D2B47C]" />
              <span className="text-xs tracking-[0.32em] uppercase text-[#D2B47C]">
                Haute Horlogerie Suisse
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl leading-[1.04] tracking-tight text-[#F3EBDD] mb-6">
              TIME IS AN <br />
              <span className="italic text-[#D2B47C] font-normal">ART FORM.</span>
            </h1>

            <p className="text-base md:text-lg text-[#F3EBDD]/80 max-w-xl leading-relaxed mb-10 font-light">
              Discover the beauty of precision, craftsmanship, and timeless design.
              Hand-assembled in Geneva with proprietary 18k champagne gold calibres and grand feu
              burgundy enamel dials.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#collection"
                className="px-7 py-4 bg-[#D2B47C] text-[#241A17] text-xs tracking-[0.22em] uppercase font-semibold hover:bg-[#F3EBDD] transition flex items-center gap-2.5"
              >
                Explore Collection
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#craftsmanship-3d"
                className="px-7 py-4 border border-[#D2B47C]/50 text-[#F3EBDD] text-xs tracking-[0.22em] uppercase hover:border-[#D2B47C] hover:bg-[#481C29]/40 transition"
              >
                Discover Our Craft
              </a>
            </div>

            {/* Key Horological Metrics */}
            <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-[#D2B47C]/20 max-w-lg">
              <div>
                <p className="font-serif text-2xl md:text-3xl text-[#D2B47C]">28,800</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#F3EBDD]/60 mt-1">
                  Vibrations / Hr
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl text-[#D2B47C]">120 HRS</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#F3EBDD]/60 mt-1">
                  Power Reserve
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl text-[#D2B47C]">450</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#F3EBDD]/60 mt-1">
                  Pieces / Year
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive 3D Watch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <HeroWatchCanvas />
          </motion.div>
        </div>
      </section>

      {/* --- 5-STAGE SCROLL-DRIVEN 3D WATCH EXPERIENCE --- */}
      <ScrollExperienceSection />

      {/* --- COLLECTION SECTION --- */}
      <section id="collection" className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#D2B47C] mb-3">
              Curated Timepieces
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#F3EBDD]">
              The Signature Collection
            </h2>
          </div>
          <p className="text-sm text-[#F3EBDD]/70 max-w-md leading-relaxed">
            Each TEMPORE reference is individually numbered on its hand-engraved gold rotor and
            accompanied by an official Geneva Observatory chronometry certificate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {COLLECTION_WATCHES.map((watch) => (
            <motion.div
              key={watch.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35 }}
              className="group bg-[#1D1412] border border-[#D2B47C]/20 hover:border-[#D2B47C]/60 transition flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-[#B99A63] mb-4">
                  <span>{watch.category}</span>
                  <span>{watch.diameter}</span>
                </div>

                {/* Bespoke Dial Preview */}
                <div className="py-6 flex justify-center items-center bg-[radial-gradient(circle,#481C29_0%,#18100E_75%)] border border-[#D2B47C]/10 mb-6 overflow-hidden">
                  <div className="transform group-hover:scale-105 transition duration-500">
                    <WatchDialIllustration
                      caseColor={watch.caseAccent}
                      dialColor={watch.dialAccent}
                      strapColor={watch.strapAccent}
                      size={150}
                    />
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-[#F3EBDD] mb-1.5">{watch.name}</h3>
                <p className="text-xs text-[#D2B47C] tracking-wider uppercase mb-3">
                  {watch.calibre}
                </p>
                <p className="text-xs text-[#F3EBDD]/70 leading-relaxed mb-6">
                  {watch.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F3EBDD]/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#F3EBDD]/50 block">
                    Acquisition
                  </span>
                  <span className="font-serif text-xl text-[#D2B47C]">
                    CHF {watch.price.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedWatch(watch)}
                  className="px-4 py-2.5 border border-[#D2B47C]/40 hover:bg-[#D2B47C] hover:text-[#241A17] text-[11px] tracking-[0.2em] uppercase transition"
                >
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- MECHANICAL MOVEMENT INTERACTIVE EXPLORER --- */}
      <section className="py-28 bg-[#1B1311] border-y border-[#D2B47C]/15 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#D2B47C] mb-3">
              Anatomy of Precision
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#F3EBDD] mb-4">
              How a Mechanical Calibre Breathes
            </h2>
            <p className="text-sm text-[#F3EBDD]/75 leading-relaxed">
              Select an organ of Calibre TP-01 below to inspect how stored spring tension is
              transformed into eight rhythmic beats per second.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Interactive Animated 2D Horological Schematic */}
            <div className="lg:col-span-6 bg-[#241A17] border border-[#D2B47C]/25 p-8 relative flex flex-col items-center justify-center">
              <div className="w-full flex justify-between items-center mb-4">
                <span className="text-[11px] tracking-[0.24em] uppercase text-[#D2B47C]">
                  Calibre TP-01 Schematic
                </span>
                <button
                  onClick={() => setIsMovementPlaying((v) => !v)}
                  className="text-xs uppercase tracking-widest text-[#F3EBDD]/70 hover:text-[#D2B47C] flex items-center gap-1.5"
                >
                  {isMovementPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause Cadence
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Resume Cadence
                    </>
                  )}
                </button>
              </div>

              <svg viewBox="0 0 420 300" className="w-full max-w-md">
                {/* Mainplate outline */}
                <circle
                  cx="210"
                  cy="150"
                  r="134"
                  fill="#18100E"
                  stroke="#96744D"
                  strokeWidth="2"
                />
                <circle
                  cx="210"
                  cy="150"
                  r="126"
                  fill="none"
                  stroke="#D2B47C"
                  strokeOpacity="0.25"
                  strokeDasharray="4 4"
                />

                {/* 1. Mainspring Barrel */}
                <g
                  onClick={() => setSelectedComponent(MOVEMENT_COMPONENTS[0])}
                  className="cursor-pointer"
                >
                  <circle
                    cx="145"
                    cy="115"
                    r="46"
                    fill={selectedComponent.id === 'mainspring' ? '#481C29' : '#2A1E1A'}
                    stroke={selectedComponent.id === 'mainspring' ? '#D2B47C' : '#96744D'}
                    strokeWidth="2.5"
                  />
                  <path
                    d="M145 115 m-26 0 a26 26 0 1 0 52 0 a20 20 0 1 0 -40 0 a12 12 0 1 0 24 0"
                    fill="none"
                    stroke="#D2B47C"
                    strokeWidth="2"
                  />
                  <text x="145" y="174" textAnchor="middle" fill="#F3EBDD" fontSize="9">
                    MAINSPRING
                  </text>
                </g>

                {/* 2. Gear Train */}
                <g
                  onClick={() => setSelectedComponent(MOVEMENT_COMPONENTS[1])}
                  className="cursor-pointer"
                >
                  <motion.g
                    animate={isMovementPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                    style={{ originX: '232px', originY: '115px' }}
                  >
                    <circle
                      cx="232"
                      cy="115"
                      r="34"
                      fill={selectedComponent.id === 'geartrain' ? '#481C29' : '#2A1E1A'}
                      stroke={selectedComponent.id === 'geartrain' ? '#D2B47C' : '#B99A63'}
                      strokeWidth="2"
                      strokeDasharray="6 3"
                    />
                    <line x1="202" y1="115" x2="262" y2="115" stroke="#D2B47C" strokeWidth="1.5" />
                    <line x1="232" y1="85" x2="232" y2="145" stroke="#D2B47C" strokeWidth="1.5" />
                    <circle cx="232" cy="115" r="5" fill="#9B1138" />
                  </motion.g>
                  <text x="232" y="162" textAnchor="middle" fill="#F3EBDD" fontSize="9">
                    GEAR TRAIN
                  </text>
                </g>

                {/* 3. Escapement */}
                <g
                  onClick={() => setSelectedComponent(MOVEMENT_COMPONENTS[2])}
                  className="cursor-pointer"
                >
                  <motion.g
                    animate={isMovementPlaying ? { rotate: -360 } : { rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                    style={{ originX: '275px', originY: '185px' }}
                  >
                    <circle
                      cx="275"
                      cy="185"
                      r="24"
                      fill={selectedComponent.id === 'escapement' ? '#481C29' : '#2A1E1A'}
                      stroke={selectedComponent.id === 'escapement' ? '#D2B47C' : '#96744D'}
                      strokeWidth="2"
                      strokeDasharray="3 4"
                    />
                    <circle cx="275" cy="185" r="4" fill="#9B1138" />
                  </motion.g>
                  <text x="275" y="222" textAnchor="middle" fill="#F3EBDD" fontSize="9">
                    ESCAPEMENT
                  </text>
                </g>

                {/* 4. Balance Wheel */}
                <g
                  onClick={() => setSelectedComponent(MOVEMENT_COMPONENTS[3])}
                  className="cursor-pointer"
                >
                  <motion.g
                    animate={isMovementPlaying ? { rotate: [-42, 42, -42] } : { rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 0.75, ease: 'easeInOut' }}
                    style={{ originX: '185px', originY: '205px' }}
                  >
                    <circle
                      cx="185"
                      cy="205"
                      r="36"
                      fill={selectedComponent.id === 'balance' ? '#481C29' : '#2A1E1A'}
                      stroke={selectedComponent.id === 'balance' ? '#D2B47C' : '#D2B47C'}
                      strokeWidth="3"
                    />
                    <line x1="150" y1="205" x2="220" y2="205" stroke="#D2B47C" strokeWidth="2" />
                    <circle cx="185" cy="205" r="14" fill="none" stroke="#F3EBDD" strokeWidth="1" />
                    <circle cx="185" cy="205" r="4.5" fill="#9B1138" />
                  </motion.g>
                  <text x="185" y="255" textAnchor="middle" fill="#F3EBDD" fontSize="9">
                    BALANCE WHEEL
                  </text>
                </g>
              </svg>
            </div>

            {/* Component Selector & Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {MOVEMENT_COMPONENTS.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComponent(comp)}
                    className={`p-4 text-left border transition ${
                      selectedComponent.id === comp.id
                        ? 'bg-[#481C29] border-[#D2B47C] text-[#F3EBDD]'
                        : 'bg-[#241A17] border-[#D2B47C]/20 text-[#F3EBDD]/75 hover:border-[#D2B47C]/50'
                    }`}
                  >
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#D2B47C] block mb-1">
                      {comp.frequency}
                    </span>
                    <span className="font-serif text-lg">{comp.name}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedComponent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#241A17] border border-[#D2B47C]/30 p-7"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-[#B99A63] mb-2">
                    {selectedComponent.purpose}
                  </p>
                  <h3 className="font-serif text-3xl text-[#F3EBDD] mb-3">
                    {selectedComponent.name}
                  </h3>
                  <p className="text-sm text-[#F3EBDD]/80 leading-relaxed mb-6">
                    {selectedComponent.detail}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedComponent.specs.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] uppercase tracking-wider px-3 py-1.5 bg-[#481C29]/60 border border-[#D2B47C]/25 text-[#D2B47C]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- CRAFTSMANSHIP PILLARS --- */}
      <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#D2B47C] mb-3">
            Geneva Atelier Standards
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F3EBDD]">
            Four Pillars of Hand Finishing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Compass,
              title: 'Hand Assembly',
              metric: '2x Full Assemblies',
              desc: 'Every movement is assembled twice: first to verify end-shake tolerances, then disassembled, ultrasonically cleaned, and lubricated for final certification.',
            },
            {
              icon: Sparkles,
              title: 'Black Polishing',
              metric: 'Spéculaire Finish',
              desc: 'Steel tourbillon cages are lapped on zinc plates with diamond paste until they reflect light at a single angle and appear jet-black from all others.',
            },
            {
              icon: ShieldCheck,
              title: 'Micron Engineering',
              metric: '±0.002 mm Tolerance',
              desc: 'Gear profiles and pivot arbors are machined to two-thousandths of a millimeter before undergoing manual burnishing.',
            },
            {
              icon: Award,
              title: 'Noble Metallurgy',
              metric: '18k Champagne Gold',
              desc: 'Smelted in-house from ethical Swiss-refined gold, palladium, and trace copper for an unmistakable warm satin glow.',
            },
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-7 bg-[#1D1412] border border-[#D2B47C]/20 hover:border-[#D2B47C]/50 transition"
              >
                <Icon className="w-6 h-6 text-[#D2B47C] mb-5" />
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#B99A63] mb-1">
                  {pillar.metric}
                </p>
                <h3 className="font-serif text-2xl text-[#F3EBDD] mb-3">{pillar.title}</h3>
                <p className="text-xs text-[#F3EBDD]/75 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- OUR STORY / HERITAGE TIMELINE --- */}
      <section
        id="story"
        className="py-28 bg-gradient-to-b from-[#241A17] via-[#3A1722] to-[#241A17] px-6 md:px-12"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#D2B47C] mb-3">
              Chronicle of Maison TEMPORE
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#F3EBDD]">
              132 Years of Independent Horology
            </h2>
          </div>

          <div className="relative border-l border-[#D2B47C]/35 pl-8 md:pl-12 space-y-14">
            {TIMELINE_EVENTS.map((ev) => (
              <motion.div
                key={ev.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <span className="absolute -left-[41px] md:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-[#241A17] border-2 border-[#D2B47C]" />
                <span className="font-serif text-3xl md:text-4xl text-[#D2B47C] block mb-1">
                  {ev.year}
                </span>
                <p className="text-xs uppercase tracking-[0.22em] text-[#B99A63] mb-2">
                  {ev.subtitle}
                </p>
                <h3 className="font-serif text-2xl text-[#F3EBDD] mb-2">{ev.title}</h3>
                <p className="text-sm text-[#F3EBDD]/80 leading-relaxed max-w-2xl">{ev.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BESPOKE WATCH CONFIGURATOR --- */}
      <section id="configurator" className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#D2B47C] mb-3">
              Sur-Mesure Commission
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#F3EBDD]">
              Bespoke Atelier Configurator
            </h2>
          </div>
          <p className="text-xs tracking-[0.2em] uppercase text-[#B99A63] flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Estimated Delivery: 14 Weeks from Geneva
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#1B1311] border border-[#D2B47C]/25 p-6 md:p-12 items-center">
          {/* Live Visual Preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center py-8 bg-[radial-gradient(circle,#481C29_0%,#160F0D_75%)] border border-[#D2B47C]/15">
            <WatchDialIllustration
              caseColor={configCase.hex}
              dialColor={configDial.hex}
              strapColor={configStrap.hex}
              openHeart={configOpenHeart}
              size={220}
            />
            <div className="mt-6 text-center">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#D2B47C]">
                {configCase.name} • {configDial.name}
              </p>
              <p className="text-xs text-[#F3EBDD]/60 mt-1">{configStrap.name}</p>
            </div>
          </div>

          {/* Customization Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Case Material */}
            <div>
              <label className="text-xs tracking-[0.24em] uppercase text-[#D2B47C] block mb-3">
                01. Case Metallurgy
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: '18k Champagne Gold', hex: '#D2B47C', delta: 0 },
                  { name: '950 Platinum', hex: '#E3E5E8', delta: 8500 },
                  { name: 'Antique Bronze', hex: '#96744D', delta: -3500 },
                ].map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setConfigCase(opt)}
                    className={`p-3.5 border text-left flex items-center gap-3 transition ${
                      configCase.name === opt.name
                        ? 'border-[#D2B47C] bg-[#481C29]/60'
                        : 'border-[#F3EBDD]/15 bg-[#241A17] hover:border-[#D2B47C]/50'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-white/30 shrink-0"
                      style={{ backgroundColor: opt.hex }}
                    />
                    <div>
                      <span className="text-xs font-medium block">{opt.name}</span>
                      <span className="text-[10px] text-[#F3EBDD]/55">
                        {opt.delta === 0
                          ? 'Included'
                          : `${opt.delta > 0 ? '+' : ''}CHF ${opt.delta.toLocaleString()}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Dial Enamel */}
            <div>
              <label className="text-xs tracking-[0.24em] uppercase text-[#D2B47C] block mb-3">
                02. Grand Feu Dial Finish
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Grand Feu Burgundy', hex: '#481C29', delta: 0 },
                  { name: 'Warm Ivory Guilloché', hex: '#F3EBDD', delta: 1500 },
                  { name: 'Obsidian Espresso', hex: '#241A17', delta: 1000 },
                ].map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setConfigDial(opt)}
                    className={`p-3.5 border text-left flex items-center gap-3 transition ${
                      configDial.name === opt.name
                        ? 'border-[#D2B47C] bg-[#481C29]/60'
                        : 'border-[#F3EBDD]/15 bg-[#241A17] hover:border-[#D2B47C]/50'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-white/30 shrink-0"
                      style={{ backgroundColor: opt.hex }}
                    />
                    <div>
                      <span className="text-xs font-medium block">{opt.name}</span>
                      <span className="text-[10px] text-[#F3EBDD]/55">
                        {opt.delta === 0 ? 'Signature' : `+CHF ${opt.delta.toLocaleString()}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Strap Type */}
            <div>
              <label className="text-xs tracking-[0.24em] uppercase text-[#D2B47C] block mb-3">
                03. Hand-Stitched Strap
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Espresso Alligator', hex: '#241A17', delta: 0 },
                  { name: 'Burgundy Calfskin', hex: '#481C29', delta: 0 },
                  { name: 'Saddle Cognac', hex: '#6E4528', delta: 500 },
                ].map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setConfigStrap(opt)}
                    className={`p-3.5 border text-left flex items-center gap-3 transition ${
                      configStrap.name === opt.name
                        ? 'border-[#D2B47C] bg-[#481C29]/60'
                        : 'border-[#F3EBDD]/15 bg-[#241A17] hover:border-[#D2B47C]/50'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-white/30 shrink-0"
                      style={{ backgroundColor: opt.hex }}
                    />
                    <div>
                      <span className="text-xs font-medium block">{opt.name}</span>
                      <span className="text-[10px] text-[#F3EBDD]/55">
                        {opt.delta === 0 ? 'Included' : `+CHF ${opt.delta.toLocaleString()}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Aperture Option */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setConfigOpenHeart((v) => !v)}
                className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-[#F3EBDD]"
              >
                <span
                  className={`w-5 h-5 border flex items-center justify-center ${
                    configOpenHeart ? 'bg-[#D2B47C] border-[#D2B47C] text-[#241A17]' : 'border-[#D2B47C]/50'
                  }`}
                >
                  {configOpenHeart && <Check className="w-3.5 h-3.5" />}
                </span>
                Open-Heart Balance Aperture (+CHF 4,500)
              </button>
            </div>

            {/* Commission Action */}
            <div className="pt-6 border-t border-[#D2B47C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#F3EBDD]/55 block">
                  Bespoke Commission Total
                </span>
                <span className="font-serif text-3xl text-[#D2B47C]">
                  CHF {customWatchPrice.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() =>
                  addToBag({
                    id: `bespoke-${Date.now()}`,
                    name: 'TEMPORE Sur-Mesure Commission',
                    subtitle: `${configCase.name} • ${configDial.name} • ${configStrap.name}`,
                    price: customWatchPrice,
                  })
                }
                className="px-7 py-4 bg-[#D2B47C] text-[#241A17] text-xs tracking-[0.22em] uppercase font-semibold hover:bg-[#F3EBDD] transition flex items-center justify-center gap-2"
              >
                Reserve Bespoke Commission
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- EDITORIAL JOURNAL --- */}
      <section className="py-28 bg-[#1B1311] border-t border-[#D2B47C]/15 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#D2B47C] mb-3">
              La Revue TEMPORE
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#F3EBDD]">
              Essays on Mechanical Artistry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EDITORIAL_ARTICLES.map((art) => (
              <article
                key={art.id}
                className="bg-[#241A17] border border-[#D2B47C]/20 p-8 flex flex-col justify-between hover:border-[#D2B47C]/50 transition"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] tracking-[0.24em] uppercase text-[#B99A63] mb-5">
                    <span>{art.tag}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#F3EBDD] leading-snug mb-4">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#F3EBDD]/75 leading-relaxed mb-8">{art.excerpt}</p>
                </div>

                <button
                  onClick={() => setActiveArticle(art)}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[#D2B47C] hover:text-[#F3EBDD] transition"
                >
                  <BookOpen className="w-4 h-4" />
                  Read Full Essay
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER & GENEVA SALON CONTACT --- */}
      <footer id="contact" className="bg-[#140E0D] border-t border-[#D2B47C]/25 pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#F3EBDD]/10">
          <div className="lg:col-span-4">
            <span className="font-serif text-3xl tracking-[0.28em] text-[#F3EBDD] font-semibold block">
              TEMPORE
            </span>
            <span className="text-[10px] tracking-[0.42em] text-[#D2B47C] uppercase block mt-1 mb-6">
              Haute Horlogerie Genève
            </span>
            <p className="text-xs text-[#F3EBDD]/70 leading-relaxed max-w-sm mb-6">
              Private viewings and bespoke consultations are hosted by appointment at our historic
              Geneva salon overlooking Lake Léman.
            </p>
            <div className="space-y-2 text-xs text-[#F3EBDD]/75">
              <p className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D2B47C]" /> Rue du Rhône 42, 1204 Genève, Switzerland
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D2B47C]" /> +41 22 819 04 94
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D2B47C]" /> concierge@tempore-geneve.ch
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs tracking-[0.24em] uppercase text-[#D2B47C] mb-5">Navigation</h4>
            <ul className="space-y-3 text-xs text-[#F3EBDD]/75">
              <li><a href="#home" className="hover:text-[#D2B47C]">Home</a></li>
              <li><a href="#collection" className="hover:text-[#D2B47C]">Collection</a></li>
              <li><a href="#craftsmanship-3d" className="hover:text-[#D2B47C]">3D Deconstruction</a></li>
              <li><a href="#story" className="hover:text-[#D2B47C]">Our Story</a></li>
              <li><a href="#configurator" className="hover:text-[#D2B47C]">Atelier Bespoke</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs tracking-[0.24em] uppercase text-[#D2B47C] mb-5">Salons</h4>
            <ul className="space-y-3 text-xs text-[#F3EBDD]/75">
              <li>Geneva Flagship</li>
              <li>Paris Place Vendôme</li>
              <li>Tokyo Ginza Salon</li>
              <li>New York Madison Ave</li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs tracking-[0.24em] uppercase text-[#D2B47C] mb-5">
              Private Collectors’ Dispatch
            </h4>
            <p className="text-xs text-[#F3EBDD]/70 leading-relaxed mb-4">
              Receive invitations to annual Geneva calibre unveilings and limited-edition archive
              releases.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!salonEmail.trim()) return;
                showToast(`Thank you. ${salonEmail} is registered for the Geneva Collectors' Dispatch.`);
                setSalonEmail('');
              }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                required
                value={salonEmail}
                onChange={(e) => setSalonEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-[#241A17] border border-[#D2B47C]/35 px-4 py-3 text-xs text-[#F3EBDD] placeholder:text-[#F3EBDD]/40 focus:outline-none focus:border-[#D2B47C]"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#D2B47C] text-[#241A17] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#F3EBDD] transition"
              >
                Subscribe
              </button>
            </form>
            <div className="flex items-center gap-4 mt-6 text-[#D2B47C]">
              <a href="#contact" aria-label="Instagram" className="hover:text-[#F3EBDD]">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#contact" aria-label="Global Concierge" className="hover:text-[#F3EBDD]">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#contact" aria-label="Chronometry Registry" className="hover:text-[#F3EBDD]">
                <Clock className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F3EBDD]/45 gap-4">
          <p>© {new Date().getFullYear()} TEMPORE Manufacture Horlogère Genève SA. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Swiss Made • Poinçon de Genève</p>
        </div>
      </footer>

      {/* --- WATCH SPECIFICATION MODAL --- */}
      <AnimatePresence>
        {selectedWatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedWatch(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#241A17] border border-[#D2B47C]/40 max-w-3xl w-full p-6 md:p-10 relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <button
                onClick={() => setSelectedWatch(null)}
                className="absolute top-5 right-5 text-[#F3EBDD]/60 hover:text-[#D2B47C]"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="md:col-span-5 flex justify-center py-6 bg-[radial-gradient(circle,#481C29_0%,#18100E_80%)] border border-[#D2B47C]/15">
                <WatchDialIllustration
                  caseColor={selectedWatch.caseAccent}
                  dialColor={selectedWatch.dialAccent}
                  strapColor={selectedWatch.strapAccent}
                  size={170}
                />
              </div>

              <div className="md:col-span-7">
                <span className="text-[11px] tracking-[0.26em] uppercase text-[#D2B47C]">
                  {selectedWatch.category}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#F3EBDD] mt-1 mb-3">
                  {selectedWatch.name}
                </h3>
                <p className="text-xs text-[#F3EBDD]/80 leading-relaxed mb-6">
                  {selectedWatch.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs border-y border-[#D2B47C]/20 py-4 mb-6">
                  <div>
                    <span className="text-[#F3EBDD]/50 block text-[10px] uppercase">Calibre</span>
                    <span>{selectedWatch.calibre}</span>
                  </div>
                  <div>
                    <span className="text-[#F3EBDD]/50 block text-[10px] uppercase">Power Reserve</span>
                    <span>{selectedWatch.powerReserve}</span>
                  </div>
                  <div>
                    <span className="text-[#F3EBDD]/50 block text-[10px] uppercase">Case</span>
                    <span>{selectedWatch.caseMaterial} ({selectedWatch.diameter})</span>
                  </div>
                  <div>
                    <span className="text-[#F3EBDD]/50 block text-[10px] uppercase">Water Resistance</span>
                    <span>{selectedWatch.waterResistance}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-[#D2B47C]">
                    CHF {selectedWatch.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      addToBag({
                        id: selectedWatch.id,
                        name: selectedWatch.name,
                        subtitle: `${selectedWatch.caseMaterial} • ${selectedWatch.calibre}`,
                        price: selectedWatch.price,
                      });
                      setSelectedWatch(null);
                    }}
                    className="px-6 py-3 bg-[#D2B47C] text-[#241A17] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#F3EBDD] transition"
                  >
                    Add to Acquisition Bag
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- EDITORIAL ARTICLE MODAL --- */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#241A17] border border-[#D2B47C]/40 max-w-2xl w-full p-8 md:p-12 relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 text-[#F3EBDD]/60 hover:text-[#D2B47C]"
              >
                <X className="w-6 h-6" />
              </button>
              <p className="text-xs tracking-[0.26em] uppercase text-[#D2B47C] mb-2">
                {activeArticle.tag} • {activeArticle.readTime}
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-[#F3EBDD] leading-tight mb-6">
                {activeArticle.title}
              </h3>
              <div className="space-y-4 text-sm text-[#F3EBDD]/85 leading-relaxed">
                {activeArticle.fullText.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PRIVATE ACQUISITION BAG DRAWER --- */}
      <AnimatePresence>
        {bagOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex justify-end"
            onClick={() => setBagOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#241A17] border-l border-[#D2B47C]/30 h-full p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#D2B47C]/20 pb-5 mb-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#F3EBDD]">Private Acquisition Bag</h3>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-[#D2B47C]">
                      Armored Geneva Courier Insured
                    </p>
                  </div>
                  <button
                    onClick={() => setBagOpen(false)}
                    className="text-[#F3EBDD]/60 hover:text-[#D2B47C]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {bagItems.length === 0 ? (
                  <p className="text-sm text-[#F3EBDD]/60 py-12 text-center">
                    Your private acquisition bag is currently empty.
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1">
                    {bagItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-[#1A1210] border border-[#D2B47C]/20 flex justify-between items-start gap-4"
                      >
                        <div>
                          <h4 className="font-serif text-lg text-[#F3EBDD]">{item.name}</h4>
                          <p className="text-xs text-[#F3EBDD]/60 mt-0.5">{item.subtitle}</p>
                          <p className="text-xs text-[#D2B47C] mt-2">
                            Qty: {item.qty} • CHF {(item.price * item.qty).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromBag(item.id)}
                          className="text-[10px] uppercase tracking-wider text-[#F3EBDD]/45 hover:text-[#D2B47C]"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {bagItems.length > 0 && (
                <div className="border-t border-[#D2B47C]/25 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#F3EBDD]/70">
                      Total Valuation
                    </span>
                    <span className="font-serif text-2xl text-[#D2B47C]">
                      CHF {totalBagValue.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setBagItems([]);
                      setBagOpen(false);
                      showToast(
                        'Your private acquisition dossier has been transmitted to our Geneva Salon Concierge.'
                      );
                    }}
                    className="w-full py-4 bg-[#D2B47C] text-[#241A17] text-xs tracking-[0.22em] uppercase font-semibold hover:bg-[#F3EBDD] transition"
                  >
                    Request Private Concierge Allocation
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
