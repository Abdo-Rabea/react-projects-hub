import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const FAKE_USER = {
  name: "Abdo",
  email: "abdo@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unkown action type");
  }
}
//* why i am using context here
//      because user is really a global state
function AuthProvider({ children }) {
  // even if they are just 2 states but johnas prefer to use  reducer because the 2 states are updated together
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    // should be async. but it is ok (we have only one fake user)
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      // i should get all of his data from the server but it is ok now
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    // should also be async. otherwise it should be encapsulated in the reducer and only pass the dispatch function
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
    throw new Error("AuthContext was used outside auth provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
