//获取应用实例
const app = getApp()
//获取Bmob
var date = new Date()
var currentHours = date.getHours()
var currentMinute = date.getMinutes()

Page({
  data: {

    userInfo: {},
    noteMaxLen: 200, //备注最多字数
    noteMinLen: 0, //备注当前字数
    hasUserInfo: false,
    arrayAdd: ["", "九龙街华辰宾馆旁", "九龙美食街内", "桔园快递中心", "快递中心北侧快递柜", "近邻宝A区(行政楼)", "近邻宝B区(文科楼)", "近邻宝C区(南区)", "近邻宝D区(北区)", "近邻宝E区(理工楼)", "近邻宝F区(研究生院)"], // 取件地址列表
    arraySize: ["", "大件 重量 ≥ 5kg", "中件 2kg< 重量 ≤5kg", "小件 重量 ≤ 2kg"], //快递大小件
    address: "", // 选择的取件地址
    size: "", // 从列表中选择的快递大小
    expressFee: "", // 跑腿费
    receiverName: "", //收货人姓名
    receiverPhone: "", //收货人手机号
    receiveAddr: "", // 收货地址
    expressNum: "", // 取件码
    remark: "", //备注
    orderStatus: "未接单",
    endTime: "超过截止时间无人接单则自动取消", // 截止时间
    // 截止时间选择器
    multiArray: [
      ["今天", "明天"],
      [0, 1, 2, 3, 4, 5, 6],
      [0, 10, 20]
    ],
    multiIndex: [0, 0, 0],

    // 条款
    rule: {
      name: "我已阅读并同意《拜托了快递用户服务协议》",
      checked: false
    },
    isHelp: false,

    phoneRule: {
      type: "number",
      min: 11,
      max: 11,
      message: "手机号码长度为11位!",
      trigger: "blur"
    }
  },

  // 跑腿费帮助
  showHelp: function () {
    this.setData({
      isHelp: true
    });
  },

  // 隐藏帮助
  hideHelp: function () {
    this.setData({
      isHelp: false
    });
  },

  // 同意协议
  aggreRule: function (e) {
    let items = this.data.rule;
    if (items.name === e.detail.key) {
      items.checked = e.detail.checked;
    }
    this.setData({
      rule: items
    });
  },

  // 跳转到协议
  naviToRule: function (e) {
    wx.navigateTo({
      url: "../AppRules/apprules"
    });
  },

  inputName(e) {
    this.setData({
      receiverName: e.detail.value
    })
  },

  inputPhone(e) {
    console.log(e.detail.value)
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value))) {
      wx.showToast({
        title: "手机号码格式错误!",
        icon: "none",
        duration: 1500
      })
    } else {
      this.setData({
        receiverPhone: e.detail.value
      })
    }
  },

  inputFee(e) {
    this.setData({
      expressFee: e.detail.value
    })
  },

  inputCode(e) {
    this.setData({
      expressNum: e.detail.value
    })
  },

  // 事件处理函数
  onLoad: function () {
    this.setData({
      userInfo: wx.getStorageSync("userInfo")
    })
  },

  onShow: function () {
    //getAddressList(this)

  },

  //选择大小件
  bindSizePickerChange: function (e) {
    // console.log("picker发送选择改变，携带值为", e.detail.value)
    let size = this.data.size;
    this.setData({
      index2: e.detail.value,
      size: this.data.arraySize[e.detail.value],
    })

  },

  //选择快递站点
  bindStartPickerChange: function (e) {
    let size = this.data.size;
    this.setData({
      index3: e.detail.value,
      address: this.data.arrayAdd[e.detail.value],
    })
  },

  // 选择截止时间
  pickerTap: function () {
    date = new Date();

    var monthDay = ["今天", "明天"];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },

  bindMultiPickerColumnChange: function (e) {
    date = new Date();

    var that = this;

    var monthDay = ["今天", "明天"];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为"今天"
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 "今天"并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },

  loadData: function (hours, minute) {

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },

  loadHoursMinute: function (hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  bindStartMultiPickerChange: function (e) {
    let that = this;
    let monthDay = that.data.multiArray[0][e.detail.value[0]];
    let hours = that.data.multiArray[1][e.detail.value[1]];
    let minute = that.data.multiArray[2][e.detail.value[2]];

    if (monthDay === "今天") {
      let month = date.getMonth() + 1;
      let day = date.getDate();
      monthDay = date.getFullYear() + "-" + month + "-" + day;
    } else if (monthDay === "明天") {
      let date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = date.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();

    } else {
      let month = monthDay.split("-")[0]; // 返回月
      let day = monthDay.split("-")[1]; // 返回日
      monthDay = date.getFullYear() + "-" + month + "-" + day + "-";
    }

    if (minute == '0')
      minute = "00"
    let _endTime = monthDay + " " + hours + ":" + minute;
    that.setData({
      endTime: _endTime // 获取截止时间
    })
  },

  // 调用地图API
  selectAdd: function (e) {
    wx.navigateTo({
      url: '../relOrder/SelectAdd/selectadd',
    })
  },

  // 设置备注
  setRemark: function (e) {
    let that = this
    let value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({
      remark: value,
      noteNowLen: len
    })
  },

  // 提交表单
  submitForm(e) {
    let date = new Date();
    let receiverName = this.data.receiverName // 收件人姓名
    let receiverPhone = this.data.receiverPhone // 收件人手机号
    let receiveAddr = this.data.receiveAddr // 收货地址
    let expressFee = this.data.expressFee // 跑腿费
    let expressNum = this.data.expressNum // 取件码
    let expressSize = this.data.size // 快递大小
    let expressStation = this.data.address // 快递站点
    let endTime = this.data.endTime // 截止时间
    let remark = this.data.remark // 备注
    let OrderId = date.getFullYear() + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getHours() + 1)) + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + (this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()) + receiverPhone.substring(receiverPhone.length - 4, receiverPhone.length) // 生成订单id：时间戳+手机尾号4位
    let publishTime = this.format(new Date())
    let rel_credit = this.data.userInfo.rel_credit
    console.log(rel_credit)

    console.log(publishTime)

    console.log("openid:" + this.data.userInfo.openid)

    console.log(receiverName)
    console.log(receiverPhone)
    console.log(receiveAddr)
    console.log(expressFee)
    console.log(expressNum)
    console.log(expressSize)
    console.log(expressStation)
    console.log(endTime)
    console.log(remark)
    console.log("订单编号" + OrderId)

    if (this.data.userInfo == null) {
      wx.lin.showDialog({
        type: "alert",
        title: "提示",
        content: "请先授权微信登录！"
      })
    } else if (this.data.userInfo.auth_status != 1) {
      wx.lin.showDialog({
        type: "alert",
        title: "提示",
        content: "请先进行身份认证！"
      })
    } else {
      // 表格未填写完毕
      if (receiverName === "" || receiverPhone === "" || receiveAddr === "" ||
        expressFee === "" || expressSize === "" || expressStation == "" ||
        endTime == "") {
        wx.lin.showDialog({
          type: "alert",
          title: "提示",
          content: "信息未完善"
        })
      } else if (this.data.rule.checked == false) {
        wx.lin.showDialog({
          type: "alert",
          title: "提示",
          content: "请先阅读并同意服务条款"
        })
      } else {
        wx.lin.showDialog({
          type: "confirm",
          title: "确认订单信息",
          content: "收货人：" + receiverName +
            "\n手机号：" + receiverPhone +
            "\n快递大小：" + expressSize +
            "\n金额：" + expressFee +
            "\n收货地址：" + receiveAddr +
            "\n快递站点：" + expressStation +
            "\n取件码：" + expressNum +
            "\n截止时间" + endTime +
            "\n备注：" + remark,

          success: res => {
            if (res.confirm) {
              wx.lin.showToast({
                title: "发布订单中",
                icon: "loading",
                duration: 1500
              })
              console.log(receiverName)
              console.log(receiverPhone)
              console.log(receiveAddr)
              console.log(expressFee)
              console.log(expressNum)
              console.log(expressSize)
              console.log(expressStation)
              console.log(endTime)
              console.log(remark)
              console.log("订单编号" + OrderId)
              wx.request({
                url: app.globalData.baseurl + 'order/publish',
                data: {
                  "order_id": OrderId,
                  "rel_openid": this.data.userInfo.openid,
                  "rel_wechat": this.data.userInfo.nickName,
                  "publish_time": publishTime,
                  "receive_name": receiverName,
                  "receive_phone": receiverPhone,
                  "receive_address": receiveAddr,
                  "express_station": expressStation,
                  "express_code": expressNum,
                  "express_fee": expressFee,
                  "express_size": expressSize,
                  "end_time": endTime,
                  "remark": remark,
                  "rel_credit": rel_credit
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                success: (res) => {
                  if (res.statusCode == 200) {
                    wx.lin.showToast({
                      title: "发布成功",
                      icon: "success",
                      duration: 1500
                    })
                    this.reset()
                  } else {
                    wx.lin.showToast({
                      title: "发布失败",
                      icon: "error",
                      duration: 1500
                    })
                  }
                }
              })

            }
          }
        })
      }
    }
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

  // 重置表单信息
  resetForm: function (e) {
    this.reset()
  },

  reset() {
    this.setData({
      noteMinLen: 0,
      index2: 0,
      index3: 0,
      address: "",
      receiverName: "",
      receiverPhone: "",
      receiveAddr: "",
      expressFee: "",
      expressNum: "",
      endTime: "超过截止时间无人接单则自动取消",
      multiArray: [
        ["今天", "明天"],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 10, 20]
      ],
      multiIndex: [0, 0, 0],
      remark: "", //备注
    })
  },

  bindPersonInfo: function () {
    wx.navigateTo({
      url: "./SelectAdd/selectadd",
      success: function (res) {

      },
      fail: function (res) {

      },
      complete: function (res) {},
    })
  }

})

//获取地址信息
function getAddressList(t) {
  // var Address = Bmob.Object.extend("address");
  // var query = new Bmob.Query(Address);
  // query.limit(1000);
  // query.descending("createdAt");
  // query.equalTo("userid", t.data.user.id);
  // query.find({
  //   success: function (results) {
  //     // 循环处理查询到的数据
  //     //console.log(results);
  //     let arr = []
  //     for (var i in results) {
  //       let a = {}

  //       a.address = results[i].attributes.address;
  //       a.userid = results[i].attributes.userid;
  //       a.username = results[i].attributes.username
  //       a.userphone = results[i].attributes.userphone
  //       a.userinfo = results[i].attributes.username + " " + results[i].attributes.userphone;
  //       a.objectId = results[i].id
  //       arr.push(a)
  //     }

  //     t.setData({
  //       itemData: arr
  //     })

  //   },
  //   error: function (error) {
  //     console.log("查询失败: " + error.code + " " + error.message);
  //   }
  // });
}