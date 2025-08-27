import { useContext } from "react";
import { TabsContext } from "./context";

export function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabsContext must be used within <Tabs>");
  return ctx;
}
