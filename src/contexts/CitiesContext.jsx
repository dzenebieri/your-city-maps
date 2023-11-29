import { createContext, useContext, useReducer, useEffect, useCallback } from "react";

const YourFavoriteCityMapsAPI = "https://dzenebieri-your-favorite-city-maps-api.onrender.com";

const CitiesContext = createContext();

const initialState = {
  isLoading: false,
  cities: [],
  currCity: {},
  error: ""
};

function reducerFN(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currCity: action.payload };

    case "city/added":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currCity: action.payload
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currCity: {}
      };

    case "errorED":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Action ERROR");
  }
}

function CitiesProvider({ children }) {
  const [{ isLoading, cities, currCity, error }, dispatch] = useReducer(reducerFN, initialState);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${YourFavoriteCityMapsAPI}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "errorED", payload: "City Loading ERROR" });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    if (Number(id) === currCity.id) return;

    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${YourFavoriteCityMapsAPI}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "errorED", payload: "City Loading ERROR" });
    }
  },
    [currCity.id]
  );

  async function addCity(currADDedCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${YourFavoriteCityMapsAPI}/cities`, {
        method: "POST",
        body: JSON.stringify(currADDedCity),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();

      dispatch({ type: "city/added", payload: data });
    } catch {
      dispatch({ type: "errorED", payload: "City ADDing ERROR" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${YourFavoriteCityMapsAPI}/cities/${id}`, {
        method: "DELETE"
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "errorED", payload: "City Deleting ERROR" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currCity,
        error,
        getCity,
        addCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context ERROR");
  return context;
}

export { CitiesProvider, useCities };
