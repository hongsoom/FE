import React from "react";
import { Route, Routes } from "react-router-dom";
import Write from "./pages/Write";
import Detail from "./pages/Detail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyPage from "./pages/Mypage";
import Setup from "./pages/Setup";
import Category from "./pages/Category";
import KakaoSocial from "./pages/KakaoSocial";
import Main from "./pages/Main";
import Filter from "./pages/Filter";

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={<Write />}/>
        <Route path="/write/:id" element={<Write/>}/>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/" element={<Main />} />
        <Route path="/:keyword" element={<Filter />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/category/:region" element={<Category />} />
        <Route path="/oauth/kakao/callback" element={<KakaoSocial />} />
      </Routes>
    </div>
  );
}

export default App;