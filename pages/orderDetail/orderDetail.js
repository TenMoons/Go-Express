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
    let finish_time = this.format(new Date())
    wx.lin.showDialog({
      type: "confirm",
      title: "提示",
      content: "确认送达该快递？",

      success: res => {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseurl + 'order/delivery',
            method: 'POST',
            data: {
              'order_id': that.data.order.order_id,
              'finish_time': finish_time
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: (res) => {
              if (res.statusCode == 200) {
                this.setData({
                  'order.order_status': res.data,
                  'order.finish_time': finish_time,
                })
                let pages = getCurrentPages()
                pages[pages.length - 1].queryOrderDetail()
                pages[pages.length - 2].queryAllOrders()
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
  confirmReceipt(e) {
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
                let pages = getCurrentPages()
                pages[pages.length - 1].queryOrderDetail()
                pages[pages.length - 2].queryAllOrders()
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
  cancelOrder(e) {
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
                // 刷新首页
                let pages = getCurrentPages()
                pages[pages.length - 1].queryOrderDetail()
                pages[pages.length - 2].queryAllOrders()
                wx.lin.showToast({
                  title: '取消订单成功!',
                  icon: 'success',
                  duration: 1500
                })
                wx.navigateTo({
                  url: '/pages/Homepage/Homepage',
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
    let that = this
    wx.lin.showDialog({
      type: "confirm",
      title: "评价",
      content: "您对此次订单是否满意？",
      confirmText: "满意",
      cancelText: "不满意",
      confirmColor: '#f60',
      cancelColor: '#999',
      success: res => {
        //好评
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseurl + 'order/evaluate_positive',
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
                wx.lin.showToast({
                  title: '提交成功!感谢您的认可！',
                  icon: 'success',
                  duration: 1500
                })
              }
            }
          })
          // 差评
        } else {
          wx.request({
            url: app.globalData.baseurl + 'order/evaluate_negative',
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
                wx.lin.showToast({
                  title: '提交成功！感谢您的反馈！',
                  icon: 'success',
                  duration: 1500
                })
              }
            }
          })
        }
        let pages = getCurrentPages()
        pages[pages.length - 1].queryOrderDetail()
        pages[pages.length - 2].queryAllOrders()
      }
    })
  },

  format(Date) {
    let obj = {
      Y: Date.getFullYear(),
      M: Date.getMonth() + 1,
      D: Date.getDate(),
      H: Date.getHours(),
      Mi: Date.getMinutes(),
      S: Date.getSeconds()
    }
    // 拼接时间 hh:mm:ss
    let time = ' ' + this.supplement(obj.H) + ':' + this.supplement(obj.Mi) + ':' + this.supplement(obj.S);
    // yyyy-mm-dd
    return obj.Y + '-' + this.supplement(obj.M) + '-' + this.supplement(obj.D) + time;
  },

  // 补0
  supplement(nn) {
    return nn = nn < 10 ? '0' + nn : nn;
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