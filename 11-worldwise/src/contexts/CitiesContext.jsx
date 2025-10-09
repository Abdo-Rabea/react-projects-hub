import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  // * all of the logic here need to be pure so no asycn. code here

  switch (action.type) {
    case "loading/start":
      return { ...state, error: null, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
        error: null,
      };
    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
        error: null,
      };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
        error: null,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        isLoading: false,
        error: null,
      };
    case "error": //* better name will be rejected ( to say on Rejected)
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error("Unkown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function getCities() {
      try {
        dispatch({ type: "loading/start" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: "can't get visited cities" });
      }
    }
    getCities();
  }, []);

  // it is better to put it here even though the city component is the only one that needs it
  //  1. for grouping all city & cities functionalities here
  //  2. for future puprose
  const getCity = useCallback(
    async function getCity(id) {
      if (id == currentCity.id) return;
      try {
        dispatch({ type: "loading/start" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: "can't get city data" });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading/start" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      //  update the cities state to sync. it with the api data
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({ type: "error", payload: "can't create city" });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading/start" });
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
      //  update the cities state to sync. it with the api data
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "error", payload: "can't delete city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside CitiesProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
