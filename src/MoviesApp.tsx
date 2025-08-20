import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

export default function MoviesApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
