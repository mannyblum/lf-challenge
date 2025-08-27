import { FaSearch } from "react-icons/fa";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div
          aria-label="Search Movies"
          className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <FaSearch className="w-12 h-12 text-purple-400" />
        </div>

        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It might have been moved,
          deleted, or you entered the wrong URL.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/browse">
            <button className="button inline-flex items-center justify-center gap-4 whitespace-nowrap font-medium transition-all shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xs hover:bg-black/90 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 border-slate-600 text-black/90">
              <span>Browse Movies</span>
            </button>
          </Link>
          <Link to="/">
            <button className="button inline-flex items-center justify-center gap-4 whitespace-nowrap font-medium transition-all shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-[#0a0a0a] shadow-xs hover:bg-[#262626] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 border-slate-600 text-slate-300 hover:text-white">
              <span>Go Home</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
