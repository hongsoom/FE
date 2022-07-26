import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import KakaoSocial from "./pages/KakaoSocial";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/kakao/callback" element={<KakaoSocial />} />
      </Routes>
    </div>
  );
}

export default App;
