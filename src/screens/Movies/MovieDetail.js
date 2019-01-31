import React from "react";
import { TouchableOpacity, Image, Dimensions, ScrollView, View, ActivityIndicator, Text, StyleSheet, FlatList, Platform } from "react-native";
import { ParallaxScrollView, LoadingView } from "../../components";
import LinearGradient from 'react-native-linear-gradient';
import { BoxShadow } from 'react-native-shadow';
import { BackImg, StartSelectImg, StartHalfSelectImg, StartUnSelectImg, ZanImg } from "../../common/ImgConfig";
import { screenW, screenH } from "../../utils/utils";
import HttpMovieManager from "../../service";
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';

class MovieDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super (props);

    this.state = {
      data: '',
      photos: '',
      allPhoto: 0,
      comonary: '',
      rating: 0,
      loadingText: 'loading',
      isShowAll: false,
      isShowAllComments: false,
      loadingComments: false
    }

    this.HttpMovies  = new HttpMovieManager();
    this.getData();
    this.getPhotos();
    this.getComonary();
  }

  getData = () => {
    this.HttpMovies.getMovieDetail(this.props.navigation.getParam('id'))
      .then(data => {
        this.setState({
          data: data
        })
      })
      .catch(error => console.log(error))
  }

  getPhotos = () => {
    this.HttpMovies.getMoviePhoto(this.props.navigation.getParam('id'), 5)
      .then(data => {
        this.setState({
          allPhoto: data.total,
          photos: data.photos
        })
      })
      .catch(error => console.log(error))
  }

  getComonary = () => {
    let start = 0;
    const comonary = this.state.comonary;
    if (comonary.start != null) {
      start = comonary.start + 1;
      if (comonary.start * comonary.count >= comonary.total) {
        this.setState({
          isShowAllComments: true
        })
        return;
      }
    }
    if (start !== 0) {
      this.setState({
        loadingComments: true
      })
    }
    this.HttpMovies.getMovieComonary(this.props.navigation.getParam('id'), start, 10)
      .then(data => {
        if (this.state.comonary.comments) {
          data.comments = [...this.state.comonary.comments, ...data.comments]
        }
        this.setState({
          loadingComments: false,
          comonary: data
        })
      })
      .catch(error => console.log(error))
  }

  navBarLeft () {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}>
        <Image
          source={BackImg}
          style={styles.navBarImg}
        />
      </TouchableOpacity>
    );
  }

  _getFileMakerItemView (item) {
    const styles = fileMakerStyles;

    return (
      <View style={[styles.wrapperContainer, {width: (screenW - 30) * 0.25}]}>
        <Image
          source={{uri: item.avatars.large}}
          style={[styles.imgStyle, {width: (screenW - 30) * 0.24}]}/>
        <Text numberOfLines={1}>{item.name}</Text>
      </View>
    )
  }

  _getPhotosItemView (item, index) {
    const { photos, allPhoto } = this.state;
    const { navigation } = this.props;
    const styles = photoStyles;

    if (index === photos.length - 1) {
      return <TouchableOpacity
        onPress={() => navigation.navigate('ImgView', {id: navigation.getParam('id'), total: allPhoto, index: 0})}
        style={styles.wrapperContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleStyle}>全部剧照</Text>
          <View style={styles.emptyContainer} />
          <Text style={styles.subTitleStyle}>{item.photos_count}张</Text>
        </View>
      </TouchableOpacity>
    } else {
      return <TouchableOpacity
        onPress={() => navigation.navigate('ImgView', {id: navigation.getParam('id'), total: allPhoto, index: index})}
        style={styles.imgContainer}>
        <Image 
          source={{uri: item.image}}
          style={styles.imgStyle}
        />
      </TouchableOpacity>
    }
  }

  _getComonaryItemView (item, index) {
    const { themeColor } = this.props;
    const styles = comonaryStyles;

    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image 
            source={{uri: item.author.avatar}}
            style={styles.imgStyle}
          />
        </View>
        <View style={styles.wrapperContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.titleLeftContainer}>
              <View style={styles.titleLeftWrapper}>
                <Text numberOfLines={1} style={styles.titleLeftStyle}>{item.author.name}</Text>
              </View>
              <StarRating
                disabled={false}
                rating={item.rating.value}
                maxStars={5}
                halfStarEnabled={true}
                emptyStar={StartUnSelectImg}
                halfStar={StartHalfSelectImg}
                fullStar={StartSelectImg}
                starStyle={{width: 10, height: 10}}
                selectedStar={(rating)=>{}}
              />
            </View>
            <View style={styles.titleRightContainer}>
              <Image 
                source={ZanImg}
                style={styles.titleRightImg}
                tintColor={themeColor}
              />
              <Text style={styles.titleRightText}>{item.useful_count}</Text>
            </View>
          </View>
          <View>
            <Text numberOfLines={10} style={styles.contentStyle}>{item.content}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeStyle}>{item.created_at}</Text>
          </View>
        </View>
      </View>
    );
  }

  loadingMovieDetail () {
    const styles = loadingStyles;
    const { themeColor } = this.props;
    const { loadingText } = this.state;

    return (
      <View style={styles.container}>
        <LinearGradient
          style={[styles.wrapperContainer, {width: screenW, height: screenH}]}
          colors={[themeColor, '#fff']}>
          <View style={styles.textContainer}>
            <ActivityIndicator size="large" color={themeColor} />
            <Text style={[styles.textStyle, {color: themeColor}]}>{loadingText}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  renderHeader = () => {
    const { themeColor } = this.props;
    const { images } = this.state.data;
    const styles = headerStyles;

    return  <LinearGradient
      colors={[themeColor, '#fff']}
      style={[styles.container, {width: screenW}]}>
        <BoxShadow setting={{width: 180, height: 290, color: "#333", border: 4, radius: 3, opacity: 0.3, x:0, y:0}}>
          <Image
            source={{uri: images.large}}
            style={styles.imgStyle}/>
        </BoxShadow>
    </LinearGradient>
  }

  renderRating = () => {
    const { title, rating, ratings_count, year, genres, original_title, directors, casts, summary } = this.state.data;
    const styles = ratingStyles;
    return <View style={[styles.container, {backgroundColor: grayBackgroundColor}]}>
      <View style={styles.topContainer}>
        <View style={styles.topWrapperContainer}>
          <Text style={styles.topTextStyle}>{title}</Text>
          <View style={styles.TopTextContainer}>
            <Text style={styles.garyText} numberOfLines={1}>{year}/{genres.join('/')}</Text>
            <Text style={styles.garyText} numberOfLines={1}>原名: {original_title}</Text>
            <Text style={styles.garyText} numberOfLines={1}>导演: {(directors[0]!=null?directors[0].name:"未知")}</Text>
            <Text style={styles.garyText} numberOfLines={1}>主演: {casts.map((data,i)=>data.name).join(' ')}</Text>
          </View>
        </View>
        <BoxShadow setting={{width: 100, height: 100, color: "#444", border: 3, opacity: 0.3, x: 0.5, y: 3, style: styles.boxStyle}}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxText}>综合评分</Text>
            <Text style={styles.boxNum}>{rating.average}</Text>
            <View>
              <StarRating
                disabled={false}
                rating={rating.average / 2}
                maxStars={5}
                halfStarEnabled={true}
                emptyStar={StartUnSelectImg}
                halfStar={StartHalfSelectImg}
                fullStar={StartSelectImg}
                starStyle={styles.starStyle}
                selectedStar={(rating)=>{}}
              />
            </View>
            <Text style={styles.boxText}>{`${ratings_count}人`}</Text>
          </View>
        </BoxShadow>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomTextStyle}>我来评分</Text>
        <View style={styles.bottomStartContainer}>
          <StarRating
            disabled={false}
            rating={this.state.rating}
            maxStars={5}
            halfStarEnabled={false}
            emptyStar={StartUnSelectImg}
            halfStar={StartHalfSelectImg}
            fullStar={StartSelectImg}
            starStyle={styles.bigStarStyle}
            selectedStar={(rating)=>{this.setState({rating: rating})}}
          />
        </View>
      </View>
    </View>
  }

  renderSummary = () => {
    const { isShowAll, data } = this.state;
    const { summary } = data;
    const styles = summaryStyles;

    return <View style={[styles.container, {backgroundColor: grayBackgroundColor, paddingBottom: isShowAll ? 15 : 30}]}>
      <Text style={styles.titleStyle}>简介</Text>
      <Text style={styles.textStyle} numberOfLines={isShowAll ? 99 : 4}>{summary}</Text>
      { 
        isShowAll === false
        ? <View style={styles.textContainer}>
            <Text
              onPress={()=>{this.setState({isShowAll:true})}}>
              展开
            </Text>
        </View>
        : null
      }
    </View>
  }

  renderFileMaker = () => {
    const { casts } = this.state.data;
    const styles = fileMakerStyles;

    return <View style={[styles.container, {backgroundColor: grayBackgroundColor}]}>
      <Text style={styles.textStyle}>影人</Text>
      <FlatList
        data={casts}
        keyExtractor={(item, index) => item + index}
        renderItem={({item})=>(this._getFileMakerItemView(item))}
        horizontal={true}
      />
    </View>
  }

  renderPhoto = () => {
    const { photos } = this.state;
    const styles = photoStyles;

    return <View style={[styles.container, {backgroundColor: grayBackgroundColor}]}>
      <Text style={styles.textStyle}>剧照</Text>
      {
        !photos ? 
        null
        :
        <FlatList
          data={photos}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index})=>(this._getPhotosItemView(item, index))}
          horizontal={true}
        />
      }
    </View>
  }

  renderComment = () => {
    const { comonary, isShowAllComments, loadingComments } = this.state;
    const { themeColor } = this.props;
    const styles = commentStyles;

    return <View style={styles.container}>
      <View style={[styles.headerContainer, {backgroundColor: grayBackgroundColor}]}>
        <Text style={styles.headerText}>评论区</Text>
      </View>
      <View style={[styles.contentContainer, {backgroundColor: grayBackgroundColor}]}>
        {
          (!comonary || !comonary.comments) ? 
          null
          :
          <FlatList
            data={comonary.comments}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index})=>(this._getComonaryItemView(item, index))}
            extraData={comonary.comments}
          />
        }
      </View>
      <View style={[styles.otherContainer, {backgroundColor: grayBackgroundColor}]}>
      {
        isShowAllComments ?
        <View style={styles.noCommentContainer}>
          <Text style={[styles.noCommentText, {color: themeColor}]}>没有更多评论了</Text>
        </View>
        :
        (
          loadingComments
          ? <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={themeColor} />
              <Text style={[styles.loadingText, {color: themeColor}]}>加载中</Text>
            </View>
          : <TouchableOpacity
              activeOpacity={1}
              style={styles.moreContainer}
              onPress={() => this.getComonary()}>
              <Text style={[styles.moreText, {color: themeColor}]}>加载更多评论</Text>
            </TouchableOpacity>
        )
      }
      </View>
    </View>
  }

  render () {
    const { themeColor } = this.props;
    const { data } = this.state;
    const { title} = data;

    if (!data) return <LoadingView />;
    return (
      <ParallaxScrollView 
        navBarHeight={56}
        navBarTransformHeight={350 - 56}
        navBarColor={themeColor}
        navBarTitle={title}
        navBarTitleColor={"#fff"}
        navBarLeft={this.navBarLeft()}
        style={styles.container}>
        <ScrollView style={styles.wrapperContainer}>
          {this.renderHeader()}
          <View style={styles.wrapperContainer}>
            {/* 评分 */}
            {this.renderRating()}
            {/* 简介 */}
            {this.renderSummary()}
            {/* 影人 */}
            {this.renderFileMaker()}
            {/* 剧照 */}
            {this.renderPhoto()}
            {/* 评论 */}
            {this.renderComment()}
          </View>
        </ScrollView>
      </ParallaxScrollView>
    );
  }
}

