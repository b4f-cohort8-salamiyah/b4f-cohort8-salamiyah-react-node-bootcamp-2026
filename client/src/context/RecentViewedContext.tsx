import {createContext,useCallback,useContext,useState, ReactNode,} from "react";

export interface RecentOpportunity {
  id: number;
  title: string;
}

interface RecentViewedContextValue {
  recentViews: RecentOpportunity[];
  addRecentView: (id: number, title: string) => void;
}

const RecentViewedContext = createContext<RecentViewedContextValue | null>(
  null,
);

function RecentViewedProvider({ children }: { children: ReactNode }) {
  const [recentViews, setRecentViews] = useState<RecentOpportunity[]>([]);

  const addRecentView = useCallback((id: number, title: string) => {
    setRecentViews((current) => {
      const next = current.filter((item) => item.id !== id);
      next.unshift({ id, title });
      return next.slice(0, 5);
    });
  }, []);

  return (
    <RecentViewedContext.Provider value={{ recentViews, addRecentView }}>
      {children}
    </RecentViewedContext.Provider>
  );
}

function useRecentViews() {
  const context = useContext(RecentViewedContext);

  if (!context) {
    throw new Error(
      "useRecentViews must be used inside a RecentViewedProvider",
    );
  }

  return context;
}

export { RecentViewedProvider, useRecentViews };
