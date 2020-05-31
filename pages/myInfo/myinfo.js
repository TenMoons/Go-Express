const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    credit: 90,
    authorized: false,
    code: app.globalData.code,
    unpaidCount: 0,
    paidCount: 0,
    deliveredCount: 0,
  
  },
  /**
   * 绑定信息
   */
  onGotoBindProfile: function () {
    let isAuth = this.data.authorized
    if (!isAuth) {
      wx.showModal({
        title: '提示',
        content: '请先授权微信登录！'
      })
    } else {
      wx.navigateTo({
        url: "/pages/bindProfile/bindprofile",
      })
    }
  },
  /**
   * 我的订单
   */
  onGotoMyOrder: function () {
    wx.navigateTo({
      url: "/pages/myOrders/myorders",
    })
  },
  /**
   * 我的地址
   */
  onGotoMyAddress: function () {
    let isAuth = this.data.authorized
    if (!isAuth) {
      wx.showModal({
        title: '提示',
        content: '请先授权微信登录！'
      })
    } else {
      wx.navigateTo({
        url: "/pages/myAddress/myaddress",
      })
    }
  },
  onGotoDevelopers: function () {
    wx.navigateTo({
      url: "/pages/Developers/developers",
    })
  },
  onGotoCustomerService: function () {
    wx.navigateTo({
      url: "/pages/customerService/customerservice",
    })
  },

  onGotUserInfo: function (e) {
    this.GetUserInfo()
  },

  GetUserInfo() {
    let _this = this
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            authorized: true
          })
          // app.globalData.authorized = this.data.authorized
          console.log("已授权")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res1) => {
              console.log(res1.userInfo)
              this.setData({
                userInfo: res1.userInfo
              })
              app.globalData.userInfo = res1.userInfo // 为全局变量赋值
              let wechat_name = res1.userInfo.nickName
              wx.login({
                success: (res) => {
                  this.setData({
                    code: res.code
                  })
                  app.globalData.code = this.data.code // 为全局变量赋值
                  console.log('app.code =' + this.data.code)
                  wx.request({
                    url: app.globalData.baseurl + 'user/wxLogin',
                    data: {
                      "code": app.globalData.code,
                      "wechat_name": wechat_name,
                      "clientJSONString": JSON.stringify(res1.userInfo)
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    success: (res) => {
                      console.log(res)
                      if (res.statusCode == 200) {
                        app.globalData.userInfo.openid = res.data
                        app.globalData.userInfo.auth_status = 0
                        console.log('openid:' + app.globalData.userInfo.openid)
                        console.log(app.globalData.userInfo)
                        wx.setStorageSync('userInfo', app.globalData.userInfo)
                      }
                    }
                  })
                },
              })
            }
          })
        } else {
          // TODO: 引导用户二次授权
          console.log("未授权")
          this.setData({
            authorized: false
          })
          // app.globalData.authorized = this.data.authorized
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSetting({
      success:(res) => {
        if (res.authSetting['scope.userInfo']) { //此处判断是否登录
          that.setData({
            authorized: true,
            userInfo: wx.getStorageSync('userInfo')
          })
          console.log(that.data.userInfo)
        }
      }
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})