import * as types from '../constants';

import { initThemeColor } from "../../realm/manager";

const initialState = {
  themeColor: initThemeColor()
}

const theme = (state = initialState, action) => {
  switch (action.type) {
    case types.THEME_COLOR:
      return {
        themeColor: action.payload
      }
    default:
      return state
  }
}

export default theme;
