var PORT = process.env.PORT || 3000;

var serverUrl = 'https://morning-oasis-34627.herokuapp.com';

var baseUrl = 'api.telegram.org';
var botName = '/bot';
var TOKEN = '252207255:AAEK1kVW-GA5Q00kiq0LpaSj-6gj2bNhwAw';


var express = require('express');
var app = express();
var http = require('https');


app.post('/message', function(req, resp) {
    console.log('Message received: '+req);

});

app.listen(PORT, function() {
    console.log('Server started on port '+PORT+'.');

    var data = JSON.stringify({url: serverUrl+'/message'});

    var options = {
        host: baseUrl,
        path: botName+TOKEN+'/setWebHook',
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };


    var req = http.request(options, function(response) {
        console.log('statusCode:', response.statusCode);
        console.log('headers:', response.headers);
        response.on('data', function(chunk) {
            console.log(`BODY: ${chunk}`);
        });
        response.on('end', function() {
            console.log('No more data in response.');
        });
    });
    req.write(data);
    req.end();
});
