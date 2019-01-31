import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StatusBar, ImageBackground, StyleSheet } from 'react-native';
import { SideBar } from "../../components";
import { BackImg, SearchImg, PlayImg } from "../../common/ImgConfig";
import HttpMusicManager from "../../service";
import { PageStatusColor } from "../../common/BaseContent";

export default class MusicList extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  constructor(props: any) {
    super(props);

    this.state = {
      bgColor: PageStatusColor.NetEaseCloudMusic,
      playlist: []
    }
  }

  componentWillMount () {
    this.HttpMusic  = new HttpMusicManager();
    const id = this.props.navigation.getParam('id');
    this.getMusicList(id);
  }

  getMusicList = (id) => {
    this.HttpMusic.getMusicDetailList(id)
      .then(res => {
        this.setState({
          playlist: res.playlist
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  singleMusic = (item, i) => {
    const { bgColor } = this.state;
    const name = item.name;
    const ar = item.ar.map((v) => v.name);
    const author = ar.join('/');
    let alia = item.alia.join('/');
    alia = alia ? `(${alia})` : '';

    const styles = singleMusicStyles;

    return <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.props.navigation.navigate('MusicPlayer', {id: item.id, name: item.name, picUrl: item.al.picUrl})}
        style={{height: 50}}>
      <View style={styles.container}>
        <View style={styles.numContainer}>
          <Text style={{color: i < 3 ? bgColor : '#000'}}>
            {
              i < 9 ?
              '0' + (i + 1) :
              i + 1
            }
          </Text>
        </View>
        <View style={styles.musicContainer}>
          <View style={styles.musicTextContainer}>
            <Text style={styles.musicTitle} numberOfLines={1}>
              {name}
              <Text style={styles.MusicList}>{alia}</Text>
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

  render () {
    const { bgColor, playlist } = this.state;
    const { name, coverImgUrl, tracks } = playlist;

    return (
      <View style={styles.container}>
        <SideBar
          backgroundColor={bgColor}
          title={name}
          leftImg={BackImg}
          onLeftPress={() => this.props.navigation.goBack()} />
        <FlatList
          data={tracks}
          renderItem={({item, index}) => this.singleMusic(item, index)}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const singleMusicStyles = StyleSheet.create({
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