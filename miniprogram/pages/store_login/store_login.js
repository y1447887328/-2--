// pages/store_login/store_login.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formsubmit:function(e){
    console.log(e)
    if(e.detail.value.zhanghu!==""&&e.detail.value.pwd!==""){
      db.collection('user').where({
            zhanghu:e.detail.value.zhanghu,
            pwd:e.detail.value.pwd
          }).get({
            success:function(res){
              console.log(res)
              if(res.data.length == 0){
                wx.showToast({
                  title: '账户或密码错误',
                  icon:"none"
                })
              }else{
                wx.redirectTo({
                  url: '../store_operation/store_operation',
                })
              }
            },fail:function(res){
              console.log(res)
            }
          })
    }else{
      wx.showToast({
        title: '你还有信息未填',
        icon:"none"
      })
    }
    
  },

})