import React from "react";
import { Route, Routes } from "react-router-dom";
import Write from "./pages/Write";
import Detail from "./pages/Detail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import MyPage from "./pages/Mypage";
// import Category from "./pages/Category";
import KakaoSocial from "./pages/KakaoSocial";

function App() {

  
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={<Write />}/>
        <Route path="/detail" element={<Detail />} />
        {/* <Route path="/mypage" element={<MyPage />} /> */}
        {/* <Route path="/category" element={<Category />} /> */}
        <Route path="/oauth/kakao/callback" element={<KakaoSocial />} />
      </Routes>
    </div>
  );
}

export default App;