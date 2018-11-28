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
Page({
  data: {
    titleArray: ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"],
    newsList: []
  },
  onLoad: function() {
    this.requestNew();
  },
  tabClick: function(event) {
    tabPos = event.currentTarget.dataset.variable;
    this.requestNew();

  },
  getTime: function(data) {
    var dateee = new Date(data).toJSON();
    var date = new Date(new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    
    return new Date(date).getHours()+":"+new Date(data).getMinutes();
  },
  requestNew: function() {
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

      }
    })
  }
})