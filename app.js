const http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

const Msg = require('./models/messages');
const mongoDB = 'mongodb+srv://imane_audrey_jeffrey:chat24@cluster0.doxi9b2.mongodb.net/chattest?retryWrites=true&w=majority';

var server = http.createServer(app);
var io = require('socket.io')(server);

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connecté');
    }
})




app.use(express.static('client'));

app.get('/', function (request, response) {

    response.sendFile(__dirname + '/client/index.html');
});




io.on("connection", function (socket) {
  
    console.log("Un nouveau client est connecté!");
    socket.on("disconnect", () => {
        console.log('user disconneted')

    });
    socket.on('chat message', msg => {
        const message = new Msg({ msg })
        message.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                Msg.find().then(messages => {
                    io.emit('last-messages', messages)

                })
            }
        })

    })


})



server.listen(3000, console.log("Listening to port 3000"));
