# Livefront Challenge

## About

This is a simple application to search for movies using the TMDB API. You'll need to provide your own TMDB API Key, unless you got one from me, and put it at the root in an `.env` file

```
VITE_TMDB_API_KEY=xxxxxx
```

### Features

- Homepage
  - Search for movie by name
- Search Results page
  - list of 20 results
- Movie Details Page
  - Movie Info
  - Cast
  - Crew
  - Awards
  - Related Movies
- Browse Page (Popular Movies)

  - list of 20 results

- Responsive

---

## Stack and 3rd Party Libraries

- Vite
- React
- Typescript
- TailwindCSS
- TMDB API
- Vitest/React Testing Library/[msw](https://mswjs.io/) (for data mocking)

- React Icons
- Redux/Redux Toolkit
- React Router

## TMDB Endpoints

- Movie Search - [https://developer.themoviedb.org/reference/search-movie](https://developer.themoviedb.org/reference/search-movie)
- Movie Details - [https://developer.themoviedb.org/reference/movie-details](https://developer.themoviedb.org/reference/movie-details)
- Movie Credits - [https://developer.themoviedb.org/reference/movie-credits](https://developer.themoviedb.org/reference/movie-credits)
- Movie Related - [https://developer.themoviedb.org/reference/movie-similar](https://developer.themoviedb.org/reference/movie-similar)
- Genres - [https://developer.themoviedb.org/reference/genre-movie-list](https://developer.themoviedb.org/reference/genre-movie-list)
- Trending Movies - [https://developer.themoviedb.org/reference/trending-movies](https://developer.themoviedb.org/reference/trending-movies)
- Popular Movies - [https://developer.themoviedb.org/reference/movie-popular-list](https://developer.themoviedb.org/reference/movie-popular-list)

## What would I have done with more time

- Would have added some animations using motion (framer motion)
- Would have implemented skeleton style loading screen
- Spent a little more time on tests
- Smaller components
