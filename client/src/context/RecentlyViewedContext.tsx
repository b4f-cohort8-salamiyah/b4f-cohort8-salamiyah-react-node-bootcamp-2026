import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface RecentlyViewedEntry {
  id: number;
  title: string;
}

interface RecentlyViewedContextValue {
  recentlyViewed: RecentlyViewedEntry[];
  recordView: (entry: RecentlyViewedEntry) => void;
  clearAll: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(
  null,
);

interface RecentlyViewedProviderProps {
  children: ReactNode;
}

export function RecentlyViewedProvider({
  children,
}: RecentlyViewedProviderProps) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedEntry[]>(
    [],
  );

  function recordView(entry: RecentlyViewedEntry) {
    const withoutDuplicate = recentlyViewed.filter(
      (item) => item.id !== entry.id,
    );

    const withNewFirst = [entry, ...withoutDuplicate];

    const capped = withNewFirst.slice(0, 5);

    setRecentlyViewed(capped);
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

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);

  if (!context) {
    throw new Error(
      "useRecentlyViewed must be used inside RecentlyViewedProvider",
    );
  }

  return context;
}
