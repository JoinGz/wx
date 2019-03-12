//index.js
//获取应用实例
const app = getApp()
let moveY = 0
let num = 0
let { socket } = app.globalData
socket.on('connect', () => {
        console.log('client建立连接')
      })
socket.emit('message', 'msg')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    y: 344,
    imgUrls: [{
      item: '../images/money.png'
    }],
    show: true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail && e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  change(e) {
    console.log(e)
    console.log(e.changedTouches[0].pageY, moveY, app.globalData.wh)

    if (moveY - e.changedTouches[0].pageY >= app.globalData.wh) {
      num++
      console.log(num)
    }
    this.setData({
      show: !this.data.show
    })
  },
  changeStart(e) {
    console.log(e)
    moveY = e.changedTouches[0].pageY
  },
  sendMsg2Serve(){
    // socket.emit('userInfo', this.data.userInfo)
  }
})