import React, { useEffect, useRef, forwardRef, useCallback } from "react";
import _ from "lodash";
import Spinner from "./SpinnerSmail";

const InfinityScroll = forwardRef((props, ref) => {
  const { children, callNext, is_next, loading, setPage, page } = props;

  let container;
  useEffect(() => {
    container = ref.current;
  }, [callNext]);

  const _handleScroll = _.throttle(() => {
    if (loading) {
      return;
    }
    console.log("실행?");
    const clientHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;

    if (scrollHeight - clientHeight - scrollTop < 150) {
      callNext();
      setPage(page + 1);
    }
  }, 1000);

  const handleScroll = useCallback(_handleScroll, [loading]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!is_next && container !== undefined) {
      container.addEventListener("scroll", handleScroll);
    } else if (is_next && container !== undefined) {
      container.removeEventListener("scroll", handleScroll);
    }
    if (container !== undefined) {
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [is_next, loading]);

  return (
    <React.Fragment>
      {children}
      {is_next && <Spinner />}
    </React.Fragment>
  );
});

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};

export default InfinityScroll;
