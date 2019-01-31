import React from "react";
import { View, WebView, StyleSheet } from "react-native";
import { IOSBarView, SideBar } from "../../components";
import { BackImg } from "../../common/ImgConfig";

export default class WebPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super (props);
  }

  render () {
    const { navigation } = this.props;
    const { title, url, themeColor } = navigation.state.params;

    return (
      <View style={styles.container}>
        <SideBar
          backgroundColor={themeColor}
          title={title}
          leftImg={BackImg}
          onLeftPress={() => navigation.goBack()} />
        <WebView
          source={{uri: url}}
          style={styles.webViewContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  webViewContainer: {
    flex: 1
  }
})
