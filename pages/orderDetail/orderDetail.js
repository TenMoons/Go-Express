let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {}, // 当前订单
    privacy: {}, // 隐私信息 
    identity: -1, // 既不是接单者也不是发布者
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
            privacy: res.data[0],
            identity: res.data[1].identity
          })
        } else {
          that.setData({
            privacy: {
              receive_name: "***",
              receive_phone: "***********",
              express_code: "*****"
            },
            identity: -1,
          })
        }
      }
    })
  },

  // 确认送达按钮事件
  confirmDelivery(e) {
    let that = this
    wx.lin.showDialog({
      type: "confirm",
      title: "提示",
      content: "确认送达该快递？",

      success: res => {
        if (res.confirm) {
          console.log(that.data.order.order_id)
          wx.request({
            url: app.globalData.baseurl + 'order/delivery',
            method: 'POST',
            data: {
              'order_id': that.data.order.order_id,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: (res) => {
              if (res.statusCode == 200) {
                this.setData({
                  'order.order_status': res.data
                })
                console.log('订单状态：' + that.data.order.order_status)
                wx.lin.showToast({
                  title: '确认送达成功!',
                  icon: 'success',
                  duration: 1500
                })
              }
            }
          })
        } else {
          wx.lin.showToast({
            title: '点击了取消~',
            duration: 1200,
          })
        }

      }
    })

  },

  // 确认收货按钮事件
  confirmReceipt: e => {
    wx.lin.showDialog({
      type: "confirm",
      title: "提示",
      content: "确认该快递已收货？",

      success: res => {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseurl + 'order/receipt',
            method: 'POST',
            data: {
              'order_id': this.data.order.order_id
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: res => {
              if (res.statusCode == 200) {
                wx.lin.showToast({
                  title: '确认收货成功!',
                  icon: 'success',
                  duration: 1500
                })
              }
            }
          })
        } else {
          wx.lin.showToast({
            title: '点击了取消~',
            duration: 1200,
          })
        }
      }
    })
  },

  // 取消订单按钮事件
  cancelOrder: e => {
    wx.lin.showDialog({
      type: "confirm",
      title: "提示",
      content: "确认取消该订单？",

      success: res => {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseurl + 'order/cancel',
            method: 'POST',
            data: {
              'order_id': this.data.order.order_id
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: res => {
              if (res.statusCode == 200) {
                wx.lin.showToast({
                  title: '取消订单成功!',
                  icon: 'success',
                  duration: 1500
                })
              }
            }
          })
        } else {
          wx.lin.showToast({
            title: '点击了取消~',
            duration: 1200,
          })
        }
      }
    })
  },

  // 评价
  evaluate(e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      order: JSON.parse(options.data)
    })
    this.data.order.express_fee = this.data.order.express_fee.substring(1, this.data.order.express_fee.length)
    this.queryOrderDetail()
    console.log(this.data.order)
    console.log(this.data.identity)
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