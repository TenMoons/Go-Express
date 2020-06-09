Component({
  /**
   * 组件的属性列表
   */
  properties: {
    openid: {
      type: String,
      observer: function (newData, oldData) {
        this.setData({
          openId: newData
        })
        // 避免异步
      }
    },
    address: {
      type: String,
      observer: function (newData, oldData) {
        this.setData({
          Address: newData
        })
        // 避免异步
      }
    },
    isUse: {
      type: Boolean,
      observer: function (newData, oldData) {
        this.setData({
          isUse: newData
        })
        // 避免异步
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    openId: '',
    Address: '',
    isUse: false,  // 是否是提交订单的时候使用
  },

  /**
   * 组件的生命周期
   */
  attached: function () {
    this.setData({
      openId: this.properties.openid,
      Address: this.properties.address
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择地址
    select(e) {
      if (!this.data.isUse) {
        return
      } 
      let pages = getCurrentPages()
      let prevPage = pages[pages.length - 2]
      prevPage.setData({
        receiveAddr: this.data.Address
      })
      // 返回
      wx.navigateBack({})
    },

    // 删除地址
    del(e) {
      wx.lin.showDialog({
        title: '提示',
        type: 'confirm',
        content: '确定删除？',
        success: res => {
          if (res.confirm) {
            wx.request({
              url: 'http://localhost:8000/address/delete',
              header: {
                "content-type": "application/x-www-form-urlencoded",
              },
              method: "POST",
              data: {
                "openid": this.data.openId,
                "address": this.data.Address
              },
              success: res => {
                // 刷新当前页面
                wx.lin.showToast({
                  title: '删除成功！',
                  icon: 'success',
                  duration: 1500
                })
                let pages = getCurrentPages()
                pages[pages.length - 1].queryAllAddress()
              }
            })
          } else { //这里是点击了取消以后
            wx.lin.showToast({
              title: '点击了取消~',
              duration: 1200
            })
          }
        }
      })
    },
  }
})