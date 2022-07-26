import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from './redux/module/user'
import MyPage from "./pages/Mypage";
import Setup from "./pages/Setup";

function App() {
  const dispatch = useDispatch();
  
  // 나의 정보 가져오기
  useEffect(()=>{
    dispatch(userAction.myInfoDB())
  },[dispatch])
  
  const myInfo = useSelector(state=>state.user.myinfo)

  return (
    <div className="App">
      <Routes>
        <Route path="/mypage" element={<MyPage myInfo={myInfo}/>} />
        <Route path="/setup" element={<Setup myInfo={myInfo}/>}  />
      </Routes>
    </div>
  );
}

export default App;
