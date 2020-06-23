let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      order_status: null
    }, // 当前订单
    identity: -1, // 既不是接单者(1)也不是发布者(0)
    hasConfirmPhoto: false,  // 是否有上传凭证
    photo: [],  // 图片url
    order_id: null,
    user_openid: '',
  },

  // 获取当前订单信息
  queryOrderDetail() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: app.globalData.baseurl + 'order/detail',
      method: "GET",
      data: {
        order_id: that.data.order_id,
        user_openid: userInfo.openid, // 当前查看用户的openid，用于判断隐私信息查看权限
      },
      success: res => {
        if (res.statusCode == 200) {
          this.setData({
            "order.order_status": res.data[0].order_status
          })
          console.log(res)
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
          this.setData({
            order: res.data[0],
            // photo: ['http://qc2q2xid6.bkt.clouddn.com/' + res.data[0].confirm_photo]
          })
          if (res.data[0].confirm_photo != null) {
            that.setData({
              photo: ['http://qc2q2xid6.bkt.clouddn.com/' + res.data[0].confirm_photo],
              hasConfirmPhoto: true,
            })
          } else {
            that.setData({
              hasConfirmPhoto: false,
            })
          }
          if (userInfo.openid == res.data[0].taker_openid) {
            that.setData({
              identity: 1  
            })
          } else if (userInfo.openid == res.data[0].rel_openid) {
            that.setData({
              identity: 0
            })
          }
        } else if(res.statusCode == 201) {  // 没有查看权限
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
            order: res.data[0],
            identity: -1
          })
        }
        console.log("页面订单状态:" + that.data.order.order_status)
      }
    })
    
  },

  // 确认送达按钮事件
  confirmDelivery(e) {
    wx.navigateTo({
      url: '/pages/confirmOrder/confirmorder?data=' + JSON.stringify(this.data.order.order_id),
    })
  },

  // 获取送达凭证
  // getConfirmPhoto() {
  //   let baseurl = 'http://qc2q2xid6.bkt.clouddn.com/image/confirm/'  // 七牛云存储空间
  //   wx.request({
  //     url: app.globalData.baseurl + 'order/confirm',
  //     method: 'POST',
  //     data: {
  //       'order_id': this.data.order.order_id
  //     },
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //   })
  // },

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

  // 图片预览
  previewImage: function (e) {
    let current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.photo
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
      order_id: JSON.parse(options.data)
    })
    this.queryOrderDetail()
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
    if(this.data.order_id != null) {
      this.queryOrderDetail()
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

  }
})