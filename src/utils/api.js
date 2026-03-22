import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Get token
const getToken = () => localStorage.getItem("token");

// Axios instance
const api = axios.create({
    baseURL: BASE_URL,
}); 

// Attach token automatically
api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
        }
        return Promise.reject(err);
    }
);

// CRYPTO
export const fetchCrypto = async () => {
    const res = await api.get("/crypto");
    return res.data;
};

export const fetchGlobal = async () => {
    const res = await api.get("/global");
    return res.data;
};

// AUTH
export const registerUser = async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
};

export const loginUser = async (data) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

// WATCHLIST
export const getWatchlist = async () => {
    const res = await api.get("/watchlist");
    return res.data;
};

export const addToWatchlist = async (coinId) => {
    const res = await api.post("/watchlist", { coinId });
    return res.data;
};

export const removeFromWatchlist = async (coinId) => {
    const res = await api.delete(`/watchlist/${coinId}`);
    return res.data;
};

export default api; 