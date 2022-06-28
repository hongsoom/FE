import React from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import Spinner from "../components/Spinner";

const KakaoSocial = () => {
  const dispatch = useDispatch();
  
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code)

  React.useEffect(async () => {
    await dispatch(userAction.kakaoLoginDB(code));
  }, []);

  return <Spinner />
};

export default KakaoSocial;