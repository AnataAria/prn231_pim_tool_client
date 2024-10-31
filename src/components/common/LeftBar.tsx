import { Link } from "react-router-dom";
import { FaPlusCircle, FaFolder, FaUser, FaTruck } from "react-icons/fa";

const LeftBar: React.FC = () => {
    return (
        <div className="bg-gray-900 text-white w-64 max-h-screen p-6 space-y-6">
          <Link to="/admin" className="block text-2xl font-bold text-blue-400 mb-8">
            ProjectList
          </Link>
          
          <ul className="space-y-4">
            <li>
              <Link
                to="/projects/new"
                className="flex items-center space-x-3 text-lg font-medium hover:bg-blue-700 hover:text-white rounded-md px-4 py-2 transition duration-300"
              >
                <FaPlusCircle className="h-6 w-6 text-blue-400" />
                <span>New</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/projects"
                className="flex items-center space-x-3 text-lg font-medium hover:bg-blue-700 hover:text-white rounded-md px-4 py-2 transition duration-300"
              >
                <FaFolder className="h-6 w-6 text-blue-400" />
                <span>Project</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-lg font-medium text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 transition duration-300"
              >
                <FaUser className="h-6 w-6 text-gray-400" />
                <span>Customer</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-lg font-medium text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 transition duration-300"
              >
                <FaTruck className="h-6 w-6 text-gray-400" />
                <span>Supplier</span>
              </a>
            </li>
          </ul>
        </div>
      );
}

export default LeftBar;
