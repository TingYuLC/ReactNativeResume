import React from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Linking, 
  Clipboard, Image, StatusBar, ToastAndroid, StyleSheet } from 'react-native';
import { ParallaxScrollView, ListItem, UMShareModule } from "../../components";
import { MyPageConfig } from "../../common/config";
import { PageStatusColor } from "../../common/BaseContent";
import { screenW, screenH } from '../../utils/utils';
import { BackImg, SearchImg, MyBgImg, AvatarImg, ShareImg } from "../../common/ImgConfig";

export default class My extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super (props);

    this.state = {
      headerTitle: '简介',
      title: '罗金城',
      subTitle: 'A Front-End Enginee (PC, H5, Mobile)',
      bgColor: PageStatusColor.My,
      HomeBgColor: PageStatusColor.Home,
      screenW: screenW,
      height: screenH,
      headerHeight: 275,
      navBarHeight: 56
    }
  }

  componentWillMount () {
    StatusBar.setBackgroundColor(this.state.bgColor);
  }

  componentWillUnmount () {
    StatusBar.setBackgroundColor(this.state.HomeBgColor);
  }  

  toWeb = (item) => {
    if (item.type === 'url') this.props.navigation.navigate('WebPage', { 
      title: item.title, url: item.url, themeColor: this.state.bgColor 
    });
    else if (item.type === 'email') Linking.openURL(`mailto:${item.url}`);
    else {
      Clipboard.setString(item.url);
      ToastAndroid.show(`${item.type}：${item.url}已复制至剪切板`, ToastAndroid.SHORT);
    }
  }

  setPageHeight = (height) => {
    this.setState({
      height: height
    })
  }

  uShare = () => {
    // UMShareModule.auth(0, (code,result,message) =>{
    //   console.log(code,result,message);
    // });
    // UMShareModule.share(
    //   '罗金城的博客',
    //   'http://luojc.cn/images/LittleBitch.jpg',
    //   'http://blog.luojc.cn/',
    //   '罗金城的博客', 0,(code,message) =>{
    //     console.log(code,message);
    // });
    UMShareModule.shareboard(
      '罗金城的博客',
      'http://luojc.cn/images/LittleBitch.jpg',
      'http://blog.luojc.cn/',
      '罗金城的博客', [0, 2, 3, 4, 32],(code,message) =>{
        console.log(code,message);
    });
  }

  navBarLeft () {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}>
        <Image
          source={BackImg}
          style={styles.buttonImgStyle}
        />
      </TouchableOpacity>
    );    
  }

  navBarRight () {
    return (
      <TouchableOpacity onPress={() => this.uShare()}>
        <Image
          source={ShareImg}
          style={styles.buttonImgStyle}
        />
      </TouchableOpacity>
    );
  }

  render () {
    const { headerTitle, title, subTitle, bgColor, height, screenW, headerHeight, navBarHeight } = this.state;

    return (
      <View style={styles.container} onLayout={e => this.setPageHeight(e.nativeEvent.layout.height)}>
        <View style={[styles.wrapperContainer, { width: screenW, height: height }]}>
          <ParallaxScrollView 
            navBarHeight={navBarHeight}
            navBarTransformHeight={headerHeight - navBarHeight}
            navBarColor={bgColor}
            navBarTitle={headerTitle}
            navBarTitleColor={"#fff"}
            navBarLeft={this.navBarLeft()}
            navBarRight={this.navBarRight()}
            style={styles.ParallaxColor}>
            <View style={[styles.ParallaxContainer, { width: screenW, minHeight: height + headerHeight - navBarHeight }]}>
              <ImageBackground
                source={MyBgImg}
                style={[styles.backImgCotainer, { width: screenW, height: headerHeight }]}>
                <Image 
                  source={AvatarImg}
                  style={styles.ParallaxImg}
                />
                <Text style={styles.ParallaxTitle}>{title}</Text>
                <Text style={styles.ParallaxSubTitle}>{subTitle}</Text>
              </ImageBackground>
              <View style={styles.ParallaxContent}>
                {
                  MyPageConfig.map((item, i) => {
                    return <ListItem 
                      title={item.title} 
                      themeColor={bgColor} 
                      icon={item.icon} 
                      children={item.children} 
                      toWeb={(i) => this.toWeb(item.children[i])} key={i} />
                  })
                }
              </View>
            </View>
          </ParallaxScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapperContainer: {
    backgroundColor: '#fff'
  },
  ParallaxColor: {
    backgroundColor: '#fff'
  },
  ParallaxContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  backImgCotainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ParallaxImg: {
    width: 90,
    height: 90,
    borderRadius: 45
  },
  ParallaxTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15
  },
  ParallaxSubTitle: {
    color: '#fff',
    fontSize: 16
  },
  ParallaxContent: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonImgStyle: {
    width: 25,
    height: 25
  }
})
