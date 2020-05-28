import {
  MyModel
} from "../../models/my.js"
var amapFile = require('../../utils/amap-wx.js');
const myModel = new MyModel

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: '', // 详细地址
  },

  submit(e) {
    const {
      detail
    } = e
    console.log(detail.values)
 
    wx.showToast({
      title: '添加地址成功！',
      duration: 1500
    })
    setTimeout(function () {
      wx.navigateBack({})
    }, 1500)
  },

  /**
   * 生命周期函数--监听
   * 页面加载
   */
  onLoad: function (options) {
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