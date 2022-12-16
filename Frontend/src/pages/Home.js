import React, { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { ACTIONS } from "../context/WorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  const { dispatch, workouts } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const token = user?.token;
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://workout-manager-jacer.onrender.com/api/workouts",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: ACTIONS.SET_WORKOUTS, payload: json });
        navigate("/");
      }
    };
    try {
      if (user) {
        fetchWorkouts();
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, user, navigate]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
}
