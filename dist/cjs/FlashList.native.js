"use strict";
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
var FlashList_exports = {};
__export(FlashList_exports, {
  FlashList: () => FlashList
});
module.exports = __toCommonJS(FlashList_exports);
var import_react = __toESM(require("react")), import_react_native_reanimated = __toESM(require("react-native-reanimated")), import_hooks = require("./hooks");
let AnimatedFlashList = null;
const ensureFlastList = () => {
  if (!AnimatedFlashList)
    try {
      const flashListModule = require("@shopify/flash-list");
      AnimatedFlashList = import_react_native_reanimated.default.createAnimatedComponent(
        flashListModule.FlashList
      );
    } catch {
      console.error(
        "The optional dependency @shopify/flash-list is not installed. Please install it to use the FlashList component."
      );
    }
}, FlashListMemo = import_react.default.memo(
  import_react.default.forwardRef((props, passRef) => (ensureFlastList(), AnimatedFlashList ? /* @__PURE__ */ import_react.default.createElement(AnimatedFlashList, { ref: passRef, ...props }) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null)))
);
function FlashListImpl({
  style,
  onContentSizeChange,
  refreshControl,
  contentContainerStyle: _contentContainerStyle,
  ...rest
}, passRef) {
  const name = (0, import_hooks.useTabNameContext)(), { setRef, contentInset } = (0, import_hooks.useTabsContext)(), ref = (0, import_hooks.useSharedAnimatedRef)(passRef), recyclerRef = (0, import_hooks.useSharedAnimatedRef)(null), { scrollHandler, enable } = (0, import_hooks.useScrollHandlerY)(name), hadLoad = (0, import_react_native_reanimated.useSharedValue)(!1), onLoad = (0, import_react.useCallback)(() => {
    hadLoad.value = !0;
  }, [hadLoad]);
  (0, import_react_native_reanimated.useAnimatedReaction)(
    () => hadLoad.value,
    (ready) => {
      ready && enable(!0);
    }
  );
  const { progressViewOffset, contentContainerStyle } = (0, import_hooks.useCollapsibleStyle)();
  import_react.default.useEffect(() => {
    setRef(name, recyclerRef);
  }, [name, recyclerRef, setRef]);
  const scrollContentSizeChange = (0, import_hooks.useUpdateScrollViewContentSize)({
    name
  }), scrollContentSizeChangeHandlers = (0, import_hooks.useChainCallback)(
    import_react.default.useMemo(
      () => [scrollContentSizeChange, onContentSizeChange],
      [onContentSizeChange, scrollContentSizeChange]
    )
  ), memoRefreshControl = import_react.default.useMemo(
    () => refreshControl && import_react.default.cloneElement(refreshControl, {
      progressViewOffset,
      ...refreshControl.props
    }),
    [progressViewOffset, refreshControl]
  ), contentInsetValue = (0, import_hooks.useConvertAnimatedToValue)(contentInset), memoContentInset = import_react.default.useMemo(
    () => ({ top: contentInsetValue }),
    [contentInsetValue]
  ), memoContentOffset = import_react.default.useMemo(
    () => ({ x: 0, y: -contentInsetValue }),
    [contentInsetValue]
  ), memoContentContainerStyle = import_react.default.useMemo(
    () => ({
      paddingTop: contentContainerStyle.paddingTop,
      ..._contentContainerStyle
    }),
    [_contentContainerStyle, contentContainerStyle.paddingTop]
  ), refWorkaround = (0, import_react.useCallback)(
    (value) => {
      recyclerRef(value == null ? void 0 : value.recyclerlistview_unsafe), ref(value);
    },
    [recyclerRef, ref]
  );
  return (
    // @ts-expect-error typescript complains about `unknown` in the memo, it should be T
    /* @__PURE__ */ import_react.default.createElement(
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
const FlashList = import_react.default.forwardRef(FlashListImpl);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FlashList
});
//# sourceMappingURL=FlashList.js.map
