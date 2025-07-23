import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

export default function TodoList({ todos }) {
  const loading = useSelector((state) => state.todos.loading);

  if (loading) return <p>Loading...</p>;
  if (!todos.length) return <p>No todos yet.</p>;

  return (
    <ul>
      {!loading && todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </ul>
  );
}
