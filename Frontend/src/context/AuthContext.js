import { useReducer, createContext } from "react";
import { ACTIONS } from "./WorkoutContext";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        user: action.payload
      }
    case ACTIONS.LOGOUT:
      return {
        user: null
      }
    default:
      return state
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem('user')) || null,
  });

  console.log(state)
  return <AuthContext.Provider value={{
    ...state, dispatch
  }} >
    {children}
  </AuthContext.Provider>;
};
