import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import FeatureCards from "../components/FeatureCards";
import MarketCards from "../components/MarketCards";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <FeatureCards />
      
    </div>
  );
};

export default Home;
