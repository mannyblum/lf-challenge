import { FaFilm } from "react-icons/fa6";

interface LogoProps {
  size?: string;
  onClick: () => void;
}

export default function Logo({ size, onClick }: LogoProps) {
  return (
    <div
      className="flex flex-row items-center justify-center"
      onClick={onClick}
    >
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
        className={`${
          size === "small" ? "text-lg" : "text-2xl"
        } text-white font-sans font-bold`}
      >
        MovieKaos
      </h1>
    </div>
  );
}
