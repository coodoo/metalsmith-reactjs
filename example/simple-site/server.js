"use strict";

// node libs
var url = require('url');
var http = require('http');
var express = require('express');

var app = express();

app.use(express.static('./build/'));

// start the HTTP server
var httpServer = http.createServer(app);

//
httpServer.listen( 3000, function (err) {
    if (err) {
        console.warn('Can\'t start server. Error: ', err, err.stack);
        return;
    }
    console.log('server started port', 3000);
});