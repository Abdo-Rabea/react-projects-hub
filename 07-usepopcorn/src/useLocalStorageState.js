import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const items = JSON.parse(localStorage.getItem(key));
    return items ? items : initialState;
  });

  // use effect to sync. localStorage with watchedMovies
  // * can be done in events handlers but prefer to do this in useEffect to be done in one central place
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value]
  );

  return [value, setValue];
}
