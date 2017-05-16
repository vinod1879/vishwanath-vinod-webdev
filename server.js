var express = require('express'),
    app     = express(),
    path    = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

// MAIN CATCHALL ROUTE
// =========================================

app.get('*', function(req, res) {

    res.sendFile(path.join(__dirname + '/public/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Magic happens on port ' + port);
