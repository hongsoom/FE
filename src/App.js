import React from "react";
import { Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";

function App() {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(`${process.env.REACT_APP_KAKAO_KEY}`);
    }
  }

  return (
    <div className="App">
      <Route path="/detail/:id" element={<Detail />} />
    </div>
  );
}

export default App;
