import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface TabsContextProps {
  selectedTab: number;
  setSelectedTab: (idx: number) => void;
  tabButtonRefs: React.RefObject<(HTMLButtonElement | null)[]>;
  lastEscapeIndex: number | null;
  setLastEscapeIndex: (idx: number | null) => void;
}

const TabsContext = createContext<TabsContextProps | null>(null);

export function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabsContext must be used within <Tabs>");
  return ctx;
}

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [lastEscapeIndex, setLastEscapeIndex] = useState<number | null>(null);

  return (
    <TabsContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        tabButtonRefs,
        lastEscapeIndex,
        setLastEscapeIndex,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
