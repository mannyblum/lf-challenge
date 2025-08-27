import { type ReactElement } from "react";
import {
  render as tlrRender,
  type RenderOptions,
} from "@testing-library/react";
import { AllProviders } from "./AllProviders";

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  tlrRender(ui, { wrapper: AllProviders, ...options });

/* eslint-disable react-refresh/only-export-components */
export * from "@testing-library/react";
export { customRender as render };
