import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { ACTIONS } from "../context/WorkoutContext";

export default function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    //making sure everything is going right
    setError(null);
    setIsLoading(true);

    const response = await fetch(
      "https://workout-manager-jacer.onrender.com/api/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: ACTIONS.LOGIN, payload: json });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
