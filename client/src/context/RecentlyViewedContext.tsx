import { createContext, ReactNode, useContext, useState } from "react";

interface RecentlyViewedEntry {
  id: number;
  title: string;
}

interface RecentlyViewedContextValue {
  recentlyViewed: RecentlyViewedEntry[];
  recordView: (entry: RecentlyViewedEntry) => void;
  clearAll: () => void;
}

const MAX_RECENTLY_VIEWED = 5;

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(
  null,
);

function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedEntry[]>(
    [],
  );

  function recordView(entry: RecentlyViewedEntry) {
    const withoutEntry = recentlyViewed.filter(
      (existing) => existing.id !== entry.id,
    );

    const updated = [entry, ...withoutEntry].slice(0, MAX_RECENTLY_VIEWED);

    setRecentlyViewed(updated);
  }

  function clearAll() {
    setRecentlyViewed([]);
  }

  return (
    <RecentlyViewedContext.Provider
      value={{ recentlyViewed, recordView, clearAll }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);

  if (!context) {
    throw new Error(
      "useRecentlyViewed must be used inside a RecentlyViewedProvider",
    );
  }

  return context;
}

export { RecentlyViewedProvider, useRecentlyViewed };
export type { RecentlyViewedEntry };
