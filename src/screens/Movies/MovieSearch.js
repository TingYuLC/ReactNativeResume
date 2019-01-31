import React from "react";
import { View, TouchableOpacity, Text, TextInput, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { BackImg, SearchImg } from "../../common/ImgConfig";
import HttpMovieManager from "../../service";
import { connect } from 'react-redux';

class MovieSearch extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super (props);
    this.state = {
      loading: false,
      text: '',
      loadingText: 'loading',
      data: []
    }

    this.HttpMovies  = new HttpMovieManager();
  }

  fullData = () => {
    const { text, loading } = this.state;
    if (!text || loading) return;
    this.setState({
      loading: true
    })
    this.HttpMovies.getMovieSearch(text)
      .then(res => {
        this.setState({
          loading: false,
          data: res.subjects
        });
      })
      .catch(error => {
        this.setState({
          loading: false
        })
      })
  }

  touchMovie = () => {
    this.refs.textinput.blur();
  }

  renderList (item) {
    const { images, title, rating, genres, pubdates } = item;
    const type = genres.join('');
    const region = pubdates.join('/');
    const subTitle = `${rating.average}/${region}/${type}`;

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('MovieDetail', {id: item.id})}>
        <View style={styles.listContainer}>
          <Image 
            source={{uri: images.large}}
            style={styles.listImg}
          />
          <View style={styles.textContainer}>
            <Text>{title}</Text>
            <Text style={styles.textStyle}>{subTitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    const { loading, data, text, loadingText } = this.state;
    const { themeColor, navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.headerContainer, {backgroundColor: themeColor}]}>
          <View style={styles.backContainer}> 
            <TouchableOpacity
              activeOpacity={1}
              style={styles.touchBtn}
              underlayColor="#fff"
              onPress={() => navigation.goBack()}>
              <Image 
                source={BackImg}
                style={styles.touchImg}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchStyle}
              placeholder="搜索电影/电视"
              value={text}
              onChangeText={(text) => {this.setState({text: text})}}
              underlineColorAndroid="transparent"
              autoFocus={true}
              ref="textinput" />
          </View>
          <View style={styles.cancelContainer}> 
            <TouchableOpacity 
              activeOpacity={1}
              style={styles.touchBtn}
              underlayColor="#fff"
              onPress={this.fullData}>
              <Image 
                source={SearchImg}
                style={styles.touchImg}
              />
            </TouchableOpacity>
          </View>
        </View>
          {
            loading ? 
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={themeColor} />
              <Text style={[styles.loadingStyle, {color: themeColor}]}>{loadingText}</Text>
            </View>
            :
            <FlatList
              data={data}
              renderItem={({item}) => this.renderList(item)}
              keyExtractor={(item, index) => index.toString()}
              style={styles.flatListContainer}
            />
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingRight: 10,
    marginBottom: 15
  },
  searchContainer: {
    flex: 5,
    flexDirection: 'row',
    height: 30,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderRadius: 4
  },
  searchStyle: {
    padding: 0,
    flex: 1,
    paddingLeft: 5
  },
  searchIcon: {
    paddingHorizontal: 10
  },
  backContainer: {
    flex: .5,
    marginLeft: 10,
    marginRight: 10
  },
  cancelContainer: {
    flex: .5,
    marginLeft: 10
  },
  touchBtn: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchImg: {
    width: 25,
    height: 25
  },
  cancelText: {
    color: 'green',
    fontSize: 15
  },
  loadingContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  loadingStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  },
  flatListContainer: {
    marginTop: -10
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  listImg: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: '#888',
    fontSize: 12
  }
})

const mapStateToProps = state => ({
  themeColor: state.theme.themeColor
})

export default connect(mapStateToProps)(MovieSearch);
