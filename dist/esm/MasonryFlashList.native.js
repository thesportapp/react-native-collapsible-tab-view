import React, { useCallback } from "react";
import Animated, {
  useAnimatedReaction,
  useSharedValue
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
let AnimatedMasonry = null;
const ensureMasonry = () => {
  if (!AnimatedMasonry)
    try {
      const flashListModule = require("@shopify/flash-list");
      AnimatedMasonry = Animated.createAnimatedComponent(
        flashListModule.MasonryFlashList
      );
    } catch {
      console.error(
        "The optional dependency @shopify/flash-list is not installed. Please install it to use the FlashList component."
      );
    }
}, MasonryFlashListMemo = React.memo(
  React.forwardRef(
    (props, passRef) => (ensureMasonry(), AnimatedMasonry ? (
      // @ts-expect-error
      /* @__PURE__ */ React.createElement(AnimatedMasonry, { ref: passRef, ...props })
    ) : /* @__PURE__ */ React.createElement(React.Fragment, null))
  )
);
function MasonryFlashListImpl({
  style,
  onContentSizeChange,
  contentContainerStyle: _contentContainerStyle,
  refreshControl,
  ...rest
}, passRef) {
  const name = useTabNameContext(), { setRef, contentInset } = useTabsContext(), recyclerRef = useSharedAnimatedRef(null), ref = useSharedAnimatedRef(passRef), { scrollHandler, enable } = useScrollHandlerY(name), hadLoad = useSharedValue(!1), onLoad = useCallback(() => {
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
    /* @__PURE__ */ React.createElement(
      MasonryFlashListMemo,
      {
        ...rest,
        onLoad,
        contentContainerStyle: memoContentContainerStyle,
        ref: refWorkaround,
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
const MasonryFlashList = React.forwardRef(MasonryFlashListImpl);
export {
  MasonryFlashList
};
//# sourceMappingURL=MasonryFlashList.js.map
