import { createContext, useContext, useReducer } from "react";
import dze from "../imgs/dze.png";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const fakeUser = {
  name: "You",
  email: "auto-login@mail.com",
  password: "password",
  img: dze,
};

function reducerFN(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Action ERROR");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducerFN, initialState);

  function login(email, password) {
    if (email === fakeUser.email && password === fakeUser.password)
      dispatch({ type: "login", payload: fakeUser });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext ERROR");
  return context;
}

export { AuthProvider, useAuth };
