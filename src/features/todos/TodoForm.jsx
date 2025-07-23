import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTodos, setLoading } from "./../../slices/todoSlice";
import { addTodoApi, fetchTodosApi } from "./../../api/todoAPi";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true)); 
      await addTodoApi({ title });
      const updatedTodos = await fetchTodosApi();
      dispatch(setTodos(updatedTodos.data));
      setTitle("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
    dispatch(setLoading(false)); 
  };

  return (
    <form onSubmit={submit} className="mb-4">
      <input
        type="text"
        placeholder="New todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Add
      </button>
    </form>
  );
}
