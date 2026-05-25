import React from "react";
import "../styles/FeatureCards.css";
import { Link } from "react-router-dom";

const FeatureCards = () => {
  return (
    <div className="features-container">
      
      <Link to="/market-cards" className="feature-card-link">
      <div className="feature-card">
        <h3>📊 Real-Time Market Data</h3>
        <p>Access live stock quotes powered by Alpha Vantage API</p>
      </div>
      </Link>
      
      <Link to="/sellorbuy" className="feature-card-link">
      <div className="feature-card">
        <h3>💰 Buy & Sell Stocks</h3>
        <p>Execute trades with real-time price validation</p>
      </div>
      </Link>

      <Link to="/myportfolio" className="feature-card-link">
      <div className="feature-card">
        <h3>💼 Portfolio Management</h3>
        <p>Track investments with P/L calculations</p>
      </div>
      </Link>

      <Link to="/charts" className="feature-card-link">
      <div className="feature-card">
        <h3>📈 Interactive Charts</h3>
        <p>Visualize stock prices and portfolio distribution</p>
      </div>
      </Link>
    </div>
  );
};

export default FeatureCards;
