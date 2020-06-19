const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    credit: '',
    authorized: false,
    code: app.globalData.code,
    orderscount:[0,0,0,0], //用户各种类型订单数量列表
    optiontype:"",
    orderstate:[0,1,2,3,4,5],   //订单状态,1我接收的，2代派送，3待收货，4已完成，5我发布的，0全部订单
  },

  /**
   * 绑定信息
   */
  onGotoBindProfile: function () {
    let isAuth = this.data.authorized
    if (!isAuth) {
      wx.lin.showDialog({
        type: "alert",
        title: "提示",
        content: "请先授权微信登录！"
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
  onGotoMyOrder: function (e) {
    this.setData({
      optiontype: this.data.orderstate[e.currentTarget.dataset.key],
    })
    let type = this.data.optiontype;
    // 以下部分用于实现用户查看相关订单后取消红点提示
    let isAuth = this.data.authorized
    if (!isAuth) {
      wx.lin.showDialog({
        type: "alert",
        title: "提示",
        content: "请先授权微信登录！"
      })
    } else {
      wx.navigateTo({
        url: "/pages/myOrders/myorders?optiontype=" + type,
      })
    }
  },

  /**
   * 我的地址
   */
  onGotoMyAddress: function () {
    let isAuth = this.data.authorized
    if (!isAuth) {
      wx.lin.showDialog({
        type: "alert",
        title: "提示",
        content: "请先授权微信登录！"
      })
    } else {
      wx.navigateTo({
        url: "/pages/myAddress/myaddress",
      })
    }
  },

  /**
   * 关于我们
   */
  onGotoDevelopers: function () {
    wx.navigateTo({
      url: "/pages/Developers/developers",
    })
  },

  /**
   * 联系客服
   */
  onGotoCustomerService: function () {
    wx.navigateTo({
      url: "/pages/customerService/customerservice",
    })
  },

  /**
   * 获取个人信息
   */
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

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res1) => {
              this.setData({
                userInfo: res1.userInfo
              })
              app.globalData.userInfo = res1.userInfo // 为全局变量赋值
              let wechat_name = res1.userInfo.nickName
              wx.login({
                success: (res) => {
                  console.log('code:' + res.code)
                  this.setData({
                    code: res.code
                  })
                  app.globalData.code = this.data.code // 为全局变量赋值
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
                      if (res.statusCode == 200) {
                        this.setData({
                          credit: res.data.credit,
                          authorized: true
                        })
                        app.globalData.userInfo.openid = res.data.openid
                        app.globalData.userInfo.auth_status = 1
                        app.globalData.userInfo.credit = res.data.credit
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
   * 获取用户订单数量
   */
  queryCountOrders() {
    let userinfo = this.data.userInfo
    let that = this
    wx.request({
      url: app.globalData.baseurl + 'order/my/count',//myorders
      method: "GET",
      data: {
        "user_openid": userinfo.openid, //获取当前用户的openid,用于筛选订单
      },
      success: res => {
        console.log(res)
        that.setData({
          orderscount: res.data
        })
        console.log(that.data.orderscount)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) { //此处判断是否登录
          that.setData({
            authorized: true,
            userInfo: wx.getStorageSync('userInfo')
          })
          console.log(that.data.userInfo)
          that.queryCountOrders()
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
    let info = wx.getStorageSync('userInfo')
    if(info != null) {
      console.log(info)
      this.setData({
        credit: info.credit
      })
    } else {
      this.setData({
        credit: '-'
      })
    }
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