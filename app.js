//app.js
App({
  // 全局变量
  globalData: {
    userInfo: null,
    baseurl: 'http://localhost:8000/',
    code: "",
    hasAuthKey: false,
    openid: '',
    userId: '',
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  userAuth: function () {
    let that = this
    return new Promise((resolve, reject) => {
      // 调用登录接口
      wx.login({
        success: (res) => {
          if (res.code) {
            console.log('用户登录授权code为：' + res.code)
            // 传递code凭证换取用户openid，并获取后台用户信息
            wx.request({
              url: this.globalData.baseurl + 'user/wxLogin',
              data: {
                code: res.code  // 后台请求凭证
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: (res) => {
                console.log('app.js-response:')
                console.log(res)
                // if (res.statusCode == 200) {
                //   // 获取用户信息成功
                //   that.globalData.openid = res.data.openid         
                //   // 存入session缓存
                //   wx.setStorageSync('openid', that.globalData.openid)
                //   console.log('存入缓存')
                //   console.log('openid=' + that.globalData.openid)
                //   // promise机制放回成功数据
                //   resolve(res.data)
                // } else {
                //   reject('error')
                // }
              },
              fail: (res) => {
                reject(res)
                wx.showToast({
                  title: '系统错误',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          } else {
            reject('error')
          }
        },
      })
    })
  }
})