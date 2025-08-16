import Home from "@pages/Home";
import { useMoviesContext } from "./hooks/useMoviesContext";

function App() {
  const { state } = useMoviesContext();

  console.log("state updated", state);
  return (
    <div role="main" className="container mx-auto">
      <Home />
    </div>
  );
}

export default App;

// TODO: setup react-query
// TODO: finish connecting to API
// TODO: results page
// TODO: details page
// TODO: browse page (OPTIONAL)
