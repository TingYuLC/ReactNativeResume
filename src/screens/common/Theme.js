import React from "react";
import { View, Text, Alert, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import { SideBar } from "../../components";
import { Theme_Datas } from '../../common/BaseContent';
import { insertThemeColor } from "../../realm/manager";
import { BackImg } from "../../common/ImgConfig";
import { screenW } from "../../utils/utils";
import { setThemeColor } from '../../store/actions/';
import { connect } from 'react-redux';

class Theme extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super (props);

    this.state = {
      headerTitle: '主题'
    }
  }

  setColor = (color) => {
    insertThemeColor(color);
    this.props.setThemeColor(color);
    this.props.navigation.goBack();
  }

  singleTheme = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.setColor(item.color)}
        style={[styles.singleContaier, {width: picWidth}]}>
        <View style={styles.singleWrapperContainer}>
          <View style={[styles.singleBgContainer, {backgroundColor: item.color}]}/>
          <View style={styles.singleTextContainer}>
            <Text style={[styles.singleTextStyle, {color: item.color}]}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    const { headerTitle } = this.state;
    const { themeColor, navigation } = this.props;

    return (
      <View style={styles.container}>
        <SideBar
          backgroundColor={themeColor}
          title={headerTitle}
          leftImg={BackImg}
          onLeftPress={() => navigation.goBack()} />
        <FlatList
          data={Theme_Datas}
          renderItem={this.singleTheme}
          numColumns={3}
          keyExtractor={(item, index) => item + index}
          style={styles.flatListContainer}
        />
      </View>
    );
  }
}

const picWidth = (screenW - 10) / 3 - 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc'
  },
  flatListContainer: {
    marginTop: 10
  },
  singleContaier: {
    height: 150,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 4
  },
  singleWrapperContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  singleBgContainer: {
    height: 93,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  singleTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  singleTextStyle: {
    fontWeight: 'bold',
    fontSize: 14
  }
});

const mapStateToProps = state => ({
  themeColor: state.theme.themeColor
})

const mapDispatchToProps = dispatch => ({
  setThemeColor: (payload) => dispatch(setThemeColor(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
