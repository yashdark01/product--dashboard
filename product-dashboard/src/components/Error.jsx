import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 ">
      <h1 className="text-9xl font-extrabold text-gray-800  animate-bounce">404</h1>
      <p className="text-2xl font-semibold text-gray-600  mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="text-lg text-gray-500  mt-2">
        It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;