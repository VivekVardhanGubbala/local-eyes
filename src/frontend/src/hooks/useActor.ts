// Stub useActor hook — actor functionality is handled via direct Gemini API calls
// and local data in this offline-first app
export function useActor() {
  return { actor: null, isFetching: false };
}
