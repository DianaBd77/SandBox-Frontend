import "./App.css";
import Home from "./Components/Home/Home";
// import Home from "./components/home/Home";
import Footer from "./Components/Footer/Footer";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div className="app">
      <div className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default App;
