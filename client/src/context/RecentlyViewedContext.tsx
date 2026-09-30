import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

interface RecentlyViewedEntry {
  id: number;
  title: string;
}

interface RecentlyViewedContextValue {
  recentlyViewed: RecentlyViewedEntry[];
  recordView: (entry: RecentlyViewedEntry) => void;
  clearAll: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null);

function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedEntry[]>([]);

  // Keep this stable so recording a view does not restart the detail-page effect.
  const recordView = useCallback((entry: RecentlyViewedEntry) => {
    setRecentlyViewed((previous) => [
      { id: entry.id, title: entry.title },
      ...previous.filter((item) => item.id !== entry.id),
    ].slice(0, 5));
  }, []);

  function clearAll() {
    setRecentlyViewed([]);
  }

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, recordView, clearAll }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

// The course pattern keeps the Provider and its consumer hook together.
// eslint-disable-next-line react-refresh/only-export-components
export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error("useRecentlyViewed must be used inside a RecentlyViewedProvider");
  }
  return context;
}

export { RecentlyViewedProvider };
