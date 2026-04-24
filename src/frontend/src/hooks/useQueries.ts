import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  FirstAidArticle,
  HazardRecord,
  SurvivalTopic,
  TriageRecord,
} from "../backend.d";
import { useActor } from "./useActor";

export function useFirstAidArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<FirstAidArticle[]>({
    queryKey: ["firstAid"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAllFirstAidArticles();
      if (result.length === 0) {
        await actor.initializeData();
        return actor.getAllFirstAidArticles();
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
      return actor.getAllHazardRecords();
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
      return actor.getAllSurvivalTopics();
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
      return actor.getAllTriageRecords();
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
      return actor.addTriageRecord(record);
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
      return actor.searchArticles(term);
    },
    enabled: !!actor && !isFetching && term.trim().length > 0,
  });
}
