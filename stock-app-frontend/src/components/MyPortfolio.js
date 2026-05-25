import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/MyPortfolio.css";

const MyPortfolio = () => {

  const navigate = useNavigate();

  const [holdings, setHoldings] = useState([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      navigate("/login");
      return;
    }
    
    fetchUserAndPortfolio(loggedInUser.data.userId);
  }, [navigate]);

  const fetchUserAndPortfolio = async (userId) => {
    try {
      // Fetch updated user data
      const userRes = await axiosInstance.get(`/api/users/${userId}`);
      
      if (userRes.data.success) {
        const updatedUser = userRes.data.data;
        setUser({ data: updatedUser });
        localStorage.setItem("user", JSON.stringify({ data: updatedUser }));
      }

      // Fetch portfolio
      await fetchPortfolio(userId);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchPortfolio = async (userId) => {
    try {
      // 1️⃣ Get portfolio for logged-in user
      const portfolioRes = await axiosInstance.get(`/api/trading/portfolio/${userId}`);

      const portfolio = portfolioRes.data; // Already an array from backend


      // 2️⃣ Get all stocks
      const stocksRes = await axiosInstance.get("/api/stocks/");

      const stocks = stocksRes.data;

      // 3️⃣ Merge data and filter out zero quantity
      const merged = portfolio
        .filter(p => p.quantity > 0)
        .map(p => {
          const stock = stocks.find(s => s.stockId === p.stockId);

          const currentPrice = stock?.currentPrice || 0;
          const previousClose = stock?.previousClose || 0;

          const invested = previousClose * p.quantity; // approx invested
          const currentValue = currentPrice * p.quantity;
          const profitLoss = currentValue - invested;

          return {
            ...p,
            symbol: stock?.symbol,
            currentPrice,
            invested,
            currentValue,
            profitLoss
          };
        });

      setHoldings(merged);

      // 4️⃣ Calculate totals
      const totalInv = merged.reduce((sum, item) => sum + item.invested, 0);
      const totalCurr = merged.reduce((sum, item) => sum + item.currentValue, 0);

      setTotalInvested(totalInv);
      setTotalCurrentValue(totalCurr);

      setLoading(false);

    } catch (error) {
      console.log("Portfolio fetch error:", error);
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const totalPL = totalCurrentValue - totalInvested;
  const totalPLPercent =
    totalInvested > 0
      ? ((totalPL / totalInvested) * 100).toFixed(2)
      : 0;

  if (loading) return <p>Loading Portfolio...</p>;

  return (
    <div className="portfolio-container">

      <h2>My Portfolio</h2>
      
      {user && (
        <div className="user-info">
          <p>User: <strong>{user.data.userName}</strong></p>
          <p>Available Balance: <strong>₹{user.data.balance}</strong></p>
        </div>
      )}

      {/* 🔹 Summary Card */}
      <div className="portfolio-summary">
        <div>
          <p>Total Invested</p>
          <h3>{formatCurrency(totalInvested)}</h3>
        </div>

        <div>
          <p>Current Value</p>
          <h3>{formatCurrency(totalCurrentValue)}</h3>
        </div>

        <div>
          <p>Total P&L</p>
          <h3 className={totalPL < 0 ? "negative" : "positive"}>
            {formatCurrency(totalPL)} ({totalPLPercent}%)
          </h3>
        </div>
      </div>

      {/* 🔹 Holdings Table */}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Current Price</th>
            <th>Invested</th>
            <th>Current Value</th>
            <th>P&L</th>
          </tr>
        </thead>

        <tbody>
          {holdings.map(item => (
            <tr key={item.id}>
              <td>{item.symbol}</td>
              <td>{item.quantity}</td>
              <td>{formatCurrency(item.currentPrice)}</td>
              <td>{formatCurrency(item.invested)}</td>
              <td>{formatCurrency(item.currentValue)}</td>
              <td className={item.profitLoss < 0 ? "negative" : "positive"}>
                {formatCurrency(item.profitLoss)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default MyPortfolio;
