import React, { useEffect } from "react";
import _ from "lodash";

const InfinityScroll = (props) => {
  const { children, callNext, lastPage, loading, nextPage } = props;

  const _onScroll = _.throttle((e) => {
    if (lastPage === true || nextPage === 0) {
      return;
    }

    console.log("window.innerHeight", window.innerHeight);
    console.log(
      "e.target.documentElement.scrollHeight",
      e.target.documentElement.scrollHeight
    );
    console.log(
      " e.target.documentElement.scrollTop",
      e.target.documentElement.scrollTop
    );
    console.log("window.scrollY", window.scrollY);

    if (
      window.innerHeight + window.scrollY >
      e.target.documentElement.scrollHeight - 10
    ) {
      callNext();
    }

    if (
      window.innerHeight <
      e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop
    ) {
      e.preventDefault();
      return;
    }
  }, 1000);

  const onScroll = React.useCallback(_onScroll, [loading]);

  useEffect(() => {
    if (loading) {
      return;
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("touchmove", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [nextPage]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default InfinityScroll;
