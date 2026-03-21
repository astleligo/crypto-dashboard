// src/components/ThemeToggle.jsx
const ThemeToggle = ({ dark, setDark }) => {
    return (
        <div className="grid grid-cols-2 border border-gray-800">
            <button
                onClick={() => setDark(false)}
                className={`py-3 text-xs ${!dark ? "bg-white text-black font-bold" : "text-gray-400"
                    }`}
            >
                LIGHT_MODE
            </button>

            <button
                onClick={() => setDark(true)}
                className={`py-3 text-xs ${dark ? "bg-[#00FFA3] text-black font-bold" : "text-gray-400"
                    }`}
            >
                DARK_MODE
            </button>
        </div>
    );
};

export default ThemeToggle;