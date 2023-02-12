import React, { useState } from "react";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const { login, error, isLoading } = useLogin();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
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
      await login(form.email, form.password);
      setForm({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="login">
      <h3>Login</h3>
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
        <button type="submit" disabled={isLoading}>
          Login
        </button>
        {error && <div className="error">{error}</div>}
        {loading && <div className="spinner"></div>}
      </div>
    </form>
  );
}
