import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface SavedOpportunitiesContextValue {
  savedIds: Set<number>;
  toggleSaved: (id: number) => void;
}

const SavedOpportunitiesContext =
  createContext<SavedOpportunitiesContextValue | null>(null);

function SavedOpportunitiesProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());

  function toggleSaved(id: number) {
    const updated = new Set(savedIds);

    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }

    setSavedIds(updated);
  }

  return (
    <SavedOpportunitiesContext.Provider value={{ savedIds, toggleSaved }}>
      {children}
    </SavedOpportunitiesContext.Provider>
  );
}

function useSavedOpportunities() {
  const context = useContext(SavedOpportunitiesContext);
  if (!context) {
    throw new Error(
      "useSavedOpportunities must be used inside a SavedOpportunitiesProvider",
    );
  }
  return context;
}

export { SavedOpportunitiesProvider, useSavedOpportunities };
