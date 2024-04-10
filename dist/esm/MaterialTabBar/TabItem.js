import { useMemo } from "react";
import { StyleSheet, Pressable, Platform } from "react-native-web";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";
import { jsx } from "react/jsx-runtime";
const TABBAR_HEIGHT = 48, DEFAULT_COLOR = "rgba(0, 0, 0, 1)", MaterialTabItem = (props) => {
  const {
    name,
    index,
    onPress,
    onLayout,
    scrollEnabled,
    indexDecimal,
    label,
    style,
    labelStyle,
    activeColor = DEFAULT_COLOR,
    inactiveColor = DEFAULT_COLOR,
    inactiveOpacity = 0.7,
    pressColor = "#DDDDDD",
    pressOpacity = Platform.OS === "ios" ? 0.2 : 1,
    ...rest
  } = props, stylez = useAnimatedStyle(() => ({
    opacity: interpolate(
      indexDecimal.value,
      [index - 1, index, index + 1],
      [inactiveOpacity, 1, inactiveOpacity],
      Extrapolation.CLAMP
    ),
    color: Math.abs(index - indexDecimal.value) < 0.5 ? activeColor : inactiveColor
  })), renderedLabel = useMemo(() => typeof label == "string" ? /* @__PURE__ */ jsx(Animated.Text, { style: [styles.label, stylez, labelStyle], children: label }) : label(props), [label, labelStyle, props, stylez]);
  return /* @__PURE__ */ jsx(
    Pressable,
    {
      onLayout,
      style: ({ pressed }) => [
        { opacity: pressed ? pressOpacity : 1 },
        !scrollEnabled && styles.grow,
        styles.item,
        style
      ],
      onPress: () => onPress(name),
      android_ripple: {
        borderless: !0,
        color: pressColor
      },
      ...rest,
      children: renderedLabel
    }
  );
}, styles = StyleSheet.create({
  grow: {
    flex: 1
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: TABBAR_HEIGHT
  },
  label: {
    margin: 4
  }
});
export {
  MaterialTabItem,
  TABBAR_HEIGHT
};
//# sourceMappingURL=TabItem.js.map
