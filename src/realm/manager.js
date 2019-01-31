import { insertThemeColor_realm, queryThemeColor_realm } from "./realm_manager";
// import { insertThemeColor_storage, queryThemeColor_storage, initThemeColor_storage } from "./storage_manager";

// 由于React Native Debugger不支持realm
// 根据_DEV_, 开放环境使用AysyncStorage,生产环境使用realm

// const insertThemeColor = insertThemeColor_storage;
// const queryThemeColor = queryThemeColor_storage;
// const initThemeColor = initThemeColor_storage;

const insertThemeColor = insertThemeColor_realm;
const queryThemeColor = queryThemeColor_realm;
const initThemeColor = queryThemeColor_realm;

export {
  insertThemeColor,
  queryThemeColor,
  initThemeColor
}