const grayBackgroundColor = '#f5f5f5';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  wrapperContainer: {
    flexDirection: 'column'
  },
  garyText: {
    color: '#9d9d9d',
    fontSize: 13
  },
  navBarImg: {
    width: 25,
    height: 25
  }
})

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapperContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  }
})

const headerStyles = StyleSheet.create({
  container: {
    height: 350,
    alignItems: 'center',
    paddingTop: 36
  },
  imgStyle: {
    width: 180,
    height: 290,
    borderRadius: 4
  }
})

const ratingStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 15
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffcc33',
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 5,
    height: 45
  },
  topWrapperContainer: {
    flexDirection: 'column'
  },
  topTextStyle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000'
  },
  TopTextContainer: {
    flexDirection: 'column',
    marginTop: 15,
    width: 220
  },
  boxStyle: {
    marginVertical: 7
  },
  boxContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 15,
    width: 100,
    height: 100,
    backgroundColor: '#fff'
  },
  boxText: {
    fontSize: 13,
    color: '#999'
  },
  boxNum: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18
  },
  starStyle: {
    width: 12,
    height: 12
  },
  bigStarStyle: {
    width: 20,
    height: 20
  },
  bottomTextStyle: {
    color: '#ffcc33',
    fontWeight: 'bold',
    fontSize: 16
  },
  bottomStartContainer: {
    marginLeft: 5
  },
  garyText: {
    color: '#9d9d9d',
    fontSize: 13
  },
})

