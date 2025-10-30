export interface Trait {
  id: string;
  name: string;
  category: string;
  description: string;
  vataScore: number;
  pittaScore: number;
  kaphaScore: number;
}

export interface UserResponse {
  traitId: string;
  value: string;
  confidence: number;
}

export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface PrakrutiResult {
  primaryDosha: string;
  secondaryDosha?: string;
  constitution: string;
  confidence: number;
  scores: DoshaScores;
  topTraits: Array<{
    trait: Trait;
    contribution: number;
  }>;
  explanation: string;
  balancingTips: string[];
}

export const AYURVEDIC_TRAITS: Trait[] = [
  // Physical Build
  {
    id: "body_build",
    name: "Body Build",
    category: "physical",
    description: "Your natural body frame and build",
    vataScore: 0.9, // Thin, lean
    pittaScore: 0.5, // Medium build
    kaphaScore: 0.1, // Large, heavy
  },
  {
    id: "skin_type",
    name: "Skin Type",
    category: "physical", 
    description: "Your skin characteristics and texture",
    vataScore: 0.8, // Dry, rough
    pittaScore: 0.7, // Warm, oily
    kaphaScore: 0.6, // Smooth, moist
  },
  {
    id: "hair_type",
    name: "Hair Type",
    category: "physical",
    description: "Your hair texture and characteristics",
    vataScore: 0.8, // Dry, frizzy
    pittaScore: 0.6, // Fine, oily
    kaphaScore: 0.5, // Thick, lustrous
  },
  
  // Mental & Emotional
  {
    id: "memory",
    name: "Memory",
    category: "mental",
    description: "How you process and retain information",
    vataScore: 0.8, // Quick to learn, quick to forget
    pittaScore: 0.7, // Sharp, precise
    kaphaScore: 0.9, // Slow to learn, good retention
  },
  {
    id: "decision_making",
    name: "Decision Making",
    category: "mental",
    description: "Your approach to making decisions",
    vataScore: 0.9, // Quick, changeable
    pittaScore: 0.8, // Decisive, focused
    kaphaScore: 0.3, // Slow, deliberate
  },
  {
    id: "emotions",
    name: "Emotional Patterns",
    category: "mental",
    description: "Your typical emotional responses",
    vataScore: 0.9, // Anxious, worried
    pittaScore: 0.7, // Irritable, intense
    kaphaScore: 0.4, // Calm, steady
  },
  
  // Energy & Sleep
  {
    id: "energy_level",
    name: "Energy Level",
    category: "lifestyle",
    description: "Your typical energy patterns throughout the day",
    vataScore: 0.8, // Variable, bursts
    pittaScore: 0.9, // Intense, focused
    kaphaScore: 0.5, // Steady, enduring
  },
  {
    id: "sleep_pattern",
    name: "Sleep Pattern",
    category: "lifestyle",
    description: "Your natural sleep habits and quality",
    vataScore: 0.9, // Light, restless
    pittaScore: 0.6, // Moderate, intense dreams
    kaphaScore: 0.3, // Deep, long
  },
  
  // Preferences
  {
    id: "weather_preference",
    name: "Weather Preference",
    category: "preferences",
    description: "What weather conditions you prefer",
    vataScore: 0.2, // Likes warm, humid
    pittaScore: 0.1, // Likes cool, dry
    kaphaScore: 0.8, // Likes warm, dry
  },
  {
    id: "diet_preference",
    name: "Diet Preference",
    category: "preferences",
    description: "Your natural food preferences and eating habits",
    vataScore: 0.7, // Irregular eating, prefers warm foods
    pittaScore: 0.8, // Regular meals, cooling foods
    kaphaScore: 0.4, // Light meals, spicy foods
  },
  
  // Stress Response
  {
    id: "stress_response",
    name: "Stress Response",
    category: "mental",
    description: "How you typically respond to stress",
    vataScore: 0.9, // Anxious, overwhelmed
    pittaScore: 0.8, // Angry, frustrated
    kaphaScore: 0.3, // Withdrawn, depressed
  },
];

