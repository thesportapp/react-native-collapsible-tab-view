import React from "react";
import { AnimatedFlatList } from "./helpers";
import {
  useAfterMountEffect,
  useChainCallback,
  useCollapsibleStyle,
  useConvertAnimatedToValue,
  useScrollHandlerY,
  useSharedAnimatedRef,
  useTabNameContext,
  useTabsContext,
  useUpdateScrollViewContentSize
} from "./hooks";
const FlatListMemo = React.memo(
  React.forwardRef(
    (props, passRef) => /* @__PURE__ */ React.createElement(AnimatedFlatList, { ref: passRef, ...props })
  )
);
function FlatListImpl({
  contentContainerStyle,
  style,
  onContentSizeChange,
  refreshControl,
  ...rest
}, passRef) {
  const name = useTabNameContext(), { setRef, contentInset } = useTabsContext(), ref = useSharedAnimatedRef(passRef), { scrollHandler, enable } = useScrollHandlerY(name), onLayout = useAfterMountEffect(rest.onLayout, () => {
    "worklet";
    enable(!0);
  }), {
    style: _style,
    contentContainerStyle: _contentContainerStyle,
    progressViewOffset
  } = useCollapsibleStyle();
  React.useEffect(() => {
    setRef(name, ref);
  }, [name, ref, setRef]);
  const scrollContentSizeChange = useUpdateScrollViewContentSize({
    name
  }), scrollContentSizeChangeHandlers = useChainCallback(
    React.useMemo(
      () => [scrollContentSizeChange, onContentSizeChange],
      [onContentSizeChange, scrollContentSizeChange]
    )
  ), memoRefreshControl = React.useMemo(
    () => refreshControl && React.cloneElement(refreshControl, {
      progressViewOffset,
      ...refreshControl.props
    }),
    [progressViewOffset, refreshControl]
  ), contentInsetValue = useConvertAnimatedToValue(contentInset), memoContentInset = React.useMemo(
    () => ({ top: contentInsetValue }),
    [contentInsetValue]
  ), memoContentOffset = React.useMemo(
    () => ({ x: 0, y: -contentInsetValue }),
    [contentInsetValue]
  ), memoContentContainerStyle = React.useMemo(
    () => [
      _contentContainerStyle,
      // TODO: investigate types
      contentContainerStyle
    ],
    [_contentContainerStyle, contentContainerStyle]
  ), memoStyle = React.useMemo(() => [_style, style], [_style, style]);
  return (
    // @ts-expect-error typescript complains about `unknown` in the memo, it should be T
    /* @__PURE__ */ React.createElement(
      FlatListMemo,
      {
        ...rest,
        onLayout,
        ref,
        bouncesZoom: !1,
        style: memoStyle,
        contentContainerStyle: memoContentContainerStyle,
        progressViewOffset,
        onScroll: scrollHandler,
        onContentSizeChange: scrollContentSizeChangeHandlers,
        scrollEventThrottle: 16,
        contentInset: memoContentInset,
        contentOffset: memoContentOffset,
        automaticallyAdjustContentInsets: !1,
        refreshControl: memoRefreshControl,
        onMomentumScrollEnd: () => {
        }
      }
    )
  );
}
const FlatList = React.forwardRef(FlatListImpl);
export {
  FlatList
};
//# sourceMappingURL=FlatList.js.map