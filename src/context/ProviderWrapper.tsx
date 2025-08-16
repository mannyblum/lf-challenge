import type { ReactNode } from "react";
import { MoviesProvider } from "./MoviesProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MoviesProvider>{children}</MoviesProvider>
    </QueryClientProvider>
  );
}
