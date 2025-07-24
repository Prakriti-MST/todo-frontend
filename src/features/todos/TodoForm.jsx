import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodos, setLoading, setError } from "./../../slices/todoSlice";
import { addTodoApi, fetchTodosApi } from "./../../api/todoAPi";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.todos);

  const submit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      await addTodoApi({ title, description });
      const updatedTodos = await fetchTodosApi();
      dispatch(setTodos(updatedTodos.data));
      setTitle("");
      setDescription("");
    } catch (err) {
      let msg = "Failed to add todo";

      const resp = err.response?.data;

      if (err.response?.status === 400 && resp?.data?.fieldErrors) {
        msg = resp.data.fieldErrors.title?.[0] ?? resp.message ?? msg;
      } else {
        msg = err.message || msg;
      }

      dispatch(setError(msg));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={submit} className="mb-4 max-w-md">
      <input
        type="text"
        placeholder="New todo"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) dispatch(setError(null)); // clear the error as user types
        }}
        className="border p-2 mr-2 w-full"
        disabled={loading}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (error) dispatch(setError(null));
        }}
        className="border p-2 mr-2 w-full mb-2"
        disabled={loading}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
        disabled={loading || !title.trim()}
      >
        {loading ? "Adding…" : "Add"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}
