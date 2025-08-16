import { useMoviesContext } from "@/hooks/useMoviesContext";
import { useRef, useState, type ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [localTerm, setLocalTerm] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { dispatch } = useMoviesContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalTerm(event.target.value);
  };

  const handleSearch = () => {
    if (localTerm.length === 0) {
      inputRef.current?.focus();
    }

    if (localTerm) {
      console.log("searchTerm: ", localTerm);
      dispatch({ type: "SET_SEARCH_TERM", payload: localTerm });
    }
  };

  return (
    <form action={handleSearch} className="mx-auto max-w-2xl w-full py-2 mb-16">
      <div className="relative group w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded2xl blur opacity-20 group-hover:opacity-30"></div>
        <div className="relative rounded-xl backdrop-blur-sm flex items-center p-2  !bg-slate-800/50 border border-slate-700/50">
          <div>
            <FaSearch className="text-slate-400 text-2xl ml-4 mr-2" />
          </div>
          <label className="sr-only" id="searchbar-label">
            Search
          </label>
          <input
            ref={inputRef}
            aria-labelledby="searchbar-label"
            className="px-4 py-2 text-white placeholder:text-slate-400 text-sm w-full flex outline-none"
            value={localTerm}
            onChange={handleChange}
            name="movie search"
            type="text"
            placeholder="Search for movies..."
          />
          <button
            className="z-10 rounded-lg  text-white font-bold text-sm px-8 py-2 bg-gradient-to-r from-purple-400 to-pink-400"
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
