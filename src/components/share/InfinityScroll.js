import React, { useEffect } from "react";

const InfinityScroll = (props) => {
  const { children, callNext, lastPage, loading, nextPage } = props;

  const handleScroll = (e) => {
    if (lastPage === true || nextPage === 0) {
      return;
    }

    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >
      e.target.documentElement.scrollHeight
    ) {
      e.preventDefault();
      callNext();
    }

    if (
      window.innerHeight >
      e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop
    ) {
      return;
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
