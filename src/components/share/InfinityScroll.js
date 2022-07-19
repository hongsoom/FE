import React, { useEffect } from "react";
import Spinner from "./SpinnerSmail";

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props;

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >
      e.target.documentElement.scrollHeight
    ) {
      callNext();
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default InfinityScroll;
