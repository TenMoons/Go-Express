const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: '', // 详细地址
  },

  submit(e) {
    if (this.data.address == '') {
      wx.lin.showToast({
        title: '地址为空!',
        icon: 'error',
        duration: 1500
      })
      return
    }
    console.log(this.data.address)
    wx.request({
      url: app.globalData.baseurl + 'address/add',
      method: "POST",
      data: {
        "openid": wx.getStorageSync('userInfo').openid,
        "address": this.data.address,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success: res => {
        if (res.statusCode == 200) {
          wx.lin.showToast({
            title: '添加地址成功！',
            icon: 'success',
            duration: 1500
          })
          let pages = getCurrentPages()
          let parentPage = pages[pages.length - 2]
          parentPage.queryAllAddress()
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else if (res.statusCode == 599 || res.statusCode == 400 || res.statusCode == 598) { // 地址重复
          wx.lin.showToast({
            title: res.data,
            icon: 'error',
            duration: 1500
          })
        }
      }
    })
  },

  getLocation() {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.name
        })
      },
    })
  },

  /**
   * 生命周期函数--监听
   * 页面加载
   */
  onLoad: function (options) {
    this.getLocation()
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

})