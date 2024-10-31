import { toast } from "react-toastify";
import logo from '../../assets/react.svg';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="navbar flex items-center justify-between bg-gray-800 p-4 shadow-md">
      <div className="logo flex items-center space-x-2">
        <img src={logo} alt="Arisa" className="w-8 h-8" />
        <span className="text-xl text-white font-bold">Arisa</span>
      </div>
      
      <div className="navbar-title text-white text-lg font-semibold">
        Project Information Management
      </div>

      <div className="navbar-actions flex items-center space-x-4">
        <button
          onClick={() => toast("Profile clicked!")}
          className="text-white hover:text-blue-400 transition duration-300"
          title="Profile"
        >
          <FaUserCircle className="h-6 w-6" />
        </button>
        <button
          onClick={() => toast("Settings clicked!")}
          className="text-white hover:text-blue-400 transition duration-300"
          title="Settings"
        >
          <FaCog className="h-6 w-6" />
        </button>
        <button
          onClick={() => {
            toast("Đăng xuất!");
          }}
          className="bg-gray-700 text-white hover:bg-red-600 px-4 py-2 rounded-md transition duration-300 flex items-center"
          title="Log out"
        >
          <FaSignOutAlt className="mr-2" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
