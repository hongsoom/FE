import React from "react";
import { Route, Routes } from "react-router-dom";
import Write from "./pages/Write";
import Detail from "./pages/Detail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyPage from "./pages/Mypage";
import Setup from "./pages/Setup";
import Filter from "./pages/Filter";
import Search from "./pages/Search";
import KakaoSocial from "./pages/KakaoSocial";
import FilterModal from "./components/filter/FilterModal";
import Main from "./pages/Main";

function App() {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(`${process.env.REACT_APP_KAKAO_KEY}`);
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={<Write />} />
        <Route path="/write/:id" element={<Write />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/filtermodal" element={<FilterModal />} />
        <Route path="/filter/:keyword" element={<Filter />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/oauth/kakao/callback" element={<KakaoSocial />} />
      </Routes>
    </div>
  );
}

export default App;
