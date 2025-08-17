import { Logo } from "./MainHeader";
import SearchBar from "./SearchBar";

export default function MainNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto py-3">
        <div className="flex flex-row gap-5 items-center">
          <Logo size="small" />
          <SearchBar size="small" noButton />
          <button className="bg-transparent cursor-pointer rounded-md px-4 py-2 inline-flex items-center justify-centter gap-2 text-sm font-medium text-slate-300 hover:white hover:bg-[#262626]">
            Home
          </button>
          <button className="bg-transparent cursor-pointer rounded-md px-4 py-2 inline-flex items-center justify-centter gap-2 text-sm font-medium text-slate-300 hover:white hover:bg-[#262626]">
            Browse
          </button>
        </div>
      </div>
    </nav>
  );
}
