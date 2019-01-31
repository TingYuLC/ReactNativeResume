import React from "react";
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { View, Platform } from "react-native";

const X_WIDTH = 375;
const X_HEIGHT = 812;
const REAL_WINDOW_HEIGHT = ExtraDimensions.get('REAL_WINDOW_HEIGHT');
const REAL_WINDOW_WIDTH = ExtraDimensions.get('REAL_WINDOW_WIDTH');
const STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
const SOFT_MENU_BAR_HEIGHT = ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');
const SMART_BAR_HEIGHT = ExtraDimensions.get('SMART_BAR_HEIGHT');
const screenH = REAL_WINDOW_HEIGHT - STATUS_BAR_HEIGHT - SOFT_MENU_BAR_HEIGHT - SMART_BAR_HEIGHT;
const screenW = REAL_WINDOW_WIDTH;
const statusBarHeight = STATUS_BAR_HEIGHT;
const menuBarHeight = SOFT_MENU_BAR_HEIGHT;
const smallBarHeight = SMART_BAR_HEIGHT;

function isiPhoneX () {
  return (
      Platform.OS === 'ios' &&
      ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
          (screenH === X_WIDTH && screenW === X_HEIGHT))
  )
}

export {
  screenW,
  screenH,
  statusBarHeight,
  menuBarHeight,
  smallBarHeight,
  isiPhoneX
}
