import React, { useCallback } from "react";
import { StyleSheet } from "react-native-web";
import Animated, {
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
  withTiming,
  useAnimatedStyle
} from "react-native-reanimated";
import { ScrollView } from "./ScrollView";
import { useScroller, useTabNameContext, useTabsContext } from "./hooks";
import { jsx } from "react/jsx-runtime";
const Lazy = ({
  children,
  cancelLazyFadeIn,
  startMounted: _startMounted,
  mountDelayMs = 50
}) => {
  const name = useTabNameContext(), { focusedTab, refMap } = useTabsContext(), startMounted = useSharedValue(
    typeof _startMounted == "boolean" ? _startMounted : focusedTab.value === name
  ), didTriggerLayout = useSharedValue(!1), [canMount, setCanMount] = React.useState(!!startMounted.value), isSelfMounted = React.useRef(!0), opacity = useSharedValue(cancelLazyFadeIn || startMounted.value ? 1 : 0);
  React.useEffect(() => () => {
    isSelfMounted.current = !1;
  }, []);
  const startMountTimer = React.useCallback(
    (focusedTab2) => {
      setTimeout(() => {
        focusedTab2 === name && isSelfMounted.current && setCanMount(!0);
      }, mountDelayMs);
    },
    [mountDelayMs, name]
  );
  useAnimatedReaction(
    () => focusedTab.value === name,
    (focused, wasFocused) => {
      focused && !wasFocused && !canMount && (cancelLazyFadeIn ? (opacity.value = 1, runOnJS(setCanMount)(!0)) : runOnJS(startMountTimer)(focusedTab.value));
    },
    [canMount, focusedTab]
  );
  const scrollTo = useScroller(), ref = name ? refMap[name] : null;
  useAnimatedReaction(
    () => didTriggerLayout.value,
    (isMounted, wasMounted) => {
      isMounted && !wasMounted && !cancelLazyFadeIn && opacity.value !== 1 && (opacity.value = withTiming(1));
    },
    [ref, cancelLazyFadeIn, name, didTriggerLayout, scrollTo]
  );
  const stylez = useAnimatedStyle(() => ({
    opacity: opacity.value
  }), [opacity]), onLayout = useCallback(() => {
    didTriggerLayout.value = !0;
  }, [didTriggerLayout]);
  return canMount ? cancelLazyFadeIn ? children : /* @__PURE__ */ jsx(
    Animated.View,
    {
      pointerEvents: "box-none",
      style: [styles.container, cancelLazyFadeIn ? void 0 : stylez],
      onLayout,
      children
    }
  ) : /* @__PURE__ */ jsx(ScrollView, {});
}, styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export {
  Lazy
};
//# sourceMappingURL=Lazy.js.map
