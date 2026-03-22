import { useState } from "react";
import { registerUser } from "../utils/api";

const Signup = ({ switchToLogin }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await registerUser(form);
            alert("Account created! Please login.");
            switchToLogin();
        } catch (err) {
            alert("Signup failed",err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(#0f0f0f_1px,transparent_1px),linear-gradient(90deg,#0f0f0f_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

            {/* Glow */}
            <div className="absolute w-[500px] h-[500px] bg-green-500/10 blur-3xl rounded-full"></div>

            <div className="relative w-full max-w-md bg-[#0d0d0d] border border-green-500/20 p-8">

                <h2 className="text-4xl font-bold text-white mb-2">
                    INITIATE
                    <span className="text-green-400 block">SEQUENCING</span>
                </h2>

                <p className="text-xs text-gray-400 mb-6 tracking-widest">
                    ESTABLISH CONNECTION TO EXECUTION LAYER
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="text-xs text-green-400 tracking-widest">
                            COMMUNICATION / EMAIL
                        </label>
                        <input
                            type="email"
                            placeholder="operator@kinetic.io"
                            className="w-full mt-1 px-3 py-2 bg-transparent border border-gray-700 focus:border-green-400 outline-none text-sm text-white"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-xs text-green-400 tracking-widest">
                            SECURITY KEY / PASSWORD
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full mt-1 px-3 py-2 bg-transparent border border-gray-700 focus:border-green-400 outline-none text-sm text-white"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold tracking-widest hover:opacity-90 transition"
                    >
                        {loading ? "CREATING..." : "CREATE ACCOUNT →"}
                    </button>
                </form>

                <p className="text-xs text-gray-500 mt-6 text-center tracking-widest">
                    ALREADY ESTABLISHED?{" "}
                    <span
                        className="text-green-400 cursor-pointer"
                        onClick={switchToLogin}
                    >
                        LOGIN TO TERMINAL
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;