const summaryStyles = StyleSheet.create({
  container: {
    marginTop: 2, padding: 15
  },
  titleStyle: {
    fontSize: 14,
    color: '#9d9d9d',
    marginBottom: 10
  },
  textStyle: {
    fontSize: 14,
    lineHeight: 24,
    color: '#666'
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    right: 20
  }
})

const fileMakerStyles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 0,
    marginTop: -1
  },
  textStyle: {
    fontSize: 14,
    color: '#9d9d9d',
    marginBottom: 10
  },
  wrapperContainer: {
    height: 186,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgStyle: {
    height: 140
  }
})

const photoStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 25,
    paddingTop: 0,
    marginTop: -1
  },
  textStyle: {
    fontSize: 14,
    color: '#9d9d9d',
    marginBottom: 10
  },
  imgContainer: {
    width: 224,
    height: 150
  },
  imgStyle: {
    width: 220,
    height: 150
  },
  wrapperContainer: {
    width: 150,
    height: 150,
    backgroundColor: '#9d9d9d'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 12,
    color: '#f5f5f5'
  },
  subTitleStyle: {
    fontSize: 12,
    color: '#f5f5f5'
  },
  emptyContainer: {
    width:40,
    height:1,
    marginTop:4,
    marginBottom:4,
    backgroundColor: '#f5f5f5'
  }
})

const commentStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    marginVertical: 3,
    paddingLeft: 25,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold'
  },
  contentContainer: {
    padding: 20
  },
  otherContainer: {
    paddingBottom: 20
  },
  noCommentContainer: {
    height: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  noCommentText: {
    fontSize: 16
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  moreContainer: {
    height: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 18,
    marginLeft: 5
  },
  moreText: {
    fontSize: 16
  }
})

const comonaryStyles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  imgContainer: {
    width: 38
  },
  imgStyle: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  wrapperContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleLeftWrapper: {
    maxWidth: 150
  },
  titleLeftStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 8
  },
  titleRightContainer: {
    flexDirection: 'row',
    marginRight: 8,
    alignItems: 'center'
  },
  titleRightImg: {
    width: 18,
    height: 18,
    marginRight: 6
  },
  titleRightText: {
    fontSize: 12,
    color: '#9d9d9d'
  },
  contentStyle: {
    color: '#666',
    fontSize:14,
    lineHeight: 22,
    marginVertical: 4
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  timeStyle: {
    color: '#9d9d9d',
    fontSize:12,
    paddingRight:6
  }
})

const mapStateToProps = state => ({
  themeColor: state.theme.themeColor
})

export default connect(mapStateToProps)(MovieDetail);