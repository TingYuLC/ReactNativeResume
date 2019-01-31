import { demo } from "./api";
import React from "react";
import { Base } from "../common/BaseContent";

export default class HttpService {
  /**电影列表*/
  getMovieList (type) {
    const url = demo.Movie_List_Url.replace('{type}', type);
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /**电影搜索*/
  getMovieSearch (text) {
    const url = demo.Movie_Search_Url.replace('{text}', text);
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /**电影条目详情*/
  getMovieDetail (id) {
    const url = demo.Movie_Detail_Url + id;
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /**电影剧照*/
  getMoviePhoto (id, count) {
    const url = demo.Movie_Photo_Url + id + `/photos?count=${count}&${Base.name}=${Base.value}`;
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then(data => {
          resolve(data);
        })
        .catch(error => console.log(error))
    })
  }

  /**电影短评论*/
  getMovieComonary (id, start, count) {
    const url = demo.Movie_Comonary_Url + id + `/comments?start=${start}&count=${count}&${Base.name}=${Base.value}`
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then(data => {
          resolve(data);
        })
        .catch(error => console.log(error))
    }) 
  }

  /**网易云音乐排行榜*/
  getMusicRankingList () {
    const url = demo.Music_Ranking_Url;
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then(data => {
          resolve(data);
        })
        .catch(error => console.log(error))
    })
  }

  /**网易云音乐排行榜*/
  getMusicDetailList (id) {
    const url = demo.Music_Detail_Url + '?id=' + id;
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then(data => {
          resolve(data);
        })
        .catch(error => console.log(error))
    })
  }

  /**网易云音乐搜索*/
  getMusicSearch (keywords) {
    const url = demo.Music_Search_Url.replace('{keywords}', keywords);
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /**网易云音乐歌词*/
  getMusicLrc (id) {
    const url = demo.Music_Mp3_lrc.replace('{id}', id);
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /**请求数据=本地加网络*/
  fetchNetData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response)=>response.json())
        .then((responseData)=>{
          resolve(responseData);
        })
        .catch((error)=>{
          reject(error);
        })
        .done();
    })
  }
}