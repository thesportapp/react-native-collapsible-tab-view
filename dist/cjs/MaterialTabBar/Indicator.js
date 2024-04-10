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
var Indicator_exports = {};
__export(Indicator_exports, {
  Indicator: () => Indicator
});
module.exports = __toCommonJS(Indicator_exports);
var import_react = __toESM(require("react")), import_react_native = require("react-native-web"), import_react_native_reanimated = __toESM(require("react-native-reanimated")), import_helpers = require("../helpers"), import_jsx_runtime = require("react/jsx-runtime");
const Indicator = ({
  indexDecimal,
  itemsLayout,
  style,
  fadeIn = !1
}) => {
  const opacity = (0, import_react_native_reanimated.useSharedValue)(fadeIn ? 0 : 1), stylez = (0, import_react_native_reanimated.useAnimatedStyle)(() => {
    var _a;
    const transform = itemsLayout.length > 1 ? [
      {
        translateX: (0, import_react_native_reanimated.interpolate)(
          indexDecimal.value,
          itemsLayout.map((_, i) => i),
          // when in RTL mode, the X value should be inverted
          itemsLayout.map((v) => import_helpers.isRTL ? -1 * v.x : v.x)
        )
      }
    ] : void 0, width = itemsLayout.length > 1 ? (0, import_react_native_reanimated.interpolate)(
      indexDecimal.value,
      itemsLayout.map((_, i) => i),
      itemsLayout.map((v) => v.width)
    ) : (_a = itemsLayout[0]) == null ? void 0 : _a.width;
    return {
      transform,
      width,
      opacity: (0, import_react_native_reanimated.withTiming)(opacity.value)
    };
  }, [indexDecimal, itemsLayout]);
  return import_react.default.useEffect(() => {
    fadeIn && (opacity.value = 1);
  }, [fadeIn]), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native_reanimated.default.View, { style: [stylez, styles.indicator, style] });
}, styles = import_react_native.StyleSheet.create({
  indicator: {
    height: 2,
    backgroundColor: "#2196f3",
    position: "absolute",
    bottom: 0
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Indicator
});
//# sourceMappingURL=Indicator.js.map
