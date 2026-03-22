import { useState, useEffect } from "react";
import { useCryptoData } from "./hooks/useCryptoData";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import Stats from "./components/Stats";
import CryptoTable from "./components/CryptoTable";
import Watchlist from "./components/Watchlist";
import SkeletonTable from "./components/SkeletonTable";
import SkeletonStats from "./components/SkeletonStats";

import Login from "./components/Login";
import Signup from "./components/Signup";

import {
  getWatchlist,
  addToWatchlist as addAPI,
  removeFromWatchlist,
} from "./utils/api";

function App() {
  const { data, loading, error } = useCryptoData();

  // 🔐 AUTH STATE
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [authMode, setAuthMode] = useState("login");

  // ⭐ WATCHLIST
  const [watchlist, setWatchlist] = useState([]);

  // UI STATES
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // 🌙 THEME
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

  // ⭐ LOAD WATCHLIST FROM DB
  const loadWatchlist = async () => {
    try {
      const res = await getWatchlist();
      setWatchlist(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadWatchlist();
    }
  }, [isLoggedIn]);

  // ⭐ ADD / REMOVE WATCHLIST
  const addToWatchlist = async (coin) => {
    const exists = watchlist.includes(coin.id);

    // 🔥 instant UI update
    setWatchlist((prev) =>
      exists
        ? prev.filter((id) => id !== coin.id)
        : [...prev, coin.id]
    );

    try {
      if (exists) {
        await removeFromWatchlist(coin.id);
      } else {
        await addAPI(coin.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 FILTER
  const filteredData = data.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔽 SORT
  const sortedData = [...filteredData].sort((a, b) => {
    const valA = a[sortKey] ?? 0;
    const valB = b[sortKey] ?? 0;

    if (valA === valB) return 0;

    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  // 📄 PAGINATION
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

  // 🔐 AUTH UI
  if (!isLoggedIn) {
    return authMode === "login" ? (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        switchToSignup={() => setAuthMode("signup")}
      />
    ) : (
      <Signup switchToLogin={() => setAuthMode("login")} />
    );
  }

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0e0e0e] p-6 space-y-6">
        <SkeletonStats />
        <SkeletonTable />
      </div>
    );
  }

  // ❌ ERROR
  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-full max-w-md bg-white dark:bg-[#131313] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl mb-3">⚠️</div>

          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Unable to load data
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            API rate limit or network issue. Please try again shortly.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 px-4 py-2 text-sm font-medium rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ⭐ MAP WATCHLIST IDS → COIN OBJECTS
  const watchlistCoins = data.filter((coin) =>
    watchlist.includes(coin.id)
  );

  // 🧱 UI
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black dark:bg-[#0e0e0e] dark:text-white transition-colors duration-300">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

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
            <ThemeToggle dark={dark} setDark={setDark} />

            <div className="bg-white dark:bg-[#131313] border border-gray-200 dark:border-gray-800 p-4">
              <h2 className="text-sm tracking-widest mb-4">
                MY_WATCHLIST
              </h2>
              <Watchlist watchlist={watchlistCoins} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
