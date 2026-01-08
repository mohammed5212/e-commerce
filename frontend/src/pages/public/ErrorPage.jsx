import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-2">
        Oops! Something went wrong
      </h1>

      <p className="text-gray-700 mb-6">
        {error?.status === 404
          ? "Page not found"
          : "An unexpected error occurred"}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
