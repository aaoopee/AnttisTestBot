var PORT = process.env.PORT || 3000;

var serverUrl = '';

var baseUrl = 'https://api.telegram.org';
var botName = '/AnttisTestBot';
var TOKEN = '252207255:AAEK1kVW-GA5Q00kiq0LpaSj-6gj2bNhwAw';


var express = require('express');
var app = express();
var https = require('https');


app.post('/message', function(req, resp) {
    console.log('Message received: '+req);

});

app.listen(PORT, function() {
    console.log('Server started on port '+PORT+'.');

    var data = JSON.stringify({url: serverUrl+'/message'});

    var options = {
        host: baseUrl,
        path: botName+':'+TOKEN+'/setWebHook',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    // https.request(options, function(response) {
    //     response.on('data', function(chunk) {
    //         console.log(`BODY: ${chunk}`);
    //     });
    //     res.on('end', function() {
    //         console.log('No more data in response.');
    //     });
    // });
});
