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
var Lazy_exports = {};
__export(Lazy_exports, {
  Lazy: () => Lazy
});
module.exports = __toCommonJS(Lazy_exports);
var import_react = __toESM(require("react")), import_react_native = require("react-native-web"), import_react_native_reanimated = __toESM(require("react-native-reanimated")), import_ScrollView = require("./ScrollView"), import_hooks = require("./hooks"), import_jsx_runtime = require("react/jsx-runtime");
const Lazy = ({
  children,
  cancelLazyFadeIn,
  startMounted: _startMounted,
  mountDelayMs = 50
}) => {
  const name = (0, import_hooks.useTabNameContext)(), { focusedTab, refMap } = (0, import_hooks.useTabsContext)(), startMounted = (0, import_react_native_reanimated.useSharedValue)(
    typeof _startMounted == "boolean" ? _startMounted : focusedTab.value === name
  ), didTriggerLayout = (0, import_react_native_reanimated.useSharedValue)(!1), [canMount, setCanMount] = import_react.default.useState(!!startMounted.value), isSelfMounted = import_react.default.useRef(!0), opacity = (0, import_react_native_reanimated.useSharedValue)(cancelLazyFadeIn || startMounted.value ? 1 : 0);
  import_react.default.useEffect(() => () => {
    isSelfMounted.current = !1;
  }, []);
  const startMountTimer = import_react.default.useCallback(
    (focusedTab2) => {
      setTimeout(() => {
        focusedTab2 === name && isSelfMounted.current && setCanMount(!0);
      }, mountDelayMs);
    },
    [mountDelayMs, name]
  );
  (0, import_react_native_reanimated.useAnimatedReaction)(
    () => focusedTab.value === name,
    (focused, wasFocused) => {
      focused && !wasFocused && !canMount && (cancelLazyFadeIn ? (opacity.value = 1, (0, import_react_native_reanimated.runOnJS)(setCanMount)(!0)) : (0, import_react_native_reanimated.runOnJS)(startMountTimer)(focusedTab.value));
    },
    [canMount, focusedTab]
  );
  const scrollTo = (0, import_hooks.useScroller)(), ref = name ? refMap[name] : null;
  (0, import_react_native_reanimated.useAnimatedReaction)(
    () => didTriggerLayout.value,
    (isMounted, wasMounted) => {
      isMounted && !wasMounted && !cancelLazyFadeIn && opacity.value !== 1 && (opacity.value = (0, import_react_native_reanimated.withTiming)(1));
    },
    [ref, cancelLazyFadeIn, name, didTriggerLayout, scrollTo]
  );
  const stylez = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }), [opacity]), onLayout = (0, import_react.useCallback)(() => {
    didTriggerLayout.value = !0;
  }, [didTriggerLayout]);
  return canMount ? cancelLazyFadeIn ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_native_reanimated.default.View,
    {
      pointerEvents: "box-none",
      style: [styles.container, cancelLazyFadeIn ? void 0 : stylez],
      onLayout,
      children
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ScrollView.ScrollView, {});
}, styles = import_react_native.StyleSheet.create({
  container: {
    flex: 1
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Lazy
});
//# sourceMappingURL=Lazy.js.map
