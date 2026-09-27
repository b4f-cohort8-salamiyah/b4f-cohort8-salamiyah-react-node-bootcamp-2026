import { createContext, useContext, useState, type ReactNode } from "react";
import type { RecentlyViewedEntry } from "../types";

interface RecentlyViewedContextValue {
  entries: RecentlyViewedEntry[];
  recordView: (entry: RecentlyViewedEntry) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(
  null,
);

function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<RecentlyViewedEntry[]>([]);

  function recordView(entry: RecentlyViewedEntry) {
    setEntries((currentEntries) => [...currentEntries, entry]);
  }

  return (
    <RecentlyViewedContext.Provider value={{ entries, recordView }}>
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
