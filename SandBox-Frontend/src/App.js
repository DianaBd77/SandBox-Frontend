import "./App.css";
import Home from "./Components/Home/Home";
import Poll from "./Components/Poll/Poll";
import Footer from "./Components/Footer/Footer";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import PollList from "./Components/PollList/PollList";
import UserPanel from "./Components/UserPanel/UserPanel";
import ManagePoll from "./Components/ManagePoll/ManagePoll";
import CreatePoll from "./Components/CreatePoll/CreatePoll";
import Navigation from "./Components/BottomNavigation/BottomNavigation";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
        <div className="App-body">
          <Router>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/poll/:id" element={<Poll />}></Route>
              <Route path="/sign-in" element={<SignIn />}></Route>
              <Route path="/sign-up" element={<SignUp />}></Route>
              <Route path="/list" element={<PollList />}></Route>
              <Route path="/manage-poll/:id" element={<ManagePoll />}></Route>
              <Route path="/create-poll" element={<CreatePoll />}></Route>
              <Route path="/panel" element={<UserPanel />}></Route>
            </Routes>
            <Navigation />
          </Router>
        </div>
      <Footer className="footer" />
    </div>
  );
};

export default App;
