import "./App.css";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import SignIn from "./Components/SignIn/SignIn";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div className="app">
      <div className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
          </Routes>
        </Router>
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default App;
