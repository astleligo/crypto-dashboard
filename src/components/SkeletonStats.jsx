const SkeletonStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
            {Array(3).fill(0).map((_, i) => (
                <div
                    key={i}
                    className="bg-white dark:bg-[#131313] border border-gray-200 dark:border-gray-800 p-4"
                >
                    <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 mb-3 rounded"></div>
                    <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonStats;