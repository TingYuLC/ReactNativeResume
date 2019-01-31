import React from "react";
import { View, Platform, Dimensions } from "react-native";
import { isiPhoneX } from '../utils/utils';

export default class IOSBarView extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <View style={{height: (Platform.OS === 'ios') ? (isiPhoneX ? 44 : 20) : 0, backgroundColor: this.props.backgroundColor}}>
      </View>
    );
  }
}

