import React from "react";

const Watchlist = ({ watchlist }) => {
    if (!watchlist || watchlist.length === 0) {
        return (
            <p className="text-xs text-gray-500 dark:text-gray-400 tracking-widest">
                NO_ITEMS_ADDED
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {watchlist.map((coin) => {
                if (!coin) return null;

                return (
                    <div
                        key={coin.id}
                        className="flex justify-between items-center py-3 px-2 border-b border-gray-200 dark:border-gray-800 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <img src={coin.image} className="w-5 h-5" />

                            <div>
                                <div className="font-medium text-black dark:text-white">
                                    {coin.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {coin.symbol?.toUpperCase()}
                                </div>
                            </div>
                        </div>

                        <div className="text-right font-semibold tabular-nums whitespace-nowrap text-black dark:text-white">
                            ₹{coin.current_price?.toLocaleString() || "—"}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Watchlist;
