import React from "react";
import Animated from "react-native-reanimated";
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
import { jsx } from "react/jsx-runtime";
const ScrollViewMemo = React.memo(
  React.forwardRef(
    (props, passRef) => /* @__PURE__ */ jsx(
      Animated.ScrollView,
      {
        ref: passRef,
        ...props
      }
    )
  )
), ScrollView = React.forwardRef(
  ({
    contentContainerStyle,
    style,
    onContentSizeChange,
    children,
    refreshControl,
    ...rest
  }, passRef) => {
    const name = useTabNameContext(), ref = useSharedAnimatedRef(passRef), { setRef, contentInset } = useTabsContext(), {
      style: _style,
      contentContainerStyle: _contentContainerStyle,
      progressViewOffset
    } = useCollapsibleStyle(), { scrollHandler, enable } = useScrollHandlerY(name), onLayout = useAfterMountEffect(rest.onLayout, () => {
      "worklet";
      enable(!0);
    });
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
    return /* @__PURE__ */ jsx(
      ScrollViewMemo,
      {
        ...rest,
        onLayout,
        ref,
        bouncesZoom: !1,
        style: memoStyle,
        contentContainerStyle: memoContentContainerStyle,
        onScroll: scrollHandler,
        onContentSizeChange: scrollContentSizeChangeHandlers,
        scrollEventThrottle: 16,
        contentInset: memoContentInset,
        contentOffset: memoContentOffset,
        automaticallyAdjustContentInsets: !1,
        refreshControl: memoRefreshControl,
        onMomentumScrollEnd: () => {
        },
        children
      }
    );
  }
);
export {
  ScrollView
};
//# sourceMappingURL=ScrollView.js.map
