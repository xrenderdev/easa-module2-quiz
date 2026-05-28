import { useMemo, useState, useEffect } from "react";
import { CheckCircle2, XCircle, Timer, BarChart3, Shuffle, BookOpen, Brain, Trophy, RotateCcw, Zap, Eye, EyeOff } from "lucide-react";

const LETTERS = ["A", "B", "C", "D"];

const chapters = [
  "All",
  "Forces & Motion",
  "Energy & Power",
  "Pressure & Fluids",
  "Heat & Thermodynamics",
  "Waves & Sound",
  "Light & Optics",
  "Aircraft Physics",
  "Units & Formula",
];

const conceptBank = [
  {
    chapter: "Forces & Motion",
    concept: "Force",
    answer: "Newton",
    hint: "Force unit is N. Formula clue: F = ma.",
    formula: "F = ma",
    traps: ["Joule", "Watt", "Pascal", "Hertz"],
    stems: ["Unit of force", "Force is measured in", "The SI unit used for push or pull", "Mass times acceleration gives a result measured in"],
  },
  {
    chapter: "Forces & Motion",
    concept: "Mass",
    answer: "Mass",
    hint: "Mass is amount of matter. Unit is kg.",
    formula: "m = F/a",
    traps: ["Weight", "Force", "Density", "Pressure"],
    stems: ["Amount of matter", "Quantity that does not depend on gravity", "Measured in kilograms", "The matter contained in a body"],
  },
  {
    chapter: "Forces & Motion",
    concept: "Weight",
    answer: "Weight",
    hint: "Weight is a force caused by gravity. Unit is Newton.",
    formula: "W = mg",
    traps: ["Mass", "Density", "Momentum", "Power"],
    stems: ["Force caused by gravity", "The downward gravitational force", "Mass under gravity produces", "A force acting toward Earth"],
  },
  {
    chapter: "Forces & Motion",
    concept: "Inertia",
    answer: "Inertia",
    hint: "Inertia resists change in motion.",
    formula: "More mass = more inertia",
    traps: ["Torque", "Friction", "Velocity", "Frequency"],
    stems: ["Resistance to change in motion", "A body's tendency to keep its state of motion", "Property that keeps an object moving or at rest", "Resistance to acceleration change"],
  },
  {
    chapter: "Forces & Motion",
    concept: "Acceleration",
    answer: "Acceleration",
    hint: "Acceleration is change of velocity per second.",
    formula: "a = Δv/t",
    traps: ["Velocity", "Speed", "Distance", "Momentum"],
    stems: ["Change of velocity per second", "Rate of change of velocity", "Velocity change divided by time", "Measured in m/s²"],
  },
  {
    chapter: "Forces & Motion",
    concept: "Velocity",
    answer: "Velocity",
    hint: "Velocity is speed with direction.",
    formula: "v = s/t with direction",
    traps: ["Speed", "Acceleration", "Distance", "Mass"],
    stems: ["Speed in a direction", "Rate of displacement", "Motion quantity needing direction", "A vector form of speed"],
  },
  {
    chapter: "Forces & Motion",
    concept: "Momentum",
    answer: "Momentum",
    hint: "Moving mass = momentum.",
    formula: "p = mv",
    traps: ["Power", "Work", "Pressure", "Torque"],
    stems: ["Product of mass and velocity", "Moving mass quantity", "Mass multiplied by velocity", "A moving object's quantity of motion"],
  },
  {
    chapter: "Forces & Motion",
    concept: "Impulse",
    answer: "Impulse",
    hint: "Impulse is force acting for time; it changes momentum.",
    formula: "Impulse = Ft = Δp",
    traps: ["Power", "Pressure", "Density", "Frequency"],
    stems: ["Force multiplied by time", "Quantity equal to change in momentum", "A short large force effect", "Force-time effect"],
  },
  {
    chapter: "Forces & Motion",
    concept: "Torque",
    answer: "Torque",
    hint: "Torque is turning effect of a force.",
    formula: "τ = F × d",
    traps: ["Momentum", "Inertia", "Pressure", "Density"],
    stems: ["Turning effect of force", "A force causing rotation", "Force times perpendicular distance", "Moment of force"],
  },
  {
    chapter: "Forces & Motion",
    concept: "Friction",
    answer: "Friction",
    hint: "Friction opposes motion between surfaces.",
    formula: "Friction opposes motion",
    traps: ["Lift", "Drag", "Thrust", "Power"],
    stems: ["Opposition to motion between surfaces", "Surface resistance to sliding", "Force opposing relative surface motion", "Rubbing resistance"],
  },
  {
    chapter: "Energy & Power",
    concept: "Work",
    answer: "Work",
    hint: "Work is force moving through distance.",
    formula: "W = Fd",
    traps: ["Power", "Pressure", "Velocity", "Frequency"],
    stems: ["Force times distance", "Force moving an object through distance", "Energy transferred by a force", "Measured in joules when force causes movement"],
  },
  {
    chapter: "Energy & Power",
    concept: "Power",
    answer: "Power",
    hint: "Power is how fast work is done.",
    formula: "P = W/t",
    traps: ["Energy", "Pressure", "Momentum", "Mass"],
    stems: ["Work done per second", "Rate of doing work", "Energy transferred per unit time", "How fast work is done"],
  },
  {
    chapter: "Energy & Power",
    concept: "Kinetic Energy",
    answer: "Kinetic energy",
    hint: "Kinetic means moving.",
    formula: "KE = 1/2 mv²",
    traps: ["Potential energy", "Elastic energy", "Chemical energy", "Latent heat"],
    stems: ["Energy of motion", "Energy possessed by a moving body", "Energy that increases with speed", "Moving object energy"],
  },
  {
    chapter: "Energy & Power",
    concept: "Potential Energy",
    answer: "Potential energy",
    hint: "Potential energy is stored by position or height.",
    formula: "PE = mgh",
    traps: ["Kinetic energy", "Thermal energy", "Dynamic pressure", "Momentum"],
    stems: ["Stored energy due to position", "Energy due to height", "Energy stored in a raised object", "Gravitational stored energy"],
  },
  {
    chapter: "Energy & Power",
    concept: "Elastic Potential",
    answer: "Elastic potential energy",
    hint: "Stretch or compress = elastic stored energy.",
    formula: "Elastic energy is stored by deformation",
    traps: ["Kinetic energy", "Heat energy", "Chemical energy", "Sound energy"],
    stems: ["Energy stored in a stretched spring", "Energy stored in a compressed spring", "Energy stored by deformation", "Stored energy in rubber or spring"],
  },
  {
    chapter: "Energy & Power",
    concept: "Efficiency",
    answer: "Efficiency",
    hint: "Efficiency compares useful output to input.",
    formula: "Efficiency = useful output/input × 100%",
    traps: ["Momentum", "Density", "Velocity", "Frequency"],
    stems: ["Useful output divided by input", "Ratio of output work to input work", "How much input becomes useful output", "Machine useful output comparison"],
  },
  {
    chapter: "Energy & Power",
    concept: "Conservation of Energy",
    answer: "Conservation of energy",
    hint: "Energy cannot be created or destroyed, only changed form.",
    formula: "Total energy remains constant",
    traps: ["Friction", "Momentum only", "Density", "Pressure"],
    stems: ["Total energy in a closed system stays constant", "Energy changes form but total remains", "Energy cannot be created or destroyed", "Principle about unchanged total energy"],
  },
  {
    chapter: "Pressure & Fluids",
    concept: "Pressure",
    answer: "Pressure",
    hint: "Pressure is force spread over area.",
    formula: "P = F/A",
    traps: ["Torque", "Energy", "Power", "Heat"],
    stems: ["Force per unit area", "Force divided by area", "Effect of force spread across a surface", "Measured in pascals"],
  },
  {
    chapter: "Pressure & Fluids",
    concept: "Density",
    answer: "Density",
    hint: "Density is mass in a given volume.",
    formula: "ρ = m/V",
    traps: ["Force per area", "Work per second", "Heat transfer", "Momentum"],
    stems: ["Mass per volume", "Mass divided by volume", "How compact matter is", "Quantity measured in kg/m³"],
  },
  {
    chapter: "Pressure & Fluids",
    concept: "Hydraulic Incompressibility",
    answer: "Incompressible",
    hint: "Hydraulics use liquids because they do not compress easily.",
    formula: "Liquids transmit pressure",
    traps: ["Compressible", "Magnetic", "Invisible", "Elastic only"],
    stems: ["Hydraulic systems use liquids because they are nearly", "Liquids are useful in hydraulics because they are", "Pascal's principle works well with nearly", "A hydraulic fluid should be almost"],
  },
  {
    chapter: "Pressure & Fluids",
    concept: "Bernoulli",
    answer: "Decreases",
    hint: "Faster fluid = lower static pressure.",
    formula: "Velocity ↑, static pressure ↓",
    traps: ["Increases", "Stops", "Doubles", "Becomes zero"],
    stems: ["In Bernoulli's principle, when velocity increases, static pressure", "In a faster moving fluid, pressure generally", "Air speed increases over a wing so static pressure", "Velocity up means pressure"],
  },
  {
    chapter: "Pressure & Fluids",
    concept: "Dynamic Pressure",
    answer: "Dynamic pressure",
    hint: "Dynamic pressure comes from moving fluid.",
    formula: "q = 1/2ρv²",
    traps: ["Static pressure", "Hydrostatic pressure", "Thermal pressure", "Vacuum pressure"],
    stems: ["Pressure due to fluid motion", "Kinetic pressure of moving air", "Pressure related to airspeed", "Moving fluid pressure component"],
  },
  {
    chapter: "Pressure & Fluids",
    concept: "Total Pressure",
    answer: "Total pressure",
    hint: "Total pressure = static + dynamic.",
    formula: "Pt = Ps + q",
    traps: ["Kinetic pressure", "Vacuum pressure", "Hydraulic pressure", "Thermal pressure"],
    stems: ["Static pressure plus dynamic pressure", "Pressure measured when moving fluid is brought to rest", "Pitot total pressure includes static and", "Sum of static and dynamic pressure"],
  },
  {
    chapter: "Pressure & Fluids",
    concept: "Viscosity",
    answer: "Viscosity",
    hint: "Viscosity is resistance to flow.",
    formula: "High viscosity = thick fluid",
    traps: ["Velocity", "Volume", "Vacuum", "Voltage"],
    stems: ["Resistance to fluid flow", "Thickness effect of a fluid", "A fluid's internal friction", "Oil thickness property"],
  },
  {
    chapter: "Heat & Thermodynamics",
    concept: "Conduction",
    answer: "Conduction",
    hint: "Touch = conduction.",
    formula: "Heat by direct contact",
    traps: ["Convection", "Radiation", "Reflection", "Refraction"],
    stems: ["Heat transfer by direct contact", "Heat transfer by touching", "Heat transfer through a solid by contact", "Pan handle heating by touch is"],
  },
  {
    chapter: "Heat & Thermodynamics",
    concept: "Convection",
    answer: "Convection",
    hint: "Flow = convection. Fluids move heat.",
    formula: "Heat by fluid movement",
    traps: ["Conduction", "Radiation", "Compression", "Reflection"],
    stems: ["Heat transfer by moving fluid", "Heat transfer by air or liquid circulation", "Hot air rising is", "Fluid movement carrying heat"],
  },
  {
    chapter: "Heat & Thermodynamics",
    concept: "Radiation",
    answer: "Radiation",
    hint: "Rays = radiation. No medium required.",
    formula: "Heat by electromagnetic waves",
    traps: ["Conduction", "Convection", "Friction", "Compression"],
    stems: ["Heat transfer by electromagnetic waves", "Heat transfer from the Sun", "Heat transfer that can travel through vacuum", "Infrared heat transfer is"],
  },
  {
    chapter: "Heat & Thermodynamics",
    concept: "Expansion",
    answer: "Expand",
    hint: "Heat normally makes particles move apart.",
    formula: "Temperature ↑, size ↑",
    traps: ["Contract", "Lose mass", "Stop moving", "Become weightless"],
    stems: ["Heating most solids causes them to", "Increasing temperature generally makes solids", "Thermal expansion means materials", "When heated, metal usually will"],
  },
  {
    chapter: "Heat & Thermodynamics",
    concept: "Contraction",
    answer: "Contract",
    hint: "Cold normally makes particles move closer.",
    formula: "Temperature ↓, size ↓",
    traps: ["Expand", "Melt", "Increase heat", "Bend light"],
    stems: ["Cooling most solids causes them to", "Decreasing temperature generally makes solids", "Thermal contraction means materials", "When cooled, metal usually will"],
  },
  {
    chapter: "Heat & Thermodynamics",
    concept: "Latent Heat",
    answer: "State without temperature change",
    hint: "Latent heat changes state, not temperature during the change.",
    formula: "Q = mL",
    traps: ["Temperature only", "Pressure only", "Mass only", "Velocity only"],
    stems: ["Latent heat changes", "Heat used during melting or boiling changes", "During phase change, latent heat changes", "Latent heat is energy for changing"],
  },
  {
    chapter: "Waves & Sound",
    concept: "Frequency",
    answer: "Frequency",
    hint: "Frequency is cycles per second. Unit is Hz.",
    formula: "f = 1/T",
    traps: ["Wavelength", "Amplitude", "Period", "Velocity"],
    stems: ["Number of cycles per second", "Number of waves per second", "Measured in hertz", "How often a wave repeats per second"],
  },
  {
    chapter: "Waves & Sound",
    concept: "Wavelength",
    answer: "Wavelength",
    hint: "Wavelength is crest to crest distance.",
    formula: "v = fλ",
    traps: ["Frequency", "Amplitude", "Period", "Reflection"],
    stems: ["Distance between wave crests", "Distance from compression to compression", "One complete wave length", "Distance between identical points on a wave"],
  },
  {
    chapter: "Waves & Sound",
    concept: "Amplitude",
    answer: "Amplitude",
    hint: "Amplitude is wave height or maximum displacement.",
    formula: "Amplitude = maximum displacement",
    traps: ["Frequency", "Wavelength", "Refraction", "Force"],
    stems: ["Maximum wave displacement", "Wave height", "Quantity related to loudness in sound", "Maximum distance from rest position"],
  },
  {
    chapter: "Waves & Sound",
    concept: "Sound Medium",
    answer: "Vacuum",
    hint: "Sound needs particles, so no sound in vacuum.",
    formula: "Sound needs a medium",
    traps: ["Water", "Steel", "Air", "Oil"],
    stems: ["Sound cannot travel through", "Sound needs a material medium, so it cannot pass through", "No particles means sound cannot travel in", "A place where sound cannot propagate"],
  },
  {
    chapter: "Waves & Sound",
    concept: "Sound in Solids",
    answer: "Solid",
    hint: "Sound usually travels fastest in solids because particles are close and elastic.",
    formula: "Solid > liquid > gas",
    traps: ["Vacuum", "Gas", "Liquid", "Empty space"],
    stems: ["Sound travels fastest in", "Compared with gases and liquids, sound is usually fastest in", "The best common medium for sound speed is", "Sound speed is generally greatest in"],
  },
  {
    chapter: "Waves & Sound",
    concept: "Compression",
    answer: "Closer together",
    hint: "Compression = particles squeezed together.",
    formula: "Compression = high pressure region",
    traps: ["Farther apart", "Lighter", "Slower only", "Invisible"],
    stems: ["Compression means particles become", "In a sound wave compression, particles are", "High pressure region in sound has particles", "Compressed air particles are"],
  },
  {
    chapter: "Waves & Sound",
    concept: "Rarefaction",
    answer: "Farther apart",
    hint: "Rarefaction = particles spread apart.",
    formula: "Rarefaction = low pressure region",
    traps: ["Closer together", "Compressed", "Heavier", "Hotter only"],
    stems: ["Rarefaction means particles become", "Low pressure region in a sound wave has particles", "In rarefaction, particles are", "Spread-out part of a sound wave has particles"],
  },
  {
    chapter: "Light & Optics",
    concept: "Reflection",
    answer: "Reflection",
    hint: "Reflection is bouncing light.",
    formula: "Angle in = angle out",
    traps: ["Refraction", "Density", "Velocity", "Absorption"],
    stems: ["Bouncing of light", "Light returning from a surface", "Mirror effect", "When light bounces off a surface"],
  },
  {
    chapter: "Light & Optics",
    concept: "Refraction",
    answer: "Refraction",
    hint: "Refraction is bending when light changes medium.",
    formula: "n₁sinθ₁ = n₂sinθ₂",
    traps: ["Reflection", "Absorption", "Diffraction", "Radiation"],
    stems: ["Bending of light", "Light changes direction entering another medium", "Bending due to speed change in a medium", "Straw looking bent in water is"],
  },
  {
    chapter: "Light & Optics",
    concept: "Convex Lens",
    answer: "Converge",
    hint: "Convex lens brings rays together.",
    formula: "Convex = converging",
    traps: ["Diverge", "Disappear", "Reflect", "Compress"],
    stems: ["In a convex lens, light rays", "A converging lens makes rays", "Convex lens action", "Parallel rays through a convex lens usually"],
  },
  {
    chapter: "Light & Optics",
    concept: "Concave Lens",
    answer: "Diverge",
    hint: "Concave lens spreads rays apart.",
    formula: "Concave = diverging",
    traps: ["Converge", "Compress", "Accelerate", "Heat"],
    stems: ["In a concave lens, light rays", "A diverging lens makes rays", "Concave lens action", "Parallel rays through a concave lens usually"],
  },
  {
    chapter: "Aircraft Physics",
    concept: "Drag",
    answer: "Drag",
    hint: "Drag opposes thrust and motion through air.",
    formula: "Drag opposes motion",
    traps: ["Lift", "Weight", "Thrust", "Pressure"],
    stems: ["Opposite force to thrust", "Air resistance opposing aircraft motion", "Rearward aerodynamic force", "Force opposing airflow around aircraft"],
  },
  {
    chapter: "Aircraft Physics",
    concept: "Lift",
    answer: "Lift",
    hint: "Lift acts upward opposite weight.",
    formula: "Lift opposes weight",
    traps: ["Drag", "Weight", "Thrust", "Density"],
    stems: ["Opposite force to weight in flight", "Upward aerodynamic force", "Force that supports aircraft in flight", "Wing-generated upward force"],
  },
  {
    chapter: "Aircraft Physics",
    concept: "Thrust",
    answer: "Thrust",
    hint: "Thrust moves aircraft forward and opposes drag.",
    formula: "Thrust opposes drag",
    traps: ["Drag", "Lift", "Weight", "Friction"],
    stems: ["Forward propulsive force", "Force produced by engine or propeller", "Opposite force to drag", "Aircraft forward driving force"],
  },
  {
    chapter: "Aircraft Physics",
    concept: "Altitude Pressure",
    answer: "Decreases",
    hint: "Higher altitude has lower atmospheric pressure and density.",
    formula: "Altitude ↑, pressure ↓",
    traps: ["Increases", "Stays same", "Doubles", "Becomes zero immediately"],
    stems: ["Atmospheric pressure with higher altitude", "As altitude increases, pressure", "Going higher in the atmosphere makes pressure", "At high altitude atmospheric pressure generally"],
  },
  {
    chapter: "Aircraft Physics",
    concept: "Streamlining",
    answer: "Reduce drag",
    hint: "Streamlining smooths airflow to reduce drag.",
    formula: "Streamlining = less drag",
    traps: ["Increase weight", "Increase friction only", "Stop gravity", "Increase mass"],
    stems: ["Purpose of streamlining", "Smooth aircraft shape helps to", "Streamlined bodies are designed to", "Reducing air resistance is done by"],
  },
  {
    chapter: "Units & Formula",
    concept: "Joule",
    answer: "Joule",
    hint: "Joule is energy/work unit.",
    formula: "1 J = 1 N·m",
    traps: ["Newton", "Pascal", "Hertz", "Watt"],
    stems: ["Unit of energy", "Unit of work", "Newton metre is equivalent to", "Energy is measured in"],
  },
  {
    chapter: "Units & Formula",
    concept: "Watt",
    answer: "Watt",
    hint: "Watt is power unit.",
    formula: "1 W = 1 J/s",
    traps: ["Newton", "Joule", "Pascal", "Hertz"],
    stems: ["Unit of power", "Joule per second", "Power is measured in", "Work rate unit"],
  },
  {
    chapter: "Units & Formula",
    concept: "Pascal",
    answer: "Pascal",
    hint: "Pascal is pressure unit.",
    formula: "1 Pa = 1 N/m²",
    traps: ["Newton", "Joule", "Hertz", "Watt"],
    stems: ["Unit of pressure", "Newton per square metre", "Pressure is measured in", "Force per area unit"],
  },
  {
    chapter: "Units & Formula",
    concept: "Hertz",
    answer: "Hertz",
    hint: "Hertz is frequency unit.",
    formula: "1 Hz = 1 cycle/s",
    traps: ["Joule", "Watt", "Newton", "Pascal"],
    stems: ["Unit of frequency", "Cycles per second unit", "Frequency is measured in", "Wave repetition unit"],
  },
  {
    chapter: "Units & Formula",
    concept: "Pressure Formula",
    answer: "P = F/A",
    hint: "Pressure increases when force increases or area decreases.",
    formula: "P = F/A",
    traps: ["F = ma", "P = W/t", "p = mv", "ρ = m/V"],
    stems: ["Formula for pressure", "Force divided by area formula", "Formula used when force and area are given", "Which formula gives pressure"],
  },
  {
    chapter: "Units & Formula",
    concept: "Density Formula",
    answer: "ρ = m/V",
    hint: "Density is mass divided by volume.",
    formula: "ρ = m/V",
    traps: ["P = F/A", "F = ma", "V = IR", "W = Fd"],
    stems: ["Formula for density", "Mass divided by volume formula", "Formula used when mass and volume are given", "Which formula gives density"],
  },
  {
    chapter: "Units & Formula",
    concept: "Wave Speed Formula",
    answer: "v = fλ",
    hint: "Wave speed equals frequency times wavelength.",
    formula: "v = fλ",
    traps: ["F = ma", "P = F/A", "V = IR", "p = mv"],
    stems: ["Formula for wave speed", "Frequency times wavelength", "Formula linking wave speed, frequency and wavelength", "Which formula uses f and λ"],
  },
];

