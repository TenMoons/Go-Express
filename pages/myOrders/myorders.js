let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myorderList:[],  //各种订单列表
    //tbsorderList:[],  //待派送订单列表
    optiontype:"",  //操作类型
    isempty:true,
  },

  /**
   * 获取当前用户所有订单信息
   */
  queryMyAllOrders() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: app.globalData.baseurl + 'order/my/index',
      method: "GET",
      data: {
        "user_openid": userInfo.openid, //获取当前用户的openid,用于筛选订单
      },
      success: res => {
        res.data.forEach(element => {
          element.publish_time = element.publish_time.replace(/T/g, ' ').substring(0, element.publish_time.length - 3)
          element.end_time = element.end_time.replace(/T/g, ' ').substring(0, element.end_time.length - 3)
          if (element.taker_time != null) {
            element.taker_time = element.taker_time.replace(/T/g, ' ').substring(0, element.taker_time.length - 3)
          }
          if (element.finish_time != null) {
            element.finish_time = element.finish_time.replace(/T/g, ' ').substring(0, element.finish_time.length - 3)
          } 
        })
        that.setData({
          myorderList: res.data
        })
        if(this.data.myorderList!=[])
          that.setData({
            isempty: false
          })
        console.log(that.data.myorderList)
      }
    })
  },


  /**
   * 获取当前用户接收的订单信息
   */
  queryTakeMyOrders() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: app.globalData.baseurl + 'order/my/take',
      method: "GET",
      data: {
        "user_openid": userInfo.openid, // 获取当前用户的openid,用于筛选订单
      },
      success: res => {
        res.data.forEach(element => {
          element.publish_time = element.publish_time.replace(/T/g, ' ').substring(0, element.publish_time.length - 3)
          element.end_time = element.end_time.replace(/T/g, ' ').substring(0, element.end_time.length - 3)
          if (element.taker_time != null) {
            element.taker_time = element.taker_time.replace(/T/g, ' ').substring(0, element.taker_time.length - 3)
          }
          if (element.finish_time != null) {
            element.finish_time = element.finish_time.replace(/T/g, ' ').substring(0, element.finish_time.length - 3)
          } 
        })
        that.setData({
          myorderList: res.data
        })
        if(this.data.myorderList!=[])
          that.setData({
            isempty: false
          })
        console.log(that.data.myorderList)
      }
    })
  },


  /**
   * 获取当前用户待派送（已接单）订单信息
   */
  querytbSendMyOrders() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: app.globalData.baseurl + 'order/my/send',
      method: "GET",
      data: {
        "user_openid": userInfo.openid, // 获取当前用户的openid,用于筛选订单
      },
      success: res => {
        res.data.forEach(element => {
          element.publish_time = element.publish_time.replace(/T/g, ' ').substring(0, element.publish_time.length - 3)
          element.end_time = element.end_time.replace(/T/g, ' ').substring(0, element.end_time.length - 3)
          if (element.taker_time != null) {
            element.taker_time = element.taker_time.replace(/T/g, ' ').substring(0, element.taker_time.length - 3)
          }
          if (element.finish_time != null) {
            element.finish_time = element.finish_time.replace(/T/g, ' ').substring(0, element.finish_time.length - 3)
          } 
        })
        that.setData({
          myorderList: res.data
        })
        if(this.data.myorderList!=[])
          that.setData({
            isempty: false
          })
        console.log(that.data.myorderList)
      }
    })
  },

  /**
   * 获取当前用户待收货（已送达）订单信息
   */
  querytbRecMyOrders() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: app.globalData.baseurl + 'order/my/receive',
      method: "GET",
      data: {
        "user_openid": userInfo.openid, //获取当前用户的openid,用于筛选订单
      },
      success: res => {
        res.data.forEach(element => {
          element.publish_time = element.publish_time.replace(/T/g, ' ').substring(0, element.publish_time.length - 3)
          element.end_time = element.end_time.replace(/T/g, ' ').substring(0, element.end_time.length - 3)
          if (element.taker_time != null) {
            element.taker_time = element.taker_time.replace(/T/g, ' ').substring(0, element.taker_time.length - 3)
          }
          if (element.finish_time != null) {
            element.finish_time = element.finish_time.replace(/T/g, ' ').substring(0, element.finish_time.length - 3)
          } 
        })
        that.setData({
          myorderList: res.data
        })
        if(this.data.myorderList!=[]){
          that.setData({
            isempty: false
          })
        }
        console.log(that.data.myorderList)
      }
    })
  },

   /**
   * 获取当前用户待评价（已完成）订单信息
   */
  queryFinishMyOrders() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: app.globalData.baseurl + 'order/my/finish',//myorders
      method: "GET",
      data: {
        "user_openid": userInfo.openid, //获取当前用户的openid,用于筛选订单
      },
      success: res => {
        res.data.forEach(element => {
          element.publish_time = element.publish_time.replace(/T/g, ' ').substring(0, element.publish_time.length - 3)
          element.end_time = element.end_time.replace(/T/g, ' ').substring(0, element.end_time.length - 3)
          if (element.taker_time != null) {
            element.taker_time = element.taker_time.replace(/T/g, ' ').substring(0, element.taker_time.length - 3)
          }
          if (element.finish_time != null) {
            element.finish_time = element.finish_time.replace(/T/g, ' ').substring(0, element.finish_time.length - 3)
          } 
        })
        that.setData({
          myorderList: res.data
        })
        if(this.data.myorderList!=[]){
          that.setData({
            isempty: false
          })
        }
        console.log(that.data.myorderList)
      }
    })
  },

  /**
   * 获取当前用户发布的订单信息
   */
  queryRelMyOrders() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: app.globalData.baseurl + 'order/my/publish',//myorders
      method: "GET",
      data: {
        "user_openid": userInfo.openid, //获取当前用户的openid,用于筛选订单
      },
      success: res => {
        res.data.forEach(element => {
          element.publish_time = element.publish_time.replace(/T/g, ' ').substring(0, element.publish_time.length - 3)
          element.end_time = element.end_time.replace(/T/g, ' ').substring(0, element.end_time.length - 3)
          if (element.taker_time != null) {
            element.taker_time = element.taker_time.replace(/T/g, ' ').substring(0, element.taker_time.length - 3)
          }
          if (element.finish_time != null) {
            element.finish_time = element.finish_time.replace(/T/g, ' ').substring(0, element.finish_time.length - 3)
          } 
        })
        that.setData({
          myorderList: res.data
        })
        if(this.data.myorderList!=[]){
          that.setData({
            isempty: false
          })
        }
        console.log(that.data.myorderList)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: 'data',
      image: '',
      buttonText: '',
      describe: '',
      bgColor: '',
      optiontype:options.optiontype  //订单状态,1我接收的，2代派送，3待收货，4已完成，5我发布的0全部订单
    })
    let tmp =this.data.optiontype
    if(tmp==0)
      this.queryMyAllOrders()
    else if(tmp==1)   //添加确认送达按钮
      this.queryTakeMyOrders()
    else if(tmp==2)
      this.querytbSendMyOrders()
    else if(tmp==3)
      this.querytbRecMyOrders()   //添加确认收货按钮
    else if(tmp==4) 
      this.queryFinishMyOrders()
    else if(tmp==5) //添加取消按钮
      this.queryRelMyOrders()
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

  }
})