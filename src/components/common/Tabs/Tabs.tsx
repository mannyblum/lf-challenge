import type { TabsProps } from "./types";
import { TabsProvider } from "./context";

export function Tabs({ children }: TabsProps) {
  return (
    <TabsProvider>
      <div data-testid="detail-tabs">{children}</div>
    </TabsProvider>
  );
}
