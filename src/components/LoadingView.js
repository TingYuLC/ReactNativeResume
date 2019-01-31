import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { screenW, screenH, menuBarHeight, smallBarHeight } from "../utils/utils";
import { connect } from 'react-redux';

class LoadingView extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      loadingText: 'loading'
    }
  }

  render () {
    const { loadingText } = this.state;
    const { themeColor } = this.props;

    return (
      <View style={styles.container}>
        <LinearGradient
          style={[styles.LinearContainer, {width: screenW, height: screenH + smallBarHeight + menuBarHeight}]}
          colors={[themeColor, '#fff']}>
          <View style={styles.wrapperContainer}>
            <ActivityIndicator size="large" color={themeColor} />
            <Text style={[styles.textStyle, {color: themeColor}]}>{loadingText}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  LinearContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  }
})

const mapStateToProps = state => ({
  themeColor: state.theme.themeColor
})

export default connect(mapStateToProps)(LoadingView);