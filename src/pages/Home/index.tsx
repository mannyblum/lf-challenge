import MainHeader from "@components/MainHeader";
import SearchBar from "@components/SearchBar";

export default function Home() {
  return (
    <div className="container py-20 px-4 max-w-4xl mx-auto text-center">
      <div className="flex justify-center items-center flex-col mx-auto">
        <MainHeader />
        <SearchBar />
      </div>
    </div>
  );
}
