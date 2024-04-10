import {
  useMemo,
  Children,
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef
} from "react";
import { StyleSheet } from "react-native-web";
import {
  cancelAnimation,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  withDelay,
  withTiming,
  interpolate,
  runOnJS,
  runOnUI,
  useDerivedValue,
  useEvent,
  useHandler,
  Extrapolation
} from "react-native-reanimated";
import { useDeepCompareMemo } from "use-deep-compare";
import { Context, TabNameContext } from "./Context";
import { IS_IOS, ONE_FRAME_MS, scrollToImpl } from "./helpers";
function useContainerRef() {
  return useAnimatedRef();
}
function useAnimatedDynamicRefs() {
  const [map, setMap] = useState({}), setRef = useCallback((key, ref) => (setMap((map2) => ({ ...map2, [key]: ref })), ref), []);
  return [map, setRef];
}
function useTabProps(children, tabType) {
  const options = useMemo(() => {
    const tabOptions = /* @__PURE__ */ new Map();
    return children && Children.forEach(children, (element, index) => {
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
  }, [children, tabType]), optionEntries = Array.from(options.entries()), optionKeys = Array.from(options.keys()), memoizedOptions = useDeepCompareMemo(() => options, [optionEntries]), memoizedTabNames = useDeepCompareMemo(() => optionKeys, [optionKeys]);
  return [memoizedOptions, memoizedTabNames];
}
function useTabsContext() {
  const c = useContext(Context);
  if (!c)
    throw new Error("useTabsContext must be inside a Tabs.Container");
  return c;
}
function useTabNameContext() {
  const c = useContext(TabNameContext);
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
  return useMemo(
    () => ({
      style: { width },
      contentContainerStyle: {
        minHeight: IS_IOS && !allowHeaderOverscroll ? containerHeightWithMinHeader - (tabBarHeightVal || 0) : containerHeightWithMinHeader + (headerHeightVal || 0),
        paddingTop: IS_IOS && !allowHeaderOverscroll ? 0 : (headerHeightVal || 0) + (tabBarHeightVal || 0)
      },
      progressViewOffset: (
        // on iOS we need the refresh control to be at the top if overscrolling
        IS_IOS && allowHeaderOverscroll ? 0 : (
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
  const { tabNames, contentHeights } = useTabsContext(), setContentHeights = useCallback(
    (name2, height) => {
      "worklet";
      const tabIndex = tabNames.value.indexOf(name2);
      contentHeights.value[tabIndex] = height, contentHeights.value = [...contentHeights.value];
    },
    [contentHeights, tabNames]
  );
  return useCallback(
    (_, h) => {
      runOnUI(setContentHeights)(name, h);
    },
    [setContentHeights, name]
  );
}
function useChainCallback(fns) {
  return useCallback(
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
  return useCallback(
    (ref, x, y, animated, _debugKey) => {
      "worklet";
      if (!ref)
        return;
      //! this is left here on purpose to ease troubleshooting (uncomment when necessary)
      scrollToImpl(ref, x, y - contentInset.value, animated);
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
  } = useTabsContext(), enabled = useSharedValue(!1), scrollTo = useScroller(), enable = useCallback(
    (toggle) => {
      "worklet";
      if (enabled.value = toggle, toggle) {
        const ref = refMap[name], y = scrollY.value[name] ?? scrollYCurrent.value;
        scrollTo(ref, 0, y, !1, `[${name}] restore scroll position - enable`);
      }
    },
    [enabled, name, refMap, scrollTo, scrollY.value, scrollYCurrent.value]
  ), afterDrag = useSharedValue(0), tabIndex = useMemo(
    () => tabNames.value.findIndex((n) => n === name),
    [tabNames, name]
  ), scrollAnimation = useSharedValue(void 0);
  useAnimatedReaction(
    () => scrollAnimation.value,
    (val) => {
      val !== void 0 && scrollTo(refMap[name], 0, val, !1, "[useAnimatedReaction scroll]");
    }
  );
  const onMomentumEnd = () => {
    "worklet";
    enabled.value && typeof snapThreshold == "number" && (revealHeaderOnScroll ? accDiffClamp.value > 0 && (scrollYCurrent.value > headerScrollDistance.value * snapThreshold ? accDiffClamp.value <= headerScrollDistance.value * snapThreshold ? accDiffClamp.value = withTiming(0) : accDiffClamp.value < headerScrollDistance.value && (accDiffClamp.value = withTiming(headerScrollDistance.value), scrollYCurrent.value < headerScrollDistance.value && (scrollAnimation.value = scrollYCurrent.value, scrollAnimation.value = withTiming(headerScrollDistance.value))) : accDiffClamp.value = withTiming(0)) : scrollYCurrent.value <= headerScrollDistance.value * snapThreshold ? (snappingTo.value = 0, scrollAnimation.value = scrollYCurrent.value, scrollAnimation.value = withTiming(0)) : scrollYCurrent.value <= headerScrollDistance.value && (snappingTo.value = headerScrollDistance.value, scrollAnimation.value = scrollYCurrent.value, scrollAnimation.value = withTiming(headerScrollDistance.value)));
  }, contentHeight = useDerivedValue(() => {
    const tabIndex2 = tabNames.value.indexOf(name);
    return contentHeights.value[tabIndex2] || Number.MAX_VALUE;
  }, []), scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        if (enabled.value && focusedTab.value === name) {
          if (IS_IOS) {
            let { y } = event.contentOffset;
            y = y + contentInset.value;
            const clampMax = contentHeight.value - (containerHeight.value || 0) + contentInset.value;
            scrollYCurrent.value = allowHeaderOverscroll ? y : interpolate(
              y,
              [0, clampMax],
              [0, clampMax],
              Extrapolation.CLAMP
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
        enabled.value && (cancelAnimation(accDiffClamp), IS_IOS && cancelAnimation(afterDrag));
      },
      onEndDrag: () => {
        enabled.value && IS_IOS && (afterDrag.value = withDelay(
          ONE_FRAME_MS,
          withTiming(0, { duration: 0 }, (isFinished) => {
            isFinished && onMomentumEnd();
          })
        ));
      },
      onMomentumBegin: () => {
        enabled.value && IS_IOS && cancelAnimation(afterDrag);
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
  return useAnimatedReaction(
    () => !Number.isInteger(indexDecimal.value),
    (isSyncNeeded, wasSyncNeeded) => {
      if (isSyncNeeded && isSyncNeeded !== wasSyncNeeded && focusedTab.value !== name) {
        let nextPosition = null;
        const focusedScrollY = scrollY.value[focusedTab.value], tabScrollY = scrollY.value[name];
        if (!(focusedScrollY === tabScrollY)) {
          const currIsOnTop = tabScrollY + StyleSheet.hairlineWidth <= headerScrollDistance.value, focusedIsOnTop = focusedScrollY + StyleSheet.hairlineWidth <= headerScrollDistance.value;
          revealHeaderOnScroll ? (accDiffClamp.value > tabScrollY || currIsOnTop) && (nextPosition = accDiffClamp.value) : typeof snapThreshold == "number" ? focusedIsOnTop ? nextPosition = snappingTo.value : currIsOnTop && (nextPosition = headerHeight.value || 0) : (currIsOnTop || focusedIsOnTop) && (nextPosition = Math.min(focusedScrollY, headerScrollDistance.value));
        }
        nextPosition !== null && (scrollY.value[name] = nextPosition, scrollTo(refMap[name], 0, nextPosition, !1, `[${name}] sync pane`));
      }
    },
    [revealHeaderOnScroll, refMap, snapThreshold, tabIndex, enabled, scrollTo]
  ), { scrollHandler, enable };
};
function useSharedAnimatedRef(outerRef) {
  const ref = useAnimatedRef();
  return useEffect(() => {
    outerRef && (typeof outerRef == "function" ? outerRef(ref.current) : outerRef.current = ref.current);
  }), ref;
}
function useAfterMountEffect(nextOnLayout, effect) {
  const didExecute = useRef(!1), didMount = useSharedValue(!1);
  return useAnimatedReaction(
    () => didMount.value,
    (didMount2, prevDidMount) => {
      if (didMount2 && !prevDidMount) {
        if (didExecute.current)
          return;
        effect(), didExecute.current = !0;
      }
    }
  ), useCallback(
    (event) => (requestAnimationFrame(() => {
      didMount.value = !0;
    }), nextOnLayout?.(event)),
    [didMount, nextOnLayout]
  );
}
function useConvertAnimatedToValue(animatedValue) {
  const [value, setValue] = useState(animatedValue.value);
  return useAnimatedReaction(
    () => animatedValue.value,
    (animValue) => {
      animValue !== value && runOnJS(setValue)(animValue);
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
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  return useEvent(
    (event) => {
      "worklet";
      const { onPageScroll } = handlers;
      onPageScroll && event.eventName.endsWith("onPageScroll") && onPageScroll(event, context);
    },
    ["onPageScroll"],
    doDependenciesDiffer
  );
};
export {
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
};
//# sourceMappingURL=hooks.js.map
