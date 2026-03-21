const SkeletonTable = () => {
    return (
        <div className="w-full animate-pulse">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                        {Array(7).fill(0).map((_, i) => (
                            <th key={i} className="py-4 px-2">
                                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16 mx-auto"></div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {Array(10).fill(0).map((_, row) => (
                        <tr key={row} className="border-b border-gray-200 dark:border-gray-800">
                            {Array(7).fill(0).map((_, col) => (
                                <td key={col} className="py-5 px-2 text-center">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20 mx-auto"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SkeletonTable;