import { FaFilm } from "react-icons/fa6";

interface LogoProps {
  size?: string;
}

export function Logo({ size }: LogoProps) {
  return (
    <div className="flex flex-row items-center justify-center">
      <div
        className={`${
          size === "small" ? "p-2 mr-2" : "p-3 mr-4"
        } rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-white`}
      >
        <FaFilm size={size === "small" ? 20 : 32} className="!bg-transparent" />
      </div>
      <h1
        className={`${
          size === "small" ? "text-lg" : "text-2xl"
        } text-white font-sans font-bold`}
      >
        MovieKaos
      </h1>
    </div>
  );
}
export default function MainHeader() {
  return (
    <>
      <Logo />
      <h3 className="text-6xl font-bold text-white leading-tight mb-6">
        Discover Your Next{" "}
        <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Favorite Film
        </span>
      </h3>
      <p className="text-xl text-slate-300 mb-4 leading-relaxed">
        Search through millions of movies and find your perfect watch
      </p>
    </>
  );
}
