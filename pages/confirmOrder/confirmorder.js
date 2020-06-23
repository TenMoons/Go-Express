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
    let finish_time = this.format(new Date())
    console.log(that.data.token)

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
          token: that.data.token,
        },
        success: res => {
          console.log(res)
          if (res.statusCode == 200) {
            // 这里返回key 与 hash
            let data = res.data.split(",")
            let imgUrl = data[1].split(":")[1]
            imgUrl = imgUrl.substring(1, imgUrl.length - 2)
            console.log(res.data)
            console.log(imgUrl)
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
                if (res1.statusCode == 200) {
                  wx.lin.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 1500
                  })
                  let pages = getCurrentPages()
                  let prevPage = pages[pages.length - 2]
                  prevPage.queryOrderDetail()
                  wx.request({
                    url: app.globalData.baseurl + 'order/delivery',
                    method: 'POST',
                    data: {
                      'order_id': that.data.order_id,
                      'finish_time': finish_time
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: (res) => {
                      if (res.statusCode == 200) {
                        prevPage.setData({
                          'order.order_status': res.data,
                          'order.finish_time': finish_time,
                        })
      
                        pages[pages.length - 2].queryOrderDetail()
                        
                        wx.lin.showToast({
                          title: '确认送达成功!',
                          icon: 'success',
                          duration: 1500
                        })
                        setTimeout(()=>{
                           wx.navigateBack({})
                        }, 1500)
                       
                      }
                    }
                  })
                
                }
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
    let that = this
    wx.request({
      url: app.globalData.baseurl + 'order/token',
      method: 'GET',
      success: res => {
        if (res.statusCode == 200) {
          let uptoken = res.data
          console.log("token:" + uptoken)
          that.setData({
            token: uptoken
          })
        }
      }
    })
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