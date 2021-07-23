const http = require('http');
const url = require('url');
const express = require('express');
const { runInNewContext } = require('vm');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    var q = url.parse(req.url, true).query;
    var txt = q.param + q.param2;

    res.end(txt);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    if(req.method === 'GET' && req.url === '/now') res.end(today);
    else {
        var obj = { message: `Nije GET nego ${req.method}`};
        res.end(JSON.stringify(obj));
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running on ${hostname}:${port}`);
});