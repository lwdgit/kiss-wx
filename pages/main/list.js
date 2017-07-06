// pages/main/list.js
const { request } = require('../../utils/util')
const markdown = require('../common/markdown/markdown')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageNo: 1,
    canLoad: true
  },

  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
      }
    })
  },
  finishLoad: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
      }
    })
  },
  loadList: function (page = 1) {
    this.data.pageNo = page

    let url = '/page/'
    if (page > 1) {
      if (!this.data.canLoad) {
        return;
      }
      url += (page + '/')
    } else {
      this.data.canLoad = true
    }

    wx.showToast({
      title: 'Loading...',
      icon: 'loading'
    })

    request(url).then(res => {
      let list = res.data.posts.map((post) => {
        post.summary = markdown(post.summary)
        this.finishLoad()
        return post
      })
      
      if (page > 1) {
        list = this.data.list.concat(list)
      }
      if (!res.data.next) {
        this.data.canLoad = false
      }
      this.setData({
        list: list
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadList();
  },

  onReachBottom: function () {
    this.loadList(this.data.pageNo + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})