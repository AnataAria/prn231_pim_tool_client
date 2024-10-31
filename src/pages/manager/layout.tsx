import Navbar from "../../components/common/NavBar";
import LeftBar from "../../components/common/LeftBar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
const ManagerLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <div className="w-64 bg-gray-900 text-white">
                    <LeftBar />
                </div>
                <div className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default ManagerLayout;