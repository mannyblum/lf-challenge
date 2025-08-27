// import { useNavigate } from "react-router";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useLocation } from "wouter";

export default function MainNav() {
  // const navigate = useNavigate();
  const [_, navigate] = useLocation();

  const goToHome = () => {
    // navigate("/", { replace: true });
    navigate("/");
  };

  const goToBrowse = () => {
    // navigate("/browse", { replace: true });
    navigate("/browse");
  };

  return (
    <nav className="sticky w-full top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto lg:py-3 px-4 py-4">
        <div className="flex flex-row gap-5 items-center justify-between">
          <Logo size="small" onClick={goToHome} />
          <SearchBar size="small" noButton />

          <div className="flex-shrink-1 gap-8 hidden lg:block lg:flex">
            <button
              onClick={goToHome}
              className="bg-transparent cursor-pointer rounded-md px-4 py-2 inline-flex items-center justify-centter gap-2 text-sm font-medium text-slate-300 hover:white hover:bg-[#262626]"
            >
              Home
            </button>
            <button
              onClick={goToBrowse}
              className="bg-transparent cursor-pointer rounded-md px-4 py-2 inline-flex items-center justify-centter gap-2 text-sm font-medium text-slate-300 hover:white hover:bg-[#262626]"
            >
              Browse
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
