import { useState } from "react";
import { loginUser } from "../utils/api";

const Login = ({ onLogin, switchToSignup }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await loginUser(form);
            localStorage.setItem("token", res.token);
            onLogin();
        } catch (err) {
            alert("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-16">
            <div className="w-full max-w-sm bg-white dark:bg-[#131313] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">

                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg text-sm outline-none"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg text-sm outline-none"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg text-sm font-medium bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>

                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    Don’t have an account?{" "}
                    <span
                        className="cursor-pointer underline"
                        onClick={switchToSignup}
                    >
                        Sign up
                    </span>
                </p>

            </div>
        </div>
    );
};

export default Login;