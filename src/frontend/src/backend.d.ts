import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FirstAidArticle {
    title: string;
    content: string;
    steps: Array<string>;
    category: FirstAidCategory;
    severity: FirstAidSeverity;
}
export interface TriageRecord {
    status: TriageStatus;
    patientId: string;
    notes: string;
    timestamp: Time;
    symptoms: Array<string>;
}
export type Time = bigint;
export interface HazardRecord {
    hazardType: HazardType;
    timestamp: Time;
    severity: HazardSeverity;
    location: string;
}
export interface SurvivalTopic {
    title: string;
    content: string;
    tags: Array<string>;
    category: SurvivalCategory;
}
export enum FirstAidCategory {
    CPR = "CPR",
    bleeding = "bleeding",
    shock = "shock",
    burns = "burns",
    fractures = "fractures"
}
export enum FirstAidSeverity {
    low = "low",
    high = "high",
    critical = "critical",
    moderate = "moderate"
}
export enum HazardSeverity {
    low = "low",
    severe = "severe",
    extreme = "extreme",
    moderate = "moderate"
}
export enum HazardType {
    flood = "flood",
    earthquake = "earthquake",
    fire = "fire",
    chemical = "chemical"
}
export enum SurvivalCategory {
    fire = "fire",
    food = "food",
    navigation = "navigation",
    shelter = "shelter",
    water = "water"
}
export enum TriageStatus {
    minor = "minor",
    delayed = "delayed",
    deceased = "deceased",
    immediate = "immediate"
}
export interface backendInterface {
    addFirstAidArticle(article: FirstAidArticle): Promise<void>;
    addHazardRecord(record: HazardRecord): Promise<void>;
    addSurvivalTopic(topic: SurvivalTopic): Promise<void>;
    addTriageRecord(record: TriageRecord): Promise<void>;
    getAllFirstAidArticles(): Promise<Array<FirstAidArticle>>;
    getAllHazardRecords(): Promise<Array<HazardRecord>>;
    getAllSurvivalTopics(): Promise<Array<SurvivalTopic>>;
    getAllTriageRecords(): Promise<Array<TriageRecord>>;
    getFirstAidArticle(title: string): Promise<FirstAidArticle>;
    initializeData(): Promise<void>;
    searchArticles(searchTerm: string): Promise<{
        survival: Array<SurvivalTopic>;
        firstAid: Array<FirstAidArticle>;
    }>;
}
