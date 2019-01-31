import React from "react";
import { Animated, Dimensions, Platform, ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { isiPhoneX } from '../utils/utils';
import { screenW, screenH } from "../utils/utils";

class ParallaxScrollView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super (props);

    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

  renderBar () {
    const { scrollY } = this.state;
    const { navBarColor, navBarTransformHeight, navBarHeight, navBarLeft = null, navBarRight = null, navBarTitle, navBarTitleColor = '#fff' } = this.props;

    return (
      <Animated.View 
        style={[styles.AnimatedContainer, {
          height: navBarHeight, 
          width: screenW, 
          top: (Platform.OS === 'ios') ? (isiPhoneX ? 44 : 20) : 0,
          backgroundColor: scrollY.interpolate({
            inputRange: [0, navBarTransformHeight, screenH],
            outputRange: ['transparent', navBarColor, navBarColor]
          })
        }]}
        >
        <View style={styles.navBarContainer}>
          {navBarLeft}
        </View>
        <Animated.View
          style={[styles.wrapperContainer, {
            opacity: scrollY.interpolate({
              inputRange: [0, navBarTransformHeight * 0.5, navBarTransformHeight, screenH],
              outputRange: [0, 0, 1, 1]
            })
          }]}>
          <Text style={[styles.titleStyle, {color: navBarTitleColor}]}>{navBarTitle}</Text>
        </Animated.View>
        <View style={styles.navBarContainer}>
          {navBarRight}
        </View>
      </Animated.View>
    );
  }

  render () {
    const { style, children } = this.props;
    const { scrollY } = this.state;

    return (
      <View style={[styles.container, style]}>
        <ScrollView
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ])}>
          {children}
        </ScrollView>
        {this.renderBar()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  AnimatedContainer: {
    position: 'absolute', 
    flexDirection: 'row',
    alignItems: 'center'
  },
  wrapperContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  navBarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => ({
  themeColor: state.theme.themeColor
})

export default connect(mapStateToProps)(ParallaxScrollView);