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
var Container_exports = {};
__export(Container_exports, {
  Container: () => Container
});
module.exports = __toCommonJS(Container_exports);
var import_react = __toESM(require("react")), import_react_native = require("react-native"), import_react_native_pager_view = __toESM(require("react-native-pager-view")), import_react_native_reanimated = __toESM(require("react-native-reanimated")), import_Context = require("./Context"), import_Lazy = require("./Lazy"), import_MaterialTabBar = require("./MaterialTabBar"), import_Tab = require("./Tab"), import_helpers = require("./helpers"), import_hooks = require("./hooks");
const AnimatedPagerView = import_react_native_reanimated.default.createAnimatedComponent(import_react_native_pager_view.default), Container = import_react.default.memo(
  import_react.default.forwardRef(
    ({
      initialTabName,
      headerHeight: initialHeaderHeight,
      minHeaderHeight = 0,
      tabBarHeight: initialTabBarHeight = import_MaterialTabBar.TABBAR_HEIGHT,
      revealHeaderOnScroll = !1,
      snapThreshold,
      children,
      renderHeader,
      renderTabBar = (props) => /* @__PURE__ */ import_react.default.createElement(import_MaterialTabBar.MaterialTabBar, { ...props }),
      headerContainerStyle,
      cancelTranslation,
      containerStyle,
      lazy,
      cancelLazyFadeIn,
      pagerProps,
      onIndexChange,
      onTabChange,
      width: customWidth,
      allowHeaderOverscroll
    }, ref) => {
      const containerRef = (0, import_hooks.useContainerRef)(), [tabProps, tabNamesArray] = (0, import_hooks.useTabProps)(children, import_Tab.Tab), [refMap, setRef] = (0, import_hooks.useAnimatedDynamicRefs)(), windowWidth = (0, import_react_native.useWindowDimensions)().width, width = customWidth ?? windowWidth, containerHeight = (0, import_react_native_reanimated.useSharedValue)(void 0), tabBarHeight = (0, import_react_native_reanimated.useSharedValue)(
        initialTabBarHeight
      ), headerHeight = (0, import_react_native_reanimated.useSharedValue)(
        renderHeader ? initialHeaderHeight : 0
      ), contentInset = (0, import_react_native_reanimated.useDerivedValue)(() => allowHeaderOverscroll ? 0 : import_helpers.IS_IOS ? (headerHeight.value || 0) + (tabBarHeight.value || 0) : 0), snappingTo = (0, import_react_native_reanimated.useSharedValue)(0), offset = (0, import_react_native_reanimated.useSharedValue)(0), accScrollY = (0, import_react_native_reanimated.useSharedValue)(0), oldAccScrollY = (0, import_react_native_reanimated.useSharedValue)(0), accDiffClamp = (0, import_react_native_reanimated.useSharedValue)(0), scrollYCurrent = (0, import_react_native_reanimated.useSharedValue)(0), scrollY = (0, import_react_native_reanimated.useSharedValue)(
        Object.fromEntries(tabNamesArray.map((n) => [n, 0]))
      ), contentHeights = (0, import_react_native_reanimated.useSharedValue)(
        tabNamesArray.map(() => 0)
      ), tabNames = (0, import_react_native_reanimated.useDerivedValue)(
        () => tabNamesArray,
        [tabNamesArray]
      ), index = (0, import_react_native_reanimated.useSharedValue)(
        initialTabName ? tabNames.value.findIndex((n) => n === initialTabName) : 0
      ), focusedTab = (0, import_react_native_reanimated.useDerivedValue)(() => tabNames.value[index.value], [tabNames]), calculateNextOffset = (0, import_react_native_reanimated.useSharedValue)(index.value), headerScrollDistance = (0, import_react_native_reanimated.useDerivedValue)(() => headerHeight.value !== void 0 ? headerHeight.value - minHeaderHeight : 0, [headerHeight, minHeaderHeight]), indexDecimal = (0, import_react_native_reanimated.useSharedValue)(
        index.value
      ), afterRender = (0, import_react_native_reanimated.useSharedValue)(0);
      import_react.default.useEffect(() => {
        afterRender.value = (0, import_react_native_reanimated.withDelay)(
          import_helpers.ONE_FRAME_MS * 5,
          (0, import_react_native_reanimated.withTiming)(1, { duration: 0 })
        );
      }, [afterRender, tabNamesArray]);
      const resyncTabScroll = () => {
        "worklet";
        for (const name of tabNamesArray)
          (0, import_helpers.scrollToImpl)(
            refMap[name],
            0,
            scrollYCurrent.value - contentInset.value,
            !1
          );
      };
      (0, import_react_native_reanimated.useAnimatedReaction)(
        () => afterRender.value === 1,
        (trigger) => {
          trigger && (afterRender.value = 0, resyncTabScroll());
        },
        [tabNamesArray, refMap, afterRender, contentInset]
      ), (0, import_react_native_reanimated.useAnimatedReaction)(
        () => Math.round(indexDecimal.value),
        (nextIndex) => {
          nextIndex !== null && nextIndex !== index.value && (calculateNextOffset.value = nextIndex);
        },
        []
      );
      const propagateTabChange = import_react.default.useCallback(
        (change) => {
          onTabChange == null || onTabChange(change), onIndexChange == null || onIndexChange(change.index);
        },
        [onIndexChange, onTabChange]
      );
      (0, import_react_native_reanimated.useAnimatedReaction)(
        () => calculateNextOffset.value,
        (i) => {
          i !== index.value && (offset.value = scrollY.value[tabNames.value[index.value]] - scrollY.value[tabNames.value[i]] + offset.value, (0, import_react_native_reanimated.runOnJS)(propagateTabChange)({
            prevIndex: index.value,
            index: i,
            prevTabName: tabNames.value[index.value],
            tabName: tabNames.value[i]
          }), index.value = i, typeof scrollY.value[tabNames.value[index.value]] == "number" && (scrollYCurrent.value = scrollY.value[tabNames.value[index.value]] || 0));
        },
        []
      ), (0, import_react_native_reanimated.useAnimatedReaction)(
        () => headerHeight.value,
        (_current, prev) => {
          prev === void 0 && resyncTabScroll();
        }
      );
      const headerTranslateY = (0, import_react_native_reanimated.useDerivedValue)(() => revealHeaderOnScroll ? -accDiffClamp.value : -Math.min(scrollYCurrent.value, headerScrollDistance.value), [revealHeaderOnScroll]), stylez = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
        transform: [
          {
            translateY: headerTranslateY.value
          }
        ]
      }), [revealHeaderOnScroll]), getHeaderHeight = import_react.default.useCallback(
        (event) => {
          const height = event.nativeEvent.layout.height;
          headerHeight.value !== height && (headerHeight.value = height);
        },
        [headerHeight]
      ), getTabBarHeight = import_react.default.useCallback(
        (event) => {
          const height = event.nativeEvent.layout.height;
          tabBarHeight.value !== height && (tabBarHeight.value = height);
        },
        [tabBarHeight]
      ), onLayout = import_react.default.useCallback(
        (event) => {
          const height = event.nativeEvent.layout.height;
          containerHeight.value !== height && (containerHeight.value = height);
        },
        [containerHeight]
      ), onTabPress = import_react.default.useCallback(
        (name) => {
          var _a;
          const i = tabNames.value.findIndex((n) => n === name);
          if (name === focusedTab.value) {
            const ref2 = refMap[name];
            (0, import_react_native_reanimated.runOnUI)(import_helpers.scrollToImpl)(
              ref2,
              0,
              headerScrollDistance.value - contentInset.value,
              !0
            );
          } else
            (_a = containerRef.current) == null || _a.setPage(i);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [containerRef, refMap, contentInset]
      );
      import_react.default.useEffect(() => {
        index.value >= tabNamesArray.length && onTabPress(tabNamesArray[tabNamesArray.length - 1]);
      }, [index.value, onTabPress, tabNamesArray]);
      const pageScrollHandler = (0, import_hooks.usePageScrollHandler)({
        onPageScroll: (e) => {
          "worklet";
          indexDecimal.value = e.position + e.offset;
        }
      });
      return import_react.default.useImperativeHandle(
        ref,
        () => ({
          setIndex: (index2) => {
            const name = tabNames.value[index2];
            return onTabPress(name), !0;
          },
          jumpToTab: (name) => (onTabPress(name), !0),
          getFocusedTab: () => tabNames.value[index.value],
          getCurrentIndex: () => index.value
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onTabPress]
      ), /* @__PURE__ */ import_react.default.createElement(
        import_Context.Context.Provider,
        {
          value: {
            contentInset,
            tabBarHeight,
            headerHeight,
            refMap,
            tabNames,
            index,
            snapThreshold,
            revealHeaderOnScroll,
            focusedTab,
            accDiffClamp,
            indexDecimal,
            containerHeight,
            minHeaderHeight,
            scrollYCurrent,
            scrollY,
            setRef,
            headerScrollDistance,
            accScrollY,
            oldAccScrollY,
            offset,
            snappingTo,
            contentHeights,
            headerTranslateY,
            width,
            allowHeaderOverscroll
          }
        },
        /* @__PURE__ */ import_react.default.createElement(
          import_react_native_reanimated.default.View,
          {
            style: [styles.container, { width }, containerStyle],
            onLayout,
            pointerEvents: "box-none"
          },
          /* @__PURE__ */ import_react.default.createElement(
            import_react_native_reanimated.default.View,
            {
              pointerEvents: "box-none",
              style: [
                styles.topContainer,
                headerContainerStyle,
                !cancelTranslation && stylez
              ]
            },
            /* @__PURE__ */ import_react.default.createElement(
              import_react_native.View,
              {
                style: [styles.container, styles.headerContainer],
                onLayout: getHeaderHeight,
                pointerEvents: "box-none"
              },
              renderHeader && renderHeader({
                containerRef,
                index,
                tabNames: tabNamesArray,
                focusedTab,
                indexDecimal,
                onTabPress,
                tabProps
              })
            ),
            /* @__PURE__ */ import_react.default.createElement(
              import_react_native.View,
              {
                style: [styles.container, styles.tabBarContainer],
                onLayout: getTabBarHeight,
                pointerEvents: "box-none"
              },
              renderTabBar && renderTabBar({
                containerRef,
                index,
                tabNames: tabNamesArray,
                focusedTab,
                indexDecimal,
                width,
                onTabPress,
                tabProps
              })
            )
          ),
          /* @__PURE__ */ import_react.default.createElement(
            AnimatedPagerView,
            {
              ref: containerRef,
              onPageScroll: pageScrollHandler,
              initialPage: index.value,
              ...pagerProps,
              style: [pagerProps == null ? void 0 : pagerProps.style, import_react_native.StyleSheet.absoluteFill]
            },
            tabNamesArray.map((tabName, i) => /* @__PURE__ */ import_react.default.createElement(import_react_native.View, { key: i }, /* @__PURE__ */ import_react.default.createElement(import_Context.TabNameContext.Provider, { value: tabName }, /* @__PURE__ */ import_react.default.createElement(
              import_Lazy.Lazy,
              {
                startMounted: lazy ? void 0 : !0,
                cancelLazyFadeIn: lazy ? !!cancelLazyFadeIn : !0,
                key: tabName
              },
              import_react.default.Children.toArray(children)[i]
            ))))
          )
        )
      );
    }
  )
), styles = import_react_native.StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    position: "absolute",
    zIndex: 100,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  tabBarContainer: {
    zIndex: 1
  },
  headerContainer: {
    zIndex: 2
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Container
});
//# sourceMappingURL=Container.js.map
