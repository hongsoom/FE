import React from "react";
import { Route, Routes } from "react-router-dom";
import Filter from "./pages/Filter";
import Write from "./pages/Write";
import Search from "./pages/Search";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import KakaoSocial from "./pages/KakaoSocial";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/filter/:keyword" element={<Filter />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/kakao/callback" element={<KakaoSocial />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </div>
  );
}

export default App;