import React from "react";
import { Bookmark } from "lucide-react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const CryptoTable = ({
    data,
    addToWatchlist,
    watchlist,
    handleSort,
    sortKey,
    sortOrder,
}) => {
    const getColor = (value) =>
        typeof value === "number" && value > 0
            ? "text-[#00FFA3]"
            : "text-red-500";

    const format = (value) =>
        typeof value === "number" ? value.toFixed(2) + "%" : "—";

    const renderSortIcon = (key) => {
        if (sortKey !== key) return "";
        return sortOrder === "asc" ? "↑" : "↓";
    };

    const isSaved = (coin) => watchlist?.includes(coin.id);

    console.log(data)

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-sm bg-white dark:bg-[#131313]">
                {/* HEADER */}
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800   bg-gray-100 dark:bg-transparent
    text-gray-500 text-[11px] uppercase tracking-wider text-center">

                        <th
                            onClick={() => handleSort("market_cap_rank")}
                            className="cursor-pointer py-4 px-2 w-[60px]"
                        >
                            # {renderSortIcon("market_cap_rank")}
                        </th>

                        <th className="py-4 px-2 text-left w-[220px]">Asset</th>

                        <th
                            onClick={() => handleSort("current_price")}
                            className="cursor-pointer px-2 w-[140px]"
                        >
                            Price {renderSortIcon("current_price")}
                        </th>

                        <th
                            onClick={() => handleSort("price_change_percentage_1h_in_currency")}
                            className="cursor-pointer px-2 w-[90px]"
                        >
                            1H {renderSortIcon("price_change_percentage_1h_in_currency")}
                        </th>

                        <th
                            onClick={() => handleSort("price_change_percentage_24h")}
                            className="cursor-pointer px-2 w-[90px]"
                        >
                            24H {renderSortIcon("price_change_percentage_24h")}
                        </th>

                        <th
                            onClick={() => handleSort("price_change_percentage_7d_in_currency")}
                            className="cursor-pointer px-2 w-[90px]"
                        >
                            7D {renderSortIcon("price_change_percentage_7d_in_currency")}
                        </th>

                        <th className="px-2 w-[140px]">Chart</th>

                        <th className="px-2 w-[60px]">★</th>
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {data.map((coin) => (
                        <tr
                            key={coin.id}
                            className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-[#111] transition"
                        >

                            {/* RANK */}
                            <td className="py-5 px-2 text-gray-500 text-center">
                                {String(coin.market_cap_rank).padStart(2, "0")}
                            </td>

                            {/* ASSET */}
                            <td className="py-5 px-2 flex items-center gap-3">
                                <img src={coin.image} className="w-7 h-7" />

                                <div>
                                    <div className="font-medium text-black dark:text-white">
                                        {coin.name}
                                    </div>
                                    <div className="text-gray-500 text-xs">
                                        {coin.symbol.toUpperCase()}
                                    </div>
                                </div>
                            </td>

                            {/* PRICE */}
                            <td className="font-semibold px-2 text-center">
                                ₹{coin.current_price.toLocaleString()}
                            </td>

                            {/* 1H */}
                            <td className={`px-2 text-center ${getColor(coin.price_change_percentage_1h_in_currency)}`}>
                                {format(coin.price_change_percentage_1h_in_currency)}
                            </td>

                            {/* 24H */}
                            <td className={`px-2 text-center ${getColor(coin.price_change_percentage_24h)}`}>
                                {format(coin.price_change_percentage_24h)}
                            </td>

                            {/* 7D */}
                            <td className={`px-2 text-center ${getColor(coin.price_change_percentage_7d_in_currency)}`}>
                                {format(coin.price_change_percentage_7d_in_currency)}
                            </td>

                            {/* CHART */}
                            <td className="px-2 text-center w-[140px]">
                                {coin.sparkline_in_7d?.price ? (
                                    <Sparklines
                                        data={coin.sparkline_in_7d.price}
                                        width={120}
                                        height={40}
                                    >
                                        <SparklinesLine
                                            color={
                                                coin.price_change_percentage_7d_in_currency > 0
                                                    ? "#00FFA3"
                                                    : "#ef4444"
                                            }
                                            style={{ strokeWidth: 1.5 }}
                                        />
                                    </Sparklines>
                                ) : (
                                    "—"
                                )}
                            </td>

                            {/* BOOKMARK TOGGLE */}
                            <td className="px-2 text-center">
                                <button
                                    onClick={() => addToWatchlist(coin)}
                                    className="transition hover:scale-110"
                                >
                                    <Bookmark
                                        size={18}
                                        className={
                                            isSaved(coin)
                                                ? "text-[#00FFA3]"
                                                : "text-gray-500"
                                        }
                                        fill={isSaved(coin) ? "#00FFA3" : "none"}
                                    />
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
