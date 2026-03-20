import { useEffect, useState } from "react";
import { fetchCrypto } from "../utils/api";

export const useCryptoData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await fetchCrypto();
            setData(res);
            setError(null);
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();

        const interval = setInterval(getData, 30000); // auto refresh
        return () => clearInterval(interval);
    }, []);

    return { data, loading, error };
};