import React, { useEffect } from "react";
import Spinner from "./SpinnerSmail";

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading, nextPage } = props;

  const handleScroll = (e) => {
    if (is_next) {
      return;
    }

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
  }, [nextPage]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default InfinityScroll;