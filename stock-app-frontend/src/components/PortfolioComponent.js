import React, { useEffect, useState } from "react";
import { getAllPortfolio } from "../api/portfolioService";
import { getAllStocks } from "../api/stockService";

const PortfolioPage = () => {

  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const portfolio = await getAllPortfolio();
      const stocks = await getAllStocks();

      // Merge by stockId and filter out zero quantity
      const merged = portfolio
        .filter(p => p.quantity > 0)
        .map(p => {
          const stock = stocks.find(s => s.stockId === p.stockId);

          return {
            ...p,
            symbol: stock?.symbol,
            currentPrice: stock?.currentPrice,
            totalValue: stock?.currentPrice * p.quantity
          };
        });

      setHoldings(merged);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Portfolio</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Current Price</th>
            <th>Total Value</th>
          </tr>
        </thead>

        <tbody>
          {holdings.map(item => (
            <tr key={item.id}>
              <td>{item.symbol}</td>
              <td>{item.quantity}</td>
              <td>₹ {item.currentPrice}</td>
              <td>₹ {item.totalValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioPage;
