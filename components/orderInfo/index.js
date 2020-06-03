let app = getApp()

Component({
  /**
   * 组件的属性列表(开放)
   */
  properties: {
    rel_wechat: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          publisherName: newData
        })
        // 避免异步
      }
    },
    rel_credit: {
      type: Number,
      observer: function(newData, oldData) {
        this.setData({
          publisherCredit: newData
        })
      }
    },
    publish_time: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          publishTime: newData
        })
      }
    },
    receive_address: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          receiveAddr: newData
        })
      }
    },
    express_station: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          getExpressAddr: newData
        })
      }
    },
    express_fee: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          expressFee: newData
        })
      }
    },
    express_size: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          expressSize: newData
        })
      }
    },
    end_time: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          endTime: newData
        })
      }
    },
    order_status: {
      type: Number,
      observer: function(newData, oldData) {
        this.setData({
          orderStatus: newData
        })
      }
    },
    remark: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          remark: newData
        })
      }
    },

    // 订单详情页面才会显示的信息
    order_id: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          orderId: newData
        })
      }
    },
    rel_openid: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          relOpenid: newData
        })
      }
    },
    receive_name: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          receiveName: newData
        })
      }
    },
    receive_phone: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          receivePhone: newData
        })
      }
    },
    express_code: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          expressCode: newData
        })
      }
    },
    // 是否显示slide-view
    hasSlideView: {
      type: Boolean,
      observer: function(newData, oldData) {
        this.setData({
          hasSlideView: newData
        })
      }
    },

    // 接单信息
    taker_time: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          takerTime: newData
        })
      }
    },
    taker_wechat:{
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          takerWechat: newData
        })
      }
    },
    taker_credit: {
      type: Number,
      observer: function(newData, oldData) {
        this.setData({
          takerCredit: newData
        })
      }
    },
    finish_time: {
      type: String,
      observer: function(newData, oldData) {
        this.setData({
          finishTime: newData
        })
      }
    },

  },

  /**
   * 组件的初始数据(封闭)
   */
  data: {
    publisherName: '', // 用户名
    publisherCredit: '', // 发布者信用积分
    getExpressAddr: '', // 取件地址
    expressFee: '', // 跑腿费
    expressSize: '', // 快递大小
    endTime: '', // 截止时间
    receiveAddr: '', // 收货地址
    publishTime: '', // 发布时间
    orderStatus: '', // 订单状态：是否有人接单
    remark: '', // 备注
    // 隐私信息
    orderId: '', // 订单编号
    relOpenid: '', // 发布者openid
    receiveName: '', // 收件人姓名
    receivePhone: '', // 收件人手机号
    expressCode: '', // 取件码

    // 接单信息
    takerTime: '',
    finishTime: '',
    takerCredit: '',
    takerWechat: '',

    orderUnpick: '我要代拿', // 暂无人接单
    orderPicked: '已接单', // 有人接单

    hasSlideView: true,

    navConfig: {
      config: {
        show: true,
        type: "confirm",
        showTitle: true,
        title: '确定接单？',
        content: "",
        confirmText: '确定',
        confirmColor: '#3683d6',
        cancelText: '取消',
        cancelColor: '#999'
      }
    },
  },

  /**
   * 组件的生命周期
   */
  attached: function () {
    this.setData({
      publisherName: this.properties.rel_wechat, // 用户名
      publisherCredit: this.properties.rel_credit, // 发布者信用积分
      getExpressAddr: this.properties.express_station, // 取件地址
      expressFee: "￥" + this.properties.express_fee, // 跑腿费
      expressSize: this.properties.express_size, // 快递大小
      endTime: this.properties.end_time, // 截止时间
      receiveAddr: this.properties.receive_address, // 收货地址
      publishTime: this.properties.publish_time, // 发布时间
      orderStatus: this.properties.order_status,
      remark: this.properties.remark,

      // 隐私信息
      orderId: this.properties.order_id, // 订单编号

      takerTime: this.properties.taker_time,
      finishTime: this.properties.finish_time,
      takerWechat: this.properties.taker_wechat,
      takerCredit: this.properties.taker_credit,

      hasSlideView: this.properties.hasSlideView,
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 显示是否接单确认框
    onShowDioTap(e) {
      // 已接单的屏蔽按钮点击事件
      console.log(this.data.orderStatus)
      if (this.data.orderStatus == 1) {
        return
      }
      const config = JSON.parse(JSON.stringify(this.data.navConfig.config))
      this.setData({
        currentConf: config,
      })
    },

    // 确定按钮
    onConfirmTap(e) {
      console.log(e)
      this.data.order_status = 1
      let openid = wx.getStorageSync('userInfo').openid
      let wechat_name = wx.getStorageSync('userInfo').nickName
      let taker_time = this.format(new Date())
      wx.lin.showToast({
        title: ' 接单中...',
        icon: 'loading',
        duration: 1000
      })
      console.log(this.properties.order_id)
      console.log(openid)
      console.log(wechat_name)
      console.log(taker_time)
      wx.request({
        url: 'http://localhost:8000/order/takeOrder',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          'taker_openid': openid,
          'taker_wechat': wechat_name,
          'order_id': this.properties.order_id,
          'taker_time': taker_time
        },
        success: res => {
          if (res.statusCode == 200) {
            wx.lin.showToast({
              title: '接单成功～',
              icon: 'success',
              duration: 1500
            })
          } else {
            wx.lin.showToast({
              title: '接单失败:(',
              icon: 'error',
              duration: 1500
            })
          }
        }
      })
    },

    // 取消按钮
    onCancelTap(e) {
      this.data.order_status = 0
      wx.lin.showToast({
        title: '点击了取消～',
        icon: 'error',
        duration: 1200
      })
    },

    // 跳转到详情页
    goToDetail(e) {
      let order = {
        "order_id": this.data.orderId,
        "rel_wechat": this.data.publisherName,
        "rel_credit": this.data.publisherCredit,
        "publish_time": this.data.publishTime,
        "receive_address": this.data.receiveAddr,
        "express_station": this.data.getExpressAddr,
        "express_fee": this.data.expressFee,
        "express_size": this.data.expressSize,
        "end_time": this.data.endTime,
        "order_status": this.data.orderStatus,
        "remark": this.data.remark,
        "taker_time": this.data.takerTime,
        "finish_time": this.data.finishTime,
        "taker_wechat": this.data.takerWechat,
        "taker_credit": this.data.takerCredit
      }
      wx.navigateTo({
        url: '/pages/orderDetail/orderDetail?data=' + JSON.stringify(order),
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
  }
})