import { toast } from "react-toastify";
import logo from '../assets/react.svg';

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

      <div className="navbar-options">
        <button
          onClick={() => {
            toast("Đăng xuất!");
          }}
          className="bg-gray-700 text-white hover:bg-red-600 px-4 py-2 rounded-md transition duration-300"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
