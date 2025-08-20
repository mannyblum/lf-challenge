// test/server.ts
import { setupServer } from "msw/node";
import { delay, http, HttpResponse } from "msw";

const movies = [
  {
    id: 1,
    original_title: "Robin Hood: Men in Tights",
    title: "Robin Hood",
    budget: 1000000,
  },
  {
    id: 2,
    original_title: "Spaceballs",
    title: "Spaceballs",
    budget: 2000000,
  },
  {
    id: 3,
    original_title: "Blazing Saddles",
    title: "Blazing Saddles",
    budget: 11000000,
  },
  {
    id: 4,
    title: "Life of Brian",
    budget: 11000000,
  },
];
const genres = [];

export const handlers = [
  http.get(`https://api.themoviedb.org/3/trending/movie/day`, async () => {
    await delay(150);
    return HttpResponse.json({ results: movies });
  }),

  http.get(`https://api.themoviedb.org/3/genre/movie/list`, () => {
    return HttpResponse.json(genres);
  }),
];

export const server = setupServer(...handlers);
