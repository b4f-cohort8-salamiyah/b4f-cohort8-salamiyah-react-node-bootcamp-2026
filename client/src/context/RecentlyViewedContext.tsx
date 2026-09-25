import { createContext, useContext, useState } from "react";


interface RecentlyViewedContextValue
{
  recentlyViewed: { id: number; title: string }[];
  recordView: ( id: number,title: string ) => void;
  clearAll: () => void;
}
const RecentlyViewedContext= createContext<RecentlyViewedContextValue | null> (null);

function RecentlyViewedProvider({children}: {children: React.ReactNode}) {
    const [recentlyViewed, setRecentlyViewed] = useState<{ id: number; title: string }[]>([]);

   function recordView(id: number, title: string) {
    setRecentlyViewed((p) => {
      const finalList = p.filter((opp) =>opp.id !== id);
      return [{ id, title }, ...finalList].slice(0, 5);
    });
  }
  function clearAll(){
    setRecentlyViewed([]);
    }

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, recordView ,clearAll}}>
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