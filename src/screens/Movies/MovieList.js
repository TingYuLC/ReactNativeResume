import React from "react";
import { View, Image, Text, ActivityIndicator, TouchableOpacity, FlatList, Platform, StyleSheet, Dimensions } from "react-native";
import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';
import HttpMovieManager from "../../service";
import { MovieListConfig } from "../../common/config";
import { MovieType, MovieListTitle } from "../../common/config";
import { screenW } from "../../utils/utils";
import { StartSelectImg, StartHalfSelectImg, StartUnSelectImg, SelectImg } from "../../common/ImgConfig";
import { connect } from 'react-redux';

class MovieList extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      loading: false,
      loadingText: 'loading',
      tabList: [],
      selectType: MovieListTitle.top250,
      type: MovieListConfig
    }

    this.HttpMovies  = new HttpMovieManager();
  }

  componentWillMount () {
    this.getTabMovies(MovieListTitle.top250, MovieType.top250);
  }

  getTabMovies = (title, urlType) => {
    if (this.state.loading) return;
    this.setState({
      loading: true,
      selectType: title
    })
    this.HttpMovies.getMovieList(urlType)
      .then(res => {
        const data = res.subjects.map((item, index) => {
          if (item.subject) {
            return item.subject;
          } else {
            return item;
          }
        })
        this.setState({
          loading: false,
          tabList: data
        })
      })
      .catch(error => console.log(error))
  }

  moviesType = () => {
    const styles = moviesTypeStyles;
    const { type, selectType } = this.state;

    return type.map((item, index) => {
      return (
        <TouchableOpacity activeOpacity={1} style={styles.container} key={`type${index}`} onPress={() => this.getTabMovies(item.title, item.urlType)}>
          <View style={styles.wrapperContainer}>
            <LinearGradient
              colors={item.colors}
              style={styles.bgContainer}>
              <Image
                source={item.avatar}
                style={styles.bgImg}/>
            </LinearGradient>
            <Text style={styles.text}>{item.title}</Text>
            {
              (selectType === item.title) ?
              <View style={styles.selectContainer}>
                <Image 
                  source={SelectImg}
                  style={styles.selectImg}
                />
              </View>
              :
              null
            }
          </View>
        </TouchableOpacity>
      )
    })
  }

  singleMovie = (item) => {
    const styles = singleMovieStyles;

    return (
      <TouchableOpacity 
        activeOpacity={1}
        onPress={() => this.props.callback(item.id)}
        style={[styles.container, {width: picWidth, backgroundColor: this.props.themeColor}]}>
        <View style={styles.wrapperContainer}>
          <Image 
            source={{uri: item.images.large}}
            style={[styles.imgStyle, {width: picWidth}]}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle} numberOfLines={1}>{item.title}</Text>
          </View>
          <View style={styles.starContainer}>
            <StarRating
              disabled={false}
              rating={item.rating.average / 2}
              maxStars={5}
              halfStarEnabled={true}
              emptyStar={StartUnSelectImg}
              halfStar={StartHalfSelectImg}
              fullStar={StartSelectImg}
              starStyle={styles.starImg}
              selectedStar={(rating)=>{}}
            />
            <Text style={styles.ratingStyle}>{item.rating.average}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    const { loading, loadingText, tabList } = this.state;
    const { themeColor } = this.props;

    return (
      <View>
        <View style={[styles.tabContainer, {backgroundColor: themeColor}]}>
          {this.moviesType()}
        </View>
        <View style={styles.wrapperContainer}>
          {
            loading ?
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={themeColor} />
              <Text style={[styles.loadingStyle, {color: themeColor}]}>{loadingText}</Text>
            </View>
            :
            <FlatList
              data={tabList}
              renderItem={({item}) => this.singleMovie(item)}
              numColumns={3}
              keyExtractor={(item, index) => item + index}
              extraData={this.props}
            />
          }
        </View>
      </View>
    );
  }
}

const picWidth = (screenW - 10) / 3 - 10;

const styles = StyleSheet.create({
  tabContainer: {
    height: 70,
    marginHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row'
  },
  wrapperContainer: {
    marginLeft: 10,
    marginTop: 15
  },
  loadingContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  loadingStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  }
})

const moviesTypeStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapperContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  bgContainer: {
    width: 42,
    height: 42,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bgImg: {
    width: 26,
    height: 26
  },
  text: {
    color: '#fff'
  },
  selectContainer: {
    position: 'absolute',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectImg: {
    width: 30,
    height: 30
  }
})

const singleMovieStyles = StyleSheet.create({
  container: {
    height: 185,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 15
  },
  wrapperContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  imgStyle: {
    height: 145,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  titleContainer: {
    marginHorizontal: 4
  },
  titleStyle: {
    color: '#fff'
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  starImg: {
    width: 14,
    height: 14
  },
  ratingStyle: {
    fontSize: 14,
    color: '#ffcc33',
    fontWeight: '500',
    marginLeft: 8
  }
})

const mapStateToProps = state => ({
  themeColor: state.theme.themeColor
})

export default connect(mapStateToProps)(MovieList);