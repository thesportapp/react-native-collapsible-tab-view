var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var hooks_exports = {};
__export(hooks_exports, {
  useAfterMountEffect: () => useAfterMountEffect,
  useAnimatedDynamicRefs: () => useAnimatedDynamicRefs,
  useAnimatedTabIndex: () => useAnimatedTabIndex,
  useChainCallback: () => useChainCallback,
  useCollapsibleStyle: () => useCollapsibleStyle,
  useContainerRef: () => useContainerRef,
  useConvertAnimatedToValue: () => useConvertAnimatedToValue,
  useCurrentTabScrollY: () => useCurrentTabScrollY,
  useFocusedTab: () => useFocusedTab,
  useHeaderMeasurements: () => useHeaderMeasurements,
  usePageScrollHandler: () => usePageScrollHandler,
  useScrollHandlerY: () => useScrollHandlerY,
  useScroller: () => useScroller,
  useSharedAnimatedRef: () => useSharedAnimatedRef,
  useTabNameContext: () => useTabNameContext,
  useTabProps: () => useTabProps,
  useTabsContext: () => useTabsContext,
  useUpdateScrollViewContentSize: () => useUpdateScrollViewContentSize
});
module.exports = __toCommonJS(hooks_exports);
var import_react = require("react"), import_react_native = require("react-native-web"), import_react_native_reanimated = require("react-native-reanimated"), import_use_deep_compare = require("use-deep-compare"), import_Context = require("./Context"), import_helpers = require("./helpers");
function useContainerRef() {
  return (0, import_react_native_reanimated.useAnimatedRef)();
}
function useAnimatedDynamicRefs() {
  const [map, setMap] = (0, import_react.useState)({}), setRef = (0, import_react.useCallback)((key, ref) => (setMap((map2) => ({ ...map2, [key]: ref })), ref), []);
  return [map, setRef];
}
function useTabProps(children, tabType) {
  const options = (0, import_react.useMemo)(() => {
    const tabOptions = /* @__PURE__ */ new Map();
    return children && import_react.Children.forEach(children, (element, index) => {
      if (!element)
        return;
      if (element.type !== tabType)
        throw new Error(
          "Container children must be wrapped in a <Tabs.Tab ... /> component"
        );
      const { name, children: children2, ...options2 } = element.props;
      if (tabOptions.has(name))
        throw new Error(`Tab names must be unique, ${name} already exists`);
      tabOptions.set(name, {
        index,
        name,
        ...options2
      });
    }), tabOptions;
  }, [children, tabType]), optionEntries = Array.from(options.entries()), optionKeys = Array.from(options.keys()), memoizedOptions = (0, import_use_deep_compare.useDeepCompareMemo)(() => options, [optionEntries]), memoizedTabNames = (0, import_use_deep_compare.useDeepCompareMemo)(() => optionKeys, [optionKeys]);
  return [memoizedOptions, memoizedTabNames];
}
function useTabsContext() {
  const c = (0, import_react.useContext)(import_Context.Context);
  if (!c)
    throw new Error("useTabsContext must be inside a Tabs.Container");
  return c;
}
function useTabNameContext() {
  const c = (0, import_react.useContext)(import_Context.TabNameContext);
  if (!c)
    throw new Error("useTabNameContext must be inside a TabNameContext");
  return c;
}
function useCollapsibleStyle() {
  const {
    headerHeight,
    tabBarHeight,
    containerHeight,
    width,
    allowHeaderOverscroll,
    minHeaderHeight
  } = useTabsContext(), [containerHeightVal, tabBarHeightVal, headerHeightVal] = [
    useConvertAnimatedToValue(containerHeight),
    useConvertAnimatedToValue(tabBarHeight),
    useConvertAnimatedToValue(headerHeight)
  ], containerHeightWithMinHeader = Math.max(
    0,
    (containerHeightVal ?? 0) - minHeaderHeight
  );
  return (0, import_react.useMemo)(
    () => ({
      style: { width },
      contentContainerStyle: {
        minHeight: import_helpers.IS_IOS && !allowHeaderOverscroll ? containerHeightWithMinHeader - (tabBarHeightVal || 0) : containerHeightWithMinHeader + (headerHeightVal || 0),
        paddingTop: import_helpers.IS_IOS && !allowHeaderOverscroll ? 0 : (headerHeightVal || 0) + (tabBarHeightVal || 0)
      },
      progressViewOffset: (
        // on iOS we need the refresh control to be at the top if overscrolling
        import_helpers.IS_IOS && allowHeaderOverscroll ? 0 : (
          // on android we need it below the header or it doesn't show because of z-index
          (headerHeightVal || 0) + (tabBarHeightVal || 0)
        )
      )
    }),
    [
      allowHeaderOverscroll,
      headerHeightVal,
      tabBarHeightVal,
      width,
      containerHeightWithMinHeader
    ]
  );
}
function useUpdateScrollViewContentSize({ name }) {
  const { tabNames, contentHeights } = useTabsContext(), setContentHeights = (0, import_react.useCallback)(
    (name2, height) => {
      "worklet";
      const tabIndex = tabNames.value.indexOf(name2);
      contentHeights.value[tabIndex] = height, contentHeights.value = [...contentHeights.value];
    },
    [contentHeights, tabNames]
  );
  return (0, import_react.useCallback)(
    (_, h) => {
      (0, import_react_native_reanimated.runOnUI)(setContentHeights)(name, h);
    },
    [setContentHeights, name]
  );
}
function useChainCallback(fns) {
  return (0, import_react.useCallback)(
    (...args) => {
      fns.forEach((fn) => {
        typeof fn == "function" && fn(...args);
      });
    },
    [fns]
  );
}
function useScroller() {
  const { contentInset } = useTabsContext();
  return (0, import_react.useCallback)(
    (ref, x, y, animated, _debugKey) => {
      "worklet";
      if (!ref)
        return;
      //! this is left here on purpose to ease troubleshooting (uncomment when necessary)
      (0, import_helpers.scrollToImpl)(ref, x, y - contentInset.value, animated);
    },
    [contentInset]
  );
}
const useScrollHandlerY = (name) => {
  const {
    accDiffClamp,
    focusedTab,
    snapThreshold,
    revealHeaderOnScroll,
    refMap,
    tabNames,
    headerHeight,
    contentInset,
    containerHeight,
    scrollYCurrent,
    scrollY,
    oldAccScrollY,
    accScrollY,
    offset,
    headerScrollDistance,
    snappingTo,
    contentHeights,
    indexDecimal,
    allowHeaderOverscroll
  } = useTabsContext(), enabled = (0, import_react_native_reanimated.useSharedValue)(!1), scrollTo = useScroller(), enable = (0, import_react.useCallback)(
    (toggle) => {
      "worklet";
      if (enabled.value = toggle, toggle) {
        const ref = refMap[name], y = scrollY.value[name] ?? scrollYCurrent.value;
        scrollTo(ref, 0, y, !1, `[${name}] restore scroll position - enable`);
      }
    },
    [enabled, name, refMap, scrollTo, scrollY.value, scrollYCurrent.value]
  ), afterDrag = (0, import_react_native_reanimated.useSharedValue)(0), tabIndex = (0, import_react.useMemo)(
    () => tabNames.value.findIndex((n) => n === name),
    [tabNames, name]
  ), scrollAnimation = (0, import_react_native_reanimated.useSharedValue)(void 0);
  (0, import_react_native_reanimated.useAnimatedReaction)(
    () => scrollAnimation.value,
    (val) => {
      val !== void 0 && scrollTo(refMap[name], 0, val, !1, "[useAnimatedReaction scroll]");
    }
  );
  const onMomentumEnd = () => {
    "worklet";
    enabled.value && typeof snapThreshold == "number" && (revealHeaderOnScroll ? accDiffClamp.value > 0 && (scrollYCurrent.value > headerScrollDistance.value * snapThreshold ? accDiffClamp.value <= headerScrollDistance.value * snapThreshold ? accDiffClamp.value = (0, import_react_native_reanimated.withTiming)(0) : accDiffClamp.value < headerScrollDistance.value && (accDiffClamp.value = (0, import_react_native_reanimated.withTiming)(headerScrollDistance.value), scrollYCurrent.value < headerScrollDistance.value && (scrollAnimation.value = scrollYCurrent.value, scrollAnimation.value = (0, import_react_native_reanimated.withTiming)(headerScrollDistance.value))) : accDiffClamp.value = (0, import_react_native_reanimated.withTiming)(0)) : scrollYCurrent.value <= headerScrollDistance.value * snapThreshold ? (snappingTo.value = 0, scrollAnimation.value = scrollYCurrent.value, scrollAnimation.value = (0, import_react_native_reanimated.withTiming)(0)) : scrollYCurrent.value <= headerScrollDistance.value && (snappingTo.value = headerScrollDistance.value, scrollAnimation.value = scrollYCurrent.value, scrollAnimation.value = (0, import_react_native_reanimated.withTiming)(headerScrollDistance.value)));
  }, contentHeight = (0, import_react_native_reanimated.useDerivedValue)(() => {
    const tabIndex2 = tabNames.value.indexOf(name);
    return contentHeights.value[tabIndex2] || Number.MAX_VALUE;
  }, []), scrollHandler = (0, import_react_native_reanimated.useAnimatedScrollHandler)(
    {
      onScroll: (event) => {
        if (enabled.value && focusedTab.value === name) {
          if (import_helpers.IS_IOS) {
            let { y } = event.contentOffset;
            y = y + contentInset.value;
            const clampMax = contentHeight.value - (containerHeight.value || 0) + contentInset.value;
            scrollYCurrent.value = allowHeaderOverscroll ? y : (0, import_react_native_reanimated.interpolate)(
              y,
              [0, clampMax],
              [0, clampMax],
              import_react_native_reanimated.Extrapolation.CLAMP
            );
          } else {
            const { y } = event.contentOffset;
            scrollYCurrent.value = y;
          }
          if (scrollY.value[name] = scrollYCurrent.value, oldAccScrollY.value = accScrollY.value, accScrollY.value = scrollY.value[name] + offset.value, revealHeaderOnScroll) {
            const delta = accScrollY.value - oldAccScrollY.value, nextValue = accDiffClamp.value + delta;
            delta > 0 ? accDiffClamp.value = Math.min(
              headerScrollDistance.value,
              nextValue
            ) : delta < 0 && (accDiffClamp.value = Math.max(0, nextValue));
          }
        }
      },
      onBeginDrag: () => {
        enabled.value && ((0, import_react_native_reanimated.cancelAnimation)(accDiffClamp), import_helpers.IS_IOS && (0, import_react_native_reanimated.cancelAnimation)(afterDrag));
      },
      onEndDrag: () => {
        enabled.value && import_helpers.IS_IOS && (afterDrag.value = (0, import_react_native_reanimated.withDelay)(
          import_helpers.ONE_FRAME_MS,
          (0, import_react_native_reanimated.withTiming)(0, { duration: 0 }, (isFinished) => {
            isFinished && onMomentumEnd();
          })
        ));
      },
      onMomentumBegin: () => {
        enabled.value && import_helpers.IS_IOS && (0, import_react_native_reanimated.cancelAnimation)(afterDrag);
      },
      onMomentumEnd
    },
    [
      refMap,
      name,
      revealHeaderOnScroll,
      containerHeight,
      contentInset,
      snapThreshold,
      enabled,
      scrollTo
    ]
  );
  return (0, import_react_native_reanimated.useAnimatedReaction)(
    () => !Number.isInteger(indexDecimal.value),
    (isSyncNeeded, wasSyncNeeded) => {
      if (isSyncNeeded && isSyncNeeded !== wasSyncNeeded && focusedTab.value !== name) {
        let nextPosition = null;
        const focusedScrollY = scrollY.value[focusedTab.value], tabScrollY = scrollY.value[name];
        if (!(focusedScrollY === tabScrollY)) {
          const currIsOnTop = tabScrollY + import_react_native.StyleSheet.hairlineWidth <= headerScrollDistance.value, focusedIsOnTop = focusedScrollY + import_react_native.StyleSheet.hairlineWidth <= headerScrollDistance.value;
          revealHeaderOnScroll ? (accDiffClamp.value > tabScrollY || currIsOnTop) && (nextPosition = accDiffClamp.value) : typeof snapThreshold == "number" ? focusedIsOnTop ? nextPosition = snappingTo.value : currIsOnTop && (nextPosition = headerHeight.value || 0) : (currIsOnTop || focusedIsOnTop) && (nextPosition = Math.min(focusedScrollY, headerScrollDistance.value));
        }
        nextPosition !== null && (scrollY.value[name] = nextPosition, scrollTo(refMap[name], 0, nextPosition, !1, `[${name}] sync pane`));
      }
    },
    [revealHeaderOnScroll, refMap, snapThreshold, tabIndex, enabled, scrollTo]
  ), { scrollHandler, enable };
};
function useSharedAnimatedRef(outerRef) {
  const ref = (0, import_react_native_reanimated.useAnimatedRef)();
  return (0, import_react.useEffect)(() => {
    outerRef && (typeof outerRef == "function" ? outerRef(ref.current) : outerRef.current = ref.current);
  }), ref;
}
function useAfterMountEffect(nextOnLayout, effect) {
  const didExecute = (0, import_react.useRef)(!1), didMount = (0, import_react_native_reanimated.useSharedValue)(!1);
  return (0, import_react_native_reanimated.useAnimatedReaction)(
    () => didMount.value,
    (didMount2, prevDidMount) => {
      if (didMount2 && !prevDidMount) {
        if (didExecute.current)
          return;
        effect(), didExecute.current = !0;
      }
    }
  ), (0, import_react.useCallback)(
    (event) => (requestAnimationFrame(() => {
      didMount.value = !0;
    }), nextOnLayout == null ? void 0 : nextOnLayout(event)),
    [didMount, nextOnLayout]
  );
}
function useConvertAnimatedToValue(animatedValue) {
  const [value, setValue] = (0, import_react.useState)(animatedValue.value);
  return (0, import_react_native_reanimated.useAnimatedReaction)(
    () => animatedValue.value,
    (animValue) => {
      animValue !== value && (0, import_react_native_reanimated.runOnJS)(setValue)(animValue);
    },
    [value]
  ), value;
}
function useHeaderMeasurements() {
  const { headerTranslateY, headerHeight } = useTabsContext();
  return {
    top: headerTranslateY,
    height: headerHeight
  };
}
function useCurrentTabScrollY() {
  const { scrollYCurrent } = useTabsContext();
  return scrollYCurrent;
}
function useFocusedTab() {
  const { focusedTab } = useTabsContext();
  return useConvertAnimatedToValue(focusedTab);
}
function useAnimatedTabIndex() {
  const { indexDecimal } = useTabsContext();
  return indexDecimal;
}
const usePageScrollHandler = (handlers, dependencies) => {
  const { context, doDependenciesDiffer } = (0, import_react_native_reanimated.useHandler)(handlers, dependencies);
  return (0, import_react_native_reanimated.useEvent)(
    (event) => {
      "worklet";
      const { onPageScroll } = handlers;
      onPageScroll && event.eventName.endsWith("onPageScroll") && onPageScroll(event, context);
    },
    ["onPageScroll"],
    doDependenciesDiffer
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAfterMountEffect,
  useAnimatedDynamicRefs,
  useAnimatedTabIndex,
  useChainCallback,
  useCollapsibleStyle,
  useContainerRef,
  useConvertAnimatedToValue,
  useCurrentTabScrollY,
  useFocusedTab,
  useHeaderMeasurements,
  usePageScrollHandler,
  useScrollHandlerY,
  useScroller,
  useSharedAnimatedRef,
  useTabNameContext,
  useTabProps,
  useTabsContext,
  useUpdateScrollViewContentSize
});
//# sourceMappingURL=hooks.js.map
