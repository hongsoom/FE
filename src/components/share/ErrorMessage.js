import { useEffect } from "react";
import swal from "sweetalert";

const ErrorMessage = () => {
  const errorMessage = () => {
    swal({
      title: "로그인을 해주세요!",
      icon: "warning",
      closeOnClickOutside: false,
    });
    return;
  };

  useEffect(() => {
    errorMessage();
  }, []);

  return window.location.replace("/");
};

export default ErrorMessage;