export const TRAIT_OPTIONS = {
  body_build: {
    vata: ["Thin", "Lean", "Small-boned", "Delicate frame"],
    pitta: ["Medium build", "Athletic", "Well-proportioned", "Moderate frame"],
    kapha: ["Large frame", "Heavy-set", "Big-boned", "Solid build"]
  },
  skin_type: {
    vata: ["Dry", "Rough", "Thin", "Cool to touch", "Prone to dryness"],
    pitta: ["Warm", "Soft", "Oily", "Prone to acne", "Sensitive", "Freckles"],
    kapha: ["Smooth", "Moist", "Thick", "Cool", "Pale", "Large pores"]
  },
  hair_type: {
    vata: ["Dry", "Frizzy", "Coarse", "Brittle", "Dark"],
    pitta: ["Fine", "Soft", "Oily", "Early graying", "Straight", "Light colored"],
    kapha: ["Thick", "Lustrous", "Wavy", "Oily", "Dark", "Strong"]
  },
  memory: {
    vata: ["Quick to learn", "Quick to forget", "Short-term focused", "Creative"],
    pitta: ["Sharp", "Precise", "Good comprehension", "Analytical"],
    kapha: ["Slow to learn", "Good retention", "Long-term memory", "Methodical"]
  },
  decision_making: {
    vata: ["Quick decisions", "Often changes mind", "Spontaneous", "Intuitive"],
    pitta: ["Decisive", "Confident", "Goal-oriented", "Logical"],
    kapha: ["Takes time", "Deliberate", "Careful consideration", "Practical"]
  },
  emotions: {
    vata: ["Anxious", "Worried", "Enthusiastic", "Changeable moods"],
    pitta: ["Irritable when stressed", "Intense", "Passionate", "Competitive"],
    kapha: ["Calm", "Steady", "Patient", "Rarely angry"]
  },
  energy_level: {
    vata: ["Variable energy", "Bursts of activity", "Gets tired easily"],
    pitta: ["High energy", "Intense focus", "Sustained activity"],
    kapha: ["Steady energy", "Slow start", "Good endurance"]
  },
  sleep_pattern: {
    vata: ["Light sleeper", "Restless", "Difficulty falling asleep", "Vivid dreams"],
    pitta: ["Moderate sleep", "Hot sleeper", "Intense dreams", "Early riser"],
    kapha: ["Deep sleeper", "Loves sleep", "Slow to wake", "Few dreams"]
  },
  weather_preference: {
    vata: ["Prefers warm", "Dislikes cold/wind", "Likes humidity"],
    pitta: ["Prefers cool", "Dislikes heat", "Likes breeze"],
    kapha: ["Prefers warm/dry", "Dislikes cold/damp", "Likes sunshine"]
  },
  diet_preference: {
    vata: ["Irregular eating", "Prefers warm foods", "Sweet/sour/salty tastes"],
    pitta: ["Regular meals", "Likes cool foods", "Sweet/bitter/astringent tastes"],
    kapha: ["Can skip meals", "Likes light foods", "Pungent/bitter/astringent tastes"]
  },
  stress_response: {
    vata: ["Anxious", "Worried", "Overwhelmed", "Restless"],
    pitta: ["Angry", "Frustrated", "Impatient", "Critical"],
    kapha: ["Withdrawn", "Sluggish", "Unmotivated", "Sad"]
  }
};

export function calculatePrakruti(responses: UserResponse[]): PrakrutiResult {
  let vataTotal = 0;
  let pittaTotal = 0;
  let kaphaTotal = 0;
  let totalResponses = 0;

  const contributingTraits: Array<{trait: Trait; contribution: number}> = [];

  responses.forEach(response => {
    const trait = AYURVEDIC_TRAITS.find(t => t.id === response.traitId);
    if (!trait) return;

    // Determine which dosha this specific response matches
    const doshaScore = getDoshaScoreForResponse(trait.id, response.value);

    vataTotal += doshaScore.vata;
    pittaTotal += doshaScore.pitta;
    kaphaTotal += doshaScore.kapha;
    totalResponses += 1;

    contributingTraits.push({
      trait,
      contribution: Math.max(doshaScore.vata, doshaScore.pitta, doshaScore.kapha)
    });
  });

  // Normalize scores based on actual responses
  const scores: DoshaScores = {
    vata: totalResponses > 0 ? (vataTotal / totalResponses) * 100 : 0,
    pitta: totalResponses > 0 ? (pittaTotal / totalResponses) * 100 : 0,
    kapha: totalResponses > 0 ? (kaphaTotal / totalResponses) * 100 : 0,
  };

  // Determine constitution
  const sortedDoshas = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .map(([dosha]) => dosha);

  const primaryDosha = sortedDoshas[0];
  const primaryScore = scores[primaryDosha as keyof DoshaScores];
  const secondaryScore = scores[sortedDoshas[1] as keyof DoshaScores];
  
  const constitution = getConstitutionType(primaryScore, secondaryScore, sortedDoshas);
  const confidence = calculateConfidence(scores, responses.length);

  // Sort contributing traits by contribution
  contributingTraits.sort((a, b) => b.contribution - a.contribution);

  return {
    primaryDosha,
    secondaryDosha: constitution.includes('dual') ? sortedDoshas[1] : undefined,
    constitution,
    confidence,
    scores,
    topTraits: contributingTraits.slice(0, 5),
    explanation: generateExplanation(constitution, scores),
    balancingTips: generateBalancingTips(primaryDosha, sortedDoshas[1])
  };
}

