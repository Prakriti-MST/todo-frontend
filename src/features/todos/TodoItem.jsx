import { useDispatch } from "react-redux";
import { setTodos, setLoading } from "./../../slices/todoSlice";
import { updateTodoApi, deleteTodoApi, fetchTodosApi } from "../../api/todoAPi";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const toggle = async () => {
    try {
      dispatch(setLoading(true));
      await updateTodoApi(todo._id, {
        status: todo.status === "pending" ? "completed" : "pending",
      });
      const updatedTodos = await fetchTodosApi();
      // console.log("Updated todos:", updatedTodos);
      dispatch(setTodos(updatedTodos.data));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(false));
  };

  const remove = async () => {
    try {
      dispatch(setLoading(true));
      await deleteTodoApi(todo._id);
      const updatedTodos = await fetchTodosApi();
      dispatch(setTodos(updatedTodos.data));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(false));
  };

  return (
    <li className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={todo.status === "completed"}
        onChange={toggle}
        className="mr-2"
      />
      <span
        className={`flex-grow ${
          todo.status === "completed" ? "line-through" : ""
        }`}
      >
        {todo.title}
      </span>
      <button onClick={remove} className="ml-4 text-red-600">
        ×
      </button>
    </li>
  );
}
