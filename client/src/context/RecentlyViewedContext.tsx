import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ViewedOpportunitiesContextValue {
  recordView: number[];
  addToRecordView: (id: number) => number[];
  resetRecordView: () => void;
}

const ViewedOpportunitiesContext =
  createContext<ViewedOpportunitiesContextValue | null>(null);

function ViewedOpportunitiesProvider({ children }: { children: ReactNode }) {
  const [recordView, setRecordView] = useState<number[]>([]);

  function addToRecordView(id: number) {
    const updated = recordView;
    if (updated.includes(id)) {
      updated.filter((item) => item != id);
      updated.unshift(id);
    }
    if (updated.length === 5) {
      updated.pop();
      updated.unshift(id);
    }
    updated.unshift(id);
    return updated;
  }
  function resetRecordView() {
    setRecordView([]);
  }

  return (
    <ViewedOpportunitiesContext.Provider
      value={{ recordView, addToRecordView, resetRecordView }}
    >
      {children}
    </ViewedOpportunitiesContext.Provider>
  );
}

function useViewdRecords() {
  const context = useContext(ViewedOpportunitiesContext);
  if (!context) {
    throw new Error("Error using the ViewRecord!");
  }
  return context;
}

export { useViewdRecords, ViewedOpportunitiesProvider };
