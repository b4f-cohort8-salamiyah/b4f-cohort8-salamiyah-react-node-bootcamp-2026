import { createContext, useState, ReactNode, useContext } from "react";

export interface ViewedOpportunity {
  id: number;
  title: string;
}

interface RecentlyViewedContextType {
  recentViews: ViewedOpportunity[];
  recordView: (entry: ViewedOpportunity) => void;
  clearAll: () => void;
}

const RecentlyViewedContext = createContext<
  RecentlyViewedContextType | undefined
>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentViews, setRecentViews] = useState<ViewedOpportunity[]>([]);

  function recordView(entry: ViewedOpportunity) {
    setRecentViews((prev) => {
      const filtered = prev.filter((item) => item.id !== entry.id);
      const updated = [entry, ...filtered];
      return updated.slice(0, 5);
    });
  }

  function clearAll() {
    setRecentViews([]);
  }

  return (
    <RecentlyViewedContext.Provider
      value={{ recentViews, recordView, clearAll }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error(
      "useRecentlyViewed must be used within a RecentlyViewedProvider",
    );
  }
  return context;
}
