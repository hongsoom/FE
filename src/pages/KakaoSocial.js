import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import Spinner from "../components/share/Spinner";

const KakaoSocial = () => {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(async () => {
    await dispatch(userAction.kakaoLoginDB(code));
  }, []);

  return <Spinner />;
};

export default KakaoSocial;
