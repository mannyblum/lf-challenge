import React from "react";
import type { TabListProps, TabProps } from "./types";
import { useTabsContext } from "./context";

export function TabList({ children }: TabListProps) {
  return (
    <ul
      role="tablist"
      aria-label="Extra Movie Details"
      className="grid justify-center items-center px-2 gap-2 mb-10 grid-cols-4 rounded-lg h-10 w-full bg-slate-800/30 border border-slate-700/30 text-[#a1a1a1]"
    >
      {children}
    </ul>
  );
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ index, children }, ref) => {
    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLButtonElement>,
      index: number
    ) => {
      if (e.key === "Tab" && !e.shiftKey && selectedTab === index) {
        const panel = document.getElementById(`panel-${index}`);
        if (panel) {
          const focusable = panel.querySelector<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

          if (focusable) {
            e.preventDefault();
            focusable.focus();
          }
        }
      }
    };

    const { selectedTab, setSelectedTab, tabButtonRefs } = useTabsContext();

    const tabRefs = (el: HTMLButtonElement | null) => {
      tabButtonRefs.current[index] = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.RefObject<HTMLButtonElement | null>).current = el;
      }
    };

    return (
      <li role="presentation" className="flex justify-center items-center">
        <button
          ref={(el) => tabRefs(el)}
          role="tab"
          aria-selected={selectedTab === index}
          arian-controls={`panel-${index}`}
          key={`panel-${index}`}
          className={`active hover:bg-purple-100/20 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 text-sm lg:text-lg inline-flex flex-1 items-center justify-center gap=1.5 rounded-md border border-transparent px-2 py-1 font-medium`}
          data-state={selectedTab === index ? "active" : "inactive"}
          onClick={() => {
            setSelectedTab(index);
          }}
          onKeyDown={(e) => handleKeyDown(e, index)}
        >
          {children}
        </button>
      </li>
    );
  }
);
