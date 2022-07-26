import React from "react";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/search/:keyword" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
