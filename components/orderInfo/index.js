let app = getApp()

Component({
  /**
   * 组件的属性列表(开放)
   */
  properties: {
    rel_wechat: {
      type: String,
    },
    rel_openid: {
      type: String
    },
    publish_time: {
      type: String
    },
    receive_address: {
      type: String
    },
    express_station: {
      type: String
    },
    express_fee: {
      type: Number
    },
    express_size: {
      type: String
    },
    end_time: {
      type: String
    },
    order_status: {
      type: Number
    },
    remark: {
      type: String
    },

    // 订单详情页面才会显示的信息
    order_id: {
      type: String
    },
    rel_openid: {
      type: String
    },
    receive_name: {
      type: String
    },
    receive_phone: {
      type: String,
    },
    express_code: {
      type: String
    },
    taker_openid: {
      type: String,
    },
    taker_wechat: {
      type: String
    },
    taker_time: {
      type: String
    },
    finish_time: {
      type: String
    },

  },

  /**
   * 组件的初始数据(封闭)
   */
  data: {
    publisherName: '', // 用户名
    publisherCredit: 0, // 信用积分
    getExpressAddr: '', // 取件地址
    expressFee: 0, // 跑腿费
    expressSize: '', // 快递大小
    endTime: '', // 截止时间
    receiveAddr: '', // 收货地址
    publishTime: '', // 发布时间
    orderStatus: '', // 订单状态：是否有人接单
    remark: '', // 备注
    orderUnpick: '我要代拿', // 暂无人接单
    orderPicked: '已接单', // 有人接单

    // 隐私信息
    orderId: '', // 订单编号
    relOpenid: '', // 发布者openid
    receiveName: '', // 收件人姓名
    receivePhone: '', // 收件人手机号
    expressCode: '', // 取件码

    // 接单信息
    taker_openid: '', // 接单者openid
    taker_wechat: '', // 接单者微信名
    taker_time: '', // 接单时间
    finish_time: '', // 完成时间

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

    activeIndex: 0, // 步骤条  

    statusInfo: {
      0: '待接单',
      1: '已接单',
      2: '已送达',
      3: '已完成', // 即已确认送达
      4: '已取消',
    },

    currentConf: {

    }
  },

  /**
   * 组件的生命周期
   */
  attached: function () {
    this.setData({
      publisherName: this.properties.rel_wechat, // 用户名
      publisherCredit: 90, // 信用积分
      getExpressAddr: this.properties.express_station, // 取件地址
      expressFee: "￥" + this.properties.express_fee, // 跑腿费
      expressSize: this.properties.express_size, // 快递大小
      endTime: this.properties.end_time, // 截止时间
      receiveAddr: this.properties.receive_address, // 收货地址
      publishTime: this.properties.publish_time, // 发布时间
      orderStatus: this.properties.order_status == 0 ? false : true,
      remark: this.properties.remark,

      // 隐私信息
      // 隐私信息
      orderId: this.properties.order_id, // 订单编号
      relOpenid: this.properties.rel_openid, // 发布者openid
      receiveName: this.properties.receive_name, // 收件人姓名
      receivePhone: this.properties.receive_phone, // 收件人手机号
      expressCode: this.properties.express_code, // 取件码

      // 接单信息
      taker_openid: this.properties.taker_openid, // 接单者openid
      taker_wechat: this.properties.taker_wechat, // 接单者微信名
      taker_time: this.properties.taker_time, // 接单时间
      finish_time: this.properties.finish_time, // 完成时间
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 显示是否接单确认框
    onShowDioTap(e) {
      // 已接单的屏蔽按钮点击事件
      if (this.data.orderStatus == true) {
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
      this.setData({
        orderStatus: true
      })
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
      this.setData({
        orderStatus: false
      })
      wx.lin.showToast({
        title: '点击了取消～',
        icon: 'error',
        duration: 1200
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