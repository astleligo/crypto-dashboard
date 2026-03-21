import axios from "axios";

const BASE_URL = "https://crypto-dashboard-lcoo.onrender.com/api";

export const fetchCrypto = async () => {
    const res = await axios.get(`${BASE_URL}/crypto`);
    return res.data;
};

export const fetchGlobal = async () => {
    const res = await axios.get(`${BASE_URL}/global`);
    return res.data;
};