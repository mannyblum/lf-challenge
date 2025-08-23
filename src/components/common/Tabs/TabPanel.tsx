import React, { useEffect, useRef } from "react";
import type { TabPanelProps, TabPanelsProps } from "./types";
import { useTabsContext } from "./context";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function TabPanels({ children }: TabPanelsProps) {
  return <div>{children}</div>;
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ index, children, trapFocus = false }, ref) => {
    const { selectedTab, tabButtonRefs, setLastEscapeIndex } = useTabsContext();
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(panelRef.current);
      } else {
        (ref as React.RefObject<HTMLDivElement | null>).current =
          panelRef.current;
      }
    }, [ref]);

    useFocusTrap(panelRef, trapFocus && selectedTab === index);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        const tb = tabButtonRefs.current[index];

        if (tb) {
          e.preventDefault();
          tb.focus();
          setLastEscapeIndex(index);
        }
      }
    };
    return (
      <section
        ref={panelRef}
        role="tabpanel"
        id={`panel-${index}`}
        aria-labelledby={`tab-${index}`}
        hidden={selectedTab !== index}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {children}
      </section>
    );
  }
);
