# Local-Eyes — AI Chatbot Internet Mode

## Current State
The AIAssistant component is a floating chat panel with an offline knowledge base (18 topics). It matches keywords and returns pre-written responses. The status shows 'Smart Mode — Offline' always. No internet mode exists.

## Requested Changes (Diff)

### Add
- Online/Offline mode toggle switch inside the chatbot header (next to the status badge)
- When online mode is ON: send user messages to Google Gemini API (gemini-1.5-flash, free tier) from the frontend using fetch. System prompt instructs Gemini to act as a disaster survival expert for India/Andhra Pradesh, giving step-by-step, actionable answers about water purification, food safety, first aid, evacuation, disaster precautions, medicines, etc.
- API key input prompt: if online mode is toggled ON and no API key is stored in localStorage, show a small inline prompt in the chat to enter a Gemini API key. Store in localStorage.
- Online mode indicator: when ON, show a yellow/amber badge "Online Mode" instead of green "Offline" badge
- Auto-fallback: if Gemini API call fails (network error, bad key, rate limit), silently fall back to offline KB and show a brief note in the AI response: "(Online unavailable — using offline guide)"
- Connection detection: detect navigator.onLine; if user switches to online mode while offline, show a warning message in the chat
- Welcome message update: mention that Online mode is available for richer AI answers

### Modify
- AIAssistant.tsx: add internetMode state (boolean), apiKey state, send function to branch between Gemini API call and local KB lookup
- Status badge in header: dynamically shows Online/Offline based on mode
- Initial welcome message: note that users can enable Online Mode for live AI answers

### Remove
- Nothing removed

## Implementation Plan
1. Add `internetMode` (boolean) and `geminiApiKey` (string) state; load key from localStorage on mount
2. Add a toggle switch in chatbot header (right side, next to refresh button) with label "Online"
3. When toggled ON: if no API key, inject an assistant message prompting user to type their Gemini API key. On next user message, detect if it looks like an API key (starts with 'AIza') and store it, then confirm with a message
4. `send()` function: if internetMode && apiKey, call Gemini API; else use local KB
5. Gemini API call: POST to `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}` with a system prompt focused on disaster survival in India
6. On Gemini error or network failure: fall back to offline KB, append note to response
7. Dynamic status badge: amber for online, green for offline
8. navigator.onLine check when toggling to online mode
