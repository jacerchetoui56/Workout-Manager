import React from "react";
import { ACTIONS } from "../context/WorkoutContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function WorkoutDetails({ workout }) {
  const { user } = useAuthContext();
  const { title, load, reps, createdAt } = workout;
  const { dispatch } = useWorkoutsContext();
  const handleClick = async () => {
    if (!user) return;

    const response = await fetch(
      "https://workoutsmanager.onrender.com/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: ACTIONS.DELETE_WORKOUT, payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>Load : {load} Kg</strong>
      </p>
      <p>
        <strong>Reps : {reps}</strong>
      </p>
      <p>{createdAt}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
}
