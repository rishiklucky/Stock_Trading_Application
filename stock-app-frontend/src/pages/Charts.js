import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import "../styles/Charts.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    setUser(loggedInUser);
    fetchData(loggedInUser.data.userId);
  }, [navigate]);

  const fetchData = async (userId) => {
    try {
      // Fetch all stocks
      const stocksRes = await axiosInstance.get("/api/stocks/");
      setStocks(stocksRes.data);

      // Fetch user portfolio
      const portfolioRes = await axiosInstance.get(`/api/trading/portfolio/${userId}`);
      
      // Filter out zero quantity portfolios
      const portfolio = portfolioRes.data.filter(p => p.quantity > 0);
      setPortfolio(portfolio);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Stock Price Comparison Chart (Bar)
  const stockPriceData = {
    labels: stocks.slice(0, 10).map((s) => s.symbol),
    datasets: [
      {
        label: "Current Price (₹)",
        data: stocks.slice(0, 10).map((s) => s.currentPrice),
        backgroundColor: "rgba(30, 115, 190, 0.7)",
        borderColor: "rgba(30, 115, 190, 1)",
        borderWidth: 2,
      },
      {
        label: "Previous Close (₹)",
        data: stocks.slice(0, 10).map((s) => s.previousClose),
        backgroundColor: "rgba(239, 68, 68, 0.7)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Stock Price Trend (Line)
  const stockTrendData = {
    labels: stocks.slice(0, 10).map((s) => s.symbol),
    datasets: [
      {
        label: "High Price (₹)",
        data: stocks.slice(0, 10).map((s) => s.highPrice),
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Low Price (₹)",
        data: stocks.slice(0, 10).map((s) => s.lowPrice),
        borderColor: "rgba(239, 68, 68, 1)",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Portfolio Distribution (Pie)
  const portfolioData = {
    labels: portfolio.map((p) => {
      const stock = stocks.find((s) => s.stockId === p.stockId);
      return stock?.symbol || "Unknown";
    }),
    datasets: [
      {
        label: "Quantity",
        data: portfolio.map((p) => p.quantity),
        backgroundColor: [
          "rgba(30, 115, 190, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(14, 165, 233, 0.8)",
          "rgba(249, 115, 22, 0.8)",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // Portfolio Value Distribution (Doughnut)
  const portfolioValueData = {
    labels: portfolio.map((p) => {
      const stock = stocks.find((s) => s.stockId === p.stockId);
      return stock?.symbol || "Unknown";
    }),
    datasets: [
      {
        label: "Value (₹)",
        data: portfolio.map((p) => {
          const stock = stocks.find((s) => s.stockId === p.stockId);
          return stock ? stock.currentPrice * p.quantity : 0;
        }),
        backgroundColor: [
          "rgba(30, 115, 190, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(14, 165, 233, 0.8)",
          "rgba(249, 115, 22, 0.8)",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  if (loading) {
    return <div className="charts-container"><p>Loading charts...</p></div>;
  }

  return (
    <div className="charts-container">
      <h1>📊 Interactive Charts</h1>

      {user && (
        <div className="user-info-banner">
          <p>Welcome, <strong>{user.data.userName}</strong></p>
        </div>
      )}

      <div className="charts-grid">
        {/* Stock Price Comparison */}
        <div className="chart-card">
          <h3>Stock Price Comparison</h3>
          <div className="chart-wrapper">
            <Bar data={stockPriceData} options={chartOptions} />
          </div>
        </div>

        {/* Stock Price Trend */}
        <div className="chart-card">
          <h3>Stock Price Trend (High vs Low)</h3>
          <div className="chart-wrapper">
            <Line data={stockTrendData} options={chartOptions} />
          </div>
        </div>

        {/* Portfolio Distribution by Quantity */}
        {portfolio.length > 0 && (
          <div className="chart-card">
            <h3>Portfolio Distribution (Quantity)</h3>
            <div className="chart-wrapper">
              <Pie data={portfolioData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Portfolio Value Distribution */}
        {portfolio.length > 0 && (
          <div className="chart-card">
            <h3>Portfolio Value Distribution</h3>
            <div className="chart-wrapper">
              <Doughnut data={portfolioValueData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>

      {portfolio.length === 0 && (
        <div className="no-portfolio-message">
          <p>📈 You don't have any stocks in your portfolio yet.</p>
          <p>Start trading to see your portfolio distribution!</p>
        </div>
      )}
    </div>
  );
};

export default Charts;
