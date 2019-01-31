import Realm from "realm";
import Schemas from "./schemas";

const realm = new Realm(Schemas);
const insertThemeColor_realm = (themeColor) => {
    if (themeColor == null) {
        return;
    }
    try {
        realm.write(()=>{
            let color = realm.objectForPrimaryKey('Theme',0);
            if (color == null) {
                realm.create('Theme',{
                    id:0,
                    color:themeColor,
                })
            } else {
                color.color = themeColor;
            }
        })
    } catch (error) {
      console.log(error)
    }
   
}

const queryThemeColor_realm = () => {
    let themeColor = realm.objects('Theme');
    if (themeColor == null || themeColor.length == 0) {
        return '#483D8B';
    } else {
        return themeColor[0].color;
    }
}

export { insertThemeColor_realm, queryThemeColor_realm };