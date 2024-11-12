import React, { useState } from "react";
import Footer from "../../components/common/Footer";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        console.log("Logging in with:", { email, password });

        // Reset error on successful login
        setError("");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex items-center justify-center flex-1">
                <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center mb-6">Welcome Back!</h2>
                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center mt-4 text-sm">
                        Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
