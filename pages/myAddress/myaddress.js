const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    addressList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this;
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    this.queryAllAddress()
  },

  onAddr: function(e) {
    wx.navigateTo({
      url: '/pages/addMyAddress/addmyaddress',
    })
  },

  // 获取当前用户的所有地址
  queryAllAddress() {
    this.setData({
      addressList: []
    })
    let that = this
    let openid = this.data.userInfo.openid
    wx.request({
      url: app.globalData.baseurl + 'address/index',
      method: "GET",
      data: {
        "openid": openid,
      },
      success: res => {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            addressList: res.data
          })
        } else if (res.statusCode == 201) {
          wx.lin.showToast({
            title: '暂时还没有地址噢，快去添加吧~',
            duration: 1500
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.queryAllAddress()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      addressList: []
    })
    this.queryAllAddress()
    wx.stopPullDownRefresh()
  },
})