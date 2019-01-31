import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default class ListItem extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      isShow: false
    }
  }

  renderList () {
    const { themeColor, children } = this.props;
    const styles = listStyles;

    return children.map((item, i) => {
      return (
        <TouchableOpacity
          key={'listchildren' + i}
          activeOpacity={1}
          onPress={() => this.props.toWeb(i)}
          style={styles.container}
        >
          <View style={styles.wrapperContainer}>
            <View style={styles.textContainer}>
              <Icon name="ios-laptop" size={20} color={'#fff'} />
              <Text style={[styles.textStyle, {color: themeColor}]}>{item.title}</Text>
            </View>
            <Icon name="ios-arrow-forward" size={20} color={themeColor} />
          </View>
        </TouchableOpacity>
      );
    })
  }

  render () {
    const { themeColor, title, icon } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          underlayColor={'#999'}
          onPress={() => this.setState({isShow: !this.state.isShow})}
          style={styles.touchContainer}
        >
          <View style={styles.wrapperContainer}>
            <View style={styles.textContainer}>
              <Icon name={icon} size={20} color={themeColor} />
              <Text style={[styles.textStyle, {color: themeColor}]}>{title}</Text>
            </View>
            {
              this.state.isShow ?
              <Icon name="ios-arrow-up" size={20} color={themeColor} />
              :
              <Icon name="ios-arrow-down" size={20} color={themeColor} />
            }
          </View>
        </TouchableOpacity>
        {
          this.state.isShow ?
          this.renderList()
          :
          null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  touchContainer: {
    height: 60
  },
  wrapperContainer: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold'
  }
})

const listStyles = StyleSheet.create({
  container: {
    height: 60,
    borderTopColor: '#ddd',
    borderTopWidth: 1
  },
  wrapperContainer: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold'
  }
})