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
var TabBar_exports = {};
__export(TabBar_exports, {
  MaterialTabBar: () => MemoizedTabBar,
  TABBAR_HEIGHT: () => TABBAR_HEIGHT
});
module.exports = __toCommonJS(TabBar_exports);
var import_react = __toESM(require("react")), import_react_native = require("react-native-web"), import_react_native_reanimated = __toESM(require("react-native-reanimated")), import_Indicator = require("./Indicator"), import_TabItem = require("./TabItem"), import_jsx_runtime = require("react/jsx-runtime");
const TABBAR_HEIGHT = 48, MaterialTabBar = ({
  tabNames,
  indexDecimal,
  scrollEnabled = !1,
  indicatorStyle,
  index,
  TabItemComponent = import_TabItem.MaterialTabItem,
  getLabelText = (name) => String(name).toUpperCase(),
  onTabPress,
  style,
  tabProps,
  contentContainerStyle,
  labelStyle,
  inactiveColor,
  activeColor,
  tabStyle,
  width: customWidth,
  keepActiveTabCentered
}) => {
  const tabBarRef = (0, import_react_native_reanimated.useAnimatedRef)(), windowWidth = (0, import_react_native.useWindowDimensions)().width, width = customWidth ?? windowWidth, isFirstRender = import_react.default.useRef(!0), itemLayoutGathering = import_react.default.useRef(/* @__PURE__ */ new Map()), tabsOffset = (0, import_react_native_reanimated.useSharedValue)(0), isScrolling = (0, import_react_native_reanimated.useSharedValue)(!1), nTabs = tabNames.length, [itemsLayout, setItemsLayout] = import_react.default.useState(
    scrollEnabled ? [] : tabNames.map((_, i) => {
      const tabWidth = width / nTabs;
      return { width: tabWidth, x: i * tabWidth };
    })
  );
  import_react.default.useEffect(() => {
    if (isFirstRender.current)
      isFirstRender.current = !1;
    else if (!scrollEnabled) {
      const tabWidth = width / nTabs;
      setItemsLayout(
        tabNames.map((_, i) => ({ width: tabWidth, x: i * tabWidth }))
      );
    }
  }, [scrollEnabled, nTabs, tabNames, width]);
  const onTabItemLayout = import_react.default.useCallback(
    (event, name) => {
      var _a;
      if (scrollEnabled) {
        if (!((_a = event.nativeEvent) != null && _a.layout))
          return;
        const { width: width2, x } = event.nativeEvent.layout;
        itemLayoutGathering.current.set(name, {
          width: width2,
          x
        });
        const layout = Array.from(itemLayoutGathering.current.entries()).filter(([tabName]) => tabNames.includes(tabName)).map(([, layout2]) => layout2).sort((a, b) => a.x - b.x);
        layout.length === tabNames.length && setItemsLayout(layout);
      }
    },
    [scrollEnabled, tabNames]
  ), cancelNextScrollSync = (0, import_react_native_reanimated.useSharedValue)(index.value), onScroll = (0, import_react_native_reanimated.useAnimatedScrollHandler)(
    {
      onScroll: (event) => {
        tabsOffset.value = event.contentOffset.x;
      },
      onBeginDrag: () => {
        isScrolling.value = !0, cancelNextScrollSync.value = index.value;
      },
      onMomentumEnd: () => {
        isScrolling.value = !1;
      }
    },
    []
  ), currentIndexToSync = (0, import_react_native_reanimated.useSharedValue)(index.value), targetIndexToSync = (0, import_react_native_reanimated.useSharedValue)(index.value);
  return (0, import_react_native_reanimated.useAnimatedReaction)(
    () => index.value,
    (nextIndex) => {
      scrollEnabled && ((0, import_react_native_reanimated.cancelAnimation)(currentIndexToSync), targetIndexToSync.value = nextIndex, currentIndexToSync.value = (0, import_react_native_reanimated.withTiming)(nextIndex));
    },
    [scrollEnabled]
  ), (0, import_react_native_reanimated.useAnimatedReaction)(
    () => currentIndexToSync.value === targetIndexToSync.value,
    (canSync) => {
      if (canSync && scrollEnabled && itemsLayout.length === nTabs && itemsLayout[index.value]) {
        const halfTab = itemsLayout[index.value].width / 2, offset = itemsLayout[index.value].x;
        (keepActiveTabCentered || offset < tabsOffset.value || offset > tabsOffset.value + width - 2 * halfTab) && (0, import_react_native_reanimated.scrollTo)(tabBarRef, offset - width / 2 + halfTab, 0, !0);
      }
    },
    [scrollEnabled, itemsLayout, nTabs]
  ), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react_native_reanimated.default.ScrollView,
    {
      ref: tabBarRef,
      horizontal: !0,
      style,
      contentContainerStyle: [
        styles.contentContainer,
        !scrollEnabled && { width },
        contentContainerStyle
      ],
      keyboardShouldPersistTaps: "handled",
      bounces: !1,
      alwaysBounceHorizontal: !1,
      scrollsToTop: !1,
      showsHorizontalScrollIndicator: !1,
      automaticallyAdjustContentInsets: !1,
      overScrollMode: "never",
      scrollEnabled,
      onScroll: scrollEnabled ? onScroll : void 0,
      scrollEventThrottle: 16,
      children: [
        tabNames.map((name, i) => {
          var _a;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            TabItemComponent,
            {
              index: i,
              name,
              label: ((_a = tabProps.get(name)) == null ? void 0 : _a.label) || getLabelText(name),
              onPress: onTabPress,
              onLayout: scrollEnabled ? (event) => onTabItemLayout(event, name) : void 0,
              scrollEnabled,
              indexDecimal,
              labelStyle,
              activeColor,
              inactiveColor,
              style: tabStyle
            },
            name
          );
        }),
        itemsLayout.length === nTabs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_Indicator.Indicator,
          {
            indexDecimal,
            itemsLayout,
            fadeIn: scrollEnabled,
            style: indicatorStyle
          }
        )
      ]
    }
  );
}, MemoizedTabBar = import_react.default.memo(MaterialTabBar);
const styles = import_react_native.StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    flexWrap: "nowrap"
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MaterialTabBar,
  TABBAR_HEIGHT
});
//# sourceMappingURL=TabBar.js.map
