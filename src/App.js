import React from "react";
import { Route, Routes } from "react-router-dom";
import Filter from "./pages/Filter";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/filter/:keyword" element={<Filter />} />
      </Routes>
    </div>
  );
}

export default App;
