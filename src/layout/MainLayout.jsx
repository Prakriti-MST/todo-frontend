import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unsetUser } from "../slices/authSlice";

export default function MainLayout({ children }) {
  const dispatch = useDispatch(); // ✅ move here
  const nav = useNavigate();      // ✅ move here

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(unsetUser());
    nav("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4">
        <Link className="mr-4" to="/">Home</Link>
        <Link className="mr-4" to="/dashboard">Dashboard</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
