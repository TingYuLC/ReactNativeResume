import React from "react";
import { View, Text, Image, TouchableOpacity , StyleSheet, Dimensions } from "react-native";

export default class SideBar extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    const empryFunc = () => {}
    const { title, leftImg, rightImg, onLeftPress = empryFunc, onRightPress = empryFunc } = this.props;

    return (
      <View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
        {
          leftImg ?
          <TouchableOpacity style={styles.leftContainer} onPress={onLeftPress}>
            <Image source={leftImg} style={{width: 25, height: 25}} />
          </TouchableOpacity >
          :
          null
        }
        <View style={{width: width - 100, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
        {
          rightImg ?
          <TouchableOpacity style={styles.rightContainer} onPress={onRightPress}>
            <Image source={rightImg} style={{width: 25, height: 25}} />
          </TouchableOpacity >
          :
          null
        }
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#483D8B',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftContainer: {
    position: 'absolute',
    left: 15
  },
  rightContainer: {
    position: 'absolute',
    right: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }
})
