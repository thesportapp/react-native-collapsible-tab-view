import { FlatList, Platform, SectionList, I18nManager } from "react-native-web";
import Animated, { scrollTo } from "react-native-reanimated";
const ONE_FRAME_MS = 16, { isRTL } = I18nManager, IS_IOS = Platform.OS === "ios", AnimatedFlatList = Animated.createAnimatedComponent(FlatList), AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
function scrollToImpl(ref, x, y, animated) {
  "worklet";
  ref && (!Number.isFinite(x) || !Number.isFinite(y) || scrollTo(ref, x, y, animated));
}
export {
  AnimatedFlatList,
  AnimatedSectionList,
  IS_IOS,
  ONE_FRAME_MS,
  isRTL,
  scrollToImpl
};
//# sourceMappingURL=helpers.js.map
