/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 13-11-19
 * Time: 下午3:40
 * To change this template use File | Settings | File Templates.
 */
var util = require('../util/util')

exports.search = function(req, res) {
    var skills = JSON.parse(req.body.skills);
    console.log(util.size(skills));
    res.send('---------------');
}