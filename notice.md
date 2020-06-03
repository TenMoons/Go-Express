# 踩坑记录
### 登录状态问题
- 问题
用户进行授权后，登录状态无法保留，后续进入小程序仍需要授权登录
- 解决方法
在myinfo.js的onLoad中添加一下代码，其中authorized是myinfo.js中的data，用于表示是否进行过授权，并控制显示登录按钮还是头像和用户名


```
onLoad: function (options) {
    let that = this
    wx.getSetting({
      success:(res) => {
        if (res.authSetting['scope.userInfo']) { //此处判断是否登录
          that.setData({
            authorized: true
          })
        }
      }
    })
  },
```


### 回调函数中语句的执行顺序
```
success: res => {
  xxx
}
yyy
```
很有可能是先执行了yyy再执行xxx语句，考虑将yyy写进回调函数

### 异步问题！！！
组件中的数据还没有传输过来，页面就已经渲染了，导致显示不出来数据！
解决方法：在组件的properties中，每一个属性都增加observer，当属性改变就会触发observer，重新给data赋值。注意是给**data**赋值，不能给属性自身赋值，否则会死循环！

e.g.
```
order_status: {
      type: Number,
      observer: function (newData, oldData) {
        this.setData({
          orderStatus: newData
        })
      }
    },
```