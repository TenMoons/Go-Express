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
    OrderStatus: 0, // 0：未接单，1：已接单，2：已送达， 3：已确认送达
    status: false, // 订单状态：是否有人接单
    orderUnpick: '我要代拿', // 暂无人接单
    orderPicked: '已接单', // 有人接单
    receivePerson: '',  // 收件人
    telephone: '',  // 手机号码
    expressId: '', // 取件码

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

    activeIndex: 0,  // 步骤条  

    statusInfo: {
      0: '待接单',
      1: '已接单',
      2: '已送达',
      3: '已完成',  // 即已确认送达
      4: '已取消',  
    },

    currentConf: {

    }
  },

  /**
   * 组件的生命周期
   */
  attached: function () {
    //获取当前时间戳  
    let timestamp = Date.parse(new Date())
    let date = new Date(timestamp)
   
    this.setData({
      publisherName: this.properties.rel_wechat, // 用户名
      publisherCredit: 90, // 信用积分
      getExpressAddr: this.properties.express_station, // 取件地址
      expressFee: "￥" + this.properties.express_fee, // 跑腿费
      expressSize: this.properties.express_size, // 快递大小
      endTime: this.properties.end_time, // 截止时间
      receiveAddr: this.properties.receive_address, // 收货地址
      publishTime: this.properties.publish_time  // 发布时间
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // onGetExp: function () {
    //   wx.request({
    //     url: 'http://localhost:8080/GoExpress/servletdemo',
    //     data: {
    //       info: "接单成功"
    //     },
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success: function (res) {
    //       console.log(res.data);
    //     }
    //   })
    //   wx.showToast({
    //     title: '接单成功！',
    //   })
    // },

    // 显示是否接单确认框
    onShowDioTap(e) {
      console.log(e)
      //  const type = e.currentTarget.dataset.type
      const config = JSON.parse(JSON.stringify(this.data.navConfig.config))
      this.setData({
        currentConf: config,
      })
    },

    // 确定按钮
    onConfirmTap(e) {
      console.log(e)
      this.setData({
        status: true
      })
      setTimeout(() => {
        wx.showToast({
          title: '接单成功～',
          icon: 'success'
        })
      }, 100)

    },

    // 取消按钮
    onCancelTap(e) {
      this.setData({
        status: false
      })
      setTimeout(() => {
        wx.showToast({
          title: '点击了取消～',
          icon: 'none'
        })
      }, 100)
    }
  }
})