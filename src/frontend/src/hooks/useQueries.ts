import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  FirstAidArticle,
  HazardRecord,
  SurvivalTopic,
  TriageRecord,
} from "../types/localTypes";
import { useActor } from "./useActor";

type AnyActor = Record<string, (...args: unknown[]) => Promise<unknown>>;

export function useFirstAidArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<FirstAidArticle[]>({
    queryKey: ["firstAid"],
    queryFn: async () => {
      if (!actor) return [];
      const a = actor as unknown as AnyActor;
      const result = (await a.getAllFirstAidArticles()) as FirstAidArticle[];
      if (result.length === 0) {
        await a.initializeData();
        return a.getAllFirstAidArticles() as Promise<FirstAidArticle[]>;
      }
      return result;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHazardAlerts() {
  const { actor, isFetching } = useActor();
  return useQuery<HazardRecord[]>({
    queryKey: ["hazards"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as unknown as AnyActor).getAllHazardRecords() as Promise<
        HazardRecord[]
      >;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSurvivalTopics() {
  const { actor, isFetching } = useActor();
  return useQuery<SurvivalTopic[]>({
    queryKey: ["survival"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as unknown as AnyActor).getAllSurvivalTopics() as Promise<
        SurvivalTopic[]
      >;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTriageRecords() {
  const { actor, isFetching } = useActor();
  return useQuery<TriageRecord[]>({
    queryKey: ["triage"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as unknown as AnyActor).getAllTriageRecords() as Promise<
        TriageRecord[]
      >;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTriageRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (record: TriageRecord) => {
      if (!actor) throw new Error("No actor");
      return (actor as unknown as AnyActor).addTriageRecord(record as unknown);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["triage"] }),
  });
}

export function useSearchArticles(term: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["search", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return { firstAid: [], survival: [] };
      return (actor as unknown as AnyActor).searchArticles(term);
    },
    enabled: !!actor && !isFetching && term.trim().length > 0,
  });
}
