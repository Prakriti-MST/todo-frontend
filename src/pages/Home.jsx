import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {
  const { token, user } = useSelector((state) => state.auth); 
  console.log("Home user:", user);

  return (
    <div className="text-center">
      <h1 className="text-4xl mb-4">Welcome to My Todo App</h1>

      {!token ? (
        <>
          <Link to="/login" className="text-blue-600">Login</Link> or{' '}
          <Link to="/signup" className="text-blue-600">Signup</Link>
        </>
      ) : (
        <p className="text-green-600">Welcome back, {user?.name || "User"}!</p>
      )}
    </div>
  );
}
