// components/order-step/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order_status: {
      type: Number,
      observer: function (newData, oldData) {
        console.log("new: " + newData + "old: " + oldData)
        this.setData({
          orderStatus: newData
        })
        console.log(this.data.orderStatus)
      }
    },
    order_id: {
      type: String,
     
    },
    publish_time: {
      type: String,
      value: '-',
    
    },
    taker_time: {
      type: String,
      value: '-',
  
    },
    finish_time: {
      type: String,
      value: '-',

    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderStatus: null
  },



  /**
   * 组件的方法列表
   */
  methods: {
    
  },

})