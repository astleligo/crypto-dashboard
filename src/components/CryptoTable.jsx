import React from "react";

const CryptoTable = ({ data, addToWatchlist }) => {
    const getColor = (value) =>
        value > 0 ? "text-green-500" : "text-red-500";

    const format = (value) =>
        value !== undefined ? value.toFixed(2) + "%" : "—";

    return (
        <div className="overflow-x-auto p-3 border rounded-lg shadow-sm">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h %</th>
                        <th>1h %</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((coin) => (
                        <tr
                            key={coin.id}
                            className="border-b hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            <td className="flex items-center gap-2 py-2">
                                <img src={coin.image} className="w-6" />
                                {coin.name}
                            </td>

                            <td className="font-medium">
                                ${coin.current_price}
                            </td>

                            <td className={getColor(coin.price_change_percentage_24h)}>
                                {format(coin.price_change_percentage_24h)}
                            </td>

                            <td className={getColor(coin.price_change_percentage_1h_in_currency)}>
                                {format(coin.price_change_percentage_1h_in_currency)}
                            </td>

                            <td>
                                <button
                                    onClick={() => addToWatchlist(coin)}
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    + Watch
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;