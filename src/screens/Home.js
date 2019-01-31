import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { HomePageConfig } from "../common/config";
import { rightArrowImg } from "../common/ImgConfig";
import { PageStatusColor } from "../common/BaseContent";
import Icon from "react-native-vector-icons/Ionicons";

export default class Home extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  constructor(props: any) {
    super(props);

    this.state = {
      bgColor: PageStatusColor.Home
    }
  }

  componentWillMount () {
    StatusBar.setBackgroundColor(this.state.bgColor);
    StatusBar.setBarStyle('dark-content');
  }

  singleButton = (item) => {
    const styles = singleStyles;

    return <View style={[styles.container, {backgroundColor: item.bgColor}]}>
        <View style={styles.leftContainer}>
          <View style={styles.leftItemContainer}>
            <Icon name={item.icon} size={45} color={'#fff'} />
          </View>
          <View style={styles.leftItemContainer}>
            <Text style={styles.leftTitle}>{item.title}</Text>
            <Text style={styles.leftSubTitle}>{item.subTitle}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Image source={rightArrowImg} style={styles.rightImg} />
        </View>
      </View>
  }

  renderBtn = () => {
    const pages = HomePageConfig.map((item, i) => {
      return <TouchableOpacity
        key={i}
        onPress={() => this.props.navigation.navigate(item.navigator)}>
        {this.singleButton(item)}
      </TouchableOpacity>
    })
    return <View>{pages}</View>
  }

  render () {
    const { bgColor } = this.state;

    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View style={styles.btnContainer}>
          {this.renderBtn()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})

const singleStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    margin: 10,
    borderRadius: 5
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftItemContainer: {
    marginLeft: 15
  },
  leftTitle: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 22
  },
  leftSubTitle: {
    color: '#fff',
    fontSize: 12
  },
  rightContainer: {
    width: 50,
    justifyContent: 'center'
  },
  rightImg: {
    width: 40,
    height: 40
  }
})