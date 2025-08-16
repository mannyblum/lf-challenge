import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/query-persist-client-core";

import { MoviesProvider } from "./context/MoviesProvider.tsx";
import App from "./App.tsx";

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60, // 1 hour
});

export default function MoviesApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <MoviesProvider>
        <App />
      </MoviesProvider>
    </QueryClientProvider>
  );
}
