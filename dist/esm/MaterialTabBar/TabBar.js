import React from "react";
import {
  StyleSheet,
  useWindowDimensions
} from "react-native-web";
import Animated, {
  cancelAnimation,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { Indicator } from "./Indicator";
import { MaterialTabItem } from "./TabItem";
import { jsx, jsxs } from "react/jsx-runtime";
const TABBAR_HEIGHT = 48, MaterialTabBar = ({
  tabNames,
  indexDecimal,
  scrollEnabled = !1,
  indicatorStyle,
  index,
  TabItemComponent = MaterialTabItem,
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
  const tabBarRef = useAnimatedRef(), windowWidth = useWindowDimensions().width, width = customWidth ?? windowWidth, isFirstRender = React.useRef(!0), itemLayoutGathering = React.useRef(/* @__PURE__ */ new Map()), tabsOffset = useSharedValue(0), isScrolling = useSharedValue(!1), nTabs = tabNames.length, [itemsLayout, setItemsLayout] = React.useState(
    scrollEnabled ? [] : tabNames.map((_, i) => {
      const tabWidth = width / nTabs;
      return { width: tabWidth, x: i * tabWidth };
    })
  );
  React.useEffect(() => {
    if (isFirstRender.current)
      isFirstRender.current = !1;
    else if (!scrollEnabled) {
      const tabWidth = width / nTabs;
      setItemsLayout(
        tabNames.map((_, i) => ({ width: tabWidth, x: i * tabWidth }))
      );
    }
  }, [scrollEnabled, nTabs, tabNames, width]);
  const onTabItemLayout = React.useCallback(
    (event, name) => {
      if (scrollEnabled) {
        if (!event.nativeEvent?.layout)
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
  ), cancelNextScrollSync = useSharedValue(index.value), onScroll = useAnimatedScrollHandler(
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
  ), currentIndexToSync = useSharedValue(index.value), targetIndexToSync = useSharedValue(index.value);
  return useAnimatedReaction(
    () => index.value,
    (nextIndex) => {
      scrollEnabled && (cancelAnimation(currentIndexToSync), targetIndexToSync.value = nextIndex, currentIndexToSync.value = withTiming(nextIndex));
    },
    [scrollEnabled]
  ), useAnimatedReaction(
    () => currentIndexToSync.value === targetIndexToSync.value,
    (canSync) => {
      if (canSync && scrollEnabled && itemsLayout.length === nTabs && itemsLayout[index.value]) {
        const halfTab = itemsLayout[index.value].width / 2, offset = itemsLayout[index.value].x;
        (keepActiveTabCentered || offset < tabsOffset.value || offset > tabsOffset.value + width - 2 * halfTab) && scrollTo(tabBarRef, offset - width / 2 + halfTab, 0, !0);
      }
    },
    [scrollEnabled, itemsLayout, nTabs]
  ), /* @__PURE__ */ jsxs(
    Animated.ScrollView,
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
        tabNames.map((name, i) => /* @__PURE__ */ jsx(
          TabItemComponent,
          {
            index: i,
            name,
            label: tabProps.get(name)?.label || getLabelText(name),
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
        )),
        itemsLayout.length === nTabs && /* @__PURE__ */ jsx(
          Indicator,
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
}, MemoizedTabBar = React.memo(MaterialTabBar);
const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    flexWrap: "nowrap"
  }
});
export {
  MemoizedTabBar as MaterialTabBar,
  TABBAR_HEIGHT
};
//# sourceMappingURL=TabBar.js.map
