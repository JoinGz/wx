let express = require('express')
let app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
let alluser = []
let private = []
io.on('connection', stock => {
  // console.log(stock)
  alluser[stock.id] = stock
  stock.on('userInfo', data => {
    alluser[stock.id].wxUserInfo = JSON.parse(data)
    alluser[stock.id].wxNum = 0
  })
  stock.on('add', data => {
    console.log('num' + data);
    
    alluser[stock.id].wxNum = data
    setTimeout(() => {
      alluser[stock.id].emit('nowNum', {
        num: alluser[stock.id].wxNum + '服务器消息'
      })
    }, 1000)
  })
})
server.listen(3000, () => {
  console.log(`let's go!`)
})
