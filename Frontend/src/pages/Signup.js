import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useSignUp from "../hooks/useSignUp";

export default function Signup() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const { signup, isLoading, error } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await signup(form.name, form.email, form.password);
      if (user) {
        setForm({ name: "", email: "", password: "" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="signup">
      <h3>Sign Up</h3>
      <label htmlFor="name">Name:</label>
      <input
        required
        type="text"
        placeholder="Name"
        onChange={handleChange}
        value={form.name}
        name="name"
        id="name"
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        required
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
        name="email"
        id="email"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        placeholder="Password"
        required
        onChange={handleChange}
        value={form.password}
        name="password"
        id="password"
      />
      <div className="button-loader">
        <button disabled={isLoading} type="submit">
          Sign Up
        </button>
        {error && <div className="error">{error}</div>}
        {loading && <div className="spinner"></div>}
      </div>
    </form>
  );
}
