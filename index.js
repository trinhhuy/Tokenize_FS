'use strict'
const http = require('http')
const Setting = require('./config/setting')
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const IndexService = require('./routes/util/IndexService')
const corsOptions = {
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, x-xsrf-token'
}
const cors = require('cors')
const home = require('./routes/home')
var server = http.createServer(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(cors(corsOptions))
app.use('/static', express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.enable('trust proxy')
app.disable('x-powered-by')
global.__basedir = __dirname
app.use('/v1', home)
app.use('/', (req, res) => {
  return res.send('Router not found')
})

server.listen(8888)
var io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }

})
app.listen(Setting.IS_PRODUCTION ? Setting.PRODUCTION.PORT : Setting.LOCAL.PORT, function () {
  console.log(`Worker ${process.pid} listening on port ${Setting.IS_PRODUCTION ? Setting.PRODUCTION.PORT : Setting.LOCAL.PORT}`)
})

io.sockets.on("connection", function(socket)
{
  console.log('client connected')
  setInterval(async () => {
    let data = await IndexService.getDataOrder()
    if (data) {
      io.sockets.emit('trading-lists', data)
    }
  }, 30 * 1000);
});
