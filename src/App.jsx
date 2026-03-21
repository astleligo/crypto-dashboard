import { useState, useEffect } from "react";
import { useCryptoData } from "./hooks/useCryptoData";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import Stats from "./components/Stats";
import CryptoTable from "./components/CryptoTable";
import Watchlist from "./components/Watchlist";

function App() {
  const { data, loading, error } = useCryptoData();

  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("market_cap_rank");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return false;
  });

  const itemsPerPage = 10;

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  const addToWatchlist = (coin) => {
    const exists = watchlist.find((c) => c.id === coin.id);

    const updated = exists
      ? watchlist.filter((c) => c.id !== coin.id)
      : [...watchlist, coin];

    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const filteredData = data.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const valA = a[sortKey] ?? 0;
    const valB = b[sortKey] ?? 0;

    if (valA === valB) return 0;

    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (error)
    return <div className="min-h-screen flex items-center justify-center">{error}</div>;

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black dark:bg-[#0e0e0e] dark:text-white transition-colors duration-300">
      <Header />

      <main className="max-w-8xl mx-auto w-full px-4 py-6 space-y-6">
        <Stats />

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="SEARCH ASSETS..."
              className="w-full p-3 bg-white dark:bg-[#131313] border border-gray-300 dark:border-gray-800 text-black dark:text-white text-xs tracking-widest"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="bg-white dark:bg-[#131313] border border-gray-200 dark:border-gray-800">
              <CryptoTable
                data={paginatedData}
                addToWatchlist={addToWatchlist}
                watchlist={watchlist}
                handleSort={handleSort}
                sortKey={sortKey}
                sortOrder={sortOrder}
              />
            </div>

            <div className="flex justify-center gap-4 text-xs">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="border px-3 py-1 border-gray-700"
              >
                PREV
              </button>

              <span>
                {page} / {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="border px-3 py-1 border-gray-700"
              >
                NEXT
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-[#131313] border border-gray-200 dark:border-gray-800 p-4">
              <h2 className="text-sm tracking-widest mb-4">MY_WATCHLIST</h2>
              <Watchlist watchlist={watchlist} />
            </div>

            <ThemeToggle dark={dark} setDark={setDark} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;