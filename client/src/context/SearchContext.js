import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adults: undefined,
    room: undefined,
    children: undefined,
  },
};
export const searchContext = createContext(INITIAL_STATE);

// niw reducer
const SearchReducer = (state, action) => {
  switch (action.type) {
    case "newSearch":
      return action.payload;
    case "resetSearch":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <searchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};
