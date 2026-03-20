import React from "react";

const Watchlist = ({ watchlist }) => {
    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold">Watchlist</h2>
            {watchlist.length === 0 && <p>No items added</p>}
            {watchlist.map((coin) => (
                <div key={coin.id} className="flex justify-between border-b py-2">
                    <span>{coin.name}</span>
                    <span>${coin.current_price}</span>
                </div>
            ))}
        </div>
    );
};

export default Watchlist;