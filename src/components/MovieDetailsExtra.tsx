import { useEffect, useState, type ReactNode } from "react";
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
  const [selectedTab, setSelectedTab] = useState<number>(0);

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

  const handleChange = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className="container mx-auto md:py-12">
      <div className="tabs px-4">
        <ul
          role="tablist"
          aria-label="Extra Movie Details"
          className="grid justify-center items-center mb-10 grid-cols-4 rounded-lg h-10 w-full bg-slate-800/30 border border-slate-700/30 text-[#a1a1a1]"
        >
          {tabs.map((tab, index) => {
            return (
              <Tab
                id={tab.id}
                key={tab.id}
                panelId={tab.panel}
                activeTab={activeTab}
                onSelectTab={() => setActiveTab(tab.id)}
                selectedTab={selectedTab}
                onChange={handleChange}
                title={tab.label}
                index={index}
              />
            );
          })}
        </ul>
        <div className="tab-panel">
          <TabPanel
            id="castAndCrewPanel"
            tabId="tab1"
            tabIndex={0}
            index={0}
            selectedTab={selectedTab}
          >
            <div className="cast mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Cast</h2>
              <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
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
          <TabPanel
            id="details"
            tabId="tab2"
            tabIndex={1}
            index={1}
            selectedTab={selectedTab}
          >
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
          <TabPanel
            id="awards"
            tabId="tab3"
            tabIndex={2}
            index={2}
            selectedTab={selectedTab}
          >
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
          <TabPanel
            id="related"
            tabId="tab4"
            tabIndex={3}
            index={3}
            selectedTab={selectedTab}
          >
            <div className="awards mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Related Movies
              </h2>
              <MoviesList related movies={relatedMovies} />
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

interface TabProps {
  id: string;
  activeTab: string;
  selectedTab: number;
  index: number;
  panelId: string;
  title: string;
  onSelectTab: (id: string | number) => void;
  onChange: (index: number) => void;
}

const Tab = ({
  id,
  index,
  activeTab,
  selectedTab,
  panelId,
  onSelectTab,
  title,
  onChange,
}: TabProps) => {
  return (
    <li role="presentation" className="flex justify-center items-center">
      <button
        role="tab"
        id={id}
        aria-selected={selectedTab === index}
        aria-controls={panelId}
        key={id}
        className={`active data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 text-sm lg:text-lg inline-flex flex-1 items-center justify-center gap=1.5 rounded-md border border-transparent px-2 py-1 font-medium`}
        data-tab={id}
        data-state={activeTab === id ? "active" : "inactive"}
        onClick={() => {
          onSelectTab(id);
          onChange(index);
        }}
      >
        {title}
      </button>
    </li>
  );
};

interface TabPanelProps {
  id: string;
  index: number;
  tabId: string;
  selectedTab: number;
  tabIndex: number;
  children: ReactNode;
}

const TabPanel = ({
  id,
  index,
  tabId,
  selectedTab,
  tabIndex,
  children,
}: TabPanelProps) => {
  return (
    <section
      role="tabpanel"
      id={id}
      aria-labelledby={tabId}
      hidden={selectedTab !== tabIndex}
      tabIndex={index}
    >
      {children}
    </section>
  );
};
