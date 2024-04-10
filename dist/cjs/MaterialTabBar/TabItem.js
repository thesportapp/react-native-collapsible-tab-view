var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var TabItem_exports = {};
__export(TabItem_exports, {
  MaterialTabItem: () => MaterialTabItem,
  TABBAR_HEIGHT: () => TABBAR_HEIGHT
});
module.exports = __toCommonJS(TabItem_exports);
var import_react = require("react"), import_react_native = require("react-native-web"), import_react_native_reanimated = __toESM(require("react-native-reanimated")), import_jsx_runtime = require("react/jsx-runtime");
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
    pressOpacity = import_react_native.Platform.OS === "ios" ? 0.2 : 1,
    ...rest
  } = props, stylez = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    opacity: (0, import_react_native_reanimated.interpolate)(
      indexDecimal.value,
      [index - 1, index, index + 1],
      [inactiveOpacity, 1, inactiveOpacity],
      import_react_native_reanimated.Extrapolation.CLAMP
    ),
    color: Math.abs(index - indexDecimal.value) < 0.5 ? activeColor : inactiveColor
  })), renderedLabel = (0, import_react.useMemo)(() => typeof label == "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native_reanimated.default.Text, { style: [styles.label, stylez, labelStyle], children: label }) : label(props), [label, labelStyle, props, stylez]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_native.Pressable,
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
}, styles = import_react_native.StyleSheet.create({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MaterialTabItem,
  TABBAR_HEIGHT
});
//# sourceMappingURL=TabItem.js.map
