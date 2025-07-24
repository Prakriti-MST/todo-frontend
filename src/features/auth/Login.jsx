import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setError,unsetError,
  
  setLoading,
} from "../../slices/authSlice";
import { loginApi } from "../../api/authApi";
import setAuthToken from "../../utils/setAuthToken";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  

  const submit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const data = await loginApi(form);
      console.log("Login response:", data);
      const { user, token } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser({ user, token }));

      nav("/dashboard");
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Login failed";
      dispatch(setError(message));
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto">
      <h2 className="text-xl mb-2">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="block w-full mb-4 p-2 border"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
