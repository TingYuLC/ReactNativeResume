import React from "react";
import { View, ScrollView, RefreshControl, Text, StatusBar, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import { SideBar, IOSBarView, LoadingView } from "../../components";
import MovieList from './MovieList';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import HttpMovieManager from "../../service";
import { PageStatusColor } from "../../common/BaseContent";
import { MovieType } from "../../common/config";
import { ThemeImg, SearchImg, StartSelectImg, StartHalfSelectImg, StartUnSelectImg } from "../../common/ImgConfig";
import { connect } from 'react-redux';

class Movies extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super (props);

    this.state = {
      ready: true,
      refreshing: false,
      headerTitle: '热映',
      hotList: [],
      HomeBgColor: PageStatusColor.Home
    }

    this.HttpMovies  = new HttpMovieManager();
  }

  componentWillMount () {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(this.props.themeColor);
      this.props.navigation.setParams({ getThemeColor: this.props.themeColor });
    });
    this.getHotList();
  }

  componentWillUnmount () {
    StatusBar.setBackgroundColor(this.state.HomeBgColor);
  }

  getHotList = () => {
    const that = this;
    this.HttpMovies.getMovieList(MovieType.in_theaters)
      .then(data => {
        this.setState({
          hotList: that.getRandomList(data.subjects, 5),
          ready: false,
          refreshing: false
        });
      })
      .catch(error => console.log(error))
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.getHotList();
  }

  toDetail = (id) => {
    this.props.navigation.navigate('MovieDetail', {id: id});
  } 

  getRandomList = (arr, num) => {
    var temp_array = arr.slice(0)
    //取出的数值项,保存在此数组
    var return_array = [];
    for (let i = 0; i<num; i++) {
      if (temp_array.length>0) {
        let arrIndex = Math.floor(Math.random()*temp_array.length);
        return_array[i] = temp_array[arrIndex];
        temp_array.splice(arrIndex, 1);
      } else {
        break;
      }
    }
    return return_array;  
  }

  getDirectorAvatars = (directors) => {
    if (!directors.length) return [];
    const avatars = []
    directors.forEach(v => {
      if (v.avatars) {
        const item = v.avatars;
        avatars.push({ name: '', avatar: ''});
        const last = avatars.length - 1;
        if (v.name) avatars[last].name = v.name;
        if (item.larges) avatars[last].avatar = item.larges;
        else if (item.medium) avatars[last].avatar = item.medium;
        else if (item.small) avatars[last].avatar = item.small;
      }
    })
    return avatars;
  }

  moviesList = () => {
    const styles = movieStyles;
    const { hotList } = this.state;
    return hotList.map((item, index) => {
      return (
        <TouchableOpacity 
          activeOpacity={1}
          key={index}
          onPress={() => this.toDetail(item.id)}
          style={[styles.container, {backgroundColor: this.props.themeColor}]}>
          <View style={styles.wrapperContainer}>
            <Image 
              source={{uri: item.images.large}}
              style={styles.pictureStyle}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.sub_title}>{item.title}</Text>
              <View style={styles.directorsContainer}>
                {
                  this.getDirectorAvatars(item.directors).map((v, i) => {
                    return <View key={i} style={styles.directorsWrapper}>
                      {
                        v.avatar
                        ? <Image
                          source={{uri: v.avatar}}
                          style={styles.directorsImg}
                        />
                        : null
                      }
                      <Text style={styles.sub_title}>{v.name}</Text>
                    </View>
                  })
                }
              </View>
              <View style={styles.actorContainer}>
                <Text style={[styles.sub_title, styles.actorStyle]} numberOfLines={2}>
                  {
                    item.casts.map((actor, i) => {
                      return i === 0 ? `主演：${actor.name} ` : `${actor.name} `
                    })
                  }
                </Text>
              </View>
              <View style={styles.collectContainer}>
                <Text style={styles.sub_title}>{item.collect_count} 看过</Text>
              </View>
              <View style={styles.startContainer}>
                <StarRating
                  disabled={false}
                  rating={item.rating.average / 2}
                  maxStars={5}
                  halfStarEnabled={true}
                  emptyStar={StartUnSelectImg}
                  halfStar={StartHalfSelectImg}
                  fullStar={StartSelectImg}
                  starStyle={styles.startStyle}
                  selectedStar={(rating)=>{}}
                />
                <Text style={styles.ratingStyle}>{item.rating.average}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    })
  }

  render () {
    const { headerTitle, ready, hotList, refreshing } = this.state;
    const { themeColor } = this.props;
    if (ready || !hotList.length) return <LoadingView />;
    return (
      <View style={styles.container}>
        <SideBar
          backgroundColor={themeColor}
          title={headerTitle}
          leftImg={ThemeImg}
          rightImg={SearchImg}
          onLeftPress={() => this.props.navigation.navigate('Theme')}
          onRightPress={() => this.props.navigation.navigate('MovieSearch')} />
        <ScrollView
          refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this._onRefresh}
            colors={[themeColor]}
          />}>
          <View style={styles.swiperContainer}>
            <Swiper 
              style={styles.wrapper}
              height={220}
              autoplay={!__DEV__? true : false}
              autoplayTimeout={3}
              removeClippedSubviews={false}
              scrollEnabled={true}
              dot={<View style={styles.dot} />}
              activeDot={<View style={styles.active_dot} />}
              paginationStyle={styles.paginationStyle}>
              {this.moviesList()}
            </Swiper>
          </View>
          <MovieList callback={(id) => this.toDetail(id)} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  swiperContainer: {
    height: 220,
    paddingVertical: 10
  },
  wrapper: {
    flex: 1
  },
  text: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: 'rgba(125,125,125,0.6)',
    width: 16,
    height: 2,
    borderRadius: 1,
    marginLeft: 2,
    marginRight: 2,
  },
  active_dot: {
    backgroundColor: '#fff',
    width: 16,
    height: 2,
    borderRadius: 1,
    marginLeft: 2,
    marginRight: 2,
  },
  paginationStyle: {
    justifyContent: 'flex-end',
    marginBottom: -15,
    marginRight: 5
  }
})

const movieStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 6
  },
  wrapperContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10
  },
  pictureStyle: {
    width: 120,
    height: 180,
    borderRadius: 5
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
    marginTop: 10
  },
  directorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    overflow: 'hidden'
  },
  directorsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  directorsImg: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 5
  },
  actorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  actorStyle: {
    lineHeight: 18
  },
  collectContainer: {
    marginVertical: 10
  },
  startContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  startStyle: {
    width: 20,
    height: 20
  },
  ratingStyle: {
    fontSize: 14,
    color: '#ffcc33',
    fontWeight: '500',
    marginLeft: 8
  },
  sub_title: {
    fontSize: 14,
    color: '#fff'
  }
})

const mapStateToProps = state => ({
  themeColor: state.theme.themeColor
})

export default connect(mapStateToProps)(Movies);


