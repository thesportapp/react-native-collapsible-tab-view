import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate
} from "react-native-reanimated";
import { isRTL } from "../helpers";
const Indicator = ({
  indexDecimal,
  itemsLayout,
  style,
  fadeIn = !1
}) => {
  const opacity = useSharedValue(fadeIn ? 0 : 1), stylez = useAnimatedStyle(() => {
    const transform = itemsLayout.length > 1 ? [
      {
        translateX: interpolate(
          indexDecimal.value,
          itemsLayout.map((_, i) => i),
          // when in RTL mode, the X value should be inverted
          itemsLayout.map((v) => isRTL ? -1 * v.x : v.x)
        )
      }
    ] : void 0, width = itemsLayout.length > 1 ? interpolate(
      indexDecimal.value,
      itemsLayout.map((_, i) => i),
      itemsLayout.map((v) => v.width)
    ) : itemsLayout[0]?.width;
    return {
      transform,
      width,
      opacity: withTiming(opacity.value)
    };
  }, [indexDecimal, itemsLayout]);
  return React.useEffect(() => {
    fadeIn && (opacity.value = 1);
  }, [fadeIn]), /* @__PURE__ */ React.createElement(Animated.View, { style: [stylez, styles.indicator, style] });
}, styles = StyleSheet.create({
  indicator: {
    height: 2,
    backgroundColor: "#2196f3",
    position: "absolute",
    bottom: 0
  }
});
export {
  Indicator
};
//# sourceMappingURL=Indicator.js.map
