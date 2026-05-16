import type { backendInterface } from "../backend.d";
import {
  FirstAidCategory,
  FirstAidSeverity,
  HazardSeverity,
  HazardType,
  SurvivalCategory,
  TriageStatus,
} from "../backend.d";

export const mockBackend: backendInterface = {
  addFirstAidArticle: async () => undefined,
  addHazardRecord: async () => undefined,
  addSituationAnalysis: async () => BigInt(1),
  addSurvivalTopic: async () => undefined,
  addTriageRecord: async () => undefined,
  getAllFirstAidArticles: async () => [
    {
      title: "CPR for Adults",
      content: "Cardiopulmonary resuscitation (CPR) is an emergency procedure that can help save a life when someone's breathing or heartbeat has stopped.",
      steps: [
        "Call 108 (India emergency) immediately",
        "Place heel of hand on center of chest",
        "Give 30 chest compressions at rate of 100-120 per minute",
        "Give 2 rescue breaths",
        "Continue until help arrives",
      ],
      category: FirstAidCategory.CPR,
      severity: FirstAidSeverity.critical,
    },
    {
      title: "Treating Severe Bleeding",
      content: "Severe bleeding can be life-threatening. Apply direct pressure to control bleeding.",
      steps: [
        "Apply firm pressure with clean cloth",
        "Do not remove cloth — add more if needed",
        "Elevate injured area above heart level",
        "Use tourniquet if bleeding doesn't stop within 10 minutes",
        "Call 108 immediately",
      ],
      category: FirstAidCategory.bleeding,
      severity: FirstAidSeverity.high,
    },
    {
      title: "Treating Burns",
      content: "Burns can range from minor to life-threatening. Proper immediate treatment is crucial.",
      steps: [
        "Cool burn under running water for 20 minutes",
        "Do not use ice or butter",
        "Cover with sterile non-adhesive bandage",
        "Take Crocin 500mg for pain if available",
        "Seek medical attention for burns larger than palm",
      ],
      category: FirstAidCategory.burns,
      severity: FirstAidSeverity.moderate,
    },
  ],
  getAllHazardRecords: async () => [
    {
      hazardType: HazardType.cyclone,
      timestamp: BigInt(Date.now()),
      severity: HazardSeverity.extreme,
      location: "Vishakhapatnam, Andhra Pradesh",
    },
    {
      hazardType: HazardType.flood,
      timestamp: BigInt(Date.now() - 3600000),
      severity: HazardSeverity.severe,
      location: "Krishna District, Andhra Pradesh",
    },
    {
      hazardType: HazardType.heatwave,
      timestamp: BigInt(Date.now() - 7200000),
      severity: HazardSeverity.moderate,
      location: "Vijayawada, Andhra Pradesh",
    },
    {
      hazardType: HazardType.fire,
      timestamp: BigInt(Date.now() - 10800000),
      severity: HazardSeverity.low,
      location: "Guntur, Andhra Pradesh",
    },
  ],
  getAllSituationAnalyses: async () => [
    {
      id: BigInt(1),
      imageDescription: "Building fire with smoke",
      actionSteps: [
        "Evacuate immediately via stairwell",
        "Do not use elevators",
        "Call 101 fire brigade",
        "Alert neighbors",
        "Meet at assembly point",
      ],
      topSituation: "Building Fire",
      timestamp: BigInt(Date.now()),
      detectedSituations: [
        ["Building Fire", BigInt(95)],
        ["Smoke Inhalation Risk", BigInt(80)],
        ["Structural Collapse Risk", BigInt(40)],
      ],
    },
  ],
  getAllSurvivalTopics: async () => [
    {
      title: "Water Purification in Floods",
      content: "Floodwater is highly contaminated. These methods help purify water for safe drinking.",
      tags: ["water", "flood", "survival"],
      category: SurvivalCategory.water,
    },
    {
      title: "Cyclone Shelter Guide",
      content: "During cyclones, identifying and reaching safe shelters quickly can save lives.",
      tags: ["cyclone", "shelter", "AP"],
      category: SurvivalCategory.shelter,
    },
    {
      title: "Emergency Food Foraging — Andhra Pradesh",
      content: "Know which wild plants in AP are safe to eat in emergency situations.",
      tags: ["food", "foraging", "andhra"],
      category: SurvivalCategory.food,
    },
    {
      title: "Navigation Without GPS",
      content: "Using stars, sun position, and natural landmarks for navigation.",
      tags: ["navigation", "survival"],
      category: SurvivalCategory.navigation,
    },
  ],
  getAllTriageRecords: async () => [
    {
      status: TriageStatus.immediate,
      patientId: "PT-001",
      notes: "Severe chest trauma from car accident. Needs immediate surgery.",
      timestamp: BigInt(Date.now()),
      symptoms: ["chest pain", "difficulty breathing", "pale skin", "rapid pulse"],
    },
    {
      status: TriageStatus.delayed,
      patientId: "PT-002",
      notes: "Fractured arm. Stable condition. Can wait for treatment.",
      timestamp: BigInt(Date.now() - 1800000),
      symptoms: ["arm pain", "swelling", "limited movement"],
    },
    {
      status: TriageStatus.minor,
      patientId: "PT-003",
      notes: "Minor cuts and bruises. Ambulatory.",
      timestamp: BigInt(Date.now() - 3600000),
      symptoms: ["minor cuts", "bruising", "anxiety"],
    },
  ],
  getFirstAidArticle: async (title: string) => ({
    title,
    content: "Emergency first aid procedure for immediate care.",
    steps: [
      "Assess the situation for safety",
      "Call 108 for emergency services",
      "Begin treatment following protocol",
      "Monitor patient until help arrives",
    ],
    category: FirstAidCategory.CPR,
    severity: FirstAidSeverity.high,
  }),
  initializeData: async () => undefined,
  searchArticles: async () => ({
    survival: [],
    firstAid: [],
  }),
  storeSurvivalData: async () => undefined,
};
