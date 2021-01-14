const express = require('express')
const path = require('path')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
var porta = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname,'public')))

app.set('views',path.join(__dirname,'public'))

app.engine('html',require('ejs').renderFile)

app.use('/',(req,res)=>{
    res.render('index.html')
})
let messages = []
io.on('connection',socket=>{
    console.log(`socket conectado : ${socket.id}`)
    socket.emit('previousMessages',messages)
    socket.on('sendMessage', data =>{
        console.log(data)
        messages.push(data)
        socket.broadcast.emit('receveivedMessage',data)
    })
})


server.listen(porta)