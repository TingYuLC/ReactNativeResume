import React from 'react';
import { View, SectionList, Text, FlatList, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import { BackImg } from "../../common/ImgConfig";
import { SideBar } from "../../components";
import { MyPageConfig } from "../../common/config";
import { PageStatusColor } from "../../common/BaseContent";
import { screenW } from "../../utils/utils";
import HttpMusicManager from "../../service";

export default class RankingList extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  constructor(props: any) {
    super(props);

    this.state = {
      title: '排行榜',
      bgColor: PageStatusColor.NetEaseCloudMusic,
      HomeBgColor: PageStatusColor.Home,
      rankingList: [],
      recommendList: []
    }
  }

  componentWillMount () {
    StatusBar.setBackgroundColor(this.state.bgColor);
    this.HttpMusic  = new HttpMusicManager();
    this.getRankingList()
  }

  componentWillUnmount () {
    StatusBar.setBackgroundColor(this.state.HomeBgColor);
  }  

  getRankingList = () => {
    this.HttpMusic.getMusicRankingList()
      .then(res => {
        const rankingList = [];
        const recommendList = [];
        res.list.forEach(item => {
          if (item.tracks && item.tracks.length) {
            rankingList.push(item);
          } else {
            recommendList.push(item);
          }
        })
        this.setState({
          rankingList: rankingList,
          recommendList: recommendList
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  singleImg = (img, title) => {
    const styles = singleImgStyles;

    return <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.imgContainer} />
      <Text style={styles.textContainer}>{title}</Text>
    </View>
  }

  singleList = (tracks) => {
    const musicTracks = tracks.map((music, i) => {
      return <Text key={i} numberOfLines={1}>
        {`${i+1}.${music.first} - ${music.second}`}
      </Text>
    })
    return <View style={singleListStyles.container}>
      {musicTracks}
    </View>
  }

  singleMusic = (item) => {
    const styles = singleMusicStyles;

    return <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('MusicList', {id: item.id})}>
      <View style={styles.container}>
        {this.singleImg(item.coverImgUrl, item.updateFrequency)}
        {this.singleList(item.tracks)}
      </View>
    </TouchableOpacity>
  }

  recommendMusic = (item) => {
    const styles = singleMusicStyles;

    return <TouchableOpacity style={[styles.recommendMusic, { width: picWidth }]} activeOpacity={1} onPress={() => this.props.navigation.navigate('MusicList', {id: item.id})}>
        {this.singleImg(item.coverImgUrl, item.updateFrequency)}
    </TouchableOpacity>
  }

  render () {
    const { title, bgColor, rankingList, recommendList } = this.state;
    const ranking = ({ section: { data } }) => (
      <FlatList
        data={data[0]}
        renderItem={({item}) => this.singleMusic(item)}
        keyExtractor={(item, index) => item + index}
      />
    );
    const recommend = ({ section: { data } }) => (
      <FlatList
        data={data[0]}
        numColumns={3}
        renderItem={({item}) => this.recommendMusic(item)}
        keyExtractor={(item, index) => item + index}
      />
    );
    const musicHeader = ({ section: { title } }) => (
      <View style={styles.headerContainer}>
        <Text style={styles.headerStyle}>{title}</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <SideBar
          backgroundColor={bgColor}
          title={title}
          leftImg={BackImg}
          onLeftPress={() => this.props.navigation.goBack()}/>
        <SectionList
          renderSectionHeader= {musicHeader}
          sections={[
            { title: '官方榜', data: [rankingList], renderItem: ranking},
            { title: '推荐榜', data: [recommendList], renderItem: recommend}
          ]}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

const picWidth = (screenW - 10) / 3 - 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10
  },
  headerContainer: {
    margin: 10
  },
  headerStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000'
  }
})

const singleMusicStyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 5,
    flexDirection: 'row'
  },
  recommendMusic: {
    borderRadius: 3,
    marginLeft: 10,
    marginTop: 10
  }
})

const singleListStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5
  }
})

const singleImgStyles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 120,
    height: 110
  },
  imgContainer: {
    width: 120,
    height: 110,
    borderRadius: 3
  },
  textContainer: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    color: '#fff',
    fontSize: 10
  }
})