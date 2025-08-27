import { createContext, useRef, useState, type ReactNode } from "react";

interface TabsContextProps {
  selectedTab: number;
  setSelectedTab: (idx: number) => void;
  tabButtonRefs: React.RefObject<(HTMLButtonElement | null)[]>;
  lastEscapeIndex: number | null;
  setLastEscapeIndex: (idx: number | null) => void;
}

const TabsContext = createContext<TabsContextProps | null>(null);

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

export { TabsContext };
