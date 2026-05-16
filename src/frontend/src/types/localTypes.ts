// Local type definitions (replaces missing backend.d.ts exports)
// These types were previously expected from the backend but are now frontend-only

export interface FirstAidArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  steps: string[];
  warnings: string[];
  severity: string;
}

export interface HazardRecord {
  id: string;
  hazardType: HazardType;
  severity: HazardSeverity;
  location: string;
  description: string;
  timestamp: bigint;
  active: boolean;
}

export interface SurvivalTopic {
  id: string;
  title: string;
  category: SurvivalCategory;
  content: string;
  tags: string[];
  imageUrl: string;
}

export interface TriageRecord {
  patientId: string;
  status: TriageStatus;
  symptoms: string[];
  notes: string;
  timestamp: bigint;
}

export enum HazardSeverity {
  low = "low",
  moderate = "moderate",
  severe = "severe",
  extreme = "extreme",
}

export enum HazardType {
  flood = "flood",
  earthquake = "earthquake",
  cyclone = "cyclone",
  landslide = "landslide",
  fire = "fire",
  chemical = "chemical",
  heatwave = "heatwave",
  drought = "drought",
  tsunami = "tsunami",
  pandemic = "pandemic",
  carAccident = "carAccident",
  chemicalSpill = "chemicalSpill",
}

export enum SurvivalCategory {
  water = "water",
  food = "food",
  shelter = "shelter",
  medical = "medical",
  navigation = "navigation",
  signaling = "signaling",
  fire = "fire",
}

export enum TriageStatus {
  immediate = "immediate",
  delayed = "delayed",
  minor = "minor",
  deceased = "deceased",
  minimal = "minimal",
  expectant = "expectant",
}
