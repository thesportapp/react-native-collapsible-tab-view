"use strict";
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
var MaterialTabBar_exports = {};
__export(MaterialTabBar_exports, {
  MaterialTabBar: () => import_TabBar.MaterialTabBar,
  MaterialTabItem: () => import_TabItem.MaterialTabItem,
  TABBAR_HEIGHT: () => import_TabBar.TABBAR_HEIGHT
});
module.exports = __toCommonJS(MaterialTabBar_exports);
var import_TabBar = require("./TabBar"), import_TabItem = require("./TabItem");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MaterialTabBar,
  MaterialTabItem,
  TABBAR_HEIGHT
});
//# sourceMappingURL=index.js.map
