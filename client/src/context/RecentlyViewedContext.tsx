import { createContext, useContext, useState, type ReactNode } from "react";
import { RecentlyViewedEntry } from "../types";


interface RecentlyViewedContextValue {
  entries: RecentlyViewedEntry[];
  recordView: (entry: RecentlyViewedEntry) => void;
  clearAll: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(
  null,
);

 function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<RecentlyViewedEntry[]>([]);

   function recordView(entry: RecentlyViewedEntry) {
     setEntries((currentEntries) =>
       [entry, ...currentEntries.filter((item) => item.id !== entry.id)].slice(
         0,
         5,
       ),
     );
   }
   function clearAll() {
     setEntries([]);
   }


  return (
    <RecentlyViewedContext.Provider value={{ entries, recordView, clearAll }}>
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
export { useRecentlyViewed, RecentlyViewedProvider };