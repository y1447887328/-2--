// pages/guanlishangpin/guanlishangpin.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('product').get({
      success:function(res) {
        console.log('产品获取成功',res)
        that.setData({product:res.data})
      },
      fail:function (res) {
        console.log('产品获取失败 ',res)
      }
    })    
    console.log(this.data.product)
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