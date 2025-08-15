import { FaFilm } from "react-icons/fa6";

function Logo() {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="p-3 mr-4 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-white">
        <FaFilm size={32} className="!bg-transparent" />
      </div>
      <h1 className="text-white font-sans text-3xl font-bold">CineHavok</h1>
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
