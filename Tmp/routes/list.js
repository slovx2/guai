/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 13-11-18
 * Time: 下午3:26
 * To change this template use File | Settings | File Templates.
 */


var Deco = require('../model/Deco');
var Equip = require('../model/Equip');
exports.deco = function(req, res){
    res.render('deco', {decos: Equip.arms});
};