function shuffleArray(array, seedOffset = 0) {
  const copy = [...array];
  let seed = 1234567 + seedOffset * 9973;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuestions() {
  const questions = [];
  conceptBank.forEach((item, conceptIndex) => {
    item.stems.forEach((stem, stemIndex) => {
      for (let version = 0; version < 3; version++) {
        const traps = shuffleArray(item.traps, conceptIndex + stemIndex + version).slice(0, 3);
        const optionSet = shuffleArray([item.answer, ...traps], conceptIndex * 11 + stemIndex * 7 + version);
        const difficulty = version === 2 ? "Hard" : stemIndex > 1 ? "Tricky" : "Normal";
        questions.push({
          id: `${conceptIndex}-${stemIndex}-${version}`,
          q: stem,
          options: optionSet,
          answer: optionSet.indexOf(item.answer),
          chapter: item.chapter,
          concept: item.concept,
          hint: item.hint,
          formula: item.formula,
          difficulty,
          explanation: `${item.concept}: ${item.hint}`,
        });
      }
    });
  });

  const relationshipQuestions = [
    {
      chapter: "Units & Formula",
      concept: "Pressure relationship",
      q: "If force stays the same and area decreases, pressure will",
      options: ["increase", "decrease", "stay the same", "become zero"],
      answer: 0,
      hint: "P = F/A. Smaller area gives bigger pressure.",
      formula: "P = F/A",
      difficulty: "Tricky",
    },
    {
      chapter: "Units & Formula",
      concept: "Pressure relationship",
      q: "If area stays the same and force increases, pressure will",
      options: ["increase", "decrease", "stay the same", "become negative"],
      answer: 0,
      hint: "More force gives more pressure.",
      formula: "P = F/A",
      difficulty: "Normal",
    },
    {
      chapter: "Energy & Power",
      concept: "Power relationship",
      q: "If the same work is done in less time, power will",
      options: ["increase", "decrease", "stay the same", "become zero"],
      answer: 0,
      hint: "P = W/t. Less time means more power.",
      formula: "P = W/t",
      difficulty: "Tricky",
    },
    {
      chapter: "Forces & Motion",
      concept: "Momentum relationship",
      q: "If mass stays the same and velocity increases, momentum will",
      options: ["increase", "decrease", "stay the same", "disappear"],
      answer: 0,
      hint: "p = mv. More velocity means more momentum.",
      formula: "p = mv",
      difficulty: "Normal",
    },
    {
      chapter: "Pressure & Fluids",
      concept: "Bernoulli relationship",
      q: "If airflow velocity increases over a surface, static pressure generally",
      options: ["decreases", "increases", "stays the same", "becomes weight"],
      answer: 0,
      hint: "Bernoulli: faster fluid has lower static pressure.",
      formula: "Velocity ↑, pressure ↓",
      difficulty: "Hard",
    },
    {
      chapter: "Heat & Thermodynamics",
      concept: "Thermal expansion",
      q: "A metal part heated during operation will usually",
      options: ["expand", "contract", "lose all mass", "stop conducting heat"],
      answer: 0,
      hint: "Heat usually causes expansion.",
      formula: "Temperature ↑, size ↑",
      difficulty: "Normal",
    },
  ];

  relationshipQuestions.forEach((q, index) => {
    const options = shuffleArray(q.options, index + 900);
    questions.push({ ...q, id: `rel-${index}`, options, answer: options.indexOf(q.options[q.answer]), explanation: q.hint });
  });

  return questions;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function ProgressBar({ value }) {
  return (
    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
      <div className="h-full bg-slate-900 transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export default function EASAQuiz() {
  const allQuestions = useMemo(() => buildQuestions(), []);
  const [mode, setMode] = useState("Learn");
  const [chapter, setChapter] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [examSize, setExamSize] = useState(50);
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [showFlashAnswer, setShowFlashAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(50 * 60);
  const [attempts, setAttempts] = useState({});
  const [sessionNumber, setSessionNumber] = useState(1);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const chapterOk = chapter === "All" || q.chapter === chapter;
      const difficultyOk = difficulty === "All" || q.difficulty === difficulty;
      return chapterOk && difficultyOk;
    });
  }, [allQuestions, chapter, difficulty]);

  const sessionQuestions = useMemo(() => {
    const shuffled = shuffleArray(filteredQuestions, sessionNumber + examSize);
    const limit = mode === "Exam" ? examSize : Math.min(examSize, shuffled.length);
    return shuffled.slice(0, Math.max(1, Math.min(limit, shuffled.length)));
  }, [filteredQuestions, sessionNumber, examSize, mode]);

  const current = sessionQuestions[questionIndex] || sessionQuestions[0];
  const totalAnswered = answers.length;
  const correctCount = answers.filter((a) => a.correct).length;
  const scorePercent = totalAnswered ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const complete = started && (questionIndex >= sessionQuestions.length || (mode === "Exam" && secondsLeft <= 0));

  useEffect(() => {
    if (!started || mode !== "Exam" || complete) return;
    const timer = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [started, mode, complete]);

  const weakAreas = useMemo(() => {
    const map = {};
    Object.values(attempts).forEach((a) => {
      if (!map[a.concept]) map[a.concept] = { concept: a.concept, chapter: a.chapter, correct: 0, total: 0 };
      map[a.concept].correct += a.correct;
      map[a.concept].total += a.total;
    });
    return Object.values(map)
      .map((x) => ({ ...x, percent: Math.round((x.correct / x.total) * 100) }))
      .sort((a, b) => a.percent - b.percent || b.total - a.total)
      .slice(0, 8);
  }, [attempts]);

  const chapterStats = useMemo(() => {
    const map = {};
    Object.values(attempts).forEach((a) => {
      if (!map[a.chapter]) map[a.chapter] = { chapter: a.chapter, correct: 0, total: 0 };
      map[a.chapter].correct += a.correct;
      map[a.chapter].total += a.total;
    });
    return Object.values(map).map((x) => ({ ...x, percent: Math.round((x.correct / x.total) * 100) }));
  }, [attempts]);

  function startSession(newMode = mode) {
    setMode(newMode);
    setStarted(true);
    setQuestionIndex(0);
    setSelected(null);
    setShowHint(false);
    setShowFormula(false);
    setShowFlashAnswer(false);
    setAnswers([]);
    setSecondsLeft(examSize * 60);
    setSessionNumber((n) => n + 1);
  }

  function recordAnswer(optionIndex) {
    if (selected !== null || complete) return;
    const correct = optionIndex === current.answer;
    setSelected(optionIndex);
    setAnswers((prev) => [...prev, { id: current.id, correct, selected: optionIndex, concept: current.concept, chapter: current.chapter }]);
    setAttempts((prev) => {
      const existing = prev[current.id] || { concept: current.concept, chapter: current.chapter, correct: 0, total: 0 };
      return {
        ...prev,
        [current.id]: {
          ...existing,
          correct: existing.correct + (correct ? 1 : 0),
          total: existing.total + 1,
        },
      };
    });
  }

  function nextQuestion() {
    if (questionIndex + 1 >= sessionQuestions.length) {
      setQuestionIndex(sessionQuestions.length);
      return;
    }
    setQuestionIndex((i) => i + 1);
    setSelected(null);
    setShowHint(false);
    setShowFormula(false);
    setShowFlashAnswer(false);
  }

  function resetProgress() {
    setAttempts({});
    setAnswers([]);
    setStarted(false);
    setQuestionIndex(0);
    setSelected(null);
  }

  const activeQuestionNumber = Math.min(questionIndex + 1, sessionQuestions.length);
  const progress = sessionQuestions.length ? (Math.min(questionIndex, sessionQuestions.length) / sessionQuestions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-2 sm:p-4 lg:p-6 text-slate-900">
      <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-5">
        <div className="bg-white/85 backdrop-blur rounded-3xl shadow-xl border border-white/70 p-4 sm:p-6">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black flex items-center gap-2 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                <Brain className="w-8 h-8 text-purple-700" /> EASA Module 2 Physics Trainer
              </h1>
              <p className="text-slate-600 mt-2">
                500+ generated keyword, formula, tricky, flashcard and exam-style questions.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center w-full sm:w-auto">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-3 border border-blue-100">
                <div className="text-xs text-slate-500">Score</div>
                <div className="text-xl font-bold">{scorePercent}%</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-3 border border-blue-100">
                <div className="text-xs text-slate-500">Correct</div>
                <div className="text-xl font-bold">{correctCount}/{totalAnswered}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-3 border border-blue-100">
                <div className="text-xs text-slate-500">Pool</div>
                <div className="text-xl font-bold">{allQuestions.length}+</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 min-w-0">
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-white/70 p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                <label className="space-y-1">
                  <span className="text-sm font-semibold">Mode</span>
                  <select className="w-full rounded-2xl border border-slate-200 p-3 bg-white shadow-sm focus:ring-2 focus:ring-purple-400 outline-none" value={mode} onChange={(e) => setMode(e.target.value)}>
                    <option>Learn</option>
                    <option>Exam</option>
                    <option>Flashcards</option>
                    <option>Weak Areas</option>
                  </select>
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-semibold">Chapter</span>
                  <select className="w-full rounded-2xl border border-slate-200 p-3 bg-white shadow-sm focus:ring-2 focus:ring-purple-400 outline-none" value={chapter} onChange={(e) => setChapter(e.target.value)}>
                    {chapters.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-semibold">Difficulty</span>
                  <select className="w-full rounded-2xl border border-slate-200 p-3 bg-white shadow-sm focus:ring-2 focus:ring-purple-400 outline-none" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option>All</option>
                    <option>Normal</option>
                    <option>Tricky</option>
                    <option>Hard</option>
                  </select>
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-semibold">Questions</span>
                  <select className="w-full rounded-2xl border border-slate-200 p-3 bg-white shadow-sm focus:ring-2 focus:ring-purple-400 outline-none" value={examSize} onChange={(e) => setExamSize(Number(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                <button onClick={() => startSession(mode)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition">
                  <Shuffle className="w-5 h-5" /> Start / Randomize
                </button>
                <button onClick={() => startSession("Exam")} className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition">
                  <Timer className="w-5 h-5" /> Exam Mode
                </button>
                <button onClick={() => startSession("Flashcards")} className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition">
                  <BookOpen className="w-5 h-5" /> Flashcards
                </button>
                <button onClick={resetProgress} className="flex items-center justify-center gap-2 bg-gradient-to-r from-slate-200 to-slate-300 px-5 py-3 rounded-2xl font-bold shadow hover:scale-[1.02] transition">
                  <RotateCcw className="w-5 h-5" /> Reset Stats
                </button>
              </div>
            </div>

            {!started && (
              <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-white/70 p-6 text-center space-y-4">
                <Trophy className="w-14 h-14 mx-auto" />
                <h2 className="text-2xl font-bold">Choose a mode and start.</h2>
                <p className="text-slate-600 max-w-xl mx-auto">
                  Learn mode gives hints and formula help. Exam mode hides help and uses a timer. Flashcards help memory recall. Weak Areas focuses on your mistakes.
                </p>
              </div>
            )}

            {started && complete && (
              <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-white/70 p-6 space-y-5">
                <h2 className="text-3xl font-bold">Session Complete</h2>
                <div className="grid sm:grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-100 rounded-xl p-4"><div className="text-sm text-slate-500">Final Score</div><div className="text-3xl font-bold">{scorePercent}%</div></div>
                  <div className="bg-slate-100 rounded-xl p-4"><div className="text-sm text-slate-500">Correct</div><div className="text-3xl font-bold">{correctCount}</div></div>
                  <div className="bg-slate-100 rounded-xl p-4"><div className="text-sm text-slate-500">Wrong</div><div className="text-3xl font-bold">{totalAnswered - correctCount}</div></div>
                </div>
                <button onClick={() => startSession(mode)} className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-bold shadow-lg">Start Next Random Set</button>
              </div>
            )}

            {started && !complete && current && mode !== "Flashcards" && (
              <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-white/70 p-4 sm:p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="text-sm text-slate-500">Question {activeQuestionNumber} of {sessionQuestions.length} · {current.chapter} · {current.difficulty}</div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mt-2 leading-tight">{activeQuestionNumber}. {current.q}</h2>
                  </div>
                  {mode === "Exam" && <div className="text-2xl font-bold flex items-center gap-2"><Timer /> {formatTime(secondsLeft)}</div>}
                </div>

                <ProgressBar value={progress} />

                <div className="grid gap-3">
                  {current.options.map((option, oIndex) => {
                    const isCorrect = oIndex === current.answer;
                    const isSelected = selected === oIndex;
                    let style = "border-slate-200 bg-white hover:bg-gradient-to-r hover:from-sky-50 hover:to-purple-50";
                    if (selected !== null && isCorrect) style = "border-green-500 bg-gradient-to-r from-green-50 to-emerald-100";
                    if (selected !== null && isSelected && !isCorrect) style = "border-red-500 bg-gradient-to-r from-red-50 to-rose-100";
                    return (
                      <button key={oIndex} onClick={() => recordAnswer(oIndex)} className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition flex items-center justify-between gap-3 w-full text-sm sm:text-base ${style}`}>
                        <span><span className="font-bold mr-2">{LETTERS[oIndex]}.</span>{option}</span>
                        {selected !== null && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                        {selected !== null && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-600" />}
                      </button>
                    );
                  })}
                </div>

                {mode !== "Exam" && (
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setShowHint((v) => !v)} className="px-4 py-2 rounded-xl bg-slate-100 font-semibold flex items-center gap-2">
                      {showHint ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />} Hint
                    </button>
                    <button onClick={() => setShowFormula((v) => !v)} className="px-4 py-2 rounded-xl bg-slate-100 font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Formula
                    </button>
                  </div>
                )}

                {showHint && <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"><strong>Hint:</strong> {current.hint}</div>}
                {showFormula && <div className="bg-blue-50 border border-blue-200 rounded-xl p-4"><strong>Formula clue:</strong> {current.formula}</div>}

                {selected !== null && (
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 space-y-3 border border-indigo-100">
                    <p className="font-semibold">Correct answer: {LETTERS[current.answer]}. {current.options[current.answer]}</p>
                    <p className="text-slate-700">{current.explanation}</p>
                    <button onClick={nextQuestion} className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-bold shadow-lg">Next</button>
                  </div>
                )}
              </div>
            )}

            {started && !complete && current && mode === "Flashcards" && (
              <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-white/70 p-5 sm:p-8 space-y-5 text-center">
                <div className="text-sm text-slate-500">Card {activeQuestionNumber} of {sessionQuestions.length} · {current.chapter}</div>
                <ProgressBar value={progress} />
                <div className="rounded-3xl border-2 p-8 min-h-[260px] flex flex-col justify-center bg-slate-50">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6">{current.q}</h2>
                  {showFlashAnswer ? (
                    <div className="space-y-3">
                      <p className="text-3xl font-bold text-green-700">{current.options[current.answer]}</p>
                      <p className="text-slate-700">{current.hint}</p>
                      <p className="font-mono bg-white rounded-xl p-3">{current.formula}</p>
                    </div>
                  ) : <p className="text-slate-500">Think first, then reveal.</p>}
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <button onClick={() => setShowFlashAnswer((v) => !v)} className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold">Reveal / Hide</button>
                  <button onClick={() => { setShowFlashAnswer(false); nextQuestion(); }} className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-3 rounded-2xl font-bold shadow-lg">Next Card</button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-white/70 p-5 space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2"><BarChart3 /> Progress Statistics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm"><span>Current session</span><span>{scorePercent}%</span></div>
                  <ProgressBar value={scorePercent} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-3 border border-blue-100"><div className="text-xs text-slate-500">Answered</div><div className="text-xl font-bold">{totalAnswered}</div></div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-3 border border-blue-100"><div className="text-xs text-slate-500">Question pool</div><div className="text-xl font-bold">{filteredQuestions.length}</div></div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-white/70 p-5 space-y-4">
              <h3 className="text-xl font-bold">Weak Area Tracking</h3>
              {weakAreas.length === 0 ? (
                <p className="text-slate-600">Mistakes will appear here after you answer questions.</p>
              ) : (
                <div className="space-y-3">
                  {weakAreas.map((w) => (
                    <div key={w.concept} className="bg-slate-50 rounded-xl p-3">
                      <div className="flex justify-between text-sm font-semibold"><span>{w.concept}</span><span>{w.percent}%</span></div>
                      <div className="text-xs text-slate-500 mb-2">{w.chapter} · {w.correct}/{w.total}</div>
                      <ProgressBar value={w.percent} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-white/70 p-5 space-y-4">
              <h3 className="text-xl font-bold">Chapter Statistics</h3>
              {chapterStats.length === 0 ? (
                <p className="text-slate-600">Chapter scores will build as you practice.</p>
              ) : (
                <div className="space-y-3">
                  {chapterStats.map((c) => (
                    <div key={c.chapter}>
                      <div className="flex justify-between text-sm"><span>{c.chapter}</span><span>{c.percent}%</span></div>
                      <ProgressBar value={c.percent} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white rounded-3xl shadow-xl p-5 space-y-2">
              <h3 className="text-xl font-bold">Study Rule</h3>
              <p className="text-slate-200">If you score under 80%, repeat the same chapter. If you score over 90%, switch to Hard/Tricky mode.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
