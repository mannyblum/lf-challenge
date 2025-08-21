// test/server.ts
import { setupServer } from "msw/node";
import { delay, http, HttpResponse } from "msw";

export const movies = [
  {
    id: 1,
    original_title: "Robin Hood: Men in Tights",
    title: "Robin Hood",
    budget: 1000000,
    runtime: 90,
    genre_ids: [1, 2, 3],
    genres: [
      {
        id: 1,
        name: "Action",
      },
      {
        id: 2,
        name: "Adventure",
      },
      {
        id: 3,
        name: "Comedy",
      },
    ],
    spoken_languages: [
      { iso_639_1: 123, name: "English", english_name: "English" },
      { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
    ],
    release_date: "2025-05-17",
  },
  {
    id: 2,
    original_title: "Spaceballs",
    title: "Spaceballs",
    budget: 2000000,
    runtime: 90,
    genre_ids: [1, 4, 3],
    genres: [
      {
        id: 1,
        name: "Action",
      },
      {
        id: 4,
        name: "Drama",
      },
      {
        id: 3,
        name: "Comedy",
      },
    ],
    spoken_languages: [
      { iso_639_1: 123, name: "English", english_name: "English" },
      { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
    ],
    release_date: "2025-05-17",
  },
  {
    id: 3,
    original_title: "Blazing Saddles",
    title: "Blazing Saddles",
    budget: 11000000,
    runtime: 90,
    genre_ids: [1, 5, 4],
    genres: [
      {
        id: 1,
        name: "Action",
      },
      {
        id: 4,
        name: "Drama",
      },
      {
        id: 5,
        name: "Romance",
      },
    ],
    spoken_languages: [
      { iso_639_1: 123, name: "English", english_name: "English" },
      { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
    ],
    release_date: "2025-05-17",
  },
  {
    id: 4,
    title: "Life of Brian",
    budget: 11000000,
    runtime: 90,
    genre_ids: [1],
    genres: [
      {
        id: 1,
        name: "Action",
      },
    ],
    spoken_languages: [
      { iso_639_1: 123, name: "English", english_name: "English" },
      { iso_639_1: 456, name: "Spanish", english_name: "Spanish" },
    ],
    release_date: "2025-05-17",
  },
];

export const genres = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Adventure",
  },
  {
    id: 3,
    name: "Comedy",
  },
  {
    id: 4,
    name: "Drama",
  },
  {
    id: 5,
    name: "Romance",
  },
];

export const credits = {
  id: 1,
  cast: [
    {
      id: 1,
      name: "Rick Moranis",
      original_name: "Rick Moranis",
      profile_path: "urlToPhoto.jpg",
      character: "Lord Helmet",
    },
  ],
  crew: [
    {
      id: 1,
      name: "Ezra Swerdlow",
      job: "Producer",
    },
    {
      id: 2,
      name: "Thomas Meehan",
      job: "Screenplay",
    },
    {
      id: 3,
      name: "Ronny Graham",
      job: "Screenplay",
    },
    {
      id: 4,
      name: "Mel Brooks",
      job: "Director",
    },
  ],
};

export const handlers = [
  // Movie Details
  http.get(`https://api.themoviedb.org/3/search/movie`, async () => {
    await delay(150);
    return HttpResponse.json({ results: movies[0] });
  }),

  // Trending Movies Mock
  http.get(`https://api.themoviedb.org/3/trending/movie/day`, async () => {
    await delay(150);
    return HttpResponse.json({ results: movies });
  }),

  // Genres Mock
  http.get(`https://api.themoviedb.org/3/genre/movie/list`, async () => {
    await delay(150);
    return HttpResponse.json({ genres: genres });
  }),

  // Popular Mock
  http.get(`https://api.themoviedb.org/3/movie/popular`, async () => {
    await delay(150);
    return HttpResponse.json({ results: movies });
  }),

  // Movie Details Mock
  http.get(`https://api.themoviedb.org/3/movie/:movieId`, async () => {
    await delay(150);
    return HttpResponse.json(movies[0]);
  }),

  // Related Movies Mock
  http.get(
    `https://api.themoviedb.org/3/movie/:movieId/similar`,
    async ({ params }) => {
      await delay(150);
      const { movieId } = params;

      return HttpResponse.json({
        movieId,
        results: movies,
      });
    }
  ),

  // Credits Mock
  http.get(
    `https://api.themoviedb.org/3/movie/:movieId/credits`,
    async ({ params }) => {
      await delay(150);
      const { movieId } = params;

      return HttpResponse.json({
        movieId,
        results: credits,
      });
    }
  ),
];

export const server = setupServer(...handlers);
