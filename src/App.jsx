import { useState, useEffect } from "react";
import { useCryptoData } from "./hooks/useCryptoData";
import CryptoTable from "./components/CryptoTable";
import Watchlist from "./components/Watchlist";

function App() {
  const { data, loading, error } = useCryptoData();
  const [watchlist, setWatchlist] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  const addToWatchlist = (coin) => {
    const updated = [...watchlist, coin];
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crypto Dashboard</h1>

      <CryptoTable data={data} addToWatchlist={addToWatchlist} />
      <Watchlist watchlist={watchlist} />
    </div>
  );
}

export default App;