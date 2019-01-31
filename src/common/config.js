import Icon from "react-native-vector-icons/Ionicons";
import { Top250Img, PraiseImg, NorthImg, NewlastImg } from "./ImgConfig";

const HomePageConfig = [
  {
    title: '电影',
    bgColor: '#a6cb12',
    subTitle: '仿豆瓣电影',
    icon: 'ios-videocam',
    navigator: 'Movies'
  },
  {
    title: '音乐',
    bgColor: '#e00543',
    subTitle: '仿网易云音乐排行版',
    icon: 'ios-musical-note',
    navigator: 'RankingList'
  },
  {
    title: '个人',
    bgColor: '#84253e',
    subTitle: '作者个人信息，欢迎交流~',
    icon: 'ios-person',
    navigator: 'My'
  }
]

const MovieType = {
  in_theaters: 'in_theaters',
  top250: 'top250',
  weekly: 'weekly',
  us_box: 'us_box',
  new_movies: 'new_movies'
}

const MovieListTitle = {
  top250: 'Top250',
  weekly: '口碑榜',
  us_box: '北美票房榜',
  new_movies: '新片榜'
}

const MovieListConfig = [
  { title: MovieListTitle.top250, avatar: Top250Img, urlType: MovieType.top250, colors: ['#fe4080',"#ff77a5"] },
  { title: MovieListTitle.weekly, avatar: PraiseImg, urlType: MovieType.weekly, colors:['#feaa1a',"#ffd31a"] },
  { title: MovieListTitle.us_box, avatar:NorthImg, urlType: MovieType.us_box, colors:['#b983ff',"#a35cff"] },
  { title: MovieListTitle.new_movies, avatar: NewlastImg, urlType: MovieType.new_movies, colors:['#00ceff',"#0196fe"] },
]

const MyPageConfig = [
  {
    title: '个人简介',
    icon: 'ios-person',
    children: [
      {
        title: '简历',
        type: 'url',
        url: 'http://luojc.cn'
      },
      {
        title: '知乎',
        type: 'url',
        url: 'https://www.zhihu.com/people/luo-cheng-20-76/activities'
      }
    ]
  },
  {
    title: '技术博客',
    icon: 'ios-laptop',
    children: [
      {
        title: '个人博客',
        type: 'url',
        url: 'http://blog.luojc.cn'
      },
      {
        title: 'GitHub',
        type: 'url',
        url: 'https://github.com/TingYuLC'
      }
    ]
  },
  {
    title: '联系方式',
    icon: 'ios-contacts',
    children: [
      {
        title: 'mobile:13128972305',
        type: 'mobile',
        url: '13128972305'
      },
      {
        title: 'QQ:1317697565',
        type: 'QQ',
        url: '1317697565'
      },
      {
        title: 'Email:1317697565@qq.com',
        type: 'email',
        url: '1317697565@qq.com'
      }
    ]
  }
]

export {
  HomePageConfig,
  MovieType,
  MovieListTitle,
  MovieListConfig,
  MyPageConfig
}