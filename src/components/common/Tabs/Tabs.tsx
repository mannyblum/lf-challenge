import { useRef, useState } from "react";
import type { TabsProps } from "./types";
import { TabsContext } from "./context";

export function Tabs({ children }: TabsProps) {
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
      <div>{children}</div>
    </TabsContext.Provider>
  );
}
