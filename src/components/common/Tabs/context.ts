import { createContext, useContext } from "react";

interface TabsContextProps {
  selectedTab: number;
  setSelectedTab: (idx: number) => void;
  tabButtonRefs: React.RefObject<(HTMLButtonElement | null)[]>;
  lastEscapeIndex: number | null;
  setLastEscapeIndex: (idx: number | null) => void;
}

export const TabsContext = createContext<TabsContextProps | null>(null);

export function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabsContext must be used within <Tabs>");
  return ctx;
}
