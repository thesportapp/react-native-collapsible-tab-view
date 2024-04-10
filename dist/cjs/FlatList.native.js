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
var FlatList_exports = {};
__export(FlatList_exports, {
  FlatList: () => FlatList
});
module.exports = __toCommonJS(FlatList_exports);
var import_react = __toESM(require("react")), import_helpers = require("./helpers"), import_hooks = require("./hooks");
const FlatListMemo = import_react.default.memo(
  import_react.default.forwardRef(
    (props, passRef) => /* @__PURE__ */ import_react.default.createElement(import_helpers.AnimatedFlatList, { ref: passRef, ...props })
  )
);
function FlatListImpl({
  contentContainerStyle,
  style,
  onContentSizeChange,
  refreshControl,
  ...rest
}, passRef) {
  const name = (0, import_hooks.useTabNameContext)(), { setRef, contentInset } = (0, import_hooks.useTabsContext)(), ref = (0, import_hooks.useSharedAnimatedRef)(passRef), { scrollHandler, enable } = (0, import_hooks.useScrollHandlerY)(name), onLayout = (0, import_hooks.useAfterMountEffect)(rest.onLayout, () => {
    "worklet";
    enable(!0);
  }), {
    style: _style,
    contentContainerStyle: _contentContainerStyle,
    progressViewOffset
  } = (0, import_hooks.useCollapsibleStyle)();
  import_react.default.useEffect(() => {
    setRef(name, ref);
  }, [name, ref, setRef]);
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
    () => [
      _contentContainerStyle,
      // TODO: investigate types
      contentContainerStyle
    ],
    [_contentContainerStyle, contentContainerStyle]
  ), memoStyle = import_react.default.useMemo(() => [_style, style], [_style, style]);
  return (
    // @ts-expect-error typescript complains about `unknown` in the memo, it should be T
    /* @__PURE__ */ import_react.default.createElement(
      FlatListMemo,
      {
        ...rest,
        onLayout,
        ref,
        bouncesZoom: !1,
        style: memoStyle,
        contentContainerStyle: memoContentContainerStyle,
        progressViewOffset,
        onScroll: scrollHandler,
        onContentSizeChange: scrollContentSizeChangeHandlers,
        scrollEventThrottle: 16,
        contentInset: memoContentInset,
        contentOffset: memoContentOffset,
        automaticallyAdjustContentInsets: !1,
        refreshControl: memoRefreshControl,
        onMomentumScrollEnd: () => {
        }
      }
    )
  );
}
const FlatList = import_react.default.forwardRef(FlatListImpl);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FlatList
});
//# sourceMappingURL=FlatList.js.map
