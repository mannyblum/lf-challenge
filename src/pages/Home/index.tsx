import Trending from "../../components/Trending";
import MainHeader from "../../components/common/MainHeader";
import SearchBar from "../../components/common/SearchBar";

export default function Home() {
  return (
    <div
      role="main"
      className="container h-screen py-20 px-4 max-w-4xl mx-auto text-center"
    >
      <div className="flex justify-center items-center flex-col mx-auto">
        <MainHeader />
        <SearchBar />
        <Trending />
      </div>
    </div>
  );
}
