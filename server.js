var PORT = process.env.PORT || 3000;

var serverUrl = 'https://morning-oasis-34627.herokuapp.com';

var baseUrl = 'api.telegram.org';
var botName = '/bot';
var TOKEN = process.env.TOKEN;


var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var https = require('https');

app.use(bodyParser.json());


function sendMessage(response) {
    var data = JSON.stringify(response);
    console.log('Sending '+data);

    var options = {
        host: baseUrl,
        path: botName+TOKEN+'/sendMessage',
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var req = https.request(options, function(response) {
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
}

app.post('/message', function(req, resp) {
    var response = {};
    console.log('Message received: '+JSON.stringify(req.body));

    response.chat_id = req.body.message.chat.id;
    response.text =    req.body.message.text;

    sendMessage(response);

    resp.status(200).send();

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


    var req = https.request(options, function(response) {
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
