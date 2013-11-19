
/*
 * GET users listing.
 */

var fs = require('fs');
exports.list = function(req, res){
    var str = '{name:"Violet",occupation:"character"}';

    fs.readFile('./data/weapon', function(err, data) {
        if (err) throw err;
        var object = eval("(" + str + ")");
        res.send(object['name']);
    });
};