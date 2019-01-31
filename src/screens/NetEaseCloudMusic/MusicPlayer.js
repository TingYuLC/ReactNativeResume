import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity, Dimensions, StatusBar, Animated, Easing, ActivityIndicator } from 'react-native';
import { Slider } from 'react-native-elements'
import { BackImg, SearchImg } from "../../common/ImgConfig";
import { SideBar } from "../../components";
import { demo } from "../../service/api";
import Video from 'react-native-video';
import { screenW, screenH } from "../../utils/utils";
import { PageStatusColor } from "../../common/BaseContent";
import HttpMusicManager from "../../service";
import Icon from "react-native-vector-icons/Ionicons";

export default class MusicPlayer extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      picUrl: '',
      mp3: '',
      lrc: [],
      lrcTime: {},
      activeIndex: 0,
      initHeight: 0,
      lastTime: '0',
      mode: 0,
      bgColor: PageStatusColor.NetEaseCloudMusic,
      pause: false,
      startTime: '00:00',
      currentTime: 0,
      sliderValue: 0,
      rotateValue: new Animated.Value(0),
      minimumTrackTintColor: PageStatusColor.NetEaseCloudMusic,
      maximumTrackTintColor: "#cccccc",
      thumbTintColor: "#fff"
    }
  }

  componentWillMount () {
    this.HttpMusic  = new HttpMusicManager();
    const navigation = this.props.navigation;
    const id = navigation.getParam('id');
    const name = navigation.getParam('name');
    const picUrl = navigation.getParam('picUrl');
    const url = demo.Music_Mp3_Url.replace('{id}', id);
    this.startAnimation();
    this.getLrc();
    this.setState({
      title: name,
      picUrl: picUrl,
      mp3: url
    })
  }

  onLoad = (e) => {
    this.setState({
      duration: e.duration
    })
  }

  // 获取歌词
  getLrc = () => {
    const id = this.props.navigation.getParam('id');
    this.HttpMusic.getMusicLrc(id)
      .then(res => {
        let lrc = [];
        const lrcTime = [];
        if (res.code === 200) {
          const rec = /\[(.)*\]/;
          let index = 0;
          res.lrc.lyric.split('\n').forEach((v, i) => {
            if (!v) return;
            const tmp = this.formatTimeDate(rec.exec(v)[0]);
            const text = v.replace(rec, '').trim();
            if (text) {
              lrcTime[tmp] = index;
              lrc.push(text);
              index++;
            }
          })
        }
        this.setState({
          lrc: lrc,
          lrcTime: lrcTime
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  // 每次进度条更新歌词变化
  onProgress =(data) => {
    let val = parseInt(data.currentTime)
    const key = this.formatTime(val);
    let activeIndex = this.state.activeIndex;
    let height = this.state.initHeight;
    let lastTime = this.state.lastTime;
    if (this.state.lrcTime[key]) {
      activeIndex = this.state.lrcTime[key];
      if (lastTime !== key) {
        height = 30 * (activeIndex + 1);
      }
      if (this.state.mode === 1) {
        this.refs.scroll.scrollTo({
          y: height,
          animated: true
        })
      }
      lastTime = key;
    }
    this.setState({
      sliderValue: val,
      currentTime: data.currentTime,
      activeIndex: activeIndex,
      initHeight: height,
      lastTime: lastTime
    })

    //如果当前歌曲播放完毕,需要开始下一首
    if (val == this.state.file_duration){
    }
  }

  // 唱片切换到歌词模式，歌词变化
  toLrc = () => {
    const that = this;
    this.setState({
      mode: 1
    }, () => {
      setTimeout(() => {
        that.refs.scroll.scrollTo({
          y: 30 * (that.state.activeIndex + 1),
          animated: true
        })        
      }, 0);
    })
  }

  // 滑动进度条歌词变化
  slideLrc = (value) => {
    this.refs.video.seek(value);
    let min = 100;
    let index = this.state.lrc.length - 1;
    for (let key in this.state.lrcTime) {
      const diffTime = value - this.formateDateTime(key);
      if (diffTime >= 0 && diffTime < min) {
        min = diffTime;
        index = this.state.lrcTime[key];
      } 
    }
    this.setState({
      activeIndex: index
    });
    if (this.state.mode === 1) {
      this.refs.scroll.scrollTo({
        y: 30 * index,
        animated: true
      });
    }
  }

  formatTime = (time) => {
    // 71 -> 01:11
    if (!time) return this.state.startTime;
    let min = Math.floor(time / 60)
    let second = time - min * 60
    min = min >= 10 ? min : '0' + min
    second = second >= 10 ? second : '0' + second
    return min + ':' + second
  }

  formatTimeDate = (time) => {
    // [00:00.000] -> 00:00
    const tmp = time.split('.')[0].replace('[', '');
    return tmp;
  }

  formateDateTime = (text) => {
    // 01:11 -> 71
    const data = text.split(':');
    return parseInt(data[0]) * 60 + parseInt(data[1]);
  }

  startAnimation() {
    this.state.rotateValue.setValue(0);
    Animated.parallel([
      Animated.timing(this.state.rotateValue, {
          toValue: 1,
          duration: 15000,
          easing: Easing.out(Easing.linear)
      }),
    ]).start(() => this.startAnimation());
  }

  renderPlay = () => {
    const { startTime, currentTime, sliderValue, duration, minimumTrackTintColor, maximumTrackTintColor, thumbTintColor } = this.state;
    const styles = playStyles;

    return <View style={[styles.container, {width: screenW}]}>
      <View style={styles.sliderContainer}>
        <View>
          <Text style={styles.timeStyle}>{this.formatTime(Math.floor(currentTime))}</Text>
        </View>
        <View style={styles.sliderStyle}>
          <Slider
            value={sliderValue}
            maximumValue={duration}
            step={1}
            minimumTrackTintColor={minimumTrackTintColor}
            maximumTrackTintColor={maximumTrackTintColor}
            thumbTintColor={thumbTintColor}
            onValueChange={(value) => this.setState({currentTime: value})}
            onSlidingComplete={(value) => this.slideLrc(value)}
          />
        </View>
        <View>
          {
            this.formatTime(Math.floor(duration)) === startTime
            ? <ActivityIndicator size="small" color="#fff" /> 
            : <Text style={styles.timeStyle}>{this.formatTime(Math.floor(duration))}</Text>
          }
        </View>
      </View>
      <View style={styles.statusContainer}>
        <TouchableOpacity
          onPress={() => {this.setState({pause: !this.state.pause})}}
          style={styles.playStatus}>
          {
            this.state.pause
            ? <Icon name="ios-play" size={30} color={thumbTintColor} />
            : <Icon name="ios-pause" size={25} color={thumbTintColor} />
          }
        </TouchableOpacity>
      </View>
    </View>
  }

  render () {
    const { title, picUrl, mp3, bgColor, pause, rotateValue, activeIndex, mode } = this.state;

    return (
      <View style={styles.container}>
        <Video
          source={{uri: mp3}}
          ref='video'
          volume={1.0}
          paused={pause}
          onProgress={(e) => this.onProgress(e)}
          onLoad={(e) => this.onLoad(e)}
          playInBackground={true}/>
        <SideBar
          backgroundColor={bgColor}
          title={title}
          leftImg={BackImg}
          onLeftPress={() => this.props.navigation.goBack()}/>
        <View style={styles.recordContainer}>
          {
            mode === 1
            ?
            <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({mode: 0})}}>
              <ScrollView showsVerticalScrollIndicator={false} ref="scroll">
                <View style={{height: 300}} />
                {
                  this.state.lrc.map((item, i) => {
                    return <View key={i} style={styles.lrcWrapper}>
                      <Text style={[styles.lrcStyle, {color: activeIndex === i ? '#fff' : '#777'}]}>{item}</Text>
                    </View>
                  })
                }
                <View style={{height: 300}} />
              </ScrollView>
            </TouchableOpacity>
            :
            <TouchableOpacity activeOpacity={1} style={styles.recordWrapContainer} onPress={() => this.toLrc()}>
              <Animated.Image source={{uri: picUrl}}
                style={[
                  styles.record,
                  { 
                    transform: [{
                      rotateZ: rotateValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      })
                    }]
                  }
                ]}>
              </Animated.Image>
            </TouchableOpacity>
          }
        </View>
        <View style={styles.emptyContainer} />
        {this.renderPlay()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    flexDirection: 'column'
  },
  recordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordWrapContainer: {
    width: 280,
    height: 280,
    borderRadius: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C60D0D'
  },
  lrcWrapper: {
    height: 30,
    alignItems: 'center'
  },
  lrcStyle: {
    color: '#000',
    fontSize: 18
  },
  record: {
    width:240,
    height: 240,
    borderRadius: 120
  },
  emptyContainer: {
    height: 100
  }
});

const playStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'column'
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginHorizontal: 5
  },
  timeStyle: {
    fontSize: 12,
    color: '#fff'
  },
  sliderStyle: {
    flex: 1,
    marginHorizontal: 5
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  playStatus: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
