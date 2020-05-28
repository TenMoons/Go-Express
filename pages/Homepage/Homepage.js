// pages/Homepage/Homepage.js
var page = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeArr: ['欢迎使用「拜托了快递」微信小程序~', '温馨提示：跑腿费最好不低于2元，避免无人接单'], // 通知栏
    imgUrls: ['/images/1.jpg', '/images/3.jpg', '/images/9.jpg'], // 轮播图  277px*186px
    currentIndex: 0,
    show: false,
    loading: true,
    index: 0,
    order: null,
    
  },

  /**
   * 轮播图改变
   */
  swiperChange(e) {
    //console.log(e);
    this.setData({
      currentIndex: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loading && this.data.index == 0) {
      this.setData({
        show: true,
        type: 'loading'
      })
      setTimeout(() => {
        this.setData({
          show: false,
          index: 1
        })
      }, 800)
    }
    if (this.data.loading && this.data.index == 1) {
      this.setData({
        show: true,
        type: 'loading'
      })
      setTimeout(() => {
        this.setData({
          show: true,
          type: 'end',
          loading: false
        })
      }, 800)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})