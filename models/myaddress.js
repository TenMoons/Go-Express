import{ HTTP } from '../utils/http.js'

class MyAddress extends HTTP{
  data = null
  
  // 获取我的地址列表
  getAddressList() {
    return this.request({
      url: 'http://localhost:8000/address/myAddr_list',
    })
  }

  // 新增地址
  addAddress(detail, openid) {
    return this.request({
      url: 'http://localhost:8000/address/add',
      data: {
        addr_detail: detail,
        openid: openid
      },
      method: 'POST'
    })
  }
}

export {
  MyAddress
}