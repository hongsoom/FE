import React, { useEffect } from "react";
import _ from "lodash";

const InfinityScroll = (props) => {
  const { children, callNext, lastPage, loading, nextPage } = props;

  const _onScroll = _.throttle((e) => {
    if (lastPage === true || nextPage === 0) {
      return;
    }

    if (
      window.innerHeight + window.scrollY >
      e.target.documentElement.scrollHeight - 10
    ) {
      callNext();
    }
  }, 1000);

  const onScroll = React.useCallback(_onScroll, [loading]);

  useEffect(() => {
    if (loading) {
      return;
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [nextPage]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default InfinityScroll;
