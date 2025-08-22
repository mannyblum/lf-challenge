import { useRef, useState, type ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

import { useAppDispatch } from "@/hooks/rtk";

import { setSearchTerm } from "@/slices/moviesSlice";

interface SearchBarProps {
  size?: string;
  noButton?: boolean;
}

export default function SearchBar({ size, noButton }: SearchBarProps) {
  const [localTerm, setLocalTerm] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalTerm(event.target.value);
  };

  const handleSearch = () => {
    if (localTerm.length === 0) {
      inputRef.current?.focus();
    }

    if (localTerm) {
      dispatch(setSearchTerm(localTerm));
      navigate("/results/" + localTerm);
    }
  };

  return (
    <form
      action={handleSearch}
      className={`flex-grow max-w-2xl w-full py-2 ${
        size !== "small" ? "mb-16 mx-auto" : ""
      } `}
    >
      <div className="relative group w-full">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-30`}
        ></div>
        <div
          className={`${
            size === "small" ? "p-0.5" : "p-2"
          } relative rounded-lg backdrop-blur-sm flex items-center  !bg-slate-800/50 border border-slate-700/50`}
        >
          <div>
            <FaSearch
              className={`text-slate-400 ${
                size === "small" ? "text-md ml-2 mr-1" : "text-2xl ml-4 mr-2"
              }`}
            />
          </div>
          <label className="sr-only" id="searchbar-label">
            Search
          </label>
          <input
            ref={inputRef}
            aria-labelledby="searchbar-label"
            className={`${
              size === "small" ? "p-1" : "px-4 py-2"
            } text-white placeholder:text-slate-400 sm:placeholder:text-xl md:placeholder:text-lg text-md w-full flex outline-none`}
            value={localTerm}
            onChange={handleChange}
            name="movie search"
            type="text"
            placeholder="Search for movies..."
          />
          {!noButton && (
            <button
              className="z-10 rounded-lg text-white font-bold text-sm px-8 py-2 bg-gradient-to-r from-purple-400 to-pink-400"
              type="submit"
            >
              Search
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
