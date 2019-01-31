import Schemas from "./schemas";
import { AsyncStorage } from "react-native";

const insertThemeColor_storage = async (themeColor) => {
    if (themeColor == null) {
        return;
    }
    try {
      await AsyncStorage.setItem('themeColor', themeColor);
    } catch (error) {
      console.log(error)
    }
}

const queryThemeColor_storage = async () => {
    try {
      const themeColor = await AsyncStorage.getItem('themeColor');
      if (!themeColor) return '#483D8B';
      return themeColor;
    } catch (error) {
      console.log(error);
    }
}

const initThemeColor_storage = () => {
  return '#483D8B';
}

export { insertThemeColor_storage, queryThemeColor_storage, initThemeColor_storage };