import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  unsetUser,
  setError,
  unsetError,
  setLoading,
} from "../../slices/authSlice";
import { signupApi } from "../../api/authApi";
import setAuthToken from "../../utils/setAuthToken";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { loading, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(unsetError());
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    // console.log("Signup form data:", form);
    dispatch(setLoading(true));

    try {
      const data = await signupApi(form);
      const { user, token } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser({ user, token }));
      nav("/dashboard");
    } catch (err) {
      dispatch(setError(err));
    } finally {
      dispatch(setLoading(false)); 
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto">
      <h2 className="text-xl mb-2">Signup</h2>
      {typeof error === "string" && (
        <p className="text-red-600 mb-2">{error}</p>
      )}

      <input
        type="name"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="block w-full mb-1 p-2 border"
      />
      {typeof error === "object" && error?.name && (
        <p className="text-red-600 text-sm mb-2">{error.name[0]}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="block w-full mb-1 p-2 border"
      />

      {typeof error === "object" && error?.email && (
        <p className="text-red-600 text-sm mb-2">{error.email[0]}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="block w-full mb-1 p-2 border"
      />
      {typeof error === "object" && error?.password && (
        <p className="text-red-600 text-sm mb-2">{error.password[0]}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
