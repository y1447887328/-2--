// pages/shopping_detail/shopping_detail.js
const db = wx.cloud.database()
const _ = db.command
Page({
  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    money:'',
    product_now:[],
    product_id:[],
    delet_id:[]
  },
  onLoad: function (options) {
  var that = this
  db.collection('shopping_cart').get({
    success:function (res) {
      console.log(res.data)
      that.setData({product:res.data})   
      that.get_money_sum()
      console.log("获取到商品",res);
    },fail:function (res) {
      console.log("未获取到商品",res)
    }
  })
  },

  
  // 支付
   pay:function (res) {
     db.collection('shopping_cart').where({
      product_checked:"true"
     }).get({
       success:function (res) {
        console.log("获取到商品",res);
         if (res.data.length==0) {
           wx.showToast({
             title: '你还未选择商品',
             icon:'none'
           })
         }else{
           wx.redirectTo({
             url: '../pay/pay',
           })
         }
       },fail:function (res) {
        console.log("未获取到商品",res)
      }
     })
   },


  // 计算金额
  get_money_sum(){
    var that = this
    var money_sum = 0
    console.log(that.data.product.length)
    for(var x = 0;x<that.data.product.length;x++){
      if(that.data.product[x].product_checked == "true"){
        money_sum = money_sum+(that.data.product[x].product_num*that.data.product[x].product_price)
      }
    }
    that.setData({
      money:money_sum
    })
  },
  
  // 选择事件
  xuanze:function (e) {
    var that = this
    // console.log(e)
    that.setData({
      delet_id:this.data.delet_id.concat(e.detail.value[0])
    })
    if (e.detail.value.length !== 0) {
      db.collection('shopping_cart').doc(e.target.dataset.id).update({
        data:{
          product_checked:"true"
        },success:function(res){
          that.onLoad()
          console.log(e)
        }
      })
    }else{
      db.collection('shopping_cart').doc(e.target.dataset.id).update({
        data:{
          product_checked:""
        },success:function(res){
          that.onLoad()
          console.log(e)
        }
      })
    }
  },

  // 删除商品
  delete:function () {
    var that = this
    wx.cloud.callFunction({
      name:"product_delet",
      success:function (res) {
        console.log('删除成功',res)
        that.onLoad()
      },fail:function (res) {
        console.log('删除失败',res)
      }
    })
  },

  // 商品增加
  product_jia:function (e) {
    var that = this
    console.log(e)
    db.collection('shopping_cart').doc(e.target.id).update({
      data:{
        product_num:_.inc(1)
      },success:function(res){
        that.onLoad()
        console.log(e)
      }
    })
  },

  // 商品减少
  product_jian:function (e) {
    var that = this
    console.log(e)
    if(e.target.dataset.num<=1){
      wx.showToast({
        title: '客官不能再少了哟！',
        icon: "none",
      })
    }else{
      db.collection('shopping_cart').doc(e.target.id).update({
        data:{
          product_num:_.inc(-1)
        },success:function(res){
          that.onLoad()
          console.log(e)
        }
      })
    }
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