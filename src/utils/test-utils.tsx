import { store } from "@/app/store";
import {
  render as tlrRender,
  type RenderOptions,
} from "@testing-library/react";
import React, { type ReactElement } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  tlrRender(ui, { wrapper: AllProviders, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

export { customRender as render };
