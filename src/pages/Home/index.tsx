import Trending from "../../components/Trending";
import MainHeader from "../../components/common/MainHeader";
import SearchBar from "../../components/common/SearchBar";

export default function Home() {
  return (
    <div role="main" className="container h-full w-full mx-auto text-center">
      <div className="flex justify-center  py-20 px-4 items-center flex-col mx-auto bg-[#050a1b]">
        <MainHeader />
        <SearchBar />
        <Trending />
      </div>
    </div>
  );
}
