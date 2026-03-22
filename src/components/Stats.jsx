import { useEffect, useState } from "react";
import { fetchGlobal } from "../utils/api";
import SkeletonStats from "./SkeletonStats";

const Stats = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetchGlobal();
                setData(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    console.log(data);


    const stats = [
        {
            label: "TOTAL MARKET CAP",
            value:
                data?.total_market_cap?.usd !== undefined
                    ? `$${(data.total_market_cap.usd / 1e12).toFixed(2)}T`
                    : "N/A",
        },
        {
            label: "24H VOL",
            value:
                data?.total_volume?.usd !== undefined
                    ? `$${(data.total_volume.usd / 1e9).toFixed(2)}B`
                    : "N/A",
        },
        {
            label: "BTC DOMINANCE",
            value:
                data?.market_cap_percentage?.btc !== undefined
                    ? `${data.market_cap_percentage.btc.toFixed(2)}%`
                    : "N/A",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="bg-white dark:bg-[#131313] border border-gray-200 dark:border-gray-800 p-4"
                >
                    <p className="text-xs text-gray-400">{stat.label}</p>

                    {loading ? (
                        <SkeletonStats />
                    ) : (
                        <h2 className="text-xl font-bold">{stat.value}</h2>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stats;