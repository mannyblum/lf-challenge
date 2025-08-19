export interface Movie {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Genre[];
  genre_ids: number[];
  homepage: string;
  id: number;
  imdb_id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name?: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: number;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: number;
  name: string;
  english_name: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface CastMember {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  character: string;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}
