/**基础链接头*/
const MovieBaseUrl = "https://douban.uieee.com/v2/movie/";
const MusicBaseUrl ="http://localhost:3000/";

const demo = {
  /**电影列表*/
  Movie_List_Url: MovieBaseUrl + '{type}',
  /**电影搜索*/
  Movie_Search_Url: MovieBaseUrl + 'search?q={text}',
  /**电影详情*/
  Movie_Detail_Url: MovieBaseUrl + '/subject/',
  /**电影剧照*/
  Movie_Photo_Url: MovieBaseUrl + '/subject/',
  /**电影短评论*/
  Movie_Comonary_Url: MovieBaseUrl + '/subject/',
  /**网易云音乐排行版*/
  Music_Ranking_Url: MusicBaseUrl + 'toplist/detail',
  /**网易云音乐排行榜歌曲*/
  Music_Detail_Url: MusicBaseUrl + 'playlist/detail?id=24381616',
  /**网易云音乐搜索*/
  Music_Search_Url: MusicBaseUrl + 'search?keywords={keywords}',
  /**网易云音频地址*/
  Music_Mp3_Url: 'https://music.163.com/song/media/outer/url?id={id}.mp3',
  /**网易云音乐歌词*/
  Music_Mp3_lrc: MusicBaseUrl + 'lyric?id={id}'
}

export { demo };