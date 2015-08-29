var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express(),
    router = express.Router();


router.use(express.static('public'));
router.use(express.static('app'));

// Mounts the router on the app
app.use('/', router);
var server = app.listen(4000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('This is a tester app for me listening at http://%s:%s', host, port)
});
