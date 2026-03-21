// src/components/Stats.jsx
const Stats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
                { label: "TOTAL MARKET CAP", value: "$2.48T" },
                { label: "24H VOL", value: "$84.12B" },
                { label: "BTC DOMINANCE", value: "52.4%" },
            ].map((stat, i) => (
                <div
                    key={i}
                    className="bg-white dark:bg-[#131313] border border-gray-200 dark:border-gray-800 p-4"
                >
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <h2 className="text-xl font-bold">{stat.value}</h2>
                </div>
            ))}
        </div>
    );
};

export default Stats;