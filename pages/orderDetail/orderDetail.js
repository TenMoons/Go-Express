let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {}, // 当前订单



    privacy: {}, // 隐私信息 
  },

  // 获取当前订单信息
  queryOrderDetail() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: app.globalData.baseurl + 'order/detail',
      method: "GET",
      data: {
        "order_id": that.data.order.order_id,
        "user_openid": userInfo.openid, // 当前查看用户的openid，用于判断隐私信息查看权限
      },
      success: res => {
        if (res.statusCode == 200) {   
          that.setData({
            privacy: res.data
          })
        } else {
          that.setData({
            privacy: {
              receive_name: "***",
              receive_phone: "***********",
              express_code: "*****"
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      order: JSON.parse(options.data)
    })
    console.log("获取订单详情成功")
    this.data.order.express_fee = this.data.order.express_fee.substring(1, this.data.order.express_fee.length)
    this.queryOrderDetail()
    console.log(this.data.order)
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