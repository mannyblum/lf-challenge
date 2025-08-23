import type { ReactNode } from "react";

export interface TabsProps {
  children: ReactNode;
}

export interface TabListProps {
  children: ReactNode;
}

export interface TabProps {
  index: number;
  children: ReactNode;
}

export interface TabPanelsProps {
  children: ReactNode;
}

export interface TabPanelProps {
  index: number;
  children: ReactNode;
  trapFocus?: boolean;
}
