import Logo from "./Logo";

export default function MainHeader() {
  return (
    <>
      <Logo />
      <h3 className="text-4xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
        Discover Your Next
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
