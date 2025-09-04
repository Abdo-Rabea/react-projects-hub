import { useState, useEffect } from "react";

const key = "85c62a61";

export function useMovies(query, callback) {
  // now this state will acts as if they were present in the calling component of the custom hook
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();
      const signal = controller.signal;
      async function getMovies() {
        try {
          setIsLoading(true);
          setError(null);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal }
          );

          //! to deal with other kinds of error(ex. 402) other than what fetch throws an error on
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("No movies found");
          }

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length <= 3) {
        setMovies([]);
        setError(null);
        return;
      }

      getMovies();
      return () => {
        setError(null);
        controller.abort();
      };
    },
    [callback, query]
  );
  return { movies, error, isLoading };
}
