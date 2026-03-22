# 🚀 Crypto Dashboard

A full-stack cryptocurrency dashboard built with React and Node.js that displays real-time market data, supports sorting, search, watchlist management, and dark mode.

---

## 📌 Features

- 📊 Real-time cryptocurrency data (CoinGecko API)
- 🔍 Search functionality
- ↕️ Sorting (price, rank, etc.)
- 📄 Pagination
- ⭐ Watchlist (stored in localStorage)
- 🌗 Light / Dark mode toggle
- ⚡ Skeleton loading UI
- 🔁 Backend caching & retry logic
- 🛡️ CORS handled via backend proxy

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS (v4)
- Axios

### Backend
- Node.js
- Express.js
- Axios
- CORS

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 🏗️ Architecture

Frontend (React)  
⬇  
Backend (Node/Express)  
⬇  
CoinGecko API  

The backend acts as a proxy to:
- Handle CORS
- Reduce API load
- Add caching & retry logic

---

## ⚙️ Setup Instructions

Clone the repository:

```bash
git clone https://github.com/astleligo/crypto-dashboard.git
cd crypto-dashboard

npm install
npm run dev
http://localhost:5173

cd backend
npm install
node index.js
http://localhost:5000
```

---

## 🌐 Live Demo

- 🔗 Frontend (Vercel): https://crypto-dashboard-one-dusky.vercel.app/  
- 🔗 Backend API (Render): https://crypto-dashboard-lcoo.onrender.com  

---

## 📡 API Endpoints

Base URL: https://crypto-dashboard-lcoo.onrender.com

- `/api/crypto` → Fetch cryptocurrency data  
- `/api/global` → Fetch global market stats  


## ⚠️ Note

- The backend is hosted on Render (free tier), so it may take a few seconds to wake up on first request.
- CoinGecko API has strict rate limits, so caching is implemented to reduce API calls and improve performance.
- In rare cases, global stats may temporarily show fallback values due to API rate limits.
