import React, { useCallback } from "react";
import Animated, {
  useSharedValue,
  useAnimatedReaction
} from "react-native-reanimated";
import {
  useChainCallback,
  useCollapsibleStyle,
  useConvertAnimatedToValue,
  useScrollHandlerY,
  useSharedAnimatedRef,
  useTabNameContext,
  useTabsContext,
  useUpdateScrollViewContentSize
} from "./hooks";
import { Fragment, jsx } from "react/jsx-runtime";
let AnimatedFlashList = null;
const ensureFlastList = () => {
  if (!AnimatedFlashList)
    try {
      const flashListModule = require("@shopify/flash-list");
      AnimatedFlashList = Animated.createAnimatedComponent(
        flashListModule.FlashList
      );
    } catch {
      console.error(
        "The optional dependency @shopify/flash-list is not installed. Please install it to use the FlashList component."
      );
    }
}, FlashListMemo = React.memo(
  React.forwardRef((props, passRef) => (ensureFlastList(), AnimatedFlashList ? /* @__PURE__ */ jsx(AnimatedFlashList, { ref: passRef, ...props }) : /* @__PURE__ */ jsx(Fragment, {})))
);
function FlashListImpl({
  style,
  onContentSizeChange,
  refreshControl,
  contentContainerStyle: _contentContainerStyle,
  ...rest
}, passRef) {
  const name = useTabNameContext(), { setRef, contentInset } = useTabsContext(), ref = useSharedAnimatedRef(passRef), recyclerRef = useSharedAnimatedRef(null), { scrollHandler, enable } = useScrollHandlerY(name), hadLoad = useSharedValue(!1), onLoad = useCallback(() => {
    hadLoad.value = !0;
  }, [hadLoad]);
  useAnimatedReaction(
    () => hadLoad.value,
    (ready) => {
      ready && enable(!0);
    }
  );
  const { progressViewOffset, contentContainerStyle } = useCollapsibleStyle();
  React.useEffect(() => {
    setRef(name, recyclerRef);
  }, [name, recyclerRef, setRef]);
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
    () => ({
      paddingTop: contentContainerStyle.paddingTop,
      ..._contentContainerStyle
    }),
    [_contentContainerStyle, contentContainerStyle.paddingTop]
  ), refWorkaround = useCallback(
    (value) => {
      recyclerRef(value?.recyclerlistview_unsafe), ref(value);
    },
    [recyclerRef, ref]
  );
  return (
    // @ts-expect-error typescript complains about `unknown` in the memo, it should be T
    /* @__PURE__ */ jsx(
      FlashListMemo,
      {
        ...rest,
        onLoad,
        ref: refWorkaround,
        contentContainerStyle: memoContentContainerStyle,
        bouncesZoom: !1,
        onScroll: scrollHandler,
        scrollEventThrottle: 16,
        contentInset: memoContentInset,
        contentOffset: memoContentOffset,
        refreshControl: memoRefreshControl,
        progressViewOffset,
        automaticallyAdjustContentInsets: !1,
        onContentSizeChange: scrollContentSizeChangeHandlers
      }
    )
  );
}
const FlashList = React.forwardRef(FlashListImpl);
export {
  FlashList
};
//# sourceMappingURL=FlashList.js.map
