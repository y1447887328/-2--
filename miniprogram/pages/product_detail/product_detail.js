// pages/product_detail/product_detail.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
  },

  onLoad: function (options) {
    var that = this
    // console.log(options)
    db.collection('product').doc(options.id).get({
      success:function(res) {
        console.log('轮播图获取成功',res)
        that.setData({banner:res.data})
      },
      fail:function (res) {
        console.log('轮播图获取失败 ',res)
      }
    })
  },

  into_shopping_cart:function () {
    var that = this;
    db.collection('shopping_cart').where({
      product_id:that.data.banner._id
    }).get({
      success:function (res) {
        if (res.data == "") {
          // console.log(res.data)
          db.collection('shopping_cart').add({
            data:{
            product_id:that.data.banner._id,
            product_src:that.data.banner.src[0],
            product_num:1,
            product_price:that.data.banner.price,
            product_name:that.data.banner.name
            },success:function (res) {
              console.log('商品加入购物车成功',res)
              wx.showToast({
                title: '加入成功',
              })
            },fail:function (res) {
              console.log('商品加入购物车失败',res)
            }            
          })
        }else{
          wx.showToast({
            title: '已有这个商品',
            icon:'none'
          })
        }
      },fail:function (res) {
        console.log(res)
      }
    })
  },
  buy:function () {
    this.into_shopping_cart();
    setTimeout(() => {
      wx.reLaunch({
        url: '../shopping_detail/shopping_detail',
      })
    }, 1000)
  }
})