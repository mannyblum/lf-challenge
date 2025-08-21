import { useEffect, useState } from "react";
import { FaRegThumbsDown } from "react-icons/fa6";

import MoviesList from "@/components/MoviesList";

import type {
  Movie,
  SpokenLanguage,
  CrewMember,
  Credits,
  CastMember,
} from "@/types/movies";

interface MovieDetailsExtraProps {
  movieDetails: Movie;
  credits: Credits;
  relatedMovies: Movie[];
}

export default function MovieDetailsExtra({
  movieDetails,
  credits,
  relatedMovies,
}: MovieDetailsExtraProps) {
  const [director, setDirector] = useState<string | null>(null);
  const [writers, setWriters] = useState<string[] | null>(null);
  const [languages, setLanguages] = useState<string[] | null>(null);
  const [activeTab, setActiveTab] = useState<string>("tab1");

  useEffect(() => {
    if (credits) {
      const director = credits.crew.find(
        (member: CrewMember) => member.job === "Director"
      );

      const writers = credits.crew
        .filter((member: CrewMember) => member.job === "Screenplay")
        .map((writer: CrewMember) => writer.name);

      const languages = movieDetails?.spoken_languages.map(
        (lang: SpokenLanguage) => lang.english_name
      );

      setDirector(director?.name || "");
      setWriters(writers);
      setLanguages(languages);
    }
  }, [credits, movieDetails]);

  const tabs = [
    { id: "tab1", label: "Cast & Crew" },
    { id: "tab2", label: "Details" },
    { id: "tab3", label: "Awards" },
    { id: "tab4", label: "Related" },
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="tabs">
        <div className="tab-buttons mb-10">
          <div className="grid justify-center items-center grid-cols-4 rounded-lg h-10 w-full bg-slate-800/30 border border-slate-700/30 text-[#a1a1a1]">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab.id}
                  className={`active data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 inline-flex flex-1 items-center justify-center gap=1.5 rounded-md border border-transparent px-2 py-1 font-medium`}
                  data-tab={tab.id}
                  data-state={activeTab === tab.id ? "active" : "inactive"}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="tab-content">
          {activeTab === "tab4" && (
            <div className={`tab`}>
              <div className="awards mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Related Movies
                </h2>
                <MoviesList related movies={relatedMovies} />
              </div>
            </div>
          )}
          {activeTab === "tab3" && (
            <div className={`tab`}>
              <div className="awards mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Awards & Recognition
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-6 text-center">
                    <FaRegThumbsDown className="w-8 h-8 text-yellow-400 mx-auto mb-3" />

                    <h4 className="font-semibold text-white">
                      No Awards to be found for this movie.
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "tab2" && (
            <div className={`tab`}>
              <div className="production-details mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Details</h2>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-xl space-y-3">
                    <div
                      data-testid="director"
                      className="flex justify-between gap-6 border-b border-slate-700/30 py-2"
                    >
                      <span className="text-slate-400">Director</span>
                      <span className="text-white text-right">{director}</span>
                    </div>
                    <div
                      data-testid="writers"
                      className="flex justify-between gap-6 border-b border-slate-700/30 py-2"
                    >
                      <span className="text-slate-400">Writers</span>
                      <span className="text-white text-right">
                        {writers?.join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between gap-6 border-b border-slate-700/30 py-2">
                      <span className="text-slate-400">Budget</span>
                      <span className="text-white text-right">
                        ${movieDetails.budget.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="flex justify-between gap-6 border-b border-slate-700/30 py-2">
                      <span className="text-slate-400">Revenue</span>
                      <span className="text-white text-right">
                        ${movieDetails.revenue.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="flex justify-between gap-6 border-b border-slate-700/30 py-2">
                      <span className="text-slate-400">Languages</span>
                      <span className="text-white text-right">
                        {languages?.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "tab1" && (
            <div className={`tab`}>
              <div className="cast mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Cast</h2>
                <div className="grid grid-cols-3 gap-6">
                  {credits?.cast?.slice(0, 9).map((actor: CastMember) => (
                    <div
                      key={actor.id + "-" + actor.character}
                      className="flex flex-col shadow-sm rounded-xl bg-slate-800/30 border-slate-700/30"
                    >
                      <div className="p-4 text-center basis-full w-full">
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          className="rounded-lg w-full h-32 object-cover mb-3"
                        />
                        <h3 className="text-lg font-semibold text-white">
                          {actor.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {actor.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="crew">
                <h2 className="text-3xl font-bold text-white mb-6">Crew</h2>
                <div className="grid grid-cols-2 gap-6">
                  {credits.crew.slice(0, 10).map((crew: CrewMember) => {
                    return (
                      <div
                        key={crew.id + "-" + crew.job}
                        className="flex flex-col shadow-sm rounded-xl bg-slate-800/30 border-slate-700/30"
                      >
                        <div className="p-4 text-left basis-full w-full">
                          <h3 className="text-lg font-semibold text-white">
                            {crew.name}
                          </h3>
                          <p className="text-sm text-slate-400">{crew.job}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
