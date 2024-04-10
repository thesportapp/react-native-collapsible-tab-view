import React from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View
} from "react-native-web";
import PagerView from "react-native-pager-view";
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming
} from "react-native-reanimated";
import { Context, TabNameContext } from "./Context";
import { Lazy } from "./Lazy";
import { MaterialTabBar, TABBAR_HEIGHT } from "./MaterialTabBar";
import { Tab } from "./Tab";
import { IS_IOS, ONE_FRAME_MS, scrollToImpl } from "./helpers";
import {
  useAnimatedDynamicRefs,
  useContainerRef,
  usePageScrollHandler,
  useTabProps
} from "./hooks";
import { jsx, jsxs } from "react/jsx-runtime";
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView), Container = React.memo(
  React.forwardRef(
    ({
      initialTabName,
      headerHeight: initialHeaderHeight,
      minHeaderHeight = 0,
      tabBarHeight: initialTabBarHeight = TABBAR_HEIGHT,
      revealHeaderOnScroll = !1,
      snapThreshold,
      children,
      renderHeader,
      renderTabBar = (props) => /* @__PURE__ */ jsx(MaterialTabBar, { ...props }),
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
      const containerRef = useContainerRef(), [tabProps, tabNamesArray] = useTabProps(children, Tab), [refMap, setRef] = useAnimatedDynamicRefs(), windowWidth = useWindowDimensions().width, width = customWidth ?? windowWidth, containerHeight = useSharedValue(void 0), tabBarHeight = useSharedValue(
        initialTabBarHeight
      ), headerHeight = useSharedValue(
        renderHeader ? initialHeaderHeight : 0
      ), contentInset = useDerivedValue(() => allowHeaderOverscroll ? 0 : IS_IOS ? (headerHeight.value || 0) + (tabBarHeight.value || 0) : 0), snappingTo = useSharedValue(0), offset = useSharedValue(0), accScrollY = useSharedValue(0), oldAccScrollY = useSharedValue(0), accDiffClamp = useSharedValue(0), scrollYCurrent = useSharedValue(0), scrollY = useSharedValue(
        Object.fromEntries(tabNamesArray.map((n) => [n, 0]))
      ), contentHeights = useSharedValue(
        tabNamesArray.map(() => 0)
      ), tabNames = useDerivedValue(
        () => tabNamesArray,
        [tabNamesArray]
      ), index = useSharedValue(
        initialTabName ? tabNames.value.findIndex((n) => n === initialTabName) : 0
      ), focusedTab = useDerivedValue(() => tabNames.value[index.value], [tabNames]), calculateNextOffset = useSharedValue(index.value), headerScrollDistance = useDerivedValue(() => headerHeight.value !== void 0 ? headerHeight.value - minHeaderHeight : 0, [headerHeight, minHeaderHeight]), indexDecimal = useSharedValue(
        index.value
      ), afterRender = useSharedValue(0);
      React.useEffect(() => {
        afterRender.value = withDelay(
          ONE_FRAME_MS * 5,
          withTiming(1, { duration: 0 })
        );
      }, [afterRender, tabNamesArray]);
      const resyncTabScroll = () => {
        "worklet";
        for (const name of tabNamesArray)
          scrollToImpl(
            refMap[name],
            0,
            scrollYCurrent.value - contentInset.value,
            !1
          );
      };
      useAnimatedReaction(
        () => afterRender.value === 1,
        (trigger) => {
          trigger && (afterRender.value = 0, resyncTabScroll());
        },
        [tabNamesArray, refMap, afterRender, contentInset]
      ), useAnimatedReaction(
        () => Math.round(indexDecimal.value),
        (nextIndex) => {
          nextIndex !== null && nextIndex !== index.value && (calculateNextOffset.value = nextIndex);
        },
        []
      );
      const propagateTabChange = React.useCallback(
        (change) => {
          onTabChange?.(change), onIndexChange?.(change.index);
        },
        [onIndexChange, onTabChange]
      );
      useAnimatedReaction(
        () => calculateNextOffset.value,
        (i) => {
          i !== index.value && (offset.value = scrollY.value[tabNames.value[index.value]] - scrollY.value[tabNames.value[i]] + offset.value, runOnJS(propagateTabChange)({
            prevIndex: index.value,
            index: i,
            prevTabName: tabNames.value[index.value],
            tabName: tabNames.value[i]
          }), index.value = i, typeof scrollY.value[tabNames.value[index.value]] == "number" && (scrollYCurrent.value = scrollY.value[tabNames.value[index.value]] || 0));
        },
        []
      ), useAnimatedReaction(
        () => headerHeight.value,
        (_current, prev) => {
          prev === void 0 && resyncTabScroll();
        }
      );
      const headerTranslateY = useDerivedValue(() => revealHeaderOnScroll ? -accDiffClamp.value : -Math.min(scrollYCurrent.value, headerScrollDistance.value), [revealHeaderOnScroll]), stylez = useAnimatedStyle(() => ({
        transform: [
          {
            translateY: headerTranslateY.value
          }
        ]
      }), [revealHeaderOnScroll]), getHeaderHeight = React.useCallback(
        (event) => {
          const height = event.nativeEvent.layout.height;
          headerHeight.value !== height && (headerHeight.value = height);
        },
        [headerHeight]
      ), getTabBarHeight = React.useCallback(
        (event) => {
          const height = event.nativeEvent.layout.height;
          tabBarHeight.value !== height && (tabBarHeight.value = height);
        },
        [tabBarHeight]
      ), onLayout = React.useCallback(
        (event) => {
          const height = event.nativeEvent.layout.height;
          containerHeight.value !== height && (containerHeight.value = height);
        },
        [containerHeight]
      ), onTabPress = React.useCallback(
        (name) => {
          const i = tabNames.value.findIndex((n) => n === name);
          if (name === focusedTab.value) {
            const ref2 = refMap[name];
            runOnUI(scrollToImpl)(
              ref2,
              0,
              headerScrollDistance.value - contentInset.value,
              !0
            );
          } else
            containerRef.current?.setPage(i);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [containerRef, refMap, contentInset]
      );
      React.useEffect(() => {
        index.value >= tabNamesArray.length && onTabPress(tabNamesArray[tabNamesArray.length - 1]);
      }, [index.value, onTabPress, tabNamesArray]);
      const pageScrollHandler = usePageScrollHandler({
        onPageScroll: (e) => {
          "worklet";
          indexDecimal.value = e.position + e.offset;
        }
      });
      return React.useImperativeHandle(
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
      ), /* @__PURE__ */ jsx(
        Context.Provider,
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
          },
          children: /* @__PURE__ */ jsxs(
            Animated.View,
            {
              style: [styles.container, { width }, containerStyle],
              onLayout,
              pointerEvents: "box-none",
              children: [
                /* @__PURE__ */ jsxs(
                  Animated.View,
                  {
                    pointerEvents: "box-none",
                    style: [
                      styles.topContainer,
                      headerContainerStyle,
                      !cancelTranslation && stylez
                    ],
                    children: [
                      /* @__PURE__ */ jsx(
                        View,
                        {
                          style: [styles.container, styles.headerContainer],
                          onLayout: getHeaderHeight,
                          pointerEvents: "box-none",
                          children: renderHeader && renderHeader({
                            containerRef,
                            index,
                            tabNames: tabNamesArray,
                            focusedTab,
                            indexDecimal,
                            onTabPress,
                            tabProps
                          })
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        View,
                        {
                          style: [styles.container, styles.tabBarContainer],
                          onLayout: getTabBarHeight,
                          pointerEvents: "box-none",
                          children: renderTabBar && renderTabBar({
                            containerRef,
                            index,
                            tabNames: tabNamesArray,
                            focusedTab,
                            indexDecimal,
                            width,
                            onTabPress,
                            tabProps
                          })
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  AnimatedPagerView,
                  {
                    ref: containerRef,
                    onPageScroll: pageScrollHandler,
                    initialPage: index.value,
                    ...pagerProps,
                    style: [pagerProps?.style, StyleSheet.absoluteFill],
                    children: tabNamesArray.map((tabName, i) => /* @__PURE__ */ jsx(View, { children: /* @__PURE__ */ jsx(TabNameContext.Provider, { value: tabName, children: /* @__PURE__ */ jsx(
                      Lazy,
                      {
                        startMounted: lazy ? void 0 : !0,
                        cancelLazyFadeIn: lazy ? !!cancelLazyFadeIn : !0,
                        children: React.Children.toArray(children)[i]
                      },
                      tabName
                    ) }) }, i))
                  }
                )
              ]
            }
          )
        }
      );
    }
  )
), styles = StyleSheet.create({
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
export {
  Container
};
//# sourceMappingURL=Container.js.map
