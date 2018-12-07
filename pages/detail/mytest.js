// pages/mypage/mytest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    newsSource:'',
    newsNum:'',
    image:'',
    content:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var myThis = this;
    console.log(id);
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id:id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.result);
        myThis.setData({ 
          title: res.data.result.title,
          newsSource: res.data.result.source,
          newsNum: res.data.result.readCount,
          image: res.data.result.firstImage,
          content: res.data.result.content
          }
        )
      },
      complete() {

      }
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