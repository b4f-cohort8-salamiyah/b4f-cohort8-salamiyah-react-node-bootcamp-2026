import { createContext, useContext, useState, ReactNode } from "react";

export interface RecentlyViewedEntry {
  id: number;
  title: string;
}

interface RecentlyViewedContextType {
  recentlyViewed: RecentlyViewedEntry[];
  recordView: (entry: RecentlyViewedEntry) => void;
  clearAll: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(
  undefined
);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedEntry[]>([]);

  function recordView(entry: RecentlyViewedEntry) {
    setRecentlyViewed((prev) => {
      // Remove any existing entry with the same ID to prevent duplicates (STRETCH)
      const filtered = prev.filter((item) => item.id !== entry.id);
      
      // Add the new entry to the front and cap the list at 5 items max (STRETCH)
      return [entry, ...filtered].slice(0, 5);
    });
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
      "useRecentlyViewed must be used within a RecentlyViewedProvider"
    );
  }
  return context;
}