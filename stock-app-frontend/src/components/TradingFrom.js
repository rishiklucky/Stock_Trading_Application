import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api/api";
import "../styles/TradingForm.css";
import { buyStock, sellStock } from "../api/tradingService";
import { useNavigate } from "react-router-dom";

const TradingForm = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("buy"); // buy or sell
  const [formData, setFormData] = useState({
    symbol: "",
    quantity: "",
    buyerName: ""
  });

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Check if user is logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    
    if (!loggedInUser) {
      setError("Please login to trade stocks");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const refreshUserBalance = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/users/${user.data.userId}`
      );
      
      if (response.data.success) {
        const updatedUser = response.data.data;
        setUser({ data: updatedUser });
        localStorage.setItem("user", JSON.stringify({ data: updatedUser }));
      }
    } catch (err) {
      console.error("Failed to refresh balance:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please login first");
      return;
    }

    try {
      let response;

      if (mode === "buy") {
        response = await buyStock({
          userId: user.data.userId,
          symbol: formData.symbol,
          quantity: Number(formData.quantity)
        });
      } else {
        response = await sellStock({
          userId: user.data.userId,
          symbol: formData.symbol,
          quantity: Number(formData.quantity),
          buyerName: formData.buyerName
        });
      }

      // ✅ Only store message string
      if (response.success) {
        setMessage(response.message);
        setError("");
        
        // Refresh user balance after successful transaction
        await refreshUserBalance();
        
        // Clear form
        setFormData({
          symbol: "",
          quantity: "",
          buyerName: ""
        });
      } else {
        setError(response.message);
        setMessage("");
      }

    } catch (err) {
      setError("Transaction Failed ❌");
      setMessage("");
    }
  };

  // Show loading while checking login
  if (!user) {
    return <div className="trading-container"><p>Checking login status...</p></div>;
  }

  return (
    <div className="trading-container">

      <h2>Stock Trading</h2>
      
      <div className="user-info">
        <p>Logged in as: <strong>{user.data.userName}</strong></p>
        <p>Balance: <strong>₹{user.data.balance}</strong></p>
      </div>

      <div className="mode-toggle">
        <button
          className={mode === "buy" ? "active-buy" : ""}
          onClick={() => setMode("buy")}
        >
          Buy
        </button>

        <button
          className={mode === "sell" ? "active-sell" : ""}
          onClick={() => setMode("sell")}
        >
          Sell
        </button>
      </div>

      <form onSubmit={handleSubmit} className="trading-form">

        <input
          type="text"
          name="symbol"
          placeholder="Stock Symbol (e.g. MSFT)"
          value={formData.symbol}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        {mode === "sell" && (
          <input
            type="text"
            name="buyerName"
            placeholder="Buyer Name"
            value={formData.buyerName}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit" className="submit-btn">
          {mode === "buy" ? "Buy Stock" : "Sell Stock"}
        </button>

      </form>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}

    </div>
  );
};

export default TradingForm;
