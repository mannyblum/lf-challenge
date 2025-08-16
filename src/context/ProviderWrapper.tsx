import type { ReactNode } from "react";
import { MoviesProvider } from "./MoviesProvider";

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return <MoviesProvider>{children}</MoviesProvider>;
}
