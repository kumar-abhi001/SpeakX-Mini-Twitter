import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import SigupPage from "./pages/SigupPage";
import { useNavigate } from "react-router-dom";
import Mytweet from "./components/Mytweet";
import Tweet from "./components/Tweet";
import apiurl from "./constant";
import CreateTweet from "./components/CreateTweet";
import Follow from "./pages/Follow";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SigupPage />} />
        <Route path="/home" element={<Home />}>
          <Route path="tweet" element={<Tweet />}></Route>
          <Route path="follow" element={<Follow />}></Route>
          <Route path="createtweet" element={<CreateTweet />} />
          <Route path="mytweet" element={<Mytweet />} ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
