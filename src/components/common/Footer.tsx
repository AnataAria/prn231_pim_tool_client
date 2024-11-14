import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-6">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm mb-2">&copy; {new Date().getFullYear()} Your Arisa Company. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">About</a>
                        <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                        <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">
                        <FaTwitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <FaFacebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <FaLinkedin className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;