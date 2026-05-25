import React, { useEffect, useState } from "react";
import "../styles/MarketCards.css";
import { getAllStocks } from "../api/stockService";

const MarketCards = () => {

  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const data = await getAllStocks();
      setStocks(data);
      setError("");
    } catch (err) {
      setError("Unable to fetch stocks");
    }
  };

  const calculateChangePercent = (stock) => {
    return (
      ((stock.currentPrice - stock.previousClose) /
        stock.previousClose) *
      100
    ).toFixed(2);
  };

  return (
    <div className="market-section">
      <h2>📊 Market Overview</h2>

      <div className="market-container">
        {stocks.length > 0 ? (
          stocks.map((stock) => (
            <div className="market-card" key={stock.stockId}>
              <h3>{stock.symbol}</h3>

              <p>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(stock.currentPrice)}
              </p>

              <p>
                <span>Change:</span>
                <span
                  className={
                    calculateChangePercent(stock) < 0
                      ? "negative"
                      : "positive"
                  }
                >
                  {calculateChangePercent(stock) > 0 ? "+" : ""}
                  {calculateChangePercent(stock)}%
                </span>
              </p>

              <p>
                <span>High:</span>
                <span>₹{stock.highPrice}</span>
              </p>
              
              <p>
                <span>Low:</span>
                <span>₹{stock.lowPrice}</span>
              </p>
              
              <p>
                <span>Open:</span>
                <span>₹{stock.openPrice}</span>
              </p>
              
              <p>
                <span>Prev Close:</span>
                <span>₹{stock.previousClose}</span>
              </p>
              
              <p>
                <span>Available:</span>
                <span>{stock.availableQuantity} shares</span>
              </p>
            </div>
          ))
        ) : error ? (
          <p className="error-msg">{error}</p>
        ) : (
          <p className="error-msg">Loading stocks...</p>
        )}
      </div>
    </div>
  );
};

export default MarketCards;
