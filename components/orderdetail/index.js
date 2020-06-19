let app = getApp()

Component({
  /**
   * 组件的属性列表(开放)
   */
  properties: {
    order_status: {
      type: Number,
      observer: function (newData, oldData) {
        this.setData({
          orderStatus: newData
        })
      }
    },
    order_id: {
      type: String,
      observer: function (newData, oldData) {
        this.setData({
          orderId: newData
        })
      }
    },
    rel_openid: {
      type: String,
      observer: function (newData, oldData) {
        this.setData({
          relOpenid: newData
        })
      }
    },
    receive_name: {
      type: String,
      observer: function (newData, oldData) {
        this.setData({
          receiveName: newData
        })
      }
    },
    receive_phone: {
      type: String,
      observer: function (newData, oldData) {
        this.setData({
          receivePhone: newData
        })
      }
    },
    express_code: {
      type: String,
      observer: function (newData, oldData) {
        this.setData({
          expressCode: newData
        })
      }
    },

    // 是否显示slide-view
    hasSlideView: {
      type: Boolean,
      observer: function (newData, oldData) {
        this.setData({
          hasSlideView: newData
        })
      }
    },

    // 接单信息
    taker_openid: {
      type: String,
      observer: function (newData, oldData) {
        this.setData({
          taker_openid: newData
        })
      }
    },
    taker_wechat: {
      type: String,
      observer: function (newData, oldData) {
        this.setData({
          taker_wechat: newData
        })
      }
    },
    taker_credit: {
      type: Number,
      observer: function (newData, oldData) {
        this.setData({
          taker_credit: newData
        })
      }
    },

    // 是否显示slide-view
    hasSlideView: {
      type: Boolean
    },

  },

  /**
   * 组件的初始数据(封闭)
   */
  data: {
    orderStatus: 0, // 订单状态：是否有人接单
    // 隐私信息
    orderId: '', // 订单编号
    relOpenid: '', // 发布者openid
    receiveName: '', // 收件人姓名
    receivePhone: '', // 收件人手机号
    expressCode: '', // 取件码

    // 接单信息
    taker_openid: '', // 接单者openid
    taker_wechat: '', // 接单者微信名
    taker_credit: '', // 接单者credit


    orderUnpick: '我要代拿', // 暂无人接单
    orderPicked: '已接单', // 有人接单

    hasSlideView: true,

  },

  /**
   * 组件的生命周期
   */
  attached: function () {
    this.setData({

      orderStatus: this.properties.order_status,

      // 隐私信息
      orderId: this.properties.order_id, // 订单编号
      relOpenid: this.properties.rel_openid, // 发布者openid
      receiveName: this.properties.receive_name, // 收件人姓名
      receivePhone: this.properties.receive_phone, // 收件人手机号
      expressCode: this.properties.express_code, // 取件码

      // 接单信息
      taker_openid: this.properties.taker_openid, // 接单者openid
      taker_wechat: this.properties.taker_wechat, // 接单者微信名
   
      taker_credit: this.properties.taker_credit, // 接单者credit

      hasSlideView: this.properties.hasSlideView,
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
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