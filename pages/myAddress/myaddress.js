import { MyModel } from '../../models/my.js'
const myModel = new MyModel
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  addAddr:function(e) {
    wx.navigateTo({
      url: '/pages/addMyAddress/addmyaddress',
    })
  },

  _load:function() {
    myModel.get_address((res)=>{
      this.setData({
        list:res
      }) 
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    this._load()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading()
    this._load()
  },
  del(trigger){
    const id = trigger.detail;
    myModel.del_address(id, (res)=>{
      this._load()
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      }) 
    })
  }, 
  edit(trigger) {
    const id = trigger.detail;
    // wx.navigateTo({
    //   url: 'create_address/index?id='+id
    // }) 
  },
  //设置默认地址
  setDefault(trigger) { 
    const id = trigger.detail
    myModel.setDefault(id, (res)=>{
      wx.showToast({
        title:'成功',
        icon:'success'
      })  
      setTimeout(function () {
        wx.navigateBack({
        })
      }, 1000)         
    })    
  },
  //点击默认地址本身
  selectdefault(trigger) {  
    setTimeout(function () {
      wx.navigateBack({
      })
    }, 1000)
  }
})