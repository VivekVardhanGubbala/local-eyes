import { useCallback, useEffect, useRef, useState } from "react";

export interface NetworkStatus {
  isOnline: boolean;
  wasOffline: boolean;
}

/**
 * Listens to real browser online/offline events and exposes reactive
 * network status. `wasOffline` is true for one cycle after the user
 * transitions from offline → online, then resets to false.
 */
export default function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState<boolean>(() => navigator.onLine);
  const [wasOffline, setWasOffline] = useState<boolean>(false);
  const wasOfflineRef = useRef<boolean>(false);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    if (wasOfflineRef.current) {
      setWasOffline(true);
      wasOfflineRef.current = false;
    }
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    setWasOffline(false);
    wasOfflineRef.current = true;
  }, []);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleOnline, handleOffline]);

  // Auto-reset wasOffline after one render cycle
  useEffect(() => {
    if (wasOffline) {
      const id = setTimeout(() => setWasOffline(false), 3500);
      return () => clearTimeout(id);
    }
  }, [wasOffline]);

  return { isOnline, wasOffline };
}
