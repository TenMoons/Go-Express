var status = true;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    student: {
      name: '',
      id: ''
    },
    idRule: [{
      required: true
    }, {
      min: 9,
      max: 9,
      message: "学号长度为9位!",
      trigger: 'blur'
    }],
  },
  submit(event) {
    console.log(event.detail.values)
    let detail_stu_id = event.detail.values.studentId
    let detail_stu_name = event.detail.values.studentName
    let openid = wx.getStorageSync('userInfo').openid 
    console.log(openid)
    // 判断学号格式
    if (!(/^[A-Z]\d{8}$/.test(detail_stu_id))) {
      wx.showToast({
        title: '学号格式错误!',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'http://localhost:8000/student/auth',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          'openid': openid,
          'id': detail_stu_id,
          'name': detail_stu_name
        },
        success: (res) => {
          if (res.statusCode == 200) {
            wx.showToast({
              title: '认证成功',
              icon: 'success',
              duration: 1500,
            })
            let userInfo = wx.getStorageSync('userInfo')
            userInfo.auth_status = 1
            userInfo.stu_id = detail_stu_id
            wx.setStorageSync('userInfo', userInfo);
            // 回到个人主页界面
            setTimeout(function () {
              wx.navigateBack({})
            }, 1500)
          } else {
            wx.showToast({
              title: res.data,
              icon: 'none',
              duration: 1500,
            })
          }
        }
      })
    }
  },

  // 重置
  reset(e) {
    this.setData({
      student: {
        name: '',
        id: '',
        checkCode: ''
      },
    })
  },

  /**
   * 生命周期函数--监听
   * 页面加载
   */
  onLoad: function (options) {
    wx.lin.initValidateForm(this)
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