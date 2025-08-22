import React, { type ReactElement } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import {
  render as tlrRender,
  type RenderOptions,
} from "@testing-library/react";

import { store } from "@/app/store";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  tlrRender(ui, { wrapper: AllProviders, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

export { customRender as render };
