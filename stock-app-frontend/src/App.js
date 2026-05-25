import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Charts from "./pages/Charts";
import MarketCards from "./components/MarketCards";
import TradingForm from "./components/TradingFrom";
import PortfolioPage from "./components/PortfolioComponent";
import MyPortfolio from "./components/MyPortfolio";
import Navbar from "./components/Navbar";

function App() {
  return (
    
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/market-cards" element={<MarketCards/>}/>
        <Route path="/sellorbuy" element={<TradingForm/>}/>
        <Route path="/portfolio" element={<PortfolioPage/>}/>
        <Route path="/myportfolio" element={<MyPortfolio/>}/>
      </Routes>
    </Router>
  );
}

export default App;
