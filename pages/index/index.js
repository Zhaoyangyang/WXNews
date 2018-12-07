//index.js

const typeList = {
  0: 'gn',
  1: 'gj',
  2: 'cj',
  3: 'yl',
  4: 'js',
  5: 'ty',
  6: 'other'
}

var tabPos = 0;
var sliderWidth = 0; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    titleArray: ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"],
    newsList: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderWidth: res.windowWidth / that.data.titleArray.length,
          sliderLeft: (res.windowWidth / that.data.titleArray.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.titleArray.length * that.data.activeIndex
        });
      }
    });
    this.requestNew();
  },
  tabClick: function(event) {
    this.setData({
      sliderOffset: event.currentTarget.offsetLeft,
      activeIndex: event.currentTarget.id
    });
    tabPos = event.currentTarget.dataset.variable;
    this.requestNew();

  },
  viewClick: function(event) {
    var id = event.currentTarget.dataset.variable;
    wx.navigateTo({
      url: '/pages/detail/mytest?id=' + id,
    })
  },

  getTime: function(data) {
    var dateee = new Date(data).toJSON();
    var date = new Date(new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    
    return new Date(date).getHours()+":"+new Date(data).getMinutes();
  },
  requestNew: function(callback) {
    var myThis = this;
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: typeList[tabPos]
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let result = res.data.result;
        for (var i = 0; i < result.length; i++) {
          var date = res.data.result[i].date;
          res.data.result[i].date = myThis.getTime(date)
        }
        myThis.setData({
          newsList: result
        })
      
        console.log(res);

      },
      complete() {
        callback && callback();
      }
    })
  },onPullDownRefresh:function(){
    this.requestNew(()=>{
      wx.stopPullDownRefresh();
    });
  }
})