// src/pages/Dashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setTodos } from "../slices/todoSlice"; // <-- no fetchTodos here
import { fetchTodosApi } from "../api/todoAPi";
import TodoList from "../features/todos/TodoList";
import TodoForm from "../features/todos/TodoForm";


export default function Dashboard() {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    const load = async () => {
      dispatch(setLoading(true));
      try {
        const todos = await fetchTodosApi();

        dispatch(setTodos(todos.data));
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
      dispatch(setLoading(false));
      
    };
    load();
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Your Todos</h2>
      <TodoForm />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {todos && <TodoList todos={todos} />}
    </div>
  );
}
