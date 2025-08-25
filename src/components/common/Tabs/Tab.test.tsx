import { describe, it, expect } from "vitest";
import { Tab, TabList } from "./Tab";
import { fireEvent, render, screen } from "../../../utils/test-utils";
import { TabsProvider, useTabsContext } from "./context";
import { TabPanel, TabPanels } from "./TabPanel";

describe("Tab", () => {
  const renderWithContext = (selectedTab = 0, index = 0) => {
    return render(
      <TabsProvider>
        <TabList>
          <Tab index={index}>Tab {index}</Tab>
          <Tab index={index + 1}>Tab {index + 1}</Tab>
          <Tab index={index + 2}>Tab {index + 2}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel index={0} trapFocus>
            Tab Panel {index}
          </TabPanel>
          <TabPanel index={1}>Tab Panel {index + 1}</TabPanel>
          <TabPanel index={2}>Tab Panel {index + 2}</TabPanel>
        </TabPanels>
      </TabsProvider>
    );
  };

  it("should render a tab inside a tablist", () => {
    renderWithContext();

    const tab = screen.getByRole("tab", { name: /Tab 0/i });

    expect(tab).toBeInTheDocument();
    expect(tab).toHaveAttribute("aria-selected", "true");
  });

  it("should Focus on a tab panel if focusable", () => {
    renderWithContext();

    const tab1 = screen.getByRole("tab", { name: /Tab 0/i });

    tab1.focus();
    fireEvent.keyDown(tab1, { key: "Tab" });

    const panel1 = screen.getByRole("tabpanel", { name: /Tab 0/i });
    panel1.focus();
    expect(panel1).toHaveFocus();
  });

  it("should return to tablist and on Tab, focus on next tab if user hits ESC while in a panel", () => {
    renderWithContext();

    const tab1 = screen.getByRole("tab", { name: /Tab 0/i });
    const tab2 = screen.getByRole("tab", { name: /Tab 1/i });

    tab1.focus();
    fireEvent.keyDown(tab1, { key: "Tab" });

    const panel1 = screen.getByRole("tabpanel", { name: /Tab 0/i });
    panel1.focus();
    expect(panel1).toHaveFocus();

    fireEvent.keyDown(panel1, { key: "Escape" });
    tab1.focus();

    expect(tab1).toHaveFocus();
    fireEvent.keyDown(tab1, { key: "Tab" });

    tab2.focus();
    expect(tab2).toHaveFocus();
  });

  it("should store button ref in tabButtonsRef", () => {
    let ref: HTMLButtonElement | null = null;

    const TestTab = () => {
      const { tabButtonRefs } = useTabsContext();
      ref = tabButtonRefs.current[0];
      return <Tab index={0}>Cast</Tab>;
    };

    render(
      <TabsProvider>
        <TestTab />
      </TabsProvider>
    );

    const btn = screen.getByRole("tab", { name: "Cast" });

    expect(ref?.current).toBe(btn);
  });
});
