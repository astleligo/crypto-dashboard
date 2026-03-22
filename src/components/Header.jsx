import React from "react";

const Header = ({ isLoggedIn, onLogout }) => {
    return (
        <header className="border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-8xl mx-auto px-4 py-5 flex items-center justify-between">

                {/* LEFT: TITLE */}
                <h1 className="text-lg md:text-xl font-bold tracking-widest text-[#00FFA3]">
                    CRYPTO DASHBOARD
                </h1>

                {/* RIGHT: AUTH BUTTON */}
                <div>
                    {isLoggedIn ? (
                        <button
                            onClick={onLogout}
                            className="
                text-xs tracking-widest
                px-4 py-2
                border border-gray-300 dark:border-gray-700
                hover:bg-gray-100 dark:hover:bg-[#111]
                transition
              "
                        >
                            LOGOUT
                        </button>
                    ) : (
                        <button
                            className="
                text-xs tracking-widest
                px-4 py-2
                border border-gray-300 dark:border-gray-700
                opacity-50 cursor-not-allowed
              "
                        >
                            LOGIN
                        </button>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Header;