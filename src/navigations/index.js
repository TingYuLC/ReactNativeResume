import React from "react";
import { createStackNavigator } from 'react-navigation';
import { Home, RankingList, MusicPlayer, MusicList, My, Movies, MovieSearch,
  Theme, WebPage, MovieDetail, ImgView, Demo } from "../screens";

const StackNavigator = createStackNavigator({
  Home,
  Movies,
  My,
  RankingList,
  MusicPlayer,
  MusicList,
  MovieSearch,
  Theme,
  MovieDetail,
  ImgView,
  WebPage,
  Demo
}, {
  initialRouteName: 'Home'
})

export default StackNavigator;
