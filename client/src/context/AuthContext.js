import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user") || null),
  Loading: null,
  error: null,
};

export const authContext = createContext(INITIAL_STATE);

const authReducer = (state, action) => {
  switch (action.type) {
    case "loginStart":
      return {
        user: null,
        Loading: true,
        error: null,
      };
    case "loginSuccess":
      return {
        user: action.payload,
        Loading: false,
        error: null,
      };
    case "loginFail":
      return {
        user: null,
        Loading: true,
        error: action.payload,
      };
    case "Logout":
      return {
        user: null,
        Loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  // json.stringify beacuse we are sending object at initial state datsy
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        error: state.error,
        Loading: state.Loading,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
