import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">404</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h3>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist. It might have been removed or
          temporarily unavailable.
        </p>
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
        >
          Go Back to Home
        </Link>
        <div className="mt-6">
          <img 
            src="https://img.icons8.com/ios-filled/100/000000/404.png" 
            alt="Not Found" 
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
