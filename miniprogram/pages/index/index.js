//index.js
const db = wx.cloud.database()
Page({
  data: {
    top:'',
    top1:'',
    banner:[],
    fenlei:[],
    product:[],
    aaa:'',
    search:[]
  },

  sousuo:function (e) {
    var that = this
    // console.log(e);
    db.collection('product').where({
      name:e.detail.value
    }).get({
      success:function (res) {
        that.setData({
          search:res.data
        })
      }
    })
    setTimeout(() => {
      console.log(this.data.search)
    },500)
  },

  search:function (e) {
    var that = this
    // console.log(e);
    db.collection('product').where({
      name:e.detail.value
    }).get({
      success:function (res) {
        that.setData({
          search:res.data
        })
        console.log('搜索成功',that.data.search)
        if(that.data.search == ""){
          wx.showToast({
            title: '未找到该商品',
            icon:"none"
          })
        }
      }
    })
  },

  onLoad: function() {
    var that = this
    db.collection('swiper').get({
      success:function(res) {
        console.log('轮播图获取成功',res)
        that.setData({banner:res.data})
      },
      fail:function (res) {
        console.log('轮播图获取失败 ',res)
      }
    })
    db.collection('fnelei').get({
      success:function(res) {
        console.log('分类获取成功',res)
        that.setData({fenlei:res.data})
      },
      fail:function (res) {
        console.log('分类获取失败 ',res)
      }
    })
    db.collection('product').get({
      success:function(res) {
        console.log('产品获取成功',res)
        that.setData({product:res.data})
      },
      fail:function (res) {
        console.log('产品获取失败 ',res)
      }
    })    
       var xx = wx.getMenuButtonBoundingClientRect();//获取胶囊按钮的位置
       this.setData({top:xx.top})
      //  this.setData({top1:xx.top+33})
      //  console.log(this.data.top)
  },
  aaa:function (params) {
    this.setData({aaa:this.data.aaa+1})
    console.log(this.data.aaa)
    if (this.data.aaa.length >= 5) {
      wx.showToast({
        title: '大傻逼',
      })
    }
  }
})
