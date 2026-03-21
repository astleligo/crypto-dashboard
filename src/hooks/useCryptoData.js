import { useEffect, useState } from "react";
import { fetchCrypto } from "../utils/api";

export const useCryptoData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false); 

    const getData = async (isInitial = false) => {
        try {
            if (!isInitial) setRefreshing(true);

            const res = await fetchCrypto();
            setData(res);
            setError(null);

        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);     
            setRefreshing(false);  
        }
    };

    useEffect(() => {
        getData(true); 

        const interval = setInterval(() => {
            getData(false); 
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return { data, loading, error, refreshing };
};