function getConstitutionType(primaryScore: number, secondaryScore: number, doshas: string[]): string {
  const difference = primaryScore - secondaryScore;
  
  if (difference < 10) {
    // All three doshas are close - tridoshic
    return 'tridoshic';
  } else if (difference < 20) {
    // Two doshas are close - dual constitution
    return `${doshas[0]}-${doshas[1]}`;
  } else {
    // Clear single dosha dominance
    return doshas[0];
  }
}

function calculateConfidence(scores: DoshaScores, responseCount: number): number {
  const maxScore = Math.max(scores.vata, scores.pitta, scores.kapha);
  const minScore = Math.min(scores.vata, scores.pitta, scores.kapha);
  const spread = maxScore - minScore;
  
  // Higher spread and more responses = higher confidence
  const spreadConfidence = Math.min(spread / 50, 1);
  const responseConfidence = Math.min(responseCount / 8, 1);
  
  return Math.round((spreadConfidence * 0.7 + responseConfidence * 0.3) * 100);
}

function generateExplanation(constitution: string, scores: DoshaScores): string {
  const vata = Math.round(scores.vata);
  const pitta = Math.round(scores.pitta);
  const kapha = Math.round(scores.kapha);

  if (constitution === 'tridoshic') {
    return `You have a tridoshic constitution with relatively balanced doshas (Vata: ${vata}%, Pitta: ${pitta}%, Kapha: ${kapha}%). This is considered rare and indicates natural balance across all three constitutional types. You may express different dosha qualities at different times.`;
  }
  
  if (constitution.includes('-')) {
    const [primary, secondary] = constitution.split('-');
    const primaryScore = scores[primary as keyof DoshaScores] || 0;
    const secondaryScore = scores[secondary as keyof DoshaScores] || 0;
    return `You have a dual constitution with ${primary.charAt(0).toUpperCase() + primary.slice(1)} as your primary dosha (${primaryScore.toFixed(0)}%) and ${secondary.charAt(0).toUpperCase() + secondary.slice(1)} as secondary (${secondaryScore.toFixed(0)}%). This means you express characteristics of both doshas, with ${primary} being more dominant.`;
  }

  const primaryScore = scores[constitution as keyof DoshaScores] || 0;
  return `You have a ${constitution.charAt(0).toUpperCase() + constitution.slice(1)} constitution (${primaryScore.toFixed(0)}%). This means ${getDoshaDescription(constitution)} characteristics are most dominant in your physical and mental nature.`;
}

function getDoshaDescription(dosha: string): string {
  switch (dosha) {
    case 'vata':
      return 'air and space element';
    case 'pitta':
      return 'fire and water element';
    case 'kapha':
      return 'earth and water element';
    default:
      return '';
  }
}

function generateBalancingTips(primaryDosha: string, secondaryDosha?: string): string[] {
  const tips: { [key: string]: string[] } = {
    vata: [
      "🕐 Establish consistent daily routines: wake up, eat meals, and sleep at regular times to calm your variable nature",
      "🧘‍♀️ Practice grounding activities: gentle yoga, meditation, deep breathing, or warm oil self-massage to soothe your nervous system",
      "🍲 Choose warm, cooked foods with healthy oils and avoid cold, dry, or raw foods that can increase Vata",
      "🌿 Favor sweet, sour, and salty tastes while minimizing bitter, pungent, and astringent foods",
      "💆‍♀️ Create a calming environment with warm colors, soft music, and gentle lighting to reduce overstimulation"
    ],
    pitta: [
      "🌡️ Stay cool: avoid excessive heat, hot weather, and overly spicy or acidic foods that can aggravate Pitta",
      "⚖️ Practice moderation in work and exercise - avoid overheating and competitive stress that can lead to burnout",
      "🥒 Eat cooling foods like cucumbers, melons, coconut, leafy greens, and sweet fruits to balance internal fire",
      "🧊 Favor sweet, bitter, and astringent tastes while reducing spicy, salty, and sour foods",
      "🌅 Schedule demanding activities during cooler parts of the day and take regular breaks to prevent intensity buildup"
    ],
    kapha: [
      "🏃‍♀️ Engage in regular vigorous exercise and varied physical activities to stimulate circulation and energy flow",
      "🌶️ Choose light, warm, and well-spiced foods while reducing heavy, oily, sweet, or dairy-rich meals",
      "⏰ Avoid oversleeping and maintain an active lifestyle with varied activities to prevent stagnation",
      "🔥 Favor pungent, bitter, and astringent tastes while minimizing sweet, sour, and salty foods",
      "🌟 Seek new experiences, social connections, and mental stimulation to energize your naturally stable nature"
    ]
  };

  const primaryTips = tips[primaryDosha] || [];

  if (secondaryDosha && tips[secondaryDosha]) {
    // For dual constitutions, provide balanced approach
    const secondaryTips = tips[secondaryDosha];
    return [
      primaryTips[0], // Primary dosha routine tip
      secondaryTips[0], // Secondary dosha routine tip
      primaryTips[1], // Primary dosha activity tip
      secondaryTips[1], // Secondary dosha activity tip
      "⚖️ Balance both dosha needs by alternating between practices that address each constitution throughout your week"
    ];
  }

  return primaryTips;
}

