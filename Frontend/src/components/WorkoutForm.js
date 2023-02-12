import React, { useState } from "react";
import { ACTIONS } from "../context/WorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export default function WorkoutForm() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    load: "",
    reps: "",
  });

  const { dispatch } = useWorkoutsContext();

  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...form,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!user) {
      setError("You Must Be Logged In");
      return;
    }
    try {
      const response = await fetch(
        "https://workout-manager-jacer.onrender.com/api/workouts",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        console.log(error);
      } else {
        dispatch({ type: ACTIONS.ADD_WORKOUT, payload: json });
        setForm({ title: "", load: "", reps: "" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          required
          id="title"
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          value={form.title}
        />
        <label htmlFor="reps">Reps</label>
        <input
          required
          id="reps"
          type="number"
          name="reps"
          onChange={handleChange}
          placeholder="Reps"
          value={form.reps}
        />
        <label htmlFor="load">Load (kg)</label>
        <input
          required
          id="load"
          type="number"
          name="load"
          onChange={handleChange}
          placeholder="Load"
          value={form.load}
        />
        <div className="button-loader">
          <button type="submit">Add Workout</button>
          {loading && <div className="spinner"></div>}
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
