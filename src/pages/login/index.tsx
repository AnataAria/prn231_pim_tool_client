import React, { useState } from "react";
import Footer from "../../components/common/Footer";
import { toast, ToastContainer } from "react-toastify";
import { unAuthenticationAxios } from "../../services/baseService";
import { useNavigate } from "react-router-dom";

// Show toast notification
const showToast = (toastId: string, message: string, type: 'default' | 'warning' | 'success' | 'error' | 'info', isLoading: boolean = false) => {
    toast.update(toastId, {
        render: message,
        type,
        isLoading,
        autoClose: 2500,
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
    });
};

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            showToast("loginToast", "Please fill in all fields.", "error");
            return;
        }

        const loginToast = toast.loading("Logging in...", {
            toastId: "loginToast",
            position: "bottom-right",
            theme: "light",
            autoClose: false,
            closeOnClick: false,
            hideProgressBar: true,
            draggable: false,
        });

        try {
            const result = await unAuthenticationAxios.post("/auth/authentication", {
                username: email,
                password: password,
            });

            if (result.status === 200) {
                localStorage.setItem("accessToken", result.data.data.token);
                console.log(result.data.data.token);
                showToast("loginToast", "Login Success", "success");
                setTimeout(() => {
                    navigate('/admin');
                },1000);
            }
        } catch (error) {
            showToast("loginToast", "Login Failed", "error");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="flex items-center justify-center flex-1">
                <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center mb-6">Welcome Back!</h2>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            required
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
                    >
                        Login
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
