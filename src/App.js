import React from "react";
import { Route, Routes } from "react-router-dom";
import Write from "./pages/Write";
import Detail from "./pages/Detail";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/write" element={<Write />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;