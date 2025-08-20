// test/server.ts
import { setupServer } from "msw/node";
import { delay, http, HttpResponse } from "msw";

const API_KEY = process.env.VITE_TMDB_KEY;

const movies = [
  {
    id: 1,
    original_title: "Robin Hood: Men in Tights",
    budget: 1000000,
  },
  {
    id: 2,
    original_title: "Spaceballs",
    budget: 2000000,
  },
  {
    id: 3,
    original_title: "Blazing Saddles",
    budget: 11000000,
  },
];
const genres = [];

export const handlers = [
  http.get(`https://api.themoviedb.org/3/trending/movie/day`, async () => {
    await delay(150);
    return HttpResponse.json(movies);
  }),

  http.get(`https://api.themoviedb.org/3/genre/movie/list`, () => {
    return HttpResponse.json(genres);
  }),
];

export const server = setupServer(...handlers);
