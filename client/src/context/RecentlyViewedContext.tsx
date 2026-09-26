import { createContext, ReactNode, useContext, useState } from "react";
interface RecentlyViewedContextValue {
  recentlyViewed: { id: number; title: string }[];
  recordView: (entry: { id: number; title: string }) => void;
  clearAll: () => void;
}
const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(
  null,
);
function RecentlyViewedProvider({ children }: { children: ReactNode }) {
    const [recentlyViewed, setRecentlyViewed] = useState<
        { id: number; title: string }[]
    >([]);
    function recordView(entry: { id: number; title: string }) {
      const filtered = recentlyViewed.filter((item) => item.id !== entry.id);

      setRecentlyViewed([entry, ...filtered].slice(0, 5));
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