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
import { Tab, TabPanels, TabList, TabPanel, Tabs } from "./common/Tabs";

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
    { id: "tab1", label: "Cast and Crew", panel: "castAndCrew" },
    { id: "tab2", label: "Details", panel: "details" },
    { id: "tab3", label: "Awards", panel: "awards" },
    { id: "tab4", label: "Related", panel: "related" },
  ];

  return (
    <div className="container mx-auto md:py-12">
      <div className="tabs px-4">
        <Tabs>
          <TabList>
            {tabs.map((tab, index) => {
              return (
                <Tab key={tab.id} index={index}>
                  {tab.label}
                </Tab>
              );
            })}
          </TabList>
          <TabPanels>
            <TabPanel index={0} trapFocus>
              <div className="cast mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Cast</h2>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                  {credits?.cast?.slice(0, 9).map((actor: CastMember) => (
                    <div
                      tabIndex={0}
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
                <div className="grid md:grid-cols-2 gap-6">
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
            </TabPanel>
            <TabPanel index={1}>
              <div className="production-details mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Details</h2>
                <div className="grid sm:grid-cols-2 gap-8">
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
            </TabPanel>
            <TabPanel index={2}>
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
            </TabPanel>
            <TabPanel index={3} trapFocus>
              <div className="awards mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Related Movies
                </h2>
                <MoviesList related movies={relatedMovies} />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
