import { HTTP } from '../utils/http.js'

class MyModel extends HTTP {
  // 获取所有订单
  get_orders(sCallback) {
    sCallback([])
  }
  // 获取所有地址
  get_address(sCallback) {
    // return this.request({
    //   url: '',
    //   method: 'post'
    // })
    sCallback([])
  }
  //获取授权地址
  get_address_default() {
    // return this.request({
    //   url: 'address/get_default', 
    //   method: 'post',
    // });
  } 
  //获取指定地址
  get_address_one(id, sCallback) {
    // return this.request({
    //   url: 'address/one',
    //   method: 'post',
    //   data: { id: id }
    // });
    sCallback([])
  }

  //设置授权地址
  setDefault(id, sCallback){
    // return this.request({
    //   url: 'address/set_default',
    //   method: 'post',
    //   data: { id: id }
    // });
    sCallback([])
  }

  CreateAddress(address,oid){
    // if (oid){
    //   var url = 'address/up'
    //   address['id']=oid
    // }else{
    //   var url = 'address'
    // }      
    // console.log(address)
    // return this.request({
    //   url:url,
    //   method:'post',
    //   data: address
    // })
  }

  del_address(id){
    // return this.request({
    //   url: 'address/del',
    //   method: 'post',
    //   data: { id: id }
    // })
  }
}

export { MyModel }