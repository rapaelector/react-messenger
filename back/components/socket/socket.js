const express = require('express')
const server = require('http').createServer(express);
const io = require('socket.io')(server);



server.listen(4000, () => {
    console.log('listenning on port 4000')
});

module.exports=io;