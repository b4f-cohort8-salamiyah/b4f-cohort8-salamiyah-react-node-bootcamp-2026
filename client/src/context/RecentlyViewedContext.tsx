import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { RecentlyViewedEntry } from "../types";

interface RecentlyViewedContextValue {
  recentlyViewed: RecentlyViewedEntry[];
  recordView: (entry: RecentlyViewedEntry) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(
  null,
);

function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedEntry[]>(
    [],
  );

  function recordView(entry: RecentlyViewedEntry) {
    const alreadyRecorded = recentlyViewed.some((item) => item.id === entry.id);

    if (alreadyRecorded) {
      return;
    }

    setRecentlyViewed([entry, ...recentlyViewed]);
  }

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, recordView }}>
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