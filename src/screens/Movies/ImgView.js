import React from "react";
import { View, Text, Image, TouchableOpacity, Modal, Dimensions, ActivityIndicator, ToastAndroid, 
  ScrollView, PermissionsAndroid, CameraRoll, PanResponder, StyleSheet, StatusBar } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { IOSBarView, SideBar } from "../../components";
import { BackImg } from "../../common/ImgConfig";
import { screenW, screenH, menuBarHeight, smallBarHeight } from "../../utils/utils";
import {PageStatusColor } from "../../common/BaseContent";
import ImageViewer from 'react-native-image-zoom-viewer';
import HttpMovieManager from "../../service";

class ImgView extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super (props);

    this.state = {
      index: 0,
      loading: true,
      loadingText: 'loading',
      modalVisible: false,
      screenW: screenW,
      screenH: screenH + smallBarHeight + menuBarHeight,
      bgColor: PageStatusColor.ImgView,
      photos: []
    }

    this.HttpMovies  = new HttpMovieManager();
    this.getPhotos();
  }

  componentDidMount () {
  }
 
  getPhotos = () => {
    const params = this.props.navigation.state.params
    this.HttpMovies.getMoviePhoto(params.id, params.total)
      .then(data => {
        const photos = data.photos.map(item => {
          return {
            url: item.image
          }
        })
        this.setState({
          index: params.index,
          loading: false,
          photos: photos
        })
        ToastAndroid.show("长按可保存图片", ToastAndroid.SHORT);
      })
      .catch(error => console.log(error))
  }

  requestCameraPermission = async (url) => {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            var promise = CameraRoll.saveToCameraRoll("file://" + url);
            promise.then(result => {
              this.setState({
                modalVisible: false
              })
              ToastAndroid.show("图片已保存至相册", ToastAndroid.SHORT);
            }).catch(function(error) {
              console.log(error)
              ToastAndroid.show("图片保存出错", ToastAndroid.SHORT);
            })
        } else {
            console.log("Camera permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
  }  

  saveImg = () => {
    const RNFS = require('react-native-fs'); //文件处理
    const storeLocation = `${RNFS.DocumentDirectoryPath}`;
    let pathName = new Date().getTime() + ".png"
    let downloadDest = `${storeLocation}/${pathName}`;
    let saveImageUrl = this.state.photos[this.state.index].url;
    const ret = RNFS.downloadFile({fromUrl:saveImageUrl,toFile:downloadDest});
    ret.promise.then(res => {
        if(res && res.statusCode === 200){
            this.requestCameraPermission(downloadDest);
        }
    })        
  }

  renderSaveImg () {
    const { screenW, screenH, bgColor, modalVisible } = this.state;
    const { themeColor } = this.props;
    const styles = imgStyles;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          this.setState({
            modalVisible: false
          })
        }}
      >
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => this.setState({modalVisible: false})}>
          <View style={[styles.maskContainer, {width: screenW, height: screenH}]}>
          </View>
          <View style={styles.wrapperContainer}>
            <TouchableOpacity onPress={() => this.saveImg()} activeOpacity={1} 
              style={[styles.textContainer, {width: screenW * 0.95}]}>
              <Text style={styles.textStyle}>保存到手机</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({modalVisible: false})} activeOpacity={1}
              style={[styles.textContainer, {width: screenW * 0.95}]}>
              <Text style={[styles.cancelStyle]}>取消</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  loadingMovieDetail () {
    const { screenW, screenH, loadingText } = this.state;
    const { themeColor } = this.props;
    const styles = loadingStyles;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={themeColor} />
        <LinearGradient
          style={[styles.linearContainer, {width: screenW, height: screenH}]}
          colors={[themeColor, '#fff']}>
          <View style={styles.wrapperContainer}>
            <ActivityIndicator size="large" color={themeColor} />
            <Text style={[styles.loadingText, {color: themeColor}]}>{loadingText}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  render () {
    const { index, loading, bgColor, photos } = this.state;
    const { navigation, themeColor } = this.props;
    const total = navigation.getParam('total');
    const propIndex = navigation.getParam('index');

    if (loading || !photos.length) return this.loadingMovieDetail();
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={bgColor} />
        <SideBar
          backgroundColor={bgColor}
          title={`${index + 1}/${total}`}
          leftImg={BackImg}
          onLeftPress={() => navigation.goBack()} />
        <ImageViewer imageUrls={photos} index={index} saveToLocalByLongPress={false}
          renderIndicator={() => null}
          onChange={(index) => this.setState({index: index})}
          onLongPress={() => this.setState({modalVisible: true})}/>
        {this.renderSaveImg()}
      </View>      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  linearContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperContainer: {
    flex: 1
  },
  imgContainer: {
    flex: 1
  },
  imgStyle: {
    resizeMode: 'contain',
    flex: 1
  }
})

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  }
})

const imgStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  maskContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10
  },
  textContainer: {
    height: 42,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 14,
    color: '#000'
  },
  cancelStyle: {
    fontSize: 14,
    color: 'orange'
  }
})

const mapStateToProps = state => ({
  themeColor: state.theme.themeColor
})

export default connect(mapStateToProps)(ImgView);