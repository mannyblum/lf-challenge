import { FaFilm } from "react-icons/fa6";
import { Link } from "wouter";

interface LogoProps {
  size?: string;
}

export default function Logo({ size }: LogoProps) {
  return (
    <Link to="/" className="flex flex-row items-center justify-center">
      <div
        className={`${
          size === "small" ? "p-2 mr-2" : "p-3 mr-4"
        } rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-white`}
      >
        <FaFilm
          data-testid="FaFilm"
          size={size === "small" ? 20 : 32}
          className="!bg-transparent"
        />
      </div>
      <h1
        role="heading"
        aria-level={1}
        className={`${
          size === "small" ? "text-lg" : "text-2xl"
        } text-white font-sans font-bold`}
      >
        MovieKaos
      </h1>
    </Link>
  );
}