export function interpretUserInput(input: string): { traitId: string; value: string; confidence: number }[] {
  const interpretations: { traitId: string; value: string; confidence: number }[] = [];
  const lowerInput = input.toLowerCase();

  // Body build keywords
  if (/(thin|lean|skinny|small|delicate|petite)/i.test(input)) {
    interpretations.push({ traitId: 'body_build', value: 'thin', confidence: 0.8 });
  } else if (/(medium|athletic|average|moderate)/i.test(input)) {
    interpretations.push({ traitId: 'body_build', value: 'medium', confidence: 0.8 });
  } else if (/(large|heavy|big|solid|stocky)/i.test(input)) {
    interpretations.push({ traitId: 'body_build', value: 'large', confidence: 0.8 });
  }

  // Skin type keywords
  if (/(dry|rough|flaky)/i.test(input)) {
    interpretations.push({ traitId: 'skin_type', value: 'dry', confidence: 0.8 });
  } else if (/(oily|acne|sensitive|warm)/i.test(input)) {
    interpretations.push({ traitId: 'skin_type', value: 'oily', confidence: 0.8 });
  } else if (/(smooth|moist|cool|pale)/i.test(input)) {
    interpretations.push({ traitId: 'skin_type', value: 'smooth', confidence: 0.8 });
  }

  // Hair type keywords
  if (/(dry|frizzy|coarse|brittle|dark)/i.test(input)) {
    interpretations.push({ traitId: 'hair_type', value: 'dry', confidence: 0.8 });
  } else if (/(fine|soft|oily|straight|light|early gray)/i.test(input)) {
    interpretations.push({ traitId: 'hair_type', value: 'fine', confidence: 0.8 });
  } else if (/(thick|lustrous|wavy|strong)/i.test(input)) {
    interpretations.push({ traitId: 'hair_type', value: 'thick', confidence: 0.8 });
  }

  // Energy patterns
  if (/(tired|exhausted|low energy|variable energy)/i.test(input)) {
    interpretations.push({ traitId: 'energy_level', value: 'variable', confidence: 0.7 });
  } else if (/(high energy|intense|focused|driven)/i.test(input)) {
    interpretations.push({ traitId: 'energy_level', value: 'intense', confidence: 0.7 });
  } else if (/(steady|consistent|slow start|endurance)/i.test(input)) {
    interpretations.push({ traitId: 'energy_level', value: 'steady', confidence: 0.7 });
  }

  // Emotional patterns
  if (/(anxious|worried|nervous|restless)/i.test(input)) {
    interpretations.push({ traitId: 'emotions', value: 'anxious', confidence: 0.9 });
  } else if (/(angry|frustrated|irritable|impatient)/i.test(input)) {
    interpretations.push({ traitId: 'emotions', value: 'irritable', confidence: 0.9 });
  } else if (/(calm|peaceful|steady|patient)/i.test(input)) {
    interpretations.push({ traitId: 'emotions', value: 'calm', confidence: 0.9 });
  }

  // Sleep patterns
  if (/(light sleep|restless|insomnia|trouble sleeping)/i.test(input)) {
    interpretations.push({ traitId: 'sleep_pattern', value: 'light', confidence: 0.8 });
  } else if (/(hot sleeper|intense dreams|early riser)/i.test(input)) {
    interpretations.push({ traitId: 'sleep_pattern', value: 'moderate', confidence: 0.8 });
  } else if (/(deep sleep|love sleep|hard to wake)/i.test(input)) {
    interpretations.push({ traitId: 'sleep_pattern', value: 'deep', confidence: 0.8 });
  }

  // Memory patterns
  if (/(quick to learn|quick to forget|creative|short.term)/i.test(input)) {
    interpretations.push({ traitId: 'memory', value: 'quick', confidence: 0.8 });
  } else if (/(sharp|precise|analytical|good comprehension)/i.test(input)) {
    interpretations.push({ traitId: 'memory', value: 'sharp', confidence: 0.8 });
  } else if (/(slow to learn|good retention|methodical|long.term)/i.test(input)) {
    interpretations.push({ traitId: 'memory', value: 'slow', confidence: 0.8 });
  }

  // Decision making
  if (/(quick decision|spontaneous|intuitive|changes mind)/i.test(input)) {
    interpretations.push({ traitId: 'decision_making', value: 'quick', confidence: 0.8 });
  } else if (/(decisive|confident|logical|goal.oriented)/i.test(input)) {
    interpretations.push({ traitId: 'decision_making', value: 'decisive', confidence: 0.8 });
  } else if (/(takes time|deliberate|careful|practical)/i.test(input)) {
    interpretations.push({ traitId: 'decision_making', value: 'deliberate', confidence: 0.8 });
  }

  // Weather preference
  if (/(prefer warm|dislike cold|like humidity|cold weather)/i.test(input)) {
    interpretations.push({ traitId: 'weather_preference', value: 'warm', confidence: 0.8 });
  } else if (/(prefer cool|dislike heat|like breeze|hot weather)/i.test(input)) {
    interpretations.push({ traitId: 'weather_preference', value: 'cool', confidence: 0.8 });
  } else if (/(warm dry|dislike damp|like sunshine|sunny)/i.test(input)) {
    interpretations.push({ traitId: 'weather_preference', value: 'dry', confidence: 0.8 });
  }

  // Diet preference
  if (/(irregular eating|warm food|sweet|sour|salty)/i.test(input)) {
    interpretations.push({ traitId: 'diet_preference', value: 'irregular', confidence: 0.8 });
  } else if (/(regular meals|cool food|cooling|bitter|astringent)/i.test(input)) {
    interpretations.push({ traitId: 'diet_preference', value: 'regular', confidence: 0.8 });
  } else if (/(skip meals|light food|spicy|pungent)/i.test(input)) {
    interpretations.push({ traitId: 'diet_preference', value: 'light', confidence: 0.8 });
  }

  // Stress response
  if (/(anxious|worried|overwhelmed|restless)/i.test(input)) {
    interpretations.push({ traitId: 'stress_response', value: 'anxious', confidence: 0.9 });
  } else if (/(angry|frustrated|impatient|critical)/i.test(input)) {
    interpretations.push({ traitId: 'stress_response', value: 'angry', confidence: 0.9 });
  } else if (/(withdrawn|sluggish|unmotivated|sad)/i.test(input)) {
    interpretations.push({ traitId: 'stress_response', value: 'withdrawn', confidence: 0.9 });
  }

  return interpretations;
}

