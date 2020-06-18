const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // notice: ["请上传快递照片，作为确认送达凭证。送达凭证一经上传，不可二次修改，请谨慎操作。"],
    order_id: '',
    picture_urls: [],
    token: '',
  },

  onChangeTap(e) {
    this.setData({
      picture_urls: e.detail.all
    })
  },

  onRemoveTap(e) {
    console.log(e)
    const index = e.detail.index
    wx.lin.showMessage({
      type: 'error',
      content: `删除图片成功~`,
      duration: 1500,
      icon: 'warning'
    })
  },

  onPreviewTap(e) {
    console.log(e.detail)
  },

  confirmUpload(e) {
    let that = this
    wx.request({
      url: app.globalData.baseurl + 'order/token',
      method: 'GET',
      success: res => {
        if (res.statusCode == 200) {
          let uptoken = res.data.uptoken
          that.setData({
            token: res.data.uptoken
          })
          for (let i = 0; i < this.data.picture_urls.length; i++) {
            let filePath = this.data.picture_urls[i].url
            let picture_id = i + 1

            // 上传至七牛云
            wx.uploadFile({
              filePath: filePath,
              name: 'file',
              url: 'https://up-z2.qiniup.com',
              header: {
                "Content-Type": "multipart/form-data"
              },
              formData: {
                key: 'image/confirm/' + that.data.order_id, // 自定义图片名称
                token: uptoken,
              },
              success: res => {
                if (res.statusCode == 200) {
                  // 这里返回key 与 hash
                  let data = res.data.split(",")
                  let imgUrl = data[1].split(":")[1]
                  imgUrl = imgUrl.substring(1, imgUrl.length - 2)
                  console.log(res.data)
                  console.log(imgUrl)
                  // console.log('图片url:' + imgUrl)
                  // 图片url上传至服务器数据库
                  wx.lin.showToast({
                    title: '上传中...',
                    icon: 'loading',
                    duration: 1200
                  })
                  wx.request({
                    url: app.globalData.baseurl + 'order/setPhoto',
                    method: 'POST',
                    data: {
                      'url': imgUrl,
                      'order_id': that.data.order_id
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: res1 => {
                      // if(res1.statusCode == 200) {
                      //   wx.lin.showToast({
                      //     title: '上传成功',
                      //     icon: 'success',
                      //     duration: 1500
                      //   })
                      // }
                    }
                  })
                } else {
                  wx.lin.showToast({
                    title: '出错啦，稍后再试',
                    icon: 'error',
                    duration: 1500
                  })
                }

              },
              file: res => {}
            })
          }
        } else {
          wx.lin.showToast({
            title: '获取token失败',
            icon: 'error',
            duration: 1500
          })
        }
      }
    })


    // let pages = getCurrentPages()
    // pages[pages.length - 2].queryOrderDetail()
    // wx.navigateTo({
    //   url: '/pages/orderDetail/orderDetail',
    // })
    // pages[pages.length - 2].setData({
    //   urls: that.data.imgList
    // })
    // pages[pages.length - 2].getConfirmPhoto()

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      order_id: JSON.parse(options.data)
    })
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