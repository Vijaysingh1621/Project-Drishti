import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="text-center p-8 rounded-xl shadow-lg bg-white border max-w-md w-full">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">404</h1>
        <p className="text-lg text-gray-500 mb-6">The page you are looking for does not exist.</p>
        <a href="/" className="inline-block px-6 py-2 rounded-md bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition">Return to Dashboard</a>
      </div>
    </div>
  );
};

export default NotFound;
