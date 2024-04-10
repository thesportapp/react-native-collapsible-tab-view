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
var helpers_exports = {};
__export(helpers_exports, {
  AnimatedFlatList: () => AnimatedFlatList,
  AnimatedSectionList: () => AnimatedSectionList,
  IS_IOS: () => IS_IOS,
  ONE_FRAME_MS: () => ONE_FRAME_MS,
  isRTL: () => isRTL,
  scrollToImpl: () => scrollToImpl
});
module.exports = __toCommonJS(helpers_exports);
var import_react_native = require("react-native-web"), import_react_native_reanimated = __toESM(require("react-native-reanimated"));
const ONE_FRAME_MS = 16, { isRTL } = import_react_native.I18nManager, IS_IOS = import_react_native.Platform.OS === "ios", AnimatedFlatList = import_react_native_reanimated.default.createAnimatedComponent(import_react_native.FlatList), AnimatedSectionList = import_react_native_reanimated.default.createAnimatedComponent(import_react_native.SectionList);
function scrollToImpl(ref, x, y, animated) {
  "worklet";
  ref && (!Number.isFinite(x) || !Number.isFinite(y) || (0, import_react_native_reanimated.scrollTo)(ref, x, y, animated));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnimatedFlatList,
  AnimatedSectionList,
  IS_IOS,
  ONE_FRAME_MS,
  isRTL,
  scrollToImpl
});
//# sourceMappingURL=helpers.js.map
