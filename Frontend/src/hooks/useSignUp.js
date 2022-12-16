import { useState } from "react";
import { ACTIONS } from "../context/WorkoutContext";
import { useAuthContext } from "./useAuthContext";

export default function useSignUp() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();
  const signup = async (name, email, password) => {
    //making sure everything is going right
    setError(null);
    setIsLoading(true);

    const response = await fetch(
      "https://workoutsmanager.onrender.com/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
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

  return { signup, isLoading, error };
}