export function getDoshaScoreForResponse(traitId: string, value: string): DoshaScores {
  const options = TRAIT_OPTIONS[traitId as keyof typeof TRAIT_OPTIONS];
  if (!options) return { vata: 0, pitta: 0, kapha: 0 };

  // Find which dosha category this response belongs to
  for (const [dosha, values] of Object.entries(options)) {
    if (values.some(option => option.toLowerCase().includes(value.toLowerCase()) ||
                             value.toLowerCase().includes(option.toLowerCase()))) {
      switch (dosha) {
        case 'vata':
          return { vata: 1, pitta: 0, kapha: 0 };
        case 'pitta':
          return { vata: 0, pitta: 1, kapha: 0 };
        case 'kapha':
          return { vata: 0, pitta: 0, kapha: 1 };
      }
    }
  }

  // If no exact match found, use partial matching
  const lowerValue = value.toLowerCase();

  // Check for vata characteristics
  if (/(thin|dry|light|quick|variable|anxious|restless|creative)/i.test(lowerValue)) {
    return { vata: 0.8, pitta: 0.1, kapha: 0.1 };
  }

  // Check for pitta characteristics
  if (/(medium|sharp|intense|hot|focused|competitive|angry|precise)/i.test(lowerValue)) {
    return { vata: 0.1, pitta: 0.8, kapha: 0.1 };
  }

  // Check for kapha characteristics
  if (/(heavy|slow|steady|calm|thick|patient|cool|enduring)/i.test(lowerValue)) {
    return { vata: 0.1, pitta: 0.1, kapha: 0.8 };
  }

  // Default balanced distribution if no clear match
  return { vata: 0.33, pitta: 0.33, kapha: 0.34 };
}
