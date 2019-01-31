import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { PlayImg } from "../../common/ImgConfig";
import { PageStatusColor } from "../../common/BaseContent";

export default class SingleMusic extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      bgColor: PageStatusColor.NetEaseCloudMusic
    }    
  }

  render () {
    const { item, index } = this.props.data;
    const { bgColor } = this.state;
    const name = item.name;
    const artists = item.artists.map((v) => v.name);
    const author = artists.join('/');
    let alias = item.alias.join('/');
    alias = alias ? `(${alias})` : '';

    return <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.props.navigation.navigate('MusicPlayer', {id: item.id, name: item.name, picUrl: item.al.picUrl})}
        style={{height: 50}}>
      <View style={styles.container}>
        <View style={styles.numContainer}>
          <Text style={{color: index < 3 ? bgColor : '#000'}}>
            {
              index < 9 ?
              '0' + (index + 1) :
              index + 1
            }
          </Text>
        </View>
        <View style={styles.musicContainer}>
          <View style={styles.musicTextContainer}>
            <Text style={styles.musicTitle} numberOfLines={1}>
              {name}
              <Text style={styles.MusicList}>{alias}</Text>
            </Text>
            <Text style={styles.musicSubTitle} numberOfLines={1}>{`${author} - ${item.name}`}</Text>
          </View>
          <View style={styles.musicIconContainer}>
            <Image source={PlayImg} style={singleMusicStyles.musicImg} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row'
  },
  numContainer: {
    width: 35,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  musicContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingRight: 10
  },
  musicTextContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  musicTitle: {
    color: '#000'
  },
  musicLink: {
    color: '#888'
  },
  musicSubTitle: {
    color: '#888',
    fontSize: 12,
    marginTop: 3
  },
  musicIconContainer: {
    marginLeft: 5
  },
  musicImg: {
    width: 30,
    height: 30
  